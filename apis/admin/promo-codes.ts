import axios from 'provider/http';

export default async function getPromocodes(page=1, sort, search="*") {
    return await axios.get(`/promocodes/search?page=${page}&sort=${sort}&search=${search}`);
}
export async function createPromocodes(blog) {
    return await axios.post(`/blogs/create`, blog);
}

export async function getPromocodesRead(id:string) {
    return await axios.get(`/promocodes/read?id=${id}`);
}

export async function updatePromocodes(promocodes) {
    return await axios.post(`/promocodes/update`, promocodes);
}

export async function destroyPromocodes(id:string) {
    return await axios.delete(`/promocodes/destroy/${id}`);
}