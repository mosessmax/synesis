import { defineStore } from 'pinia'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        currentUser: (state) => state.user,
    },
    actions: {
        setUser(userData) {
            this.user = userData
        },
        setToken(token) {
            this.token = token
            localStorage.setItem('token', token)
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
        },
        async fetchUser() {
            const response = await fetch('/api/user', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
            if (response.ok) {
                const userData = await response.json()
                this.setUser(userData)
            } else {
                // Handle error
            }
        },
    },
})