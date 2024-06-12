<template>
    <div class="card">
        <div class="card-item">
            <span class="label">挖掘类型：</span>
            <span class="value">{{ getTypeName(record.miningType) }}</span>
        </div>
        <div class="card-item">
            <span class="label">挖掘时间：</span>
            <span class="value">{{ record.miningTime }}</span>
        </div>
        <div class="card-item">
            <span class="label">挖掘计划：</span>
            <span class="value">{{ record.miningPlan }}</span>
        </div>
    </div>
</template>
  
  <script>
import { miningType } from "@/options.js"; // 导入选项数据

export default {
    computed: {
        record() {
            return this.$store.state.miningRecord;
        },
    },
    methods: {
        getTypeName(type) {
            const typeObj = miningType.find((item) => item.type === type);
            return typeObj ? typeObj.name : "未知类型";
        },
    },
};
</script>
  
  <style scoped>
.card {
    width: 100%;
    max-width: 720px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.card-item {
    margin-bottom: 25px;
}

.label {
    display: block;
    font-weight: bolder;
    font-size: larger;
    color: #4caf50;
    margin-bottom: 8px;
    text-align: left; /* 左对齐 */
}

.value {
    display: block;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    color: #0e0d0d;
    font-size: medium;
    border: 1px solid #ddd;
    text-align: left; /* 左对齐 */
    transition: background-color 0.3s ease, font-weight 0.3s ease; /* 添加过渡效果 */
}

.value:hover {
    background-color: #f0f0f0; /* 悬浮时改变背景颜色 */
    font-weight: bold; /* 悬浮时加粗文字 */
}
</style>
  