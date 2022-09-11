import axios from '@/plugins/axios'

export function register(registerForm) {
    return axios({
        url: 'register',
        method: 'POST',
        data: {
            ...registerForm
        }
    })
}