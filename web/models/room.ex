defmodule Room do
  use Ecto.Model
  use Ecto.Model.Schema

  validate room, name: present()

  schema "rooms" do
    field :name, :string
    has_many :messages, Message
  end
end
