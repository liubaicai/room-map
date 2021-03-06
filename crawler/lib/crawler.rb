# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)
require 'bundler/setup'
Bundler.require(:default)
require 'date'
require 'net/http'

Dotenv.load

require File.expand_path('crawler/base.rb', __dir__)
Dir[File.dirname(__FILE__) + '/*/*.rb'].sort.each { |file| require file }

Kimurai.configure do |config|
  # Default logger has colored mode in development.
  # If you would like to disable it, set `colorize_logger` to false.
  config.colorize_logger = true

  # Logger level for default logger:
  # config.log_level = :info
  config.log_level = :warn

  # Custom logger:
  # config.logger = Logger.new(STDOUT)

  # Custom time zone (for logs):
  config.time_zone = "UTC"
  config.time_zone = "Asia/China"

  # Provide custom chrome binary path (default is any available chrome/chromium in the PATH):
  # config.selenium_chrome_path = "/usr/bin/chromium-browser"
  # Provide custom selenium chromedriver path (default is "/usr/local/bin/chromedriver"):
  # config.chromedriver_path = "~/.local/bin/chromedriver"
end

module Kimurai
  module BaseHelper
    private

    def absolute_url(url, base:)
      return unless url
      URI.join(base, url).to_s
    end

    def escape_url(url)
      uri = URI.parse(url)
    rescue URI::InvalidURIError => e
      URI.parse(CGI.escape url).to_s rescue url
    else
      url
    end
  end
end


module Crawler
  class Error < StandardError; end
end
