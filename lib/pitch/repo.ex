defmodule Repo do
  use Ecto.Repo, adapter: Ecto.Adapters.Postgres

  def conf do
    parse_url "ecto://elixir_pitch:L4yZL2OumjNufJEz@localhost/pitch"
  end

  def priv do
    app_dir(:pitch, "priv/repo")
  end
end
