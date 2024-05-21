<!--这里是学生画像的默认首页-->
<template>
    <div class="container">
        <div v-if="!profileData">
            <p class="label">请在左侧填写学生ID，再进行学生画像</p>
        </div>
        <div v-else>
            <radar-chart :radarData="dataSet" />
            <p>10项指标介绍，以及点击进入</p>
        </div>
    </div>
</template>

<script>
import MiningClassLayout from "../../components/layout/MiningClassLayout.vue";
import RadarChart from "../../components/RadarChart.vue";

import { concepts } from "@/options.js"; // 导入选项数据

export default {
    components: {
        MiningClassLayout,
        RadarChart,
    },
    computed: {
        profileData() {
            return this.$store.state.profileData;
        },
        dataSet() {
            const set = [];
            for (let i = 1; i < concepts[1].length; i++) {
                let concept = concepts[1][i];
                set.push({
                    dim_name: concept.label,
                    stu_score: this.profileData[concept.value],
                    class_score: 100,
                });
            }
            return set;
        },
    },
    data() {
        return {
            // dataSet: [
            //     { dim_name: "身体健康", stu_score: 60, class_score: 100 },
            //     { dim_name: "心理健康", stu_score: 60, class_score: 100 },
            //     { dim_name: "思维能力", stu_score: 13.1, class_score: 100 },
            //     { dim_name: "学习成绩", stu_score: 60, class_score: 100 },
            // ],
        };
    },
};
</script>

<style scoped>
.label {
    font-size: 28px;
    color: #4a9c4e;
    font-weight: 800;
    margin-bottom: 10px;
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>