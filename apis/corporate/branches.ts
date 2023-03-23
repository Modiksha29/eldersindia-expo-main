import axios from 'provider/http';

export async function createBranch(branch) {
    return await axios.post(`/branch/create`, branch);
}

export default async function getBranch(page=1, sort, search="*") {
    return await axios.get(`/branch/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function getBranchRead(id:string) {
    return await axios.get(`/branch/read?id=${id}`);
}

export async function updateBranch(branch) {
    return await axios.post(`/branch/update`, branch);
}

export async function destroyBranch(id:string) {
    return await axios.post(`/branch/destroy/`, {ids: []});
}