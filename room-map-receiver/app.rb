# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('./Gemfile', __dir__)
require 'bundler/setup'
Bundler.require(:default)

Dir[File.dirname(__FILE__) + '/db/*.rb'].sort.each { |file| require file }

SLEEP_SECONDS = ENV.fetch('SLEEP_SECONDS') {1}.to_f

class Application < Sinatra::Base
  get '/' do
    'Hello World!'
  end
  post '/room' do
    item = request.params
    old = Room.find_by(code: item['code'])
    if Room.find_by(code: item['code'])
      old.update!(item)
    else
      Room.create!(item)
    end
    'ok'
  end
end
