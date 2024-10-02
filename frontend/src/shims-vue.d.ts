import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
  }
}

export {};
