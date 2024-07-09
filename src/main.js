import { createApp } from 'vue'
import App from './App.vue'

//Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';

library.add(faHtml5);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
