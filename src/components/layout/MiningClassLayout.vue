<!--这是在知识挖掘第一页的组件（模版）：展示类别的小框框-->

<template>
    <div class="class-container">
        <div class="myup">
            <slot name="name"></slot>
        </div>
        <div class="mydown">
            <div class="left">
                <slot name="image"></slot>
            </div>
            <div class="right">
                <slot name="description"></slot>
            </div>
        </div>

    </div>

</template>

<style scoped>
.class-container {
    width: 18em;
    height: 15em;
    display: flex;
    flex-direction: column; /* 在布局内竖着排列 */
    transition: transform 0.5s ease; /* 添加过渡动画 */
}
/* 鼠标悬停时的效果 */
.class-container:hover {
    transform: scale(1.15); /* 缩小 5% */
    cursor: pointer; /* 鼠标指针变为手型 */
}

.myup {
    background: #ffffff;
    flex: 20%;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 1em;
    border: 0.2em solid #5ac15e;
    border-radius: 0.8em 0.8em 0 0;

    font-size: 1.3em; /* 修改字体大小 */
    color: #5ac15e; /* 修改文字颜色 */
    font-weight: 800;
}

.mydown {
    background: #5ac15d;
    flex: 80%;
    display: flex;
    border-radius: 0 0 0.8em 0.8em;
}

.left {
    flex: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em;
}
/* 限制图片的最大宽度和最大高度 */
.left img {
    max-width: 100%; /* 设置最大宽度为容器宽度 */
    max-height: 100%; /* 设置最大高度为容器高度 */
    padding: 0.8em;
    background: #ffffff;
    border-radius: 0.8em;
}

.right {
    flex: 60%;
    display: flex;
    padding: 0.5em;
    align-items: center;
    text-align: left;
    justify-content: center;

    margin: 0.5em;

    font-size: 1em; /* 修改字体大小 */
    color: #ffffff; /* 修改文字颜色 */
    font-weight: 500;
}
</style>
