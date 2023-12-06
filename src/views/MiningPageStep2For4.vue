<template>
    <!--不知道为什么class4的页面左右就是填不满！这样才可以，123也没设置啊...-->
    <div class="aiya">
        <div>
            <mining-step-2-head-layout>
                <form-input-layout>
                    <template v-slot:img><img src="@/assets/gainian.png"></template>
                    <template v-slot:span>概念</template>
                    <template v-slot:selectedForm>
                        <label v-if="selectedConcept !== null">{{ selectedConcept.label }}</label>
                        <button v-if="selectedConcept !== null" @click="showDialog" class="conceptButton">更换选择</button>
                        <button v-if="selectedConcept === null" @click="showDialog" class="conceptButton">选择</button>
                        <my-dialog :dialogID="'Dialog4'" @conceptSelectedDialog4="handleConceptSelectionDialog4" ref="MyDialog"></my-dialog>
                    </template>
                    <template v-slot:tips>知识概念由知识类别与定位决定，通常与数据维度是一对多的关系。这里提供两种知识概念选择方式：简单选择，提供100维度的简单概念，这将对应到一个数据维度；复杂选择，从知识库选取对应的概念，这将对应到多个数据维度</template>
                </form-input-layout>
                <div class="select">
                    <div class="left-select">
                        <h3>比较组1</h3>
                        <form-input-layout-2>
                            <template v-slot:img><img src="@/assets/crowd.png"></template>
                            <template v-slot:span>人群</template>
                            <template v-slot:selectedForm>
                                划分1:
                                <select v-model="selectedGroupByRegionA">
                                    <option v-for="group in groupsByRegion" :value="{ value: group.value, label: group.label }" :key="group.value">{{ group.label }}</option>
                                </select>
                                划分2:
                                <select v-model="selectedGroupByUrbanOrRuralA">
                                    <option v-for="group in groupsByUrbanOrRural" :value="{ value: group.value, label: group.label }" :key="group.value">{{ group.label }}</option>
                                </select>
                            </template>
                        </form-input-layout-2>

                        <form-input-layout-2>
                            <template v-slot:img><img src="@/assets/time.png"></template>
                            <template v-slot:span>时间阶段</template>
                            <template v-slot:selectedForm>
                                从
                                <select v-model="selectedTimeA1">
                                    <option v-for="time in times" :value="{ value: time.value, label: time.label }" :key="time.value">{{ time.label }}</option>
                                </select>
                                到
                                <select v-model="selectedTimeA2">
                                    <option v-for="time in times" :value="{ value: time.value, label: time.label }" :key="time.value">{{ time.label }}</option>
                                </select>
                            </template>
                        </form-input-layout-2>
                    </div>

                    <div class="right-select">
                        <h3>比较组2</h3>
                        <form-input-layout-2>
                            <template v-slot:img><img src="@/assets/crowd.png"></template>
                            <template v-slot:span>人群</template>
                            <template v-slot:selectedForm>
                                划分1:
                                <select v-model="selectedGroupByRegionB">
                                    <option v-for="group in groupsByRegion" :value="{ value: group.value, label: group.label }" :key="group.value">{{ group.label }}</option>
                                </select>
                                划分2:
                                <select v-model="selectedGroupByUrbanOrRuralB">
                                    <option v-for="group in groupsByUrbanOrRural" :value="{ value: group.value, label: group.label }" :key="group.value">{{ group.label }}</option>
                                </select>
                            </template>
                        </form-input-layout-2>

                        <form-input-layout-2>
                            <template v-slot:img><img src="@/assets/time.png"></template>
                            <template v-slot:span>时间阶段</template>
                            <template v-slot:selectedForm>
                                从
                                <select v-model="selectedTimeB1">
                                    <option v-for="time in times" :value="{ value: time.value, label: time.label }" :key="time.value">{{ time.label }}</option>
                                </select>
                                到
                                <select v-model="selectedTimeB2">
                                    <option v-for="time in times" :value="{ value: time.value, label: time.label }" :key="time.value">{{ time.label }}</option>
                                </select>
                            </template>
                        </form-input-layout-2>
                    </div>
                </div>
            </mining-step-2-head-layout>
        </div>
        <div>
            <mining-step-2-tail-layout>
                <template v-slot:button>
                    <button @click="generate">生成挖<br>掘计划</button>
                </template>
                <template v-slot:nextbutton>
                    <button>开始<br>挖掘</button>
                </template>
            </mining-step-2-tail-layout>
        </div>
    </div>

</template>

<script>
import MiningStep2HeadLayout from "../components/MiningStep2HeadLayout.vue";
import MiningStep2TailLayout from "@/components/MiningStep2TailLayout.vue";
import FormTipLayout from "../components/FormTipLayout.vue";
import FormInputLayout from "@/components/FormInputLayout.vue";
import FormInputLayout2 from "../components/FormInputLayout2.vue";
import MyDialog from "../components/MyDialog.vue";

import {
    concepts,
    times,
    groupsByRegion,
    groupsByUrbanOrRural,
} from "@/options.js"; // 导入选项数据

