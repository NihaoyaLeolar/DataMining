<template>
    <MiningLayout>
        <router-view></router-view>
    </MiningLayout>
</template>

<script>
import MiningLayout from "../../components/layout/MiningLayout.vue";

export default {
    components: { MiningLayout },
    methods: {
        next() {
            this.$store.commit("incrementMiningStep");
        },
    },
};
</script>

<style>
.body {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>