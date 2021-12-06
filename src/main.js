import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './element-theme/index.css'
import qs from 'qs'
// Vue.prototype.$ajax = axios

const app = createApp(App)
installElementPlus(app)
app.use(VueAxios, axios)
app.use(router).mount('#app')
axios.defaults.baseURL = "/api"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
