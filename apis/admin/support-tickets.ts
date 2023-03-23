import axios from 'provider/http';

export default async function getSupportTicket(page=1, sort, search="*") {
    return await axios.get(`/support-tickets/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function get_SupportTicket(id:string) {
    return await axios.get(`/support-tickets/read?id=${id}`);
}

export async function updateSupportTicket(supportticket) {
    return await axios.put(`/support-tickets/update`, supportticket);
}

export async function destroySupportTicket(id:string) {
    return await axios.delete(`/support-tickets/destroy/${id}`);
}