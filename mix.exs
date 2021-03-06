defmodule Pitch.Mixfile do
  use Mix.Project

  def project do
    [app: :pitch,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: ["lib", "web"],
     compilers: [:phoenix] ++ Mix.compilers,
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [mod: {Pitch, []},
     applications: [
      :phoenix,
      :cowboy,
      :logger,
      :conform,
      :decimal,
      :ecto,
      :exrm,
      :poolboy,
      :postgrex,
      :json
      ]
    ]
  end

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [
      {:phoenix, github: "phoenixframework/phoenix"},
      {:cowboy,   "~> 1.0"     },
      {:postgrex, "~> 0.6.0"   },
      {:ecto,     "~> 0.2.5"   },
      {:json,     "~> 0.3.0"   },
      {:exrm,     "~> 0.14.11" }
    ]
  end
end
