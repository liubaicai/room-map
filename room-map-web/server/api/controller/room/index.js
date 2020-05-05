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

const pricePerSqmPositionDistrict = async (req, res, next) => {
  const rooms = await Room.findAll({
    where: {
      position_district: {
        [Op.in]: ['东城', '西城', '朝阳', '海淀', '石景山', '丰台'],
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

export { search, pricePerSqmPositionDistrict, pricePerSqmAvg }
