import axios from 'provider/http';

export default async function login(login:object) {
    return await axios.post(`/auth/login`, login)
}

export async function verifyOtp(otp:object) {
    return await axios.post('/auth/verify-otp', otp)
}
