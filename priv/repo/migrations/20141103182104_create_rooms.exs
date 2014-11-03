defmodule Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def up do
    "CREATE TABLE rooms(id serial primary key, name varchar(140))"
  end

  def down do
    "DROP TABLE rooms"
  end
end
