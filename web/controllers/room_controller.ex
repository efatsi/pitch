defmodule Pitch.RoomController do
  use Phoenix.Controller
  import Pitch.Router.Helpers
  alias Phoenix.Controller.Flash
  import Ecto.Query, only: [from: 2]

  plug :action

  def index(conn, _params) do
    render conn, "index.html", rooms: Repo.all(Room)
  end

  def show(conn, %{"id" => id}) do
    records = Repo.all(from r in Room, where: r.id == ^String.to_integer(id), preload: [:users, :messages])
    case records do
      [room] ->
        render conn, "show.html",
          room: room,
          users: room.users.all |> users_json,
          messages: room.messages.all |> messages_json
      [] ->
        render conn, "not_found.html"
    end
  end

  def new(conn, _params) do
    render conn, "new.html"
  end

  def create(conn, %{"room" => room_params}) do
    new_room = %Room{name: room_params["name"]}

    case Room.validate(new_room) do
      [] ->
        room = Repo.insert new_room
        redirect conn, room_path(:show, room.id)
      _ ->
        conn
        |> Flash.put(:notice, "Name must be specified")
        |> redirect room_path(:new)
    end
  end

  def destroy(conn, %{"id" => id}) do
    records = Repo.all(from r in Room, where: r.id == ^String.to_integer(id), preload: [:messages, :users])
    case records do
      [room] ->
        Repo.delete_all room.messages
        Repo.delete_all room.users
        Repo.delete room
        redirect conn, "/"
      _ ->
        conn
        |> Flash.put(:notice, "Room did not exist in the first place")
        |> redirect "/"
    end
  end

  def not_found(conn, _params) do
    render conn, "not_found.html"
  end

  def error(conn, _params) do
    render conn, "error.html"
  end

  # private

  defp users_json(messages) do
    {:ok, encoded} = messages
    |> Enum.into([], fn(user) ->
      %{id: user.id, username: user.name}
    end)
    |> JSON.encode

    encoded
  end

  defp messages_json(messages) do
    {:ok, encoded} = messages
    |> Enum.into([], fn(message) ->
      %{id: message.id, username: message.username, body: message.body}
    end)
    |> JSON.encode

    encoded
  end
end
