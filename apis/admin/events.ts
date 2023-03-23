import axios from 'provider/http';

export default async function getAllEvents(page=1, sort, search="*") {
    return await axios.get(`/events/search?page=${page}&sort=${sort}&search=${search}`);
}
export async function getUnapprovedEvents(page=1, sort, search="*", is_approved=false) {
    return await axios.get(`/events/search?page=${page}&sort=${sort}&search=${search}&is_approved=${is_approved}`);
}
export async function getEventCategories() {
    return await axios.get(`/events/category/choice`);
}
export async function getEventSubCategories(categoryId) {
    return await axios.get(`/events/subcategory/choice?category_id=${categoryId}`);
}
export async function createEvent(event) {
    return await axios.post(`/events/create`, event);
}
export async function getEvent(id:string) {
    return await axios.get(`/events/read?id=${id}`);
}
export async function updateEvents(events) {
    return await axios.post(`/events/update`, events);
}
export async function destroyEvents(ids:string) {
    return await axios.post(`/events/destroy/`, {ids});
}
export async function getDestroiedEventsRecord(page=1, sort, search="*") {
    return await axios.get(`/events/deleted`);
}
export async function getCorporatesList() {
    return await axios.get(`/corporates/choice`);
}
export async function getServiceProvidersList() {
    return await axios.get(`/service-providers/choice`);
}
export async function saveEventAsDraft(formData) {
    return await axios.post('/events/update', { ...formData, is_published: false });
  }