defmodule Pitch.GameChannel do
  use Phoenix.Channel
  import Ecto.Query, only: [from: 2]

  def join(socket, _topic, _message) do
    room   = room_from_socket(socket)
    socket = assign(socket, :room, room)

    {:ok, socket}
  end

  def event(socket, "user:activity", _message) do
    room = get_assign(socket, :room)

    broadcast socket, "users", %{users: users(room)}
    socket
  end

  # private

  defp room_from_socket(socket) do
    Repo.all(from r in Room, where: r.name == ^socket.topic)
    |> List.first
  end

  defp users(room) do
    Repo.all(from u in User, where: u.room_id == ^room.id)
    |> Enum.map(&(&1.name))
  end
end
