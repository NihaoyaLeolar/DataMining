<template>
    <div>
        <div>
            <mining-step-2-head-layout>
                <form-input-layout>
                    <template v-slot:img><img src="@/assets/gainian.png"></template>
                    <template v-slot:span>概念</template>

                    <template v-slot:selectedForm>
                        <label v-if="selectedConcept !== null">{{ selectedConcept.label }}</label>
                        <button v-if="selectedConcept !== null" @click="showDialog" class="conceptButton">更换选择</button>
                        <button v-if="selectedConcept === null" @click="showDialog" class="conceptButton">选择</button>
                        <my-dialog :dialogID="'Dialog1'" @conceptSelectedDialog1="handleConceptSelectionDialog1" ref="MyDialog"></my-dialog>
                    </template>

                    <template v-slot:tips>知识概念由知识类别与定位决定，通常与数据维度是一对多的关系。这里提供两种知识概念选择方式：简单选择，提供100维度的简单概念，这将对应到一个数据维度；复杂选择，从知识库选取对应的概念，这将对应到多个数据维度</template>
                </form-input-layout>

                <form-input-layout>
                    <template v-slot:img><img src="@/assets/crowd.png"></template>
                    <template v-slot:span>人群</template>
                    <template v-slot:selectedForm>
                        划分1:
                        <select v-model="selectedGroupByRegion">
                            <option v-for="group in groupsByRegion" :value="{ value: group.value, label: group.label }" :key="group.value">{{ group.label }}</option>
                        </select>
                        划分2:
                        <select v-model="selectedGroupByUrbanOrRural">
                            <option v-for="group in groupsByUrbanOrRural" :value="{ value: group.value, label: group.label }" :key="group.value">{{ group.label }}</option>
                        </select>
                    </template>
                    <template v-slot:tips>提供两种划分方式选择人群：划分1通过地域选择人群，划分2通过城镇或农村选择人群</template>
                </form-input-layout>

                <form-input-layout>
                    <template v-slot:img><img src="@/assets/time.png"></template>
                    <template v-slot:span>时间阶段</template>
                    <template v-slot:selectedForm>
                        从
                        <select v-model="selectedTime1">
                            <option v-for="time in times" :value="{ value: time.value, label: time.label }" :key="time.value">{{ time.label }}</option>
                        </select>
                        到
                        <select v-model="selectedTime2">
                            <option v-for="time in times" :value="{ value: time.value, label: time.label }" :key="time.value">{{ time.label }}</option>
                        </select>
                    </template>
                    <template v-slot:tips>数据主体筛选, 如2-5年级</template>
                </form-input-layout>
            </mining-step-2-head-layout>
        </div>
        <div>
            <mining-step2-tail-layout>
                <template v-slot:button>
                    <button @click="generate">生成挖<br>掘计划</button>
                </template>
                <template v-slot:nextbutton>
                    <button @click="goto_mining">开始<br>挖掘</button>
                </template>
            </mining-step2-tail-layout>
        </div>
    </div>

</template>

<script>
import MiningStep2HeadLayout from "../../components/layout/MiningStep2HeadLayout.vue";
import MiningStep2TailLayout from "../../components/layout/MiningStep2TailLayout.vue";
import FormTipLayout from "../../components/layout/FormTipLayout.vue";
import FormInputLayout from "../../components/layout/FormInputLayout.vue";
import MyDialog from "../../components/MyDialog.vue";

import {
    concepts,
    times,
    groupsByRegion,
    groupsByUrbanOrRural,
} from "@/options.js"; // 导入选项数据

