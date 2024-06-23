<template>
    <div>
        <iframe src="http://82.157.18.78:6510/chat.html" width="100%" height="600px" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: "EmbedPage",
    created() {
        window.addEventListener("message", (event) => {
            event.orgin  //请求的ip
            event.data.knowledge_type;
            var url = 
            this.$http
                .post("/chat/style/mining", event.data.content)
                .then((response) => {
                    // 处理成功响应的数据
                    console.log("知识生成完毕，获得知识：", response.data);
                    this.$store.commit("updateKnowledgeList", response.data);
                    //下一步
                    this.$store.commit("incrementMiningStep");
                    this.$router.push("/mining/step4");
                })
                .catch((error) => {
                    // 处理请求错误
                    console.error("Error sending GET request:", error);
                });
        });
    }
};
</script>