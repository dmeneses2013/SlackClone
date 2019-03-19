defmodule Slackclone.Room do
  use Slackclone.Web, :model

  schema "rooms" do
    field :name, :string
    field :topic, :string
    many_to_many :users, Slackclone.User, join_through: "user_rooms"
    has_many :messages, Slackclone.Message

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :topic])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end

alias Slackclone.Room
alias Slackclone.User
