defmodule Slackclone.RoomView do
  use Slackclone.Web, :view

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, Slackclone.RoomView, "room.json")}
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, Slackclone.RoomView, "room.json")}
  end

  def render("errorprivate.json", %{room: room}) do
    %{errors: %{detail: "Internal server server error"}}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id,
      name: room.name,
      topic: room.topic,
      users: room.users
      }
  end
end
