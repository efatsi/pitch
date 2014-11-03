defmodule Message do
  use Ecto.Model

  validate message,
    username: present(),
    body:     present(),
    room_id:  present()

  schema "messages" do
    field :body,     :string
    field :username, :string
    belongs_to :room, Room
  end
end