export default {
    components: {
        MyDialog,
        MiningStep2HeadLayout,
        MiningStep2TailLayout,
        FormTipLayout,
        FormInputLayout,
    },
    data() {
        return {
            selectedConcept: null,
            selectedTime1: "",
            selectedTime2: "",
            selectedGroupByRegion: "",
            selectedGroupByUrbanOrRural: "",
        };
    },
    computed: {
        classNumber() {
            return this.$store.state.miningClassNumber;
        },
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
                this.selectedTime1 &&
                this.selectedTime2 &&
                this.selectedGroupByRegion &&
                this.selectedGroupByUrbanOrRural
            );
        },
    },
    methods: {
        generate() {
            if (!this.isFormValid) {
                alert("请将表单填写完整，再生成挖掘计划！");
            } else if (this.selectedTime1.value > this.selectedTime2.value) {
                alert("请重新选择时间阶段！起始年级不能大于终止年级！");
            } else {
                const taskDescription = this.getTaskDescription();
                this.$store.commit("setMiningTaskDescription", taskDescription);
            }
        },
        //针对{xx}{xx}的人群，在xx年级到xx年级时间范围内，挖掘xx维度的xx类型知识
        getTaskDescription() {
            var description1;
            if (
                this.selectedGroupByRegion.value == "AllRegion" &&
                this.selectedGroupByUrbanOrRural.value == "AllUrbanOrRural"
            )
                description1 = "针对所有人群";
            else if (this.selectedGroupByRegion.value == "AllRegion")
                description1 = `针对${this.selectedGroupByUrbanOrRural.label}学校的人群`;
            else if (
                this.selectedGroupByUrbanOrRural.value == "AllUrbanOrRural"
            )
                description1 = `针对${this.selectedGroupByRegion.label}的人群`;
            else
                description1 = `针对${this.selectedGroupByRegion.label}${this.selectedGroupByUrbanOrRural.label}人群`;

            const description2 =
                this.selectedTime1.value === this.selectedTime2.value
                    ? `在${this.selectedTime1.label}的时间范围内`
                    : `在${this.selectedTime1.label}到${this.selectedTime2.label}的时间范围内`;

            var s = this.classNumber == 1 ? "特征型" : "发展型";
            var description3 = `挖掘${this.selectedConcept.label}这一概念的${s}知识`;
            const description = `${description1}，${description2}，${description3}。`;
            return description;
        },
        showDialog() {
            this.$refs.MyDialog.dialogVisible = true;
        },
        handleConceptSelectionDialog1(concept) {
            // 处理对话框1中选定的概念
            console.log("conceptSelectedDialog1 事件被触发了");
            this.selectedConcept = concept;
            console.log(this.selectedConcept.value);
        },
        goto_mining() {
            if (this.$store.state.miningTaskDescription == "") {
                alert("请先生成挖掘计划！");
                return;
            }
            //防止在生成计划后、点击挖掘前又更改了表单内容，在挖掘前重新更新一下
            this.generate();
            var params = {
                concept_value: this.selectedConcept.value,
                concept_name: this.selectedConcept.label,
                grade_value1: this.selectedTime1.value,
                grade_value2: this.selectedTime2.value,
                groups_by_region: this.selectedGroupByRegion.value,
                groups_by_urban_or_rural:
                    this.selectedGroupByUrbanOrRural.value,
                mining_plan: this.$store.state.miningTaskDescription,
            };

            if (this.classNumber == 1) {
                //这里采用同步操作，因为http请求默认异步的，会出现没有拿到结果但是下一个页面已经开始加载的情况
                this.goto_mining1(params)
                    .then(() => {
                        this.$store.commit("incrementMiningStep");
                        this.$router.push("/mining/step3for1");
                    })
                    .catch((error) => {
                        // 处理请求错误
                        console.error("Error in mining:", error);
                    });
            } else {
                this.goto_mining2(params)
                    .then(() => {
                        this.$store.commit("incrementMiningStep");
                        this.$router.push("/mining/step3for2");
                    })
                    .catch((error) => {
                        // 处理请求错误
                        console.error("Error in mining:", error);
                    });
            }
        },
        goto_mining1(params) {
            // 在处理HTTP请求等异步操作时，使用Promise可以更好地控制异步操作的执行顺序和结果处理。当你需要在HTTP请求完成后执行某些操作时，
            // 可以创建一个Promise对象来表示这个异步操作，并在异步操作完成后执行后续的操作。
            // 这样可以确保在异步操作完成后再执行后续逻辑，避免了代码执行顺序不确定的问题。
            return new Promise((resolve, reject) => {
                this.$http
                    .post("/mining/style", params)
                    .then((response) => {
                        // 处理成功响应的数据
                        console.log(
                            "挖掘完毕，获得记录：",
                            response.data.record
                        );
                        this.$store.commit(
                            "updateMiningRecord",
                            response.data.record
                        );
                        console.log(
                            "挖掘完毕，获得请求：",
                            response.data.request
                        );
                        this.$store.commit(
                            "updateMiningRequest",
                            response.data.request
                        );
                        console.log(
                            "挖掘完毕，获得结果：",
                            response.data.result
                        );
                        this.$store.commit(
                            "updateMiningResult",
                            response.data.result
                        );
                        resolve(response); // 成功时调用resolve方法
                    })
                    .catch((error) => {
                        // 处理请求错误
                        console.error("Error sending GET request:", error);
                        reject(error); // 失败时调用reject方法
                    });
            });
        },

        goto_mining2(params) {
            this.$http
                .post("/mining/develop", params)
                .then((response) => {
                    // 处理成功响应的数据
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
/* 按钮的基本样式 */

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
