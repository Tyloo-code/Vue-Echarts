<template>
  <div>
    <el-select
      v-model="seValue"
      placeholder="请选择展示天数"
      @change="selectChanged"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button @click="toHome">返回首页</el-button>
    <div id="myChart" :style="{ width: '1200px', height: '800px' }"></div>
  </div>
</template>

<script>
import { getWaters } from "../api/waters";
export default {
  name: "Echarts",
  data() {
    return {
      list: null,
      res: [],
      aWater: [],
      bWater: [],
      aTurbidity: [],
      myTime: [],
      options: [
        {
          value: 1,
          label: "1天",
        },
        {
          value: 3,
          label: "3天",
        },
        {
          value: 5,
          label: "5天",
        },
        {
          value: 7,
          label: "7天",
        },
        {
          value: 15,
          label: "15天",
        },
      ],
      seValue: 1,
    };
  },
  created() {
    this.selectChanged();
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    selectChanged(value) {
      const rLoading = this.openLoading();
      this.aWater = [];
      this.bWater = [];
      this.aTurbidity = [];
      this.myTime = [];
      getWaters().then(({ data }) => {
        this.list = data.value;
        // let dataLength = this.list.length;
        let dataLength = 100,
          step = 1;
        if (value === 1) {
          dataLength = 100;
          step = 1;
        } else if (value === 3) {
          dataLength = 300;
          step = 3;
        } else if (value === 5) {
          dataLength = 500;
          step = 5;
        } else if (value === 7) {
          dataLength = 700;
          step = 7;
        } else if (value === 15) {
          dataLength = 1500;
          step = 15;
        }

        this.res = this.list.slice(-dataLength);
        for (let i = 0; i < dataLength; i = i + step) {
          this.aWater.push(this.res[i].aWater);
          this.bWater.push(this.res[i].bWater);
          this.aTurbidity.push(this.res[i].aTurbidity);
          this.myTime.push(this.res[i].datetime);
        }
        this.drawLine();
        rLoading.close();
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      const option = {
        title: { text: "东侧液位" },
        tooltip: {
          formatter: "{a} <br/>时间：{b} <br/>液位：{c} (cm)",
        },
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
          data: ["东侧液位"],
        },
        xAxis: {
          type: "category",
          data: this.myTime,
          boundaryGap: false, //紧挨边缘
        },
        yAxis: {
          type: "value",
          scale: true, //脱离0值比例
          axisLabel: {
            formatter:'{value} (cm)'
          },
        },
        series: [
          {
            name: "东侧液位",
            type: "line",
            data: this.bWater,
            markPoint: {
              data: [
                {
                  type: "max",
                },
                {
                  type: "min",
                },
              ],
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name:'平均值'
                },
              ],
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
