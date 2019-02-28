defmodule Slackclone.MessageController do
  use Slackclone.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Slackclone.SessionController

  def index(conn, params) do
    last_seen_id = params["last_seen_id"] || 0
    room = Repo.get!(Slackclone.Room, params["room_id"])

    page =
      Slackclone.Message
      |> where([m], m.room_id == ^room.id)
      |> where([m], m.id < ^last_seen_id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Slackclone.Repo.paginate()

    render(conn, "index.json", %{messages: page.entries, pagination: Slackclone.PaginationHelpers.pagination(page)})
  end
end
