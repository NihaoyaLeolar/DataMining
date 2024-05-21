<template>
  <div class="card">
    <table>
      <thead>
        <tr>
          <th class="left-align">特征字段</th>
          <th class="left-align">值</th>
          <th class="left-align">选中</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, index) in fields" :key="index" :class="{ 'selected': field.selected }" @click="toggleSelection(field)">
          <td class="left-align">{{ field.name }}</td>
          <td class="left-align">{{ field.value }}</td>
          <td class="left-align">
            <input type="checkbox" v-model="field.selected" @click.stop>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="submitSelection">生成知识</button>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedFields: [],
    };
  },
  methods: {
    toggleSelection(field) {
      field.selected = !field.selected;
    },
    submitSelection() {
      this.selectedFields = this.fields.filter((field) => field.selected).map((field) => field.type);
      alert('选中的字段：' + this.selectedFields.join(', '));
    },
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: medium; /* 文字大小 */
}

th {
  text-align: left;
  font-size: larger; /* 文字大小 */
  color: #4caf50; /* 文字颜色 */
  background-color: #f2f2f2;
}

.left-align {
  text-align: left; /* 左对齐样式 */
}


input[type="checkbox"]:checked {
  border-color: #4caf50;
}

button {
  padding: 10px 20px;
  background-color: #4caf50; /* 按钮背景色 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0ea112; /* 鼠标悬停时按钮背景色 */
}
</style>
