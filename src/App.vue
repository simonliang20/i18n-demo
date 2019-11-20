<template>
  <div id="app">
    <!-- 切换语言 -->
    <label for>选择语言：</label>
    <select v-model="locale">
      <option
        v-for="(locale, index) in locales"
        :key="index"
        :value="locale.value"
      >{{ locale.label }}</option>
    </select>
    <!-- 渲染内容 -->
    <h1>{{ $t('message') }}</h1>
    <!-- 标签属性 -->
    <input type="text" :placeholder="$t('pleaseEnter')" />
    <!-- 计算属性列表渲染 -->
    <ul>
      <li v-for="(fruit, index) in fruits" :key="index">{{ fruit.label }}</li>
    </ul>
  </div>
</template>
<script>
import { getList } from "./config/list";

export default {
  data() {
    return {
      locale: this.$i18n.locale, //使用i18n实例默认定义的语言
      locales: [
        {
          value: "en",
          label: "英文"
        },
        {
          value: "zh-CN",
          label: "中文简体"
        },
        {
          value: "zh-TW",
          label: "中文繁體"
        }
      ],
    };
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },
  computed: {
    fruits() {
      return [
        {
          value: 1,
          label: this.$t("apple") // 列表中的数据支持多语言
        },
        {
          value: 2,
          label: this.$t("banana")
        }
      ];
    },
    list() {
      return getList();
    }
  },
  mounted() {
    console.log(this.$t());
  }
};
</script>
<style>
#app {
}
</style>
