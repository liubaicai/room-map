import Sequelize from 'sequelize'
import { Room } from '../../model/db'

const Op = Sequelize.Op

const search = async (req, res, next) => {
  const rooms = await Room.findAll({
    where: {
      position_district: {
        [Op.in]: ['东城', '西城', '朝阳', '海淀', '石景山', '丰台']
      }
    },
    order: [
      ['publish_time', 'DESC'],
      ['id', 'DESC']
    ],
    limit: 10
  })
  res.json(rooms)
}

const count = async (req, res, next) => {
  const total = await Room.count()
  const today = await Room.count({
    where: {
      publish_time: {
        [Op.gte]: new Date().setHours(0, 0, 0, 0)
      }
    }
  })
  const totalGroup = await Room.findAll({
    attributes: [
      'position_district',
      [Room.sequelize.fn('count', Room.sequelize.col('id')), 'count']
    ],
    group: [['position_district']]
  })
  const todayGroup = await Room.findAll({
    where: {
      publish_time: {
        [Op.gte]: new Date().setHours(0, 0, 0, 0)
      }
    },
    attributes: [
      'position_district',
      [Room.sequelize.fn('count', Room.sequelize.col('id')), 'count']
    ],
    group: [['position_district']]
  })
  res.json({
    total: {
      count: total,
      group: totalGroup
    },
    today: {
      count: today,
      group: todayGroup
    }
  })
}

const pricePerSqmPositionDistrict = async (req, res, next) => {
  const rooms = await Room.findAll({
    where: {
      position_district: {
        [Op.in]: ['东城', '西城', '朝阳', '海淀', '石景山', '丰台']
      },
      publish_time: {
        [Op.gt]: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      }
    },
    attributes: [
      'position_district',
      [
        Room.sequelize.fn('AVG', Room.sequelize.col('price_per_sqm')),
        'priceAvg'
      ]
    ],
    group: [['position_district']]
  })
  res.json(rooms)
}

const pricePerSqmAvg = async (req, res, next) => {
  const rooms = await Room.findAll({
    where: {
      position_district: {
        [Op.in]: ['东城', '西城', '朝阳', '海淀', '石景山', '丰台']
      },
      origin: {
        [Op.in]: ['链家']
      }
    },
    attributes: [
      'position_district',
      'publish_time',
      [
        Room.sequelize.fn('AVG', Room.sequelize.col('price_per_sqm')),
        'priceAvg'
      ]
    ],
    group: [['position_district'], ['publish_time']],
    order: [['publish_time', 'ASC']]
  })
  res.json(rooms)
}

export { search, count, pricePerSqmPositionDistrict, pricePerSqmAvg }
