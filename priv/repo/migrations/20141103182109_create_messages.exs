defmodule Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def up do
    "CREATE TABLE messages(id serial primary key, username varchar(140), body varchar(140), room_id integer)"
  end

  def down do
    "DROP TABLE messages"
  end
end
