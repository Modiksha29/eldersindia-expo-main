import axios from 'provider/http';

export default async function getWallets(page=1, sort, search="*") {
    return await axios.get(`/wallets/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function getWalletsRead(id:string) {
    return await axios.get(`/wallets/read?id=${id}`);
}

export async function updateWallets(wallets) {
    return await axios.post(`/wallets/update`, wallets);
}

export async function destroyWallets(id:string) {
    return await axios.delete(`/wallets/destroy/${id}`);
}