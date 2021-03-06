defmodule Slackclone.User do
  use Slackclone.Web, :model

  @derive {Poison.Encoder, only: [:username, :id]}

  schema "users" do
    field :username, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :image, :string
    many_to_many :rooms, Slackclone.Room, join_through: "user_rooms"
    has_many :messages, Slackclone.Message
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
     struct
     |> cast(params, [:username, :email, :image])
     |> validate_required([:username, :email, :image])
     |> unique_constraint(:username)
     |> unique_constraint(:email)
   end

   def registration_changeset(struct, params) do
     struct
     |> changeset(params)
     |> cast(params, [:password])
     |> validate_length(:password, min: 6, max: 100)
     |> put_password_hash()
   end

   defp put_password_hash(changeset) do
     case changeset do
       %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
         put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
       _ ->
         changeset
     end
   end
end
