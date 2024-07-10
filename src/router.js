import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import EditorPage from './pages/EditorPage.vue'
import EventBus from './EventBus';

const routes = [
  { path: '/', component: HomePage },
  { path: '/editor', component: EditorPage}
]


export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
    EventBus.$emit("windowSizeChanged");
    next();
  });