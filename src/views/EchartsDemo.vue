<template>
  <div id="myChart" :style="{ width: '600px', height: '600px' }"></div>
</template>

<script>
import { getWaters } from '../api/waters'
export default {
  name: "Echarts",
  data() {
    return {
      list:null,
      res:[],
      aWater:[],
      bWater:[],
      aTurbidity:[],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
     
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {},
            dataView: {},
            restore: {},
            dataZoom: {},
            magicType: {
              type: ["bar", "line"],
            },
          },
        },
        legend: {
          data: ["销量", "单价"],
        },
        xAxis: {
          type: "category",
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          // boundaryGap: false,  //紧挨边缘
        },
        yAxis: {
          type: "value",
          // scale: true,  //脱离0值比例
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
          {
            name: "单价",
            type: "bar",
            data: [12, 14, 22, 15, 8, 19],
            smooth: true,
            lineStyle: {
              color: "green",
              type: "dotted",
            },
            areaStyle: {},
          },
        ],
      });
    },
  },
};
</script>
