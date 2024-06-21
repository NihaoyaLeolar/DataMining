<template>
    <div class="container">
        <h1>终点事件追踪结果</h1>
        <div class="nihaoya">
            <div class="body">
                <mining-record-card class="record"></mining-record-card>
                <div class="cardx">
                    <span class="label">概念因子:</span>
                    <pre class="value">{{ this.getResult() }}</pre>
                </div>
            </div>
            <button class="myButton" @click="store">保存结果</button>
        </div>

    </div>
</template>

<script>
import MiningRecordCard from "../../components/MiningRecordCard.vue";
import MiningResultCard from "../../components/MiningResultCard.vue";

export default {
    components: {
        MiningRecordCard,
        MiningResultCard,
    },
    computed: {
        //用于填写miningResultCard的数据
    },
    methods: {
        store() {
            var params = {
                mining_id: this.$store.state.miningRecord["miningId"],
            };
            this.$http
                .post("/factor/store", params)
                .then(() => {
                    //下一步
                    this.$router.push("/krepo");
                })
                .catch((error) => {
                    // 处理请求错误
                    console.error("Error sending GET request:", error);
                });
        },
        getResult() {
            return this.$store.state.miningResult.factorConceptList.join("\n");
        },
    },
};
</script>

 <style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 700px;
    margin: 50px;
    border-radius: 1em;
    background: #e6fee6; /* 设置中间白色背景 */
    box-shadow: 0 0 10px rgba(10, 80, 49, 0.2); /* 添加阴影效果 */
    border: 0.15em solid transparent; /* 初始状态下透明的边框 */
    transition: border 0.3s ease, border-radius 0.5s ease; /* 添加过渡效果 */
}

.body {
    display: flex;
    flex-direction: row;
}

.nihaoya {
    display: flex;
    flex-direction: column;
    align-items: end;
}

.record {
    flex: 1;
    margin: 20px;
}

.cardx {
    flex: 1;
    max-width: 320px;
    margin-left: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
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
    color: #101010;
    font-size: larger;
    font-weight: 900;
    border: 1px solid #ddd;
    text-align: left; /* 左对齐 */
    transition: background-color 0.3s ease, font-weight 0.3s ease; /* 添加过渡效果 */
}

.myButton {
    margin: 0 10px;
    margin-bottom: 30px;
    padding: 8px 28px; /* 调整按钮内边距 */
    background-color: #4caf50; /* 按钮背景颜色 */
    color: #fff; /* 文字颜色 */
    font-weight: 500;
    font-size: medium;
    border: none; /* 去掉按钮边框 */
    border-radius: 5px; /* 圆角边框 */
    cursor: pointer; /* 鼠标指针样式为手型 */
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
}

/* 鼠标悬停时的样式 */
.myButton:hover {
    background-color: #45a049; /* 鼠标悬停时的背景颜色 */
}

/* 激活状态（按钮被点击时）的样式 */
.myButton:active {
    background-color: #357a38; /* 激活状态的背景颜色 */
}

/* 禁用状态的样式 */
.myButton:disabled {
    background-color: #ccc; /* 禁用状态的背景颜色 */
    color: #666; /* 禁用状态的文字颜色 */
    cursor: not-allowed; /* 禁用状态下的鼠标指针 */
}
</style>