export default {
    components: {
        MiningStep2HeadLayout,
        MiningStep2TailLayout,
        FormTipLayout,
        FormInputLayout,
        FormInputLayout2,
        MyDialog,
    },
    data() {
        return {
            selectedConcept: null,
            selectedTimeA1: "",
            selectedTimeA2: "",
            selectedGroupByRegionA: "",
            selectedGroupByUrbanOrRuralA: "",
            selectedTimeB1: "",
            selectedTimeB2: "",
            selectedGroupByRegionB: "",
            selectedGroupByUrbanOrRuralB: "",
        };
    },
    computed: {
        // 将导入的选项数据赋值给组件的计算属性
        concepts() {
            return concepts;
        },
        times() {
            return times;
        },
        groupsByRegion() {
            return groupsByRegion;
        },
        groupsByUrbanOrRural() {
            return groupsByUrbanOrRural;
        },
        isFormValid() {
            // 检查所有下拉表单是否都已选择
            return (
                this.selectedConcept &&
                this.selectedTimeA1 &&
                this.selectedTimeA2 &&
                this.selectedGroupByRegionA &&
                this.selectedGroupByUrbanOrRuralA &&
                this.selectedTimeB1 &&
                this.selectedTimeB2 &&
                this.selectedGroupByRegionB &&
                this.selectedGroupByUrbanOrRuralB
            );
        },
    },
    methods: {
        generate() {
            if (!this.isFormValid) {
                alert("请将表单填写完整，再生成挖掘计划！");
            } else if (
                this.selectedTimeA1.value > this.selectedTimeA2.value ||
                this.selectedTimeB1.value > this.selectedTimeB2.value
            ) {
                alert("请重新选择时间阶段！起始年级不能大于终止年级！");
            } else {
                const taskDescription = this.getTaskDescription();
                this.$store.commit("setMiningTaskDescription", taskDescription);
            }
        },
        // 针对{xx}{xx}的在xx年级到xx年级的学生，与{xx}{xx}的在xx年级到xx年级的学生，挖掘xx维度的xx类型知识
        getTaskDescription() {
            var description1;
            if (
                this.selectedGroupByRegionA.value == "AllRegion" &&
                this.selectedGroupByUrbanOrRuralA.value == "AllUrbanOrRural"
            )
                description1 = "针对所有的";
            else if (this.selectedGroupByRegionA.value == "AllRegion")
                description1 = `针对${this.selectedGroupByUrbanOrRuralA.label}学校的`;
            else if (
                this.selectedGroupByUrbanOrRuralA.value == "AllUrbanOrRural"
            )
                description1 = `针对${this.selectedGroupByRegionA.label}的`;
            else
                description1 = `针对${this.selectedGroupByRegionA.label}${this.selectedGroupByUrbanOrRuralA.label}的`;

            const description2 =
                this.selectedTimeA1.value === this.selectedTimeA2.value
                    ? `${this.selectedTimeA1.label}的学生`
                    : `${this.selectedTimeA1.label}到${this.selectedTimeA2.label}的学生`;

            var description3;
            if (
                this.selectedGroupByRegionB.value == "AllRegion" &&
                this.selectedGroupByUrbanOrRuralB.value == "AllUrbanOrRural"
            )
                description3 = "与所有的";
            else if (this.selectedGroupByRegionB.value == "AllRegion")
                description3 = `与${this.selectedGroupByUrbanOrRuralB.label}学校的`;
            else if (
                this.selectedGroupByUrbanOrRuralB.value == "AllUrbanOrRural"
            )
                description3 = `与${this.selectedGroupByRegionB.label}的`;
            else
                description3 = `与${this.selectedGroupByRegionB.label}${this.selectedGroupByUrbanOrRuralA.label}的`;

            const description4 =
                this.selectedTimeB1.value === this.selectedTimeB2.value
                    ? `${this.selectedTimeB1.label}的学生`
                    : `${this.selectedTimeB1.label}到${this.selectedTimeA2.label}的学生`;

            var description5 = `挖掘${this.selectedConcept.label}概念上的比较型知识`;
            const description = `${description1}${description2}，${description3}${description4}，${description5}。`;
            return description;
        },
        showDialog() {
            this.$refs.MyDialog.dialogVisible = true;
        },
        handleConceptSelectionDialog4(concept) {
            // 处理对话框1中选定的概念
            console.log("conceptSelectedDialog4 事件被触发了");
            this.selectedConcept = concept;
        },
    },
};
</script>

<style scoped>
.aiya {
    width: 100%;
    height: 100%;
}
h3 {
    color: #5ac15e;
    margin: 0;
}
.select {
    width: 92%;
    display: flex;
    flex-direction: row;
}
.left-select,
.right-select {
    flex: 1;
    border: 0.15em solid transparent; /* 初始状态下透明的边框 */
    border-radius: 0.5em;
    margin-top: 2em;
    margin-right: 1em;
    padding: 1em;
    background: #ffffff; /* 设置中间白色背景 */
    box-shadow: 0 0 10px rgba(10, 80, 49, 0.2); /* 添加阴影效果 */
    transition: border 0.3s ease, border-radius 0.5s ease; /* 添加过渡效果 */
}

.left-select:hover {
    border: 0.15em solid #5ac15e;
    border-radius: 1.2em;
}
.right-select:hover {
    border: 0.15em solid #5ac15e;
    border-radius: 1.2em;
}

label {
    font-size: large;
    font-weight: 600;
    color: #4caf50;
}
.conceptButton {
    margin: 0 10px;
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
.conceptButton:hover {
    background-color: #45a049; /* 鼠标悬停时的背景颜色 */
}

/* 激活状态（按钮被点击时）的样式 */
.conceptButton:active {
    background-color: #357a38; /* 激活状态的背景颜色 */
}

/* 禁用状态的样式 */
.conceptButton:disabled {
    background-color: #ccc; /* 禁用状态的背景颜色 */
    color: #666; /* 禁用状态的文字颜色 */
    cursor: not-allowed; /* 禁用状态下的鼠标指针 */
}
</style>