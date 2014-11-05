defmodule Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def up do
    "CREATE TABLE users(id serial primary key, name varchar(140), token varchar(140), room_id integer)"
  end

  def down do
    "DROP TABLE users"
  end
end
