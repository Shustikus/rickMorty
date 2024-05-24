import { createRouter, createWebHistory } from 'vue-router'

// Компоненты страниц
import CharactersView from './views/CharactersView.vue'

// Создание роутера с правильной базой
const router = createRouter({
    history: createWebHistory('/rickmorty/'), // Замените 'rickmorty' на название вашего репозитория
    routes: [
        {
            path: '/',
            name: 'Home',
            component: CharactersView,
        },
    ],
})

export default router