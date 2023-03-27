import { createApp } from 'vue'
import App from './App.vue'
import { ConfigProvider, Select, DatePicker, Tabs } from '@arco-design/web-vue'
import { Plugin, Menu, clientApi } from 'siyuan'

// import '@arco-design/web-vue/dist/arco.css'

// const app = createApp(App)
// app.use(ConfigProvider).use(Select).use(DatePicker).use(Tabs)
// app.mount('#app')

export default class CalendarPlugin extends Plugin {
    public el!: HTMLElement

    constructor() {
        super()
    }

    onload() {
        this.el = document.createElement('div')
        this.el.classList.add('toolbar__item', 'b3-tooltips', 'b3-tooltips__se')
        this.el.setAttribute('aria-label', '打开日历')
        this.el.innerHTML = `<svg><use xlink:href="#iconCalendar"></use></svg>`
        this.el.addEventListener('click', (event) => {
            const ca = document.createElement('div')
            const app = createApp(App)
            app.use(ConfigProvider).use(Select).use(DatePicker).use(Tabs)
            app.mount(ca)
            new Menu('Calendar').addItem({ element: ca }).showAtMouseEvent(event)
            event.stopPropagation()
        })
        clientApi.addToolbarLeft(this.el)
    }

    onunload() {
        this.el?.remove()
    }
}
