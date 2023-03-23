import axios from 'provider/http';

export default async function getCorporates(page=1, sort, search="*") {
    return await axios.get(`/corporates/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function get_Corporates(id:string) {
    return await axios.get(`/corporates/read?id=${id}`);
}

export async function updateCorporates(corporates) {
    return await axios.post(`/corporates/update`, corporates);
}

export async function destroyCorporates(id:string) {
    return await axios.delete(`/corporates/destroy/${id}`);
}