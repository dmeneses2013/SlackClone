defmodule Slackclone.Repo.Migrations.CreateRoom do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string, null: false
      add :topic, :string, default: ""
      add :private, :boolean, default: false
      add :direct, :boolean, default: false

      timestamps()
    end
    create unique_index(:rooms, [:name])
  end
end
