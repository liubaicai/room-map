import Sequelize from 'sequelize'

const sequelize = new Sequelize('room-map', 'postgres', 'postgres', {
  host: '192.168.2.230',
  dialect: 'postgres'
})

const Model = Sequelize.Model
class Room extends Model {}
Room.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    origin: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    publish_time: {
      type: Sequelize.DATEONLY
    },

    price: {
      type: Sequelize.FLOAT
    },
    price_per_sqm: {
      type: Sequelize.FLOAT
    },
    price_type: {
      type: Sequelize.STRING
    },
    price_rent: {
      type: Sequelize.STRING
    },
    price_deposit: {
      type: Sequelize.STRING
    },
    price_service: {
      type: Sequelize.STRING
    },
    price_agent: {
      type: Sequelize.STRING
    },

    position_district: {
      type: Sequelize.STRING
    },
    position_region: {
      type: Sequelize.STRING
    },
    position_community: {
      type: Sequelize.STRING
    },
    position_longitude: {
      type: Sequelize.DECIMAL
    },
    position_latitude: {
      type: Sequelize.DECIMAL
    },

    lease_type: {
      type: Sequelize.STRING
    },

    house_layout: {
      type: Sequelize.STRING
    },
    house_area: {
      type: Sequelize.INTEGER
    },
    house_face: {
      type: Sequelize.STRING
    },
    house_floor: {
      type: Sequelize.STRING
    },
    house_lift: {
      type: Sequelize.STRING
    },
    house_water: {
      type: Sequelize.STRING
    },
    house_electric: {
      type: Sequelize.STRING
    },
    house_gas: {
      type: Sequelize.STRING
    },
    house_heating: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false,
    sequelize,
    modelName: 'room'
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

export { Room }
