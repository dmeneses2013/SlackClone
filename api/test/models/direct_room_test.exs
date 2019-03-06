defmodule Slackclone.DirectRoomTest do
  use Slackclone.ModelCase

  alias Slackclone.DirectRoom

  @valid_attrs %{name: "some content", topic: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = DirectRoom.changeset(%DirectRoom{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = DirectRoom.changeset(%DirectRoom{}, @invalid_attrs)
    refute changeset.valid?
  end
end
