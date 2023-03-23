import axios from 'provider/http';

export async function createLastMilePartner(lastmilepartner) {
    return await axios.post(`/last-mile-partner/create`, lastmilepartner);
}

export default async function getLastMilePartner(page=1, sort, search="*") {
    return await axios.get(`/last-mile-partner/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function getLastMilePartnerRead(id:string) {
    return await axios.get(`/last-mile-partner/read?id=${id}`);
}

export async function updateLastMilePartner(lastmilepartner) {
    return await axios.post(`/last-mile-partner/update`, lastmilepartner);
}

export async function destroyLastMilePartner(id:string) {
    return await axios.post(`/last-mile-partner/destroy/`, {ids: []});
}