// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 在这里定义你的全局状态
        // 在组件中的访问能方式：this.$store.state.currentStep;
        currentMiningStep: 1,  // 初始值为1
        miningClassNumber: 0,  //用户选择的知识挖掘类型
        miningTaskDescription: "",
        miningRecord: null,
        miningRequest: null,
        miningResult: null,
        selectedNames: null,  //用户在看到知识挖掘结果后，选择要生成知识的字段名组成的list
        knowledgeList: null,

        currentProfilingStep: 1,
        profileData: null
    },
    mutations: {
        // 在这里定义你的状态变更方法，我这里定义了三个
        // 在组件中的调用方式：this.$store.commit('setCurrentStep', newStepValue);
        setCurrentMiningStep(state, step) {
            state.currentMiningStep = step;
        },
        //在组件中的调用方式：this.$store.commit('incrementStep')
        incrementMiningStep(state) {
            state.currentMiningStep++
        },
        decrementMiningStep(state) {
            state.currentMiningStep--
        },
        // 在组件中的调用方式：this.$store.commit('setClassNumber', newNumber);
        setMiningClassNumber(state, number) {
            state.miningClassNumber = number;
        },
        // 在组件中的调用方式：this.$store.commit('setMiningTaskDescription', description);
        setMiningTaskDescription(state, description) {
            state.miningTaskDescription = description;
        },

        clearProfileData(state) {
            state.profileData = null;
        },
        updateProfileData(state, newData) {
            state.profileData = newData;
        },

        updateMiningRecord(state, record) {
            state.miningRecord = record;
        },
        clearMiningRecord(state) {
            state.miningRecord = null;
        },

        updateMiningRequest(state, request) {
            state.miningRequest = request;
        },
        clearMiningRequest(state) {
            state.miningRequest = null;
        },

        updateMiningResult(state, result) {
            state.miningResult = result;
        },
        clearMiningResult(state) {
            state.miningResult = null;
        },

        updateSelectedNames(state, names) {
            state.selectedNames = names;
        },
        clearSelectedNames(state) {
            state.selectedNames = null;
        },

        updateKnowledgeList(state, list) {
            state.knowledgeList = list;
        },
        clearKnowledgeList(state) {
            state.knowledgeList = null;
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