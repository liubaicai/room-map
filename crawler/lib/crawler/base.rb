# frozen_string_literal: true

require 'net/http'

module Crawler
  class Base < Kimurai::Base
    def self.run(multi = false)
      if multi
        threads = []
        @start_urls.each do |url|
          p = Thread.new { parse!(:parse, url: url) }
          threads.push p
        end
        threads.each(&:join)
      else
        crawl!
      end
    end

    def save_room(item)
      # puts JSON.pretty_generate(item)
      # exit!

      protocol = ENV['SERVER_PROTOCOL'] || 'http'
      host = ENV['SERVER_HOST'] || 'localhost'
      port = ENV['SERVER_PORT'] || 3000
      api = ENV['SERVER_API'] || '/rooms'
      
      uri = URI("#{protocol}://#{host}:#{port}#{api}")
      req = Net::HTTP::Post.new(uri)
      req.set_form_data(item)

      Net::HTTP.start(uri.hostname, uri.port) do |http|
        http.request(req)
      end
      logger.info "> #{item[:title]}"
    rescue StandardError => e
      logger.error e
    end
  end
end
