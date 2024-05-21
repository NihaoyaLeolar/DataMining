<template>
    <div class="fatherContainer">
        <div class="titleContainer">
            <h1 class="pageTitle">Step2: 根据您的挖掘需求填写以下任务表单</h1>
            <h2 class="subTitle">待挖掘知识类型：
                <!--我使用 === 来进行严格相等性比较，这是 JavaScript 中的一种比较操作符。
                在条件语句中，使用 === 会检查两个值是否严格相等，这意味着它们的值不仅需要相等，还需要类型相同。
                严格相等性比较 (===) 的好处是它避免了类型转换，确保比较的值既相等又具有相同的数据类型。
                这可以减少一些潜在的类型不匹配问题，并提高代码的可靠性。在 Vue.js 组件中，使用 === 是一种良好的实践，因为它能确保条件判断的准确性。
                相比之下，== 是 JavaScript 中的松散相等性比较操作符，它在比较时进行类型转换，可能导致一些不直观的行为。
                因此，通常建议在条件判断时使用 === 来进行严  格相等性比较，以避免潜在的问题。-->
                <span v-if="classNumber === 1">特征型知识</span>
                <span v-else-if="classNumber === 2">发展型知识</span>
                <span v-else-if="classNumber === 3">交叉型知识</span>
                <span v-else>比较型知识</span>
            </h2>
        </div>
        <!--具体的表单页面-->
        <div class="formContainer">
            <slot></slot>
        </div>
        <div>

        </div>
    </div>

</template>

<script>
export default {
    computed: {
        classNumber() {
            return this.$store.state.miningClassNumber;
        },
    },
};
</script>

<style>
.fatherContainer {
    width: 100%;
    height: 100%;
}

.titleContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 将文本左对齐 */
    margin-bottom: -1em;
}

.pageTitle {
    margin-bottom: -0.2em; /* 标题与子标题之间的间距 */
}

.subTitle {
    font-size: 1.5em;
    color: #525050; /* 设置子标题的文本颜色 */
}
.formContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 将内容左对齐 */
}
</style>
