<!-- ProgressComponent.vue -->
<template>
    <div class="stepbar">
        <div class="arrowline-img">
            <img v-if="step == 1" src="@/assets/arrow.png" class="arrow-img">
            <img v-else src="@/assets/line.png" class="line-img">
        </div>

        <div :class="{ 'active-step': step >= 1 }" class="step-container">
            <div class="step-text">
                <div class="step-number">Step 1</div>
                <div class="step-description">选择知识类别</div>
            </div>
            <div class="step-img">
                <img v-if="step >= 1" src="@/assets/completed.png" alt="已完成" class="completed-img">
                <img v-else src="@/assets/unfinished.png" alt="未完成" class="unfinished-img">
            </div>
        </div>

        <div class="arrowline-img">
            <img v-if="step == 2" src="@/assets/arrow.png" class="arrow-img">
            <img v-else src="@/assets/line.png" class="line-img">
        </div>

        <div :class="{ 'active-step': step >= 2 }" class="step-container">
            <div class="step-text">
                <div class="step-number">Step 2</div>
                <div class="step-description">提交挖掘任务</div>
            </div>
            <div class="step-img">
                <img v-if="step >= 2" src="@/assets/completed.png" alt="已完成" class="completed-img">
                <img v-else src="@/assets/unfinished.png" alt="未完成" class="unfinished-img">
            </div>
        </div>

        <div class="arrowline-img">
            <img v-if="step == 3" src="@/assets/arrow.png" class="arrow-img">
            <img v-else src="@/assets/line.png" class="line-img">
        </div>

        <div :class="{ 'active-step': step >= 3 }" class="step-container">
            <div class="step-text">
                <div class="step-number">Step 3</div>
                <div class="step-description">生成挖掘结果</div>
            </div>
            <div class="step-img">
                <img v-if="step >= 3" src="@/assets/completed.png" alt="已完成" class="completed-img">
                <img v-else src="@/assets/unfinished.png" alt="未完成" class="unfinished-img">
            </div>
        </div>

        <div class="arrowline-img">
            <img v-if="step == 4" src="@/assets/arrow.png" class="arrow-img">
            <img v-else src="@/assets/line.png" class="line-img">
        </div>

        <div :class="{ 'active-step': step >= 4 }" class="step-container">
            <div class="step-text">
                <div class="step-number">Step 4</div>
                <div class="step-description">提交知识入库</div>
            </div>
            <div class="step-img">
                <img v-if="step >= 4" src="@/assets/completed.png" alt="已完成" class="completed-img">
                <img v-else src="@/assets/unfinished.png" alt="未完成" class="unfinished-img">
            </div>
        </div>
    </div>
</template>
  
  <script>
//计算属性 (computed property)：计算属性是 Vue 中的一个特殊属性，它允许你在模板中绑定数据，
//并且只有当依赖的数据发生变化时才会重新计算，以提供计算后的值。计算属性在模板中的用法与普通属性一样，但它们实际上是函数，这些函数返回计算后的值。
//计算属性允许我们将复杂的逻辑封装到属性中，然后在模板中轻松地使用这些属性。
export default {
    //创建了一个名为 step 的计算属性，它从 Vuex store 中获取 currentStep 的值
    computed: {
        //在本组件中直接使用计算属性名即可！
        step() {
            // 访问 Vuex store 中的 currentStep
            return this.$store.state.currentMiningStep;
        },
    },
};
</script>
  
  <style scoped>
.stepbar {
    display: flex;
    flex-direction: column; /* 在布局内竖着排列 */
    justify-content: center;
}

.step-container {
    display: flex;
    flex-direction: row;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.step-container.active-step {
    font-weight: bold;
    color: #ffffff; /* 高亮颜色 */
}

/* 不活跃状态下的样式 */
.step-container:not(.active-step) {
    font-weight: bold;
    color: #f0eeeeac;
}

.step-text {
    text-align: left; /* 让容器内的文本内容右对齐 */
    margin-right: 2em;
}

.step-number {
    font-size: 2em;
}
.step-description {
    font-size: 1.5em;
}

.step-img {
    display: flex; /* 使容器内的内容成为一个 flex 容器 */
    align-items: center; /* 垂直居中 */
    margin-right: 2em;
}

.completed-img {
    width: 3.2em; /* 设置宽度为父元素宽度的50% */
    height: auto; /* 自动计算高度，保持宽高比 */
}
.unfinished-img {
    width: 3.2em;
    height: auto; /* 自动计算高度，保持宽高比 */
    opacity: 0.7; /* 设置透明度，范围从0（完全透明）到1（完全不透明） */
}

.arrow-img {
    width: 3.6em; /* 设置宽度为父元素宽度的50% */
    height: auto; /* 自动计算高度，保持宽高比 */
}

.line-img {
    width: 3.6em; /* 设置宽度为父元素宽度的50% */
    height: auto; /* 自动计算高度，保持宽高比 */
    opacity: 0.5; /* 设置透明度，范围从0（完全透明）到1（完全不透明） */
}
.arrowline-img {
    margin: 0.3em;
    display: inline-flex; /* 更改为 inline-flex */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
</style>
  