# frozen_string_literal: true

module Crawler
  class Base < Kimurai::Base
    def self.mutex
      @mutex ||= Mutex.new
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

      self.class.mutex.synchronize do
        begin
          old = Room.find_by(code: item[:code])
          if Room.find_by(code: item[:code])
            old.update!(item)
          else
            Room.create!(item)
          end
          logger.info "> #{item[:title]}"
        rescue StandardError => e
          logger.error e
        end
      end
    end
  end
end
