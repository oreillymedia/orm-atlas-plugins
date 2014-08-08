require 'rack/test'

ENV['RACK_ENV'] = "test"

require File.expand_path("app")

module RSpecMixin
  include Rack::Test::Methods
  def app() Proxy::App end
end

RSpec.configure do |config|
  config.include RSpecMixin
  config.color = true
end