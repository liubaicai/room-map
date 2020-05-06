# frozen_string_literal: true
require 'net/http'

module Crawler
  class Base < Kimurai::Base
    
    @config = {
      user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
    }

    def request(url)
      retry_count = 0
      begin
        sleep 1
        uri = URI(url)
        req = Net::HTTP::Get.new(uri)
        req['User-Agent'] = @config.user_agent
        res = req.get_response(uri)
        res.body
      rescue StandardError => e
        retry_count = retry_count + 1
        retry if retry_count <= 10
        logger.error e
      end
    end

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

      begin
        uri = URI('http://192.168.2.230:9014/room')
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
end
