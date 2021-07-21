import axios from 'axios'

export async function login(username: string, password: string) {
    const result = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password,
    })
    return result
}