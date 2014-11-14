defmodule Pitch.RoomChannel do
  use Phoenix.Channel
  import Ecto.Query, only: [from: 2]

  def join(socket, _topic, _message) do
    {:ok, socket}
  end

  def leave(socket, _message) do
    if user = get_assign(socket, :user) do
      Repo.delete user
      broadcast socket, "user:left", %{id: user.id, username: user.name}
    end

    socket
  end

  def event(socket, "user:new", message) do
    room = room_from_socket(socket)
    user = create_user(room, message)

    socket = assign(socket, :user, user)
    socket = assign(socket, :room, room)

    broadcast socket, "user:entered", %{id: user.id, username: user.name}

    if Enum.count(users(room)) >= 4 && room.active == false do
      room = %{room | active: true}
      Repo.update(room)
      broadcast socket, "game:begin", %{}
    end

    socket
  end

  def event(socket, "message:new", message) do
    room    = get_assign(socket, :room)
    user    = get_assign(socket, :user)
    message = save_message(room, user, message)

    broadcast socket, "message:new", %{id: message.id, username: user.name, body: message.body}
    socket
  end

  # private

  defp create_user(room, message) do
    Repo.insert %User{
      room_id: room.id,
      name:    message["username"],
      token:   message["token"]
    }
  end

  defp save_message(room, user, message) do
    Repo.insert %Message{
      room_id:  room.id,
      username: user.name,
      body:     message["body"]
    }
  end

  defp room_from_socket(socket) do
    Repo.all(from r in Room, where: r.name == ^socket.topic)
    |> List.first
  end

  defp users(room) do
    Repo.all(from u in User, where: u.room_id == ^room.id)
    |> Enum.map(&(&1.name))
  end
end
