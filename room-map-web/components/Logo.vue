<template>
  <div>
    <div id="gchart"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { Chart } from '@antv/g2'

export default {
  components: {},
  mounted() {
    this.loadChart()
  },
  methods: {
    async loadChart() {
      const url = '/api/pricePerSqmAvg'
      const pricePerSqmAvg = await axios.get(url)
      const data = pricePerSqmAvg.data.map((m) => {
        return {
          ...m,
          priceAvg: parseFloat(m.priceAvg.toFixed(2))
        }
      })
      const chart = new Chart({
        container: 'gchart',
        width: 900,
        height: 600
      })
      chart.data(data)
      chart.scale({
        priceAvg: {
          nice: true
        }
      })

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      })

      chart.axis('priceAvg', {
        label: {
          formatter: (val) => {
            return val
          }
        }
      })

      chart
        .line()
        .position('publish_time*priceAvg')
        .color('position_district')
        .shape('smooth')

      chart
        .point()
        .position('publish_time*priceAvg')
        .color('position_district')
        .shape('circle')

      chart.render()
    }
  }
}
</script>
