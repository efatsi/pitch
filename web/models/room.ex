defmodule Room do
  use Ecto.Model
  use Ecto.Model.Schema

  validate room, name: present()

  schema "rooms" do
    field :name, :string
    field :active, :boolean
    has_many :messages, Message
    has_many :users, User
  end
end
