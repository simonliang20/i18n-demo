#### 前言

最近在做一个香港的项目，需要项目支持简体中文、繁体中文和英文。经调研后，使用Vue生态中比较成熟的是`vue-i18n`。项目实战时，自己也积累了些有用的经验，写出来和大家分享。

#### 基本使用

这里默认各位看官使用`Vue-cli`搭建前端工程。

##### 1.安装：
```
npm i vue-i18n --save
```

##### 2.在`src`目录下创建`i18n`目录，放置多语言相关代码

##### 3.在`i18n`目录创建`locale`，放置语言包

语言包一般使用`json`形式存储，我们创建简体中文、繁体中文和英文三个语言包：
```
zh-CN.json

{
    "message": "你好，中国",
    "pleaseEnter": "请输入内容",
    "apple": "苹果",
    "banana": "香蕉"
}
```
```
zh-HK.json

{
    "message": "你好，中國",
    "pleaseEnter": "請輸入内容",
    "apple": "蘋果",
    "banana": "香蕉"
}
```
```
en.json

{
    "message": "hello, china",
    "pleaseEnter": "please enter content",
    "apple": "apple",
    "banana": "banana"
}
```

##### 4.在`i18n`目录下创建`index.js`，创建`i18n`实例：

```
import Vue from 'vue';
import VueI18n from 'vue-i18n';

// 导入语言包信息
import en from "./locale/en.json";
import zhCN from "./locale/zh-CN.json";
import zhTW from "./locale/zh-TW.json";

// 注册i18n
Vue.use(VueI18n);

// 语言包根据语言环境分类
const messages = {
    en,
    "zh-CN": zhCN,
    "zh-TW": zhTW,
}

// 通过选项创建 VueI18n 实例并导出
export default new VueI18n({
    locale: 'zh-CN', // 设置当前语言环境，默认中文简体
    messages, // 设置语言环境对应信息
})
```

##### 5.注册i18n到Vue实例中

```
main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n';// 引入i18n实例

new Vue({
  router,
  store,
  i18n, // 挂载到根实例中
  render: h => h(App)
}).$mount('#app')
```

##### 6.在组件中使用

页面或组件中，一般使用多语言比较多的三种情况：

- html标签里的渲染内容
- html标签上的属性
- 组件中的多语言数据

其实这三种情况都依赖于`i18n`挂载后的全局`$t`方法。

这里在`App.vue`中展示一下写法：

```
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
      ]
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
    }
  },
  mounted() {
    console.log(this.$t());
  }
};
</script>
```

##### 7.运行，得到下面的页面交互：



#### 可读性

通过看上面的代码，我们会发现多语言写的代码可读性很差，当页面都是用多语言，看到项目都是类似于`$t("message")`这种写法，简直就是噩梦。

那么怎么可以增强可读性呢？其实已经有大佬在前面踩坑了，**通过IDE插件来解决**！！

这里推荐`VSCode`的`Vue i18n Ally`，使用三步走：

- 搜索`Vue i18n Ally`并安装；
- 安装完后，应该会自动检测到你的项目多语言目录；
- 配置一下代码提示改为简体中文：快捷键`ctrl+shift+p`，顶部弹出搜索框输入`Vue i18n ally: Change display language`，选择`zh-CN`。

ok，然后IDE就会帮你的代码增强可读性，看图：

![image](https://note.youdao.com/favicon.ico)

#### 样式

设计稿给我们一般是以简体中文来写样式的，但由于英文和中文长度不一致，会导致样式错乱问题，所以需要要求设计一开始要留意这个点。一般有两种方案：

1. 设计稿两套UI、前端两套样式；
2. 设定稿设计时兼容两种情况，位置留足给英文（英文一般比中文长）。

#### 配置文件多语言

配置文件一般是单独放到文件中，不在组件或页面中`$t`方法，要想使用多语言，可以将配置文件写成函数，比如：

```
src/config/list.js

export con
```

#### 参考