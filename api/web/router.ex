defmodule Slackclone.Router do
  use Slackclone.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", Slackclone do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", Slackclone do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    post "/users", UserController, :create
    post "/users/image", UserController, :update
    get "/users/:id/rooms", UserController, :rooms
    post "/rooms/:id/join", RoomController, :join
    resources "/rooms", RoomController, only: [:index, :create] do
      resources "/messages", MessageController, only: [:index]
      end
    end
end
