<template>
    <div ref="radarChart" style="width: 100%; height: 500px;"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
    props: {
        radarData: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            option: {
                radar: [
                    {
                        indicator: this.radarData.map((item) => ({
                            text: item.dim_name,
                        })),
                        center: ["50%", "50%"],
                        radius: 150,
                    },
                ],
                series: [
                    {
                        type: "radar",

                        //这个组件设定的就是2个数据条目
                        data: [
                            {
                                value: this.radarData.map(
                                    (item) => item.stu_score
                                ),
                                name: "student",
                                label: {
                                    show: true, //显示数值
                                    fontSize: 12, // 字体大小
                                    color: "#aaa", // 字体颜色
                                    position: "top", // 标签位置，可以是 top、bottom、inside等
                                    formatter: function (params) {
                                        return params.value.toFixed(1); // 保留一位小数
                                    },
                                },
                                lineStyle: {
                                    color: "#4caf50", // 设置线条颜色
                                },
                                itemStyle: {
                                    color: "#4caf50", // 设置标记点颜色
                                },
                            },
                            {
                                value: this.radarData.map(
                                    (item) => item.class_score
                                ),
                                name: "class",
                            },
                        ],
                    },
                ],
            },
        };
    },
    mounted() {
        console.log("Radar Data:", this.radarData); // 用于检查
        this.renderChart();
    },
    // watch 钩子是 Vue 组件中用于监听属性变化并执行相应逻辑的钩子函数之一
    // 这里通过定义了一个 watch 钩子来监听 radarData 属性的变化
    watch: {
        radarData: {
            // 当 radarData 属性发生变化时，watch 钩子中的 handler 函数就会被调用。这个函数接收一个参数 newVal，表示属性变化后的新值。
            handler(newVal) {
                this.option.radar[0].indicator = newVal.map((item) => ({
                    text: item.dim_name,
                }));
                this.option.series[0].data = [
                    {
                        value: newVal.map((item) => item.stu_score),
                        name: "student",
                        label: {
                            show: true, //显示数值
                            fontSize: 12, // 字体大小
                            color: "#aaa", // 字体颜色
                            position: "top", // 标签位置，可以是 top、bottom、inside等
                            formatter: function (params) {
                                return params.value.toFixed(1); // 保留一位小数
                            },
                        },
                        lineStyle: {
                            color: "#4caf50", // 设置线条颜色
                        },
                        itemStyle: {
                            color: "#4caf50", // 设置标记点颜色
                        },
                    },
                    {
                        value: newVal.map((item) => item.class_score),
                        name: "class",
                    },
                ];
                //渲染图表
                this.renderChart();
            },
            deep: true,
        },
    },
    methods: {
        renderChart() {
            const chart = echarts.init(this.$refs.radarChart);
            chart.setOption(this.option);
        },
    },
};
</script>


<!-- 以下是组件使用方式 -->
<!-- <template>
  <div>
    <radar-chart :radarData="dataSet" />
  </div>
</template>

<script>
import RadarChart from '../components/RadarChart.vue';

export default {
  components: {
    RadarChart,
  },
  data() {
    return {
      dataSet: [
        { dim_name: '身体健康', stu_score: 60, class_score: 100 },
        { dim_name: '心理健康', stu_score: 60, class_score: 100 },
        { dim_name: '思维能力', stu_score: 60, class_score: 100 },
        { dim_name: '学习成绩', stu_score: 60, class_score: 100 },
      ],
    };
  },
};
</script> -->
  