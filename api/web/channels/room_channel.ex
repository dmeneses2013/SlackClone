defmodule Slackclone.RoomChannel do
  use Slackclone.Web, :channel


  def join("room:" <> room_id, _params, socket) do
    room = Repo.get!(Slackclone.Room, room_id)

    page =
      Slackclone.Message
      |> where([m], m.room_id == ^room.id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Slackclone.Repo.paginate()

    response = %{
      room: Phoenix.View.render_one(room, Slackclone.RoomView, "room.json"),
      messages: Phoenix.View.render_many(page.entries, Slackclone.MessageView, "message.json"),
      pagination: Slackclone.PaginationHelpers.pagination(page)
    }
    send(self, :after_join)
    {:ok, response, assign(socket, :room, room)}
  end

  def handle_info(:after_join, socket) do
    Slackclone.Presence.track(socket, socket.assigns.current_user.id, %{
      user: Phoenix.View.render_one(socket.assigns.current_user, Slackclone.UserView, "user.json")
    })
    push(socket, "presence_state", Slackclone.Presence.list(socket))
    {:noreply, socket}
  end

  def handle_in("new_message", params, socket) do
    changeset =
      socket.assigns.room
      |> build_assoc(:messages, user_id: socket.assigns.current_user.id)
      |> Slackclone.Message.changeset(params)

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast_message(socket, message)
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, Phoenix.View.render(Slackclone.ChangesetView, "error.json", changeset: changeset)}, socket}
    end
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end

  defp broadcast_message(socket, message) do
    message = Repo.preload(message, :user)
    rendered_message = Phoenix.View.render_one(message, Slackclone.MessageView, "message.json")
    broadcast!(socket, "message_created", rendered_message)
  end
end
