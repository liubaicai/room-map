# frozen_string_literal: true

module Crawler
  class Beike < Crawler::Base
    @name = 'BK_spider'
    @engine = :mechanize # available engines: :mechanize, :poltergeist_phantomjs, :selenium_firefox, :selenium_chrome
    @start_urls = [
      'https://bj.zu.ke.com/zufang/dongcheng/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/xicheng/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/chaoyang/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/haidian/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/fengtai/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/shijingshan/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/tongzhou/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/changping/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/daxing/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/yizhuangkaifaqu/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/shunyi/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/fangshan/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/mentougou/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/pinggu/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/huairou/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/miyun/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/yanqing/rco11rt200600000001',
      'https://bj.zu.ke.com/zufang/dongcheng/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/xicheng/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/chaoyang/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/haidian/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/fengtai/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/shijingshan/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/tongzhou/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/changping/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/daxing/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/yizhuangkaifaqu/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/shunyi/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/fangshan/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/mentougou/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/pinggu/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/huairou/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/miyun/rco11rt200600000002',
      'https://bj.zu.ke.com/zufang/yanqing/rco11rt200600000002'
    ]
    @config = {
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      before_request: { delay: 1..5 },
      retry_request_errors: [
        { error: Net::HTTP::Persistent::Error },
        { error: Net::OpenTimeout },
        { error: Errno::EHOSTUNREACH },
        { error: SocketError },
        { error: StandardError }
      ],
      skip_request_errors: [
        { error: RuntimeError, message: '520', skip_on_failure: true },
        { error: Net::HTTPNotFound, message: '404 => Net::HTTPNotFound' },
        { error: RuntimeError, message: '404 => Net::HTTPNotFound', skip_on_failure: true }
      ]
    }

    def parse(response, url:, data: {})
      is_continue = true

      response.xpath("//div[@class='content__list']/div[@class='content__list--item']").each do |div|
        origin = div.xpath(".//p[@class='content__list--item--brand oneline']/span[@class='brand']").text.squish
        if %w[链家 自如].include? origin
          # code = "BK-#{div['data-house_code']}"
          link = div.xpath(".//p[@class='content__list--item--title']/a[@class='twoline']/@href").text
          is_continue = request_to :parse_detail_page, url: absolute_url(link, base: url), data: { origin: origin }
        end
        break unless is_continue
      end

      GC.start
      return unless is_continue

      current = response.xpath("//div[@class='content__pg']/@data-curpage").text.to_i
      total = response.xpath("//div[@class='content__pg']/@data-totalpage").text.to_i
      return unless current < total

      next_url = response.xpath("//div[@class='content__pg']/@data-url").to_s.gsub(/{page}/, (current + 1).to_s)
      request_to :parse, url: absolute_url(next_url, base: url)
    end

    def parse_detail_page(response, url:, data: {})
      item = {}

      begin
        item[:title] = response.xpath("//p[@class='content__title']").text.squish
        item[:origin] = data[:origin]
        item[:url] = url
        item[:code] = "BK-#{response.xpath("//i[@class='house_code' and contains(., '房源编号：')]")[0].text.squish.split('：')[1]}"
        item[:publish_time] = response.xpath("//div[@class='content__subtitle']/text()").text.squish.split('：')[1]

        item[:tags] = response.xpath("//p[@class='content__aside--tags']//i").map { |i| i.text.squish }

        # return false unless Date.parse(item[:publish_time]) > Date.today - 10

        item[:price] = response.xpath("//div[@class='content__aside--title']/span[1]").text.squish
        item[:price_type] = response.xpath("//div[@class='cost_content']//div[@class='table_content']//ul[@class='table_row']").map { |ul| ul.xpath('.//li[1]').text.squish }
        item[:price_rent] = response.xpath("//div[@class='cost_content']//div[@class='table_content']//ul[@class='table_row']").map { |ul| ul.xpath('.//li[2]').text.squish }
        item[:price_deposit] = response.xpath("//div[@class='cost_content']//div[@class='table_content']//ul[@class='table_row']").map { |ul| ul.xpath('.//li[3]').text.squish }
        item[:price_service] = response.xpath("//div[@class='cost_content']//div[@class='table_content']//ul[@class='table_row']").map { |ul| ul.xpath('.//li[4]').text.squish }
        item[:price_agent] = response.xpath("//div[@class='cost_content']//div[@class='table_content']//ul[@class='table_row']").map { |ul| ul.xpath('.//li[5]').text.squish }

        item[:position_district] = response.xpath("//div[@class='bread__nav w1150 bread__nav--bottom']//a")[1].text.squish.gsub(/租房/, '')
        item[:position_region] = response.xpath("//div[@class='bread__nav w1150 bread__nav--bottom']//a")[2].text.squish.gsub(/租房/, '')
        item[:position_community] = response.xpath("//div[@class='bread__nav w1150 bread__nav--bottom']//a")[3].text.squish.gsub(/租房/, '')
        item[:position_longitude] = response.xpath("//script[contains(., 'g_conf.coord')]").text.match(/longitude: '.*'/)[0].split("'")[1]
        item[:position_latitude] = response.xpath("//script[contains(., 'g_conf.coord')]").text.match(/latitude: '.*'/)[0].split("'")[1]

        item[:lease_type] = response.xpath("//ul[@class='content__aside__list']//li/text()")[0].text.squish

        item[:house_layout] = response.xpath("//ul[@class='content__aside__list']//li/text()")[1].text.squish.split(' ')[0]
        item[:house_area] = response.xpath("//div[@class='content__article__info']//li[contains(., '面积：')]")[0].text.squish.split('：')[1].gsub(/㎡/, '')
        item[:house_face] = response.xpath("//div[@class='content__article__info']//li[contains(., '朝向：')]")[0].text.squish.split('：')[1]
        item[:house_floor] = response.xpath("//div[@class='content__article__info']//li[contains(., '楼层：')]")[0].text.squish.split('：')[1]
        item[:house_lift] = response.xpath("//div[@class='content__article__info']//li[contains(., '电梯：')]")[0].text.squish.split('：')[1]
        item[:house_water] = response.xpath("//div[@class='content__article__info']//li[contains(., '用水：')]")[0].text.squish.split('：')[1]
        item[:house_electric] = response.xpath("//div[@class='content__article__info']//li[contains(., '用电：')]")[0].text.squish.split('：')[1]
        item[:house_gas] = response.xpath("//div[@class='content__article__info']//li[contains(., '燃气：')]")[0].text.squish.split('：')[1]
        item[:house_heating] = response.xpath("//div[@class='content__article__info']//li[contains(., '采暖：')]")[0].text.squish.split('：')[1]

        item[:price_per_sqm] = (item[:price].to_f / item[:house_area].to_f).round(2) if item[:price] && item[:house_area]

        save_room(item)
      rescue StandardError => e
        logger.error e
      end

      true
    end
  end
end
