
<template>

    <div class="dialog-container" v-if="showDialog">
        <div class="dialog">
            <p class="title">知识条目细节</p>
            <div class="body">
                <div class="left">
                    <div class="card1">
                        <h2> 基本信息</h2>
                        <div class="card11 card-common">
                            <section>
                                知识类别：<em>{{ this.getKnowledgeTypeName(knowledge.knowledgeType) }}</em>
                            </section>
                            <section>
                                知识描述：<em>{{ knowledge.description }}</em>
                            </section>
                            <section>
                                生成时间：<em>{{ record.miningTime }}</em>
                            </section>
                        </div>
                    </div>
                    <div class="card2">
                        <h2>适用范围</h2>
                        <div class="card22 card-common">
                            <section>
                                概念：<em>{{ knowledge.concept }}</em>
                            </section>
                            <section>
                                人群：<em>{{ knowledge.crowds }}</em>
                            </section>
                            <section>
                                时间：<em>{{ knowledge.time }}</em>
                            </section>
                        </div>
                    </div>
                    <div class="card3">
                        <!-- 中间部分的内容 -->
                        <h2>具体内容</h2>
                        <div class="card33 card-common">
                            <section>
                                规则：<em>{{ knowledge.rule }}</em>
                            </section>
                            <section>
                                知识解读：<em>{{ knowledge.interpretation }}</em>
                            </section>

                        </div>
                    </div>
                </div>

                <div class="right">
                    <img :src="getImageUrl(knowledge.filePath)" alt="Knowledge Image">
                </div>
            </div>
            <div class="card4">
                <h2>知识来源</h2>
                <div class="card44 card-common">
                    <section>
                        生成方式：<em>手动生成</em>
                    </section>
                    <section>
                        挖掘计划：<em>{{ record.miningPlan }}</em>
                    </section>
                </div>
            </div>

        </div>
        <button @click="closeDialog">关闭</button>

    </div>
</template>  
    
  <script>
import { miningType } from "@/options.js"; // 导入选项数据

export default {
    data() {
        return {
            showImageModal: false,
        };
    },
    props: {
        showDialog: {
            type: Boolean,
            default: false,
        },
        knowledge: {
            type: Object,
            required: true,
        },
        record: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.fetchData();
    },
    methods: {
        closeDialog() {
            this.$emit("close");
        },
        getKnowledgeTypeName(type) {
            const matchedType = miningType.find((item) => item.type === type);
            return matchedType ? matchedType.name : "未知类型";
        },
        showImage() {
            this.showImageModal = true;
        },
        hideImage() {
            this.showImageModal = false;
        },
        getImageUrl(filePath) {
            // 构建完整的图片URL，根据实际情况修改前缀部分
            return "http://localhost:8080/" + filePath;
        },
    },
};
</script>  
    
  <style scoped>
.dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75); /* 半透明遮罩层 */
    z-index: 999; /* 确保Dialog显示在其他内容之上 */
}

.dialog {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: 1250px;
    height: 720px;
    padding: 30px;
    padding-bottom: 0;
    overflow: auto; /* 如果内容过多，允许滚动 */
}

.body {
    display: flex;
    flex: 1;
    flex-direction: row;
}

.left {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.right {
    display: flex;
    width: 750px;
}

img {
    margin: 20px;
    width: 720px;
}

.card1 {
    padding-right: 10px;
}
.card2 {
    padding-right: 10px;
}
.card3 {
    padding-right: 10px;
}
.card4 {
    padding-right: 10px;
    padding-bottom: 40px;
}
.title {
    margin: 0;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    background: #5ac15e;
    color: #fff;
}
h2 {
    color: #5ac15e;
    margin-top: 24px;
    margin-bottom: 4px;
}

.card-common {
    background: #d9ecd1;
    border-radius: 5px;
    align-content: center;
}
.card11 {
    height: 110px;
}

.card22 {
    height: 110px;
}

.card33 {
    min-height: 110px;
}

.card44 {
    min-height: 100px;
}

section {
    color: #000;
    font-size: 17px;
    font-weight: 700;
    margin: 10px;
    padding-left: 16px;
}

em {
    color: #228e46;
    font-weight: 500;
}
</style>

