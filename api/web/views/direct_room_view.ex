defmodule Slackclone.DirectRoomView do
  use Slackclone.Web, :view

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, Slackclone.DirectRoomView, "direct_room.json")}
  end

  def render("show.json", %{direct_room: direct_room}) do
    %{data: render_one(direct_room, Slackclone.DirectRoomView, "direct_room.json")}
  end

  def render("direct_room.json", %{direct_room: direct_room}) do
    %{id: direct_room.id,
      name: direct_room.name,
      topic: direct_room.topic}
  end
end
