declare module '*.vue' {
  import Vue from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default Vue;
}

