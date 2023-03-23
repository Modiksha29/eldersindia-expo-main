import axios from 'provider/http';

export default async function getAllNews(page=1, sort, search="*") {
    return await axios.get(`/news/search?page=${page}&sort=${sort}&search=${search}`);
}
export async function getUnapprovedNews(page=1, sort, search="*", is_approved=false) {
    return await axios.get(`/news/search?page=${page}&sort=${sort}&search=${search}&is_approved=${is_approved}`);
}
export async function getNewsCategories() {
    return await axios.get(`/news/category/choice`);
}
export async function getNewsSubCategories(categoryId) {
    return await axios.get(`/news/subcategory/choice?category_id=${categoryId}`);
}
export async function createNews(news) {
    return await axios.post(`/news/create`, news);
}
export async function newsReaction(id:string, reaction:string) {
    return await axios.post(`/news/reaction`, {id, reaction: "like", user_id: "d2a0e52d-91bb-3960-b049-5c4db641632a"});
}
export async function newsBookmark(id:string) {
    return await axios.post(`/news/bookmark`, {id});
}
export async function getNews(id:string) {
    return await axios.get(`/news/read?id=${id}`);
}
export async function updateNews(news) {
    return await axios.post(`/news/update`, news);
}
export async function saveNewsAsDraft(formData) {
    return await axios.post('/news/update', { ...formData, is_published: false });
}
export async function destroyNews(ids:string) {
    return await axios.post(`/news/destroy`, {ids});
}
export async function getDestroiedNewsRecord(page=1, sort, search="*") {
    return await axios.get(`/news/deleted`);
}
export async function getCorporatesList() {
    return await axios.get(`/corporates/choice`);
}
export async function getServiceProvidersList() {
    return await axios.get(`/service-providers/choice`);
}