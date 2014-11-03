defmodule Pitch.Router do
  use Phoenix.Router
  use Phoenix.Router.Socket, mount: "/ws"

  pipeline :browser do
    plug :accepts, ~w(html)
    plug :fetch_session
  end

  scope "/" do
    pipe_through :browser

    get "/",                Pitch.RoomController, :index
    get "/room/new",        Pitch.RoomController, :new
    get "/room/:id/delete", Pitch.RoomController, :destroy
    get "/room/:id",        Pitch.RoomController, :show
    post "/room",           Pitch.RoomController, :create

    channel "rooms", Pitch.RoomChannel
  end
end
