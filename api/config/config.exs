# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :slackclone,
  ecto_repos: [Slackclone.Repo]

# Configures the endpoint
config :slackclone, Slackclone.Endpoint,
  url: [host: "localhost"],
  check_origin: false,
  secret_key_base: "cYAEY1Cd5e4d/WlLiviwHN4cSSm7CZKGn/FClvOOIegnaFMQJTP02NNBmCTHYli8",
  render_errors: [view: Slackclone.ErrorView, format: "json", accepts: ~w(json)],
  pubsub: [name: Slackclone.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.

config :guardian, Guardian,
  issuer: "Slackclone",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Slackclone.GuardianSerializer

import_config "#{Mix.env}.exs"
