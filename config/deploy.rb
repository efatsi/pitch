require 'capistrano/ext/multistage'

set :stages, ["staging", "production"]
set :default_stage, "production"

set :keep_releases, 5
set :application, "My Awesome App"
set :repository,  "https://github.com/efatsi/pitch.git"
set :scm, :git
set :branch, :master
set :use_sudo, false

set :normalize_asset_timestamps, false
set :deploy_via, :remote_cache
after "deploy:update", "deploy:cleanup"

after "deploy:update", "deploy:build", "deploy:cleanup"

namespace :assets do
  task :precompile, roles: :web do
    # do nothing
  end
end

def is_application_running?(current_path)
  pid = capture(%Q{ps ax -o pid= -o command=|
      grep "/var/www/pitch/current/rel/pitch/.*/[b]eam"|awk '{print $1}'})
  return pid != ""
end

namespace :deploy do
  task :is_running, roles: :web do
    is_running = is_application_running?(current_path)
    if is_running
      puts "Application is running"
    else
      puts "Application is NOT running"
    end
  end

  task :build, roles: :web do
    run "cd #{current_path} && mix deps.get && npm install && npm run build && MIX_ENV=#{mix_env} mix release"
  end

  task :restart, roles: :web do
    if is_application_running?(current_path)
      run "cd #{current_path}/rel/pitch/bin && ./pitch stop"
    end
    run "cd #{current_path}/rel/pitch/bin && ./pitch start"
  end

  task :start, roles: :web do
    run "cd #{current_path}/rel/pitch/bin && ./pitch start"
  end

  task :migrate, roles: :web do
    if is_application_running?(current_path)
      run "cd #{current_path} && ./rel/pitch/bin/pitch stop && mix ecto.migrate Repo && ./rel/pitch/bin/pitch start"
    else
      run "cd #{current_path} && mix ecto.migrate Repo && ./rel/pitch/bin/pitch start"
    end
  end

  task :stop, roles: :web do
    run "cd #{current_path}/rel/pitch/bin && ./pitch stop"
  end
end
