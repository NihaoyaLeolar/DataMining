
<template>

    <div class="dialog-container" v-if="showDialog">
        <div class="dialog">
            <p class="title">知识条目细节</p>
            <!-- 上部分 -->
            <div class="dialog-header">
                <div class="dialog-header-left">
                    <h2> 基本信息</h2>
                    <div class="card1 card-common">
                        <section>
                            知识类别：<em>特征型知识</em>
                        </section>
                        <section>
                            知识描述：<em>{{ knowledge.description }}</em>
                        </section>
                        <section>
                            生成时间：<em>{{ record.miningTime }}</em>
                        </section>
                    </div>
                </div>
                <div class="dialog-header-right">
                    <h2>适用范围</h2>
                    <div class="card2 card-common">
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
            </div>
            <!-- 中部分 -->
            <div class="dialog-body">
                <!-- 中间部分的内容 -->
                <h2>具体内容</h2>
                <div class="card3 card-common">
                    <section>
                        规则：<em>{{ knowledge.rule }}</em>
                    </section>
                    <section>
                        知识解读：<em>{{ knowledge.interpretation }}</em>
                    </section>
                </div>
            </div>
            <!-- 下部分 -->
            <div class="dialog-footer">
                <h2>知识来源</h2>
                <div class="card4 card-common">
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
export default {
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
    width: 1000px;
    height: 660px;
    padding: 30px;
    padding-bottom: 0;
    overflow: auto; /* 如果内容过多，允许滚动 */
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px; /* 与中部分隔开一些距离 */
}

.dialog-header-left {
    flex: 1;
    padding-right: 60px;
}
.dialog-header-right {
    flex: 1;
}

.dialog-body {
}

.dialog-footer {
    margin-top: 10px; /* 与中部分隔开一些距离 */
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
    margin-top: 20px;
    margin-bottom: 10px;
}

.card-common {
    background: #d9ecd1;
    border-radius: 5px;
    align-content: center;
}
.card1 {
    height: 120px;
}

.card2 {
    height: 120px;
}

.card3 {
    min-height: 150px;
}

.card4 {
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

