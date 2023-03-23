import axios from 'provider/http';

export default async function logout() {
    return await axios.get(`/user/logout`);
}