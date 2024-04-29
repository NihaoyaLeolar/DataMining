<template>
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
        { dim_name: '思维能力', stu_score: 30, class_score: 99 },
        { dim_name: '学习成绩', stu_score: 60, class_score: 100 },
      ],
    };
  },
};
</script>
