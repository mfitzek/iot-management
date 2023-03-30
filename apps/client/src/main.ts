import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';

import { Quasar, Notify, Dialog } from 'quasar';
//import quasarLang from 'quasar/lang/cs'
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css';

import 'quasar/dist/quasar.css';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(Quasar, {
  plugins: { Notify, Dialog },
  config: {
    notify: {},
  },
});

app.use(pinia);

app.use(router);

app.mount('#app');
