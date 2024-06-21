<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>知识条目</th>
                    <th>选中</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in computedList" :key="index">
                    <td>{{ item }}</td>
                    <td><input type="checkbox" v-model="selectedItems" :value="item" /></td>
                </tr>
            </tbody>
        </table>
        <button @click="submitSelection">提交知识入库</button>
    </div>
</template>
  
  <script>
export default {
    data() {
        return {
            selectedItems: [],
        };
    },
    computed: {
        computedList() {
            var list = this.$store.state.knowledgeList;
            return list.map((item) => {
                return `<${item.concept} | ${item.crowds} | ${item.time} | ${item.rule}>`;
            });
        },
    },
    methods: {
        // 筛选选中的项
        getSelectedKnowledgeItems() {
            // 创建一个Set来存储已选中的item字符串，以去除重复项
            const selectedSet = new Set(this.selectedItems);
            // 遍历knowledgeList，并筛选出对应的项
            return this.$store.state.knowledgeList.filter((item) => {
                // 生成与computedList相同的字符串，并与Set中的项进行比较
                const computedString = `<${item.concept} | ${item.crowds} | ${item.time} | ${item.rule}>`;
                return selectedSet.has(computedString);
            });
        },
        // 根据不同类型的请求入库，生成对应的url
        getUrl() {
            var url;
            switch (this.$store.state.miningClassNumber) {
                case 1:
                    url = "/mining/style/store/knowledge";
                    break;
                case 2:
                    url = "/mining/develop/store/knowledge";
                    break;
                case 3:
                    url = "/mining/cross/store/knowledge";
                    break;
                case 4:
                    url = "/mining/compare/store/knowledge";
                    break;
            }
            return url;
        },
        submitSelection() {
            //得到用户选中的知识
            const knowledgeList = this.getSelectedKnowledgeItems();
            console.log("Selected knowledge list:", knowledgeList);
            console.log("提交知识入库申请...");
            this.$http
                .post(this.getUrl(), knowledgeList)
                .then((response) => {
                    // 处理成功响应的数据
                    console.log("知识入库完毕");
                    alert("知识入库完毕，请跳转到知识库查看详情！");
                    this.$router.push("/krepo");
                })
                .catch((error) => {
                    // 处理请求错误
                    console.error("知识入库失败:", error);
                });
        },
    },
};
</script>
  
  <style scoped>
.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
}

table {
    width: 760px;
    border-collapse: collapse;
    font-size: 16px;
    text-align: left;
    margin-bottom: 15px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px;
}

th {
    background-color: #4caf50;
    color: white;
    font-weight: bold;
}

td {
    background-color: #f9f9f9;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #e9e9e9;
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}

input[type="checkbox"] {
    transform: scale(1.5);
    margin: 5px;
}
</style>
  