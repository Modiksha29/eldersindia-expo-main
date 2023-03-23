import axios from 'provider/http';

export default async function getServiceProviders(page=1, sort, search="*") {
    return await axios.get(`/service-providers/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function get_ServiceProviders(id:string) {
    return await axios.get(`/service-providers/read?id=${id}`);
}

export async function updateServiceProviders(serviceProviders) {
    return await axios.post(`/service-providers/update`, serviceProviders);
}

export async function destroyServiceProviders(id:string) {
    return await axios.delete(`/service-providers/destroy/${id}`);
}