defmodule Repo do
  use Ecto.Repo, adapter: Ecto.Adapters.Postgres

  def conf do
    parse_url "ecto://efatsi:postgres@localhost/pitch"
  end

  def priv do
    app_dir(:pitch, "priv/repo")
  end
end
