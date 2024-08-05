import axios from 'axios';

export async function checkAuth({ to, from, next }: { to: any; from: any; next: any }) {
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
