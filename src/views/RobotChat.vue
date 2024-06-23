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
            // event.orgin  //请求的ip
            
            var url;
            if(event.data.knowledge_type == "Style")
                url = "/chat/style/mining";
            else if(event.data.knowledge_type == "Cross")
                url = "/chat/cross/mining";

            this.$http
                .post(url, event.data.content)
                .then((response) => {
                    // 处理成功响应的数据
                    console.log("手动挖掘知识完毕，获得知识id列表：", response.data);
                    this.$store.commit("updateKnowledgeList", response.data);
                })
                .catch((error) => {
                    // 处理请求错误
                    console.error("Error sending GET request:", error);
                });
        });
    }
};
</script>