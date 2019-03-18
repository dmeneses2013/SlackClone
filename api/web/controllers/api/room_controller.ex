defmodule Slackclone.RoomController do
  use Slackclone.Web, :controller

  alias Slackclone.Room


  def index(conn, _params) do
    rooms = Repo.all(Room)
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, params) do
    current_user = Guardian.Plug.current_resource(conn)
    changeset = Room.changeset(%Room{}, params)

    case Repo.insert(changeset) do
      {:ok, room} ->
        assoc_changeset = Slackclone.UserRoom.changeset(
          %Slackclone.UserRoom{},
          %{user_id: current_user.id, room_id: room.id}
        )
        Repo.insert(assoc_changeset)

        conn
        |> put_status(:created)
        |> render("show.json", room: room)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Slackclone.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, params) do
    room = Repo.get(Room, params["id"])
    |> Repo.preload([:messages])
    |> Repo.preload([:users])
    changeset = Room.changeset(room, params)
    case Repo.update(changeset) do
      {:ok, result} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{room: result})
      {:error, _changeset} ->
        conn
        |> put_status(:unprocessable_entity)
      end
  end


  def join(conn, %{"id" => room_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    room = Repo.get(Room, room_id)

    changeset = Slackclone.UserRoom.changeset(
      %Slackclone.UserRoom{},
      %{room_id: room.id, user_id: current_user.id}
    )

    case Repo.insert(changeset) do
      {:ok, _user_room} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{room: room})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Slackclone.ChangesetView, "error.json", changeset: changeset)
    end
  end
end
