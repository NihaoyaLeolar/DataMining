<template>
    <div class="box">
        <h1 class="left-align">Step3: 特征型知识挖掘结果展示</h1>
        <mining-record-card class="record"></mining-record-card>
        <span>
            根据以上挖掘计划，挖掘特征型知识结果如下。可以选择相应数据，进一步生成四元组知识。
        </span>
        <mining-result-card class="result" :fields="fields" @toGetKnowledge="handleChildEvent"></mining-result-card>
    </div>
</template>

<script>
import MiningRecordCard from "../../components/MiningRecordCard.vue";
import MiningResultCard from "../../components/MiningResultCard.vue";
import { styleMiningResultType } from "@/options.js"; // 导入选项数据

export default {
    components: {
        MiningRecordCard,
        MiningResultCard,
    },
    computed: {
        //用于填写miningResultCard的数据
        fields() {
            const fieldsArray = [];
            for (let i = 0; i < styleMiningResultType.length; i++) {
                const typeObj = styleMiningResultType[i];
                const field = {
                    name: typeObj.name,
                    value: this.$store.state.miningResult[typeObj.type] || null, // 使用默认值保证数据加载后再访问
                    selected: false,
                };
                fieldsArray.push(field);
            }
            return fieldsArray;
        },
        selectedTypes() {
            var selectedNames = this.$store.state.selectedNames;
            var selectedTypes = styleMiningResultType
                .filter((item) => selectedNames.includes(item.name))
                .map((item) => item.type);
            return selectedTypes;
        },
    },
    methods: {
        //用户已经在resultCard(子组件)选择了type并提交，这里需要根据选择去生成知识
        handleChildEvent() {
            console.log(this.selectedTypes);
            var params = {
                mining_id: this.$store.state.miningRecord["miningId"],
                type_list: this.selectedTypes,
            };
            this.$http
                .post("/mining/style/generate/knowledge", params)
                .then((response) => {
                    // 处理成功响应的数据
                    console.log("知识生成完毕，获得知识：", response.data);
                    this.$store.commit("updateKnowledgeList", response.data);
                    //下一步
                    this.$store.commit("incrementMiningStep");
                    this.$router.push("/mining/step4");
                })
                .catch((error) => {
                    // 处理请求错误
                    console.error("Error sending GET request:", error);
                });
        },
    },
};
</script>

 <style scoped>
.box {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.record {
    width: 100%;
}

.result {
    width: 100%;
}

.left-align {
    text-align: left; /* 左对齐样式 */
}
</style>


