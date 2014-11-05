defmodule User do
  use Ecto.Model

  validate user,
    name:    present(),
    token:   present(),
    room_id: present()

  schema "users" do
    field :name,  :string
    field :token, :string
    belongs_to :room, Room
  end
end
