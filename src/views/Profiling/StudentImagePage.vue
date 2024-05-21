<template>
    <profiling-layout>
        <router-view></router-view>
    </profiling-layout>
</template>

<script>
import ProfilingLayout from "../../components/layout/ProfilingLayout.vue";

export default {
    components: {
        ProfilingLayout,
    },
    data() {
        return {};
    },
};
</script>
