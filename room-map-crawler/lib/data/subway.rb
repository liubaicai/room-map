# frozen_string_literal: true

# require 'nokogiri'
# require 'open-uri'
# require 'json'

# File.delete('subway_relation.json') if File.file?('subway_relation.json')
# File.delete('subway_sites.json') if File.file?('subway_sites.json')

# sites = []
# lines = []

# doc = Nokogiri::HTML(open('https://map.bjsubway.com/subwaymap/beijing.xml'))
# doc.xpath('//sw//l').each do |line_item|
#   line = {}
#   line[:name] = line_item.xpath('./@lb')
#   line[:sites] = []
#   line_item.xpath('.//p').each do |site_item|
#     site = {}
#     site[:num] = site_item.xpath('./@n').text
#     site[:name] = site_item.xpath('./@lb').text
#     next if site[:name] == ''

#     line[:sites].push site
#     sites.push(site[:name]) unless sites.include?(site[:name])
#   end
#   lines.push(line)
# end

# File.open('subway_relation.json', 'w+') do |f|
#   f.write(JSON.pretty_generate(lines))
# end
# File.open('subway_sites.json', 'w+') do |f|
#   f.write(JSON.pretty_generate(sites))
# end
