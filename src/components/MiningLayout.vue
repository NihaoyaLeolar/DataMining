<!--知识挖掘页面模版，分左右栏，右边待插入-->

<template>
    <div class="container">
        <div class="left-container">
            <StepBar class="bar"></StepBar>
        </div>
        <div class="right-container">
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<style >
.container {
    display: flex;
    margin: 0;
    padding: 0;
    height: 89vh;
    flex-direction: row; /* 在布局内横着着排列 */
}

.left-container {
    width: 32%;
    height: 100%;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 居中导航栏内容 */
}

.bar {
    width: 100%;
    height: 92%;
    background: #5ac15e;
    margin-left: 1.5em;
    padding: 0.8em;
    /* background: linear-gradient(135deg, #7fdf82, #4caf50, #75e2a6); */
    border-radius: 2em;
}

.right-container {
    height: 100%;
    width: 68%;
    display: flex;
    align-items: center; /* 居中导航栏内容 */
}

.content {
    display: flex;
    width: 100%;
    height: 94%;
    margin: 3.2em;
    padding-left: 3.2em;
    border-radius: 1em;
    background: #f7f6ee; /* 设置中间白色背景 */
    border: 0.2em solid #5ac15e;
    overflow: scroll;
}
</style>

<script>
import StepBar from "./StepBar.vue";
export default {
    components: {
        StepBar,
    },
};
</script>