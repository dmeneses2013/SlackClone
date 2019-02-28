defmodule Slackclone.Repo do
  use Ecto.Repo, otp_app: :slackclone
  use Scrivener, page_size: 25
end
