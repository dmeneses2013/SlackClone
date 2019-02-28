defmodule Slackclone.Message do
  use Slackclone.Web, :model

  schema "messages" do
    field :text, :string
    belongs_to :room, Slackclone.Room
    belongs_to :user, Slackclone.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
