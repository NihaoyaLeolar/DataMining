<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" title="请选择需要挖掘的数据维度" @close="closeDialog">

            <div class="upup">
                <div class="leftleft">
                    <form-tip-layout>
                        本知识挖掘系统的概念有4个层级，依次是：4个维度、11个指标、39个要点、200+细目。<br>每个层级均可作为选择。暂未入库的概念不可选！
                    </form-tip-layout>
                </div>
                <div class="rightright">
                    <span>您选择的概念是：{{ finalSelectedOptionLabel }}</span>
                    <button @click="selectConcept" class="dialogOkButton">确认</button>
                </div>
            </div>

            <div class="c1234">

                <div class="c1">
                    <p class="dialog-text">维度</p>
                    <div class="my-radio-group">
                        <label v-for="option in c1_options" :key="option.value" @click="selectOptionC1(option)" :class="{ 'selected': selectedOptionC1 != null && selectedOptionC1===option, 'disabled': option.visible===false }">
                            {{ option.label }}
                            <span v-if="!option.visible">（信息暂未入库）</span>
                        </label>
                    </div>
                </div>

                <div class="c2">
                    <p class="dialog-text">指标</p>
                    <h3 v-if="selectedOptionC1 == null">请先选择上一级项目</h3>
                    <div class="my-radio-group" v-if="selectedOptionC1 != null">
                        <label v-for="option in c2_options" :key="option.value" @click="selectOptionC2(option)" :class="{ 'selected': selectedOptionC2 != null && selectedOptionC2===option, 'disabled': option.visible===false}">
                            {{ option.label }}
                            <span v-if="!option.visible">（信息暂未入库）</span>

                        </label>
                    </div>
                </div>

                <div class="c3">
                    <p class="dialog-text">要点</p>
                    <h3 v-if="selectedOptionC2 == null">请先选择上一级项目</h3>
                    <div class="my-radio-group" v-if="selectedOptionC2 != null">
                        <label v-for="option in c3_options" :key="option.value" @click="selectOptionC3(option)" :class="{ 'selected': selectedOptionC3 != null && selectedOptionC3===option, 'disabled': option.visible===false }">
                            {{ option.label }}
                            <span v-if="!option.visible">（信息暂未入库）</span>

                        </label>
                    </div>
                </div>

                <div class="c4">
                    <p class="dialog-text">细目</p>
                    <h3 v-if="selectedOptionC3 == null">请先选择上一级项目</h3>
                    <div class="my-radio-group" v-if="selectedOptionC3 != null">
                        <label v-for="option in c4_options" :key="option.value" @click="selectOptionC4(option)" :class="{ 'selected': selectedOptionC4 != null && selectedOptionC4===option, 'disabled': option.visible===false }">
                            {{ option.label }}
                            <span v-if="!option.visible">（信息暂未入库）</span>
                        </label>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
  <script>
import { Dialog } from "element-ui";
import { concepts } from "@/options.js";
import FormTipLayout from "./FormTipLayout.vue";
import "element-ui/lib/theme-chalk/index.css";

