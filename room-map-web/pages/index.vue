<template>
  <div class="container">
    <div style="width:600px;">
      <a-row>
        <a-col :span="24">
          <a-card title="room-map-web">
            <p>My mathematical Nuxt.js project</p>
            <a-spin />
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-card>
            <a-statistic
              title="房源总计"
              :value="count.total.count"
              :precision="0"
            >
              <template #prefix>
                <a-icon type="bar-chart" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic
              title="今日新增"
              :value="count.today.count"
              :precision="0"
              :value-style="{ color: '#3f8600' }"
            >
              <template #prefix>
                <a-icon type="rise" />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-card>
            <a-list item-layout="horizontal" :data-source="count.total.group">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item.position_district + ': ' + item.count }}
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-list item-layout="horizontal" :data-source="count.today.group">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item.position_district + ': ' + item.count }}
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Logo from '~/components/Logo.vue'

export default {
  components: {},
  async asyncData({ req }) {
    const data = {}
    const p1 = axios
      .get(`${req.protocol}://${req.get('host')}/api/count`)
      .then((result) => {
        data.count = result.data
      })
    await Promise.all([p1])
    return data
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
