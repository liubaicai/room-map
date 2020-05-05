# frozen_string_literal: true

# just a demo

module Crawler
  class Demo < Crawler::Base
    @name = 'demo_spider'
    @engine = :mechanize # available engines: :mechanize, :poltergeist_phantomjs, :selenium_firefox, :selenium_chrome
    @start_urls = ['https://github.com/search?q=Ruby%20Web%20Scraping', 'https://github.com/search?q=Nodejs%20Web%20Scraping']
    @config = {
      user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
      before_request: { delay: 1..3 }
    }

    def self.run
      threads = []
      @start_urls.each do |url|
        p = Thread.new { parse!(:parse, url: url) }
        threads.push p
      end
      threads.each(&:join)
    end

    def parse(response, url:, data: {})
      response.xpath("//ul[@class='repo-list']//a[@class='v-align-middle']").each do |a|
        request_to :parse_repo_page, url: absolute_url(a[:href], base: url)
      end

      request_to :parse, url: absolute_url(next_page[:href], base: url) if next_page == response.at_xpath("//a[@class='next_page']")
    end

    def parse_repo_page(response, url:, data: {})
      item = {}

      item[:owner] = response.xpath("//h1//a[@rel='author']").text
      item[:repo_name] = response.xpath("//h1/strong[@itemprop='name']/a").text
      item[:repo_url] = url
      item[:description] = response.xpath("//span[@itemprop='about']").text.squish
      item[:tags] = response.xpath("//div[starts-with(@class, 'list-topics-container')]/a").map { |a| a.text.squish }
      item[:watch_count] = response.xpath("//ul[@class='pagehead-actions']/li[contains(., 'Watch')]/a[2]").text.squish
      item[:star_count] = response.xpath("//ul[@class='pagehead-actions']/li[contains(., 'Star')]/a[2]").text.squish
      item[:fork_count] = response.xpath("//ul[@class='pagehead-actions']/li[contains(., 'Fork')]/a[2]").text.squish
      item[:last_commit] = response.xpath("//span[@itemprop='dateModified']/*").text

      # save_to "results.json", item, format: :pretty_json
      puts item[:repo_name]
    end
  end
end
