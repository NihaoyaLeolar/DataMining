<template>
    <div class="container">
        <div class="left-container">
            <div class="up-container">
                <div class="line1">
                    <p class="label">学生ID</p>
                </div>
                <div class="line2">
                    <input @input="handleInput" type="text" placeholder="请输入学生ID">
                    <button @click="profiling">开始画像</button>
                </div>
            </div>

            <div class="gap"></div>

            <div class="down-container">
                <p class="label">学生基本信息</p>
                <div v-if="profileData">
                    <p class="info-line"><span class="p1">性别：</span><span class="p2">{{ profileData.gender }}</span></p>
                    <p class="info-line"><span class="p1">地区：</span><span class="p2">{{ profileData.sheng }} {{ profileData.shi }} {{ profileData.qu }}</span></p>
                    <p class="info-line"><span class="p1">学校：</span><span class="p2">{{ profileData.organization }}{{ profileData.class }}</span></p>
                    <p class="info-line"><span class="p1">年级：</span><span class="p2">{{ profileData.grade }} 年级（{{ profileData.learning_stage }}）</span></p>
                </div>

            </div>
        </div>
        <div class="right-container">
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    margin: 0;
    padding: 0;
    height: 89vh;
    flex-direction: row;
}

.left-container {
    width: 32%;
    height: 95%;
    display: flex;
    margin: 1em;
    border-radius: 1em;
    flex-direction: column;
}

.up-container {
    width: 100%;
    height: 28%;
    border-radius: 1em;
    margin-bottom: 1em;
    background: #5ac15e;
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 28px;
    color: #fff;
    font-weight: 800;
    margin-bottom: 10px;
}

.line1 {
    display: flex;
    align-items: center;
    margin-left: 28px;
    padding: 10px;
}

.line2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 28px;
    padding: 10px;
}

input {
    padding: 10px;
    border-radius: 5px;
    border: 1.5px solid #ccc;
}

button {
    padding: 10px 20px;
    margin-left: 18px;
    border-radius: 5px;
    border: none;
    background-color: #4a9c4e;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #fff;
    color: #4a9c4e;
}

.gap {
    height: 2%; /* 中间留出2%的空隙 */
}

.down-container {
    width: 100%;
    height: 70%;
    border-radius: 1em;
    background: #5ac15e;
}
.info-line {
    display: flex;
    align-content: flex-start;
    margin-bottom: 0.5em; /* 调整每行内容之间的间距 */
    margin-left: 2em;
}

.p1 {
    font-weight: 800;
    font-size: 1.2em;
    color: #ffffff;
}

.p2 {
    font-weight: 400;
    font-size: 1.2em;
    color: #ffffff;
}

.right-container {
    height: 100%;
    width: 68%;
    display: flex;
    align-items: center;
}

.content {
    display: flex;
    width: 100%;
    height: 94%;
    margin: 3.2em;
    padding-left: 3.2em;
    border-radius: 1em;
    background: #f7f6ee;
    border: 0.2em solid #5ac15e;
    overflow: scroll;
}
</style>

<script>
import axios from "axios";

export default {
    components: {},
    data() {
        return {
            userInput: "", // 初始化用户输入数据
            profileData: null, // 初始化为null，表示暂无数据
        };
    },
    methods: {
        handleInput(event) {
            this.userInput = event.target.value;
        },
        async profiling() {
            console.log("开始画像，用户ID:", this.userInput);
            // 发送用户输入到后端的逻辑
            try {
                const response = await axios.get(
                    `/profiling/${this.userInput}`
                );
                this.profileData = response.data; // 更新数据以显示到页面
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // 处理错误，例如显示错误消息给用户··
            }

            // 在这里可以调用后端接口发送用户输入到后端处理
            console.log("画像完毕，获得画像数据：", this.profileData);
            this.$store.commit("updateProfileData", this.profileData);
        },
    },
};
</script>
