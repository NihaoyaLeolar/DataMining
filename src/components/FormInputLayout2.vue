<template>
    <div class="inputContainer2">
        <div class="up2">
            <span class="mySpan">
                <slot name="span"></slot>
            </span>
            <slot name="img"></slot>
        </div>
        <div class="down2">
            <slot name="selectedForm"></slot>

        </div>
    </div>
</template>


<script>
import FormTipLayout from "./FormTipLayout.vue";

export default {
    components: {
        FormTipLayout,
    },
    computed: {
        classNumber() {
            return this.$store.state.classNumber;
        },
    },
};
</script>

<style>
.inputContainer2 {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: left;
    margin-top: 1em;
}

.up2 {
    display: flex;
    align-items: center;
    width: 100%;
}

.inputContainer2 img {
    width: 1.8em;
    margin-left: 0.2em;
}

.down2 {
    display: flex;
    align-items: center;
    width: 100%;
}
/* 美化 select 元素的外观 */
select {
    padding: 0.5em 1em; /* 添加内边距，使内容居中显示 */
    margin: 0.5em;
    font-size: 1em; /* 设置字体大小 */
    font-weight: 500;
    border: 0.1em solid #ccc; /* 添加边框 */
    border-radius: 0.25em; /* 添加边框圆角 */
    background-color: #fff; /* 设置背景颜色 */
    transition: border-color 0.3s ease, box-shadow 0.3s ease, cursor 0.3s ease;
}

/* 修改鼠标悬停时的样式 */
select:hover {
    border-color: #5ac15e; /* 边框颜色变暗 */
    box-shadow: 0 0 0.7em #b1bdb2; /* 添加聚焦时的阴影效果 */
    cursor: pointer; /* 更改光标形状为手型 */
}

/* 修改选中时的样式 */
select:focus {
    border-color: #5ac15e;
    outline: none; /* 移除默认的聚焦样式（一些浏览器可能需要加上这个） */
}
.mySpan {
    font-size: 1.4em;
    font-weight: 900;
}
</style>