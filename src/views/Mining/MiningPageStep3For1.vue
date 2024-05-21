<template>
    <div class="box">
        <h1 class="left-align">Step3: 特征型知识挖掘结果展示</h1>
        <mining-record-card class="record"></mining-record-card>
        <span>
            根据以上挖掘计划，挖掘特征型知识结果如下。可以选择相应数据，进一步生成四元组知识。
        </span>
        <mining-result-card class="result" :fields="fields"></mining-result-card>        
    </div>
    
</template>

<script>
import MiningRecordCard from "../../components/MiningRecordCard.vue";
import MiningResultCard from "../../components/MiningResultCard.vue";
import { styleMiningResultType } from "@/options.js"; // 导入选项数据


export default {
    components: { 
        MiningRecordCard,
        MiningResultCard
    },
    computed: {
        result() {
            return this.$store.state.miningResult;
        },
        //field逻辑理清楚，下一步生成四元组知识，需要通过selected直接获取是否被选择，看怎么拿到！用户打勾的，下次研究!
        fields() {
            const fieldsArray = [];
            for(let i = 0; i < styleMiningResultType.length; i++) {
                const typeObj = styleMiningResultType[i];
                const field = {
                    name: typeObj.name,
                    value: this.result[typeObj.type],
                    selected: false
                };
                fieldsArray.push(field);
            }
            return fieldsArray;
        }
    },
}
</script>

<style scoped>
.box {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.record {
    width: 100%;
    height: 35%;
}

.result {
    width: 100%;
    height: 65%;
}


.left-align {
  text-align: left; /* 左对齐样式 */
}

</style>


