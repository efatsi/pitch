defmodule Pitch.RoomChannel do
  use Phoenix.Channel
  import Ecto.Query, only: [from: 2]

  def join(socket, _topic, _message) do
    broadcast socket, "user:entered", %{}
    {:ok, socket}
  end

  def leave(socket, _message) do
    broadcast socket, "user:left", %{}
    socket
  end

  def event(socket, "message:new", message) do
    save_message(socket, message)
    broadcast socket, "message:new", %{username: message["username"], body: message["body"]}
    socket
  end

  defp save_message(socket, message) do
    [room] = Repo.all(from r in Room, where: r.name == ^socket.topic)
    Repo.insert %Message{
      room_id:  room.id,
      username: message["username"],
      body:     message["body"]
    }
  end
end
