import axios from 'axios';
export function logMiddleware({ to, from, next }) {
    console.log('middleware')
    next()
}

export async function checkAuth({ to, from, next }) {
    try {
        const response = await axios.get('http://localhost:8080/auth/check', { withCredentials: true })
        if (response.data.id) {
            localStorage.setItem('user_id', response.data.id)
        } else {
            localStorage.removeItem('user_id')
        }
        next()
    } catch (error) {
        localStorage.removeItem('user_id')
        next('/login')
    }
}
