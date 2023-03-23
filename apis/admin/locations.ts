import axios from 'provider/http';

export default async function getLocations(page: number, sort, search="*", tier, from_date, to_date) {
    return await axios.get(`/locations/search?page=${page}&sort=${sort}&search=${search}&tier=${tier}${from_date !== undefined ? '&from_date='+from_date : ''}${to_date !== undefined ? '&to_date='+to_date : ''}`);
}

export async function getLocation(id:string) {
    return await axios.get(`/locations/read?id=${id}`);
}

export async function updateLocation(location:object) {
    return await axios.put(`/locations/update`, location);
}

export async function destroyLocation(id:string) {
    return await axios.delete(`/locations/destroy/${id}`);
}