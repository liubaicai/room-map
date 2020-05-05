# frozen_string_literal: true

ActiveRecord::Base.establish_connection(
  adapter:  'postgresql',
  host:     ENV.fetch('DBHOST') { '192.168.2.230' },
  username: ENV.fetch('DBUSER') { 'postgres' },
  password: ENV.fetch('DBPASSWORD') { 'postgres' },
  encoding: 'utf8',
  timeout:  50_000,
  pool:     '50',
  database: 'room-map'
)

Dir[File.dirname(__FILE__) + '/*/*.rb'].sort.each { |file| require file }
