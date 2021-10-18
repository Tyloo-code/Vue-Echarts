<template>
  <div id="home">
    <el-button @click="toAturbidity">水质</el-button>
    <el-button @click="toBwater">东侧液位</el-button>
    <el-button @click="toAwater">西侧液位</el-button>
    <br/>
    <br/>
    <div class="myTittle">{{ `采集时间: \u3000${myTime}` }}</div>
    <div class="myTittle">{{ `西侧液位: \u3000${aWater} cm`}}</div>
    <div class="myTittle">{{ `东侧液位: \u3000${bWater} cm` }}</div>
    <div class="myTittle">{{ `水质: \u3000${aTurbidity} NTU` }}</div>
    <div class="myTittle">{{ `泵状态: \u3000${aSwich}` }}</div>
    <div class="myTittle">{{ `阀状态: \u3000${bSwich}` }}</div>
  </div>
</template>

<script>
import { getWaters } from "../api/waters";
export default {
  name: "Home",
  data() {
    return {
      list: null,
      res: [],
      aWater: [],
      bWater: [],
      aTurbidity: [],
      myTime: [],
      aSwich: [],
      bSwich: [],
    };
  },
  created() {
    this.getWater();
  },
  methods: {
    getWater() {
      getWaters().then(({ data }) => {
        this.list = data.value;
        this.res = this.list.slice(-1);
        console.log(this.res);
        this.aWater = this.res[0].aWater;
        this.bWater = this.res[0].bWater;
        this.aTurbidity = this.res[0].aTurbidity;
        this.myTime = this.res[0].datetime
          .slice(0, 10)
          .concat(" ".concat(this.res[0].datetime.slice(11, 19)));
        this.aSwich = this.res[0].aSwitch;
        if (this.aSwich === "00") {
          this.aSwich = "回用泵关闭，排污泵关闭~";
        } else if (this.aSwich === "01") {
          this.aSwich = "回用泵关闭，排污泵打开~";
        } else if (this.aSwich === "10") {
          this.aSwich = "回用泵打开，排污泵关闭~";
        } else if (this.aSwich === "11") {
          this.aSwich = "回用泵打开，排污泵打开~";
        }
        this.bSwich = this.res[0].bSwitch;
        if (this.bSwich === "00") {
          this.bSwich = "补水阀关闭";
        } else {
          this.bSwich = "补水阀打开";
        }
      });
    },
    toAturbidity() {
      this.$router.push("/Echarts1");
    },
    toBwater() {
      this.$router.push("/Echarts");
    },
    toAwater() {
      this.$router.push("/Echarts2");
    },
  },
};
</script>


<style>
.myTittle{
  font-size: 24px;
  color:black;
  padding: 10px;
}
</style>
