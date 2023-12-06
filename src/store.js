// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 在这里定义你的全局状态
        // 在组件中的访问能方式：this.$store.state.currentStep;
        currentStep: 1,  // 初始值为1
        classNumber: 0,  //用户选择的知识挖掘类型
        miningTaskDescription: "",
    },
    mutations: {
        // 在这里定义你的状态变更方法，我这里定义了三个
        // 在组件中的调用方式：this.$store.commit('setCurrentStep', newStepValue);
        setCurrentStep(state, step) {
            state.currentStep = step;
        },
        //在组件中的调用方式：this.$store.commit('incrementStep')
        incrementStep(state) {
            state.currentStep++
        },
        decrementStep(state) {
            state.currentStep--
        },
        // 在组件中的调用方式：this.$store.commit('setClassNumber', newNumber);
        setClassNumber(state, number) {
            state.classNumber = number;
        },
        // 在组件中的调用方式：this.$store.commit('setMiningTaskDescription', description);
        setMiningTaskDescription(state, description) {
            state.miningTaskDescription = description;
        }

    },
    actions: {
        // 在这里定义你的异步操作方法
    },
    getters: {
        // 在这里定义你的状态获取方法
    }
})

export default store