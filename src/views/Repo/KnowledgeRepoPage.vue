<template>
    <div class="container">
        <div class="left-container">
            <div class="bar">
                <h1>条件筛选</h1>

            </div>
        </div>
        <div class="right-container">
            <div class="content">
                <table>
                    <!-- 表格头部 -->
                    <thead>
                        <tr>
                            <th style="width: 60px;">知识类别</th>
                            <th style="width: 40px;">概念</th>
                            <th style="width: 80px;">人群</th>
                            <th style="width: 60px;">时间</th>
                            <th style="width: 120px;">规则</th>
                        </tr>
                    </thead>
                    <!-- 表格内容 -->
                    <tbody>
                        <tr v-for=" entry in currentEntries" :key="entry.id" @click="showKnowledgeDialog(entry)">
                            <td style="color:#5ac15e;font-weight: 900;">{{ getMiningTypeName(entry.knowledgeType)  }}</td>
                            <td>{{ entry.concept }}</td>
                            <td>{{ entry.crowds }}</td>
                            <td>{{ entry.time }}</td>
                            <td>{{ entry.rule }}</td>
                        </tr>
                        <!-- Dialog组件 -->
                        <KnowledgeDialog :showDialog="dialogVisible" :knowledge="selectedKnowledge" :record="miningRecord" @close="closeDialog" />
                        <KnowledgeDialogWithPic :showDialog="dialogWithPicVisible" :knowledge="selectedKnowledge" :record="miningRecord" @close="closeDialog" />
                    </tbody>
                </table>
                <!-- 翻页控件 -->
                <div class=" pagination">
                    <!-- 这里可以添加按钮或输入框来实现翻页 -->
                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === Math.ceil(totalEntries / pageSize)">下一页</button>
                </div>
            </div>
        </div>
    </div>

</template>



<script>
import { miningType } from "@/options.js"; // 导入选项数据
import KnowledgeDialog from "../../components/Dialog/KnowledgeDialog.vue";
import KnowledgeDialogWithPic from "../../components/Dialog/KnowledgeDialogWithPic.vue";

export default {
    components: {
        KnowledgeDialog,
        KnowledgeDialogWithPic,
    },
    data() {
        return {
            knowledgeEntries: [], // 存储从后端获取的知识条目
            currentPage: 1, // 当前页码
            pageSize: 7, // 每页显示的条目数
            totalEntries: 0, // 总条目数，从后端获取或计算
            dialogVisible: false,
            dialogWithPicVisible: false,
            selectedKnowledge: null, // 用于存储当前选中的知识对象
            miningRecord: null,
        };
    },
    created() {
        this.fetchData(); // 在组件创建时获取数据
    },
    methods: {
        // 从后端获取知识数据
        fetchData() {
            this.$http
                .get("/krepo/all")
                .then((response) => {
                    console.log(response.data);
                    this.knowledgeEntries = response.data;
                    this.totalEntries = this.knowledgeEntries.length; // 假设所有条目都已加载
                })
                .catch((error) => {
                    console.log(error);
                });
            // 如果后端支持分页，你可能只需要获取当前页的数据
        },

        // 获取本页数据
        getPageData(page) {
            // 假设 knowledgeEntries 已经包含了所有数据
            const start = (page - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.knowledgeEntries.slice(start, end);
        },

        // 翻页方法
        goToPage(page) {
            if (
                page >= 1 &&
                page <= Math.ceil(this.totalEntries / this.pageSize)
            ) {
                this.currentPage = page;
            }
        },

        getMiningTypeName(type) {
            const matchedType = miningType.find((item) => item.type === type);
            return matchedType ? matchedType.name : "未知类型"; // 如果没找到匹配项，返回'未知类型'
        },

        showKnowledgeDialog(knowledge) {
            var id = knowledge.miningId;

            console.log("即将跳出知识细节dialog...找到知识对应的挖掘id：" + id);
            this.$http
                .get(`/krepo/record/${id}`)
                .then((response) => {
                    console.log("从后端获取挖掘时的记录：" + response.data);
                    this.miningRecord = response.data;
                    this.selectedKnowledge = knowledge;
                    //显示
                    if (knowledge.filePath == null) {
                        this.dialogVisible = true;
                    } else {
                        this.dialogWithPicVisible = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        closeDialog() {
            this.dialogVisible = false;
            this.dialogWithPicVisible = false;
            this.selectedKnowledge = null;
        },
    },
    computed: {
        // 计算当前页的数据
        currentEntries() {
            return this.getPageData(this.currentPage);
        },
    },
};
</script>


 <style scope>
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

.right-container {
    height: 100%;
    width: 68%;
    display: flex;
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

.content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 94%;
    margin: 3.2em;
    padding-left: 3.2em;
    border-radius: 1em;
    background: #f7f6ee; /* 设置中间白色背景 */
    border: 0.2em solid #5ac15e;
    overflow: scroll;
}

/* 表格样式 */
table {
    width: 760px;
    border-collapse: collapse;
    margin-top: 30px;
    text-align: left;
    border-radius: 10px; /* 设置圆角半径 */
    border: 2px solid #5ac15e; /* 设置边框样式、宽度和颜色 */
}

thead th {
    background-color: #5ac15e;
    padding: 10px;
    color: #fff;
    font-size: 19px;
    font-weight: 800;
    border-bottom: 1px solid #ffffff;
}

tbody tr:nth-child(odd) {
    background-color: #ffffff;
}

tbody tr:nth-child(even) {
    background-color: #e8f5e1;
}

tbody tr:hover {
    cursor: pointer;
    font-weight: 800;
}

tbody td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

/* 翻页控件样式 */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination button {
    background-color: #5ac15e;
    color: white;
    border: none;
    padding: 8px 16px;
    text-decoration: none;
    margin: 0 4px;
    cursor: pointer;
}

.pagination button:hover {
    background-color: #4caf50;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>