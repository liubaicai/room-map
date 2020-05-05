# frozen_string_literal: true

class Room < ActiveRecord::Base
end

class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :title
      t.string :origin
      t.string :url
      t.string :code
      t.date :publish_time

      t.float :price
      t.float :price_per_sqm
      t.string :price_type
      t.string :price_rent
      t.string :price_deposit
      t.string :price_service
      t.string :price_agent

      t.string :position_district
      t.string :position_region
      t.string :position_community
      t.decimal :position_longitude, precision: 10, scale: 6
      t.decimal :position_latitude, precision: 10, scale: 6

      t.string :lease_type

      t.string :house_layout
      t.integer :house_area
      t.string :house_face
      t.string :house_floor
      t.string :house_lift
      t.string :house_water
      t.string :house_electric
      t.string :house_gas
      t.string :house_heating

      t.timestamps
    end
    add_index :rooms, :code, unique: true
  end
end

CreateRooms.new.change unless ActiveRecord::Base.connection.table_exists? 'rooms'