export default {
    components: {
        "el-dialog": Dialog,
        FormTipLayout,
    },
    //在使用这个组件的时候传入的参数，要在这里定义一下
    props: {
        dialogID: String, // 声明 dialogID 为字符串类型
    },
    computed: {
        // 将导入的选项数据赋值给组件的计算属性
        concepts() {
            return concepts;
        },
        finalSelectedOptionLabel() {
            if (this.selectedOptionC4 !== null) {
                this.finalSelectedOption = this.selectedOptionC4;
                return this.selectedOptionC4.label;
            } else if (this.selectedOptionC3 !== null) {
                this.finalSelectedOption = this.selectedOptionC3;
                return this.selectedOptionC3.label;
            } else if (this.selectedOptionC2 !== null) {
                this.finalSelectedOption = this.selectedOptionC2;
                return this.selectedOptionC2.label;
            } else if (this.selectedOptionC1 !== null) {
                this.finalSelectedOption = this.selectedOptionC1;
                return this.selectedOptionC1.label;
            } else {
                this.finalSelectedOption = null;
                return "暂未选择";
            }
        },
    },
    methods: {
        selectConcept() {
            if (
                this.finalSelectedOptionLabel === "暂未选择" ||
                this.finalSelectedOption === null
            ) {
                alert("请先选择一个概念！");
                return;
            }
            if (this.finalSelectedOption.visible === false) {
                alert("您选择的数据暂未入库，请重新选择！");
                return;
            }
            // 使用动态生成的事件名称触发事件，独特的事件名称！
            console.log(`conceptSelected${this.dialogID}`); // 添加此行进行调试
            this.$emit(
                `conceptSelected${this.dialogID}`,
                this.finalSelectedOption
            );
            this.closeDialog();
            this.dialogVisible = false;
        },
        closeDialog() {
            this.selectedOptionC1 = null;
            this.selectedOptionC2 = null;
            this.selectedOptionC3 = null;
            this.selectedOptionC4 = null;
        },
        selectOptionC1(option) {
            this.selectedOptionC1 = option;
            this.selectedOptionC2 = null;
            this.selectedOptionC3 = null;
            this.selectedOptionC4 = null;
            let value = option.value;
            //先清空
            this.c2_options = [];
            this.c3_options = [];
            this.c4_options = [];
            //取第一位
            let x = value.charAt(1);
            //筛选出第一位一样的
            concepts[1].forEach((element) => {
                if (element.value.charAt(1) === x) {
                    this.c2_options.push(element);
                }
            });
        },
        selectOptionC2(option) {
            this.selectedOptionC2 = option;
            this.selectedOptionC3 = null;
            this.selectedOptionC4 = null;
            let value = option.value;
            //先清空
            this.c3_options = [];
            this.c4_options = [];
            //取第2,3位
            let x = value.substr(2, 2);
            console.log(value);
            console.log(x);
            //筛选出第一位一样的
            concepts[2].forEach((element) => {
                if (element.value.substr(2, 2) === x) {
                    this.c3_options.push(element);
                }
            });
        },
        selectOptionC3(option) {
            this.selectedOptionC3 = option;
            this.selectedOptionC4 = null;
            let value = option.value;

            //先清空
            this.c4_options = [];
            //取第4,5位
            let x = value.substr(4, 2);
            console.log(value);
            console.log(x);
            //筛选出第一位一样的
            concepts[3].forEach((element) => {
                if (element.value.substr(4, 2) === x) {
                    this.c4_options.push(element);
                }
            });
        },
        selectOptionC4(option) {
            this.selectedOptionC4 = option;
        },
    },
    data() {
        return {
            dialogVisible: false,
            c1_options: concepts[0],
            c2_options: [],
            c3_options: [],
            c4_options: [],
            selectedOptionC1: null, // 存储第一列的选项是否已选择
            selectedOptionC2: null, // 存储第二列的选项是否已选择
            selectedOptionC3: null, // 存储第三列的选项是否已选择
            selectedOptionC4: null, // 存储第四列的选项是否已选择
            finalSelectedOption: null,
        };
    },
};
</script>
  
  <style>
.el-dialog {
    width: 80%;
}

.el-dialog__body {
    background-color: rgb(255, 255, 255);
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: column; /* 设置为垂直排列 */
}
.upup {
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: row; /* 设置为垂直排列 */
}
.upup .leftleft {
    width: 70%;
}

.upup .rightright {
    width: 30%;
}
.c1234 {
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: row; /* 设置为垂直排列 */
}

/* 修改标题栏的背景颜色和文字颜色 */
.el-dialog__header {
    color: #fff;
    background-color: #4caf50;
}
.el-dialog__title {
    color: #fff;
    font-weight: 500;
    font-size: 1.5em;
}

/* 修改关闭按钮的颜色 */
.dialog-footer {
    color: red;
}

.dialog-text {
    font-size: 1.5em;
    font-weight: 900;
    color: #4caf50;
}

.my-radio-group {
    display: flex; /* 使用 Flexbox 布局 */
    flex-direction: column;
}

.my-radio-group label {
    cursor: pointer;
    padding: 8px;
    border: 0.108em solid #4caf50;
    color: #73ac73;
    border-radius: 0.6em;
    margin-bottom: 0.6em;
    font-weight: 500;
    transition: background-color 0.4s;
}

.my-radio-group label.selected {
    background-color: #4caf50;
    color: #fff;
    font-weight: 900;
}
.my-radio-group label.disabled {
    border: 0.108em solid #abb0ab;
    background-color: #abb0ab;
    font-weight: 400;
    color: #fff;
}

.c1,
.c2,
.c3,
.c4 {
    width: 25%;
    padding: 1.5em;
    background: rgb(241, 241, 241);
    margin: 1em;
    border-radius: 0.8em 0.8em 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

/* 按钮的基本样式 */
.dialogOkButton {
    margin: 0 10px;
    padding: 10px 20px; /* 调整按钮内边距 */
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
.dialogOkButton:hover {
    background-color: #45a049; /* 鼠标悬停时的背景颜色 */
}

/* 激活状态（按钮被点击时）的样式 */
.dialogOkButton:active {
    background-color: #357a38; /* 激活状态的背景颜色 */
}

/* 禁用状态的样式 */
.dialogOkButton:disabled {
    background-color: #ccc; /* 禁用状态的背景颜色 */
    color: #666; /* 禁用状态的文字颜色 */
    cursor: not-allowed; /* 禁用状态下的鼠标指针 */
}
</style>
  