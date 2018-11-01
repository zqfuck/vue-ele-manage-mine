<template>
  <div class="contain">
    <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
export default{
  name: 'VisitorPie',
  data () {
    return {

    }
  },
  props: [
    'pieDatas'
  ],
  mounted () {
    this.myChart = echarts.init(document.getElementById('visitorpie'));
    this.initData();
  },
  computed: {

  },
  watch: {
    pieDatas () {
      this.initData();
    }
  },
  methods: {
    initData () {
      const option = {
        title : {
          text: '用户分布',
          subtext: '分布数据',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京','上海','深圳','杭州','其他城市']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:this.pieDatas.beijing, name:'北京'},
              {value:this.pieDatas.shanghai, name:'上海'},
              {value:this.pieDatas.shenzhen, name:'深圳'},
              {value:this.pieDatas.hangzhou, name:'杭州'},
              {value:this.pieDatas.qita, name:'其他城市'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.myChart.setOption(option);
    }
  }
}
</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
