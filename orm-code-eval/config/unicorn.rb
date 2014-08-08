worker_processes ENV["WORKER_PROCESSES"].nil? ? 3 : ENV["WORKER_PROCESSES"].to_i
timeout 15
preload_app true

before_fork do |server, worker|
  $redis.quit if $redis
end

after_fork do |server, worker|
  $redis = Redis.new(:url => ENV['REDIS_URL'])
end