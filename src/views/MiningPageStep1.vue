<!--这里是知识挖掘的默认首页：选择知识挖掘的类型-->
<template>
    <div class="page-container">
        <div class="title">
            <h1>Step1: 请选择需要挖掘的知识类型</h1>
        </div>
        <div class="context">
            <div @click="style_click">
                <MiningClassLayout>
                    <template v-slot:image>
                        <img src="@/assets/style.png" alt="Image 1">
                    </template>
                    <template v-slot:name>1.特征型知识</template>
                    <template v-slot:description>通过统计学方法计算获取到数据的一般特征。</template>
                </MiningClassLayout>
            </div>
            <div @click="develop_click">
                <MiningClassLayout>
                    <template v-slot:image>
                        <img src="@/assets/develop.png" alt="Image 1">
                    </template>
                    <template v-slot:name>2.发展型知识</template>
                    <template v-slot:description>建立时间序列分析模型，挖掘学生某个维度的发展型规律。</template>
                </MiningClassLayout>
            </div>
            <div @click="relevance_click">
                <MiningClassLayout>
                    <template v-slot:image>
                        <img src="@/assets/relevance.png" alt="Image 1">
                    </template>
                    <template v-slot:name>3.交叉型知识</template>
                    <template v-slot:description>结合不同特征之间的关系来进行挖掘，得到多维属性组合的规律性知识。</template>
                </MiningClassLayout>
            </div>
            <div @click="compare_click">
                <MiningClassLayout @click="compare_click">
                    <template v-slot:image>
                        <img src="@/assets/compare.png" alt="Image 1">
                    </template>
                    <template v-slot:name>4.比较型知识</template>
                    <template v-slot:description>比较不同年龄段、不同群体中小学生保存的数据，找到其中的特征差异。</template>
                </MiningClassLayout>
            </div>
        </div>
    </div>
</template>

<script>
import MiningClassLayout from "@/components/MiningClassLayout.vue";
export default {
    components: { MiningClassLayout },
    methods: {
        style_click() {
            this.$store.commit("incrementStep");
            this.$store.commit("setClassNumber", 1);
            this.$router.push("/mining/step2for12");
        },
        develop_click() {
            this.$store.commit("incrementStep");
            this.$store.commit("setClassNumber", 2);
            this.$router.push("/mining/step2for12");
        },
        relevance_click() {
            this.$store.commit("incrementStep");
            this.$store.commit("setClassNumber", 3);
            this.$router.push("/mining/step2for3");
        },
        compare_click() {
            this.$store.commit("incrementStep");
            this.$store.commit("setClassNumber", 4);
            this.$router.push("/mining/step2for4");
        },
    },
};
</script>

<style>
.page-container {
    display: flex;
    flex-direction: column; /* 在布局内竖着排列 */
    justify-content: center; /* 水平居中 */

    width: 100%;
}
.title {
    text-align: left;
}
.context {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 两列，每列等分剩余空间 */
    grid-gap: 4em; /* 格子之间的间距 */
    place-items: center; /* 垂直和水平居中 */
    width: 100%;
    padding-top: 1em;
    padding-bottom: 2em;
}
</style>