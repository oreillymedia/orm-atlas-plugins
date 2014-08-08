require 'bundler'
Bundler.require

module Proxy

  def self.root
    @root ||= Pathname(File.expand_path("..", __FILE__))
  end

  def self.env
    @env ||= (ENV["RACK_ENV"] || "development")
  end

  class App < Sinatra::Base
    
    set :root, Proxy.root

    configure :development do
      enable :cross_origin
      register Sinatra::Reloader
      set :show_exceptions, :after_handler
    end

    post '/eval' do
      @html_string = params[:html_string]
      @js_libs = params[:js_libs]
      @js_string = params[:js_string]
      erb :eval
    end

  end

end