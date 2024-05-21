<template>
    <div class="tipContainer">
        <img src="@/assets/tips.png">
        <div class="text">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.tipContainer {
    display: flex;
    flex-direction: row;
    margin-top: 0.3em;
}
img {
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.5em;
}
.text {
    text-align: left; /* 将内容左对齐 */
    font-weight: 400;
    color: #455845bf;
}
</style>