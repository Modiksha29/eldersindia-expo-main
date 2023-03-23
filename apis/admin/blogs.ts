import axios from 'provider/http';

export async function createBlog(blog) {
    return await axios.post(`/blogs/create`, blog);
}
export async function getBlogCategories() {
    return await axios.get(`/blogs/category/choice`);
}
export async function getBlogSubCategories(categoryId) {
    return await axios.get(`/blogs/subcategory/choice?category_id=${categoryId}`);
}
export async function getCorporatesList() {
    return await axios.get(`/corporates/choice`);
}
export async function getServiceProvidersList() {
    return await axios.get(`/service-providers/choice`);
}
export default async function getAllBlogs(page=1, sort, search="*") {
    return await axios.get(`/blogs/search?page=${page}&sort=${sort}&search=${search}`);
}
export async function getUnapprovedBlogs(page=1, sort, search="*", is_approved=false) {
    return await axios.get(`/blogs/search?page=${page}&sort=${sort}&search=${search}&is_approved=${is_approved}`);
}
export async function getBlog(id:string) {
    return await axios.get(`/blogs/read?id=${id}`);
}
export async function updateBlogs(blogs) {
    return await axios.post(`/blogs/update`, blogs);
}
export async function blogsReaction(id:string, reaction:string) {
    return await axios.post(`/blogs/reaction`, {id, reaction: "like", user_id: "d2a0e52d-91bb-3960-b049-5c4db641632a"});
}
export async function blogsBookmark(id:string) {
    return await axios.post(`/blogs/bookmark`, {id});
}
export async function destroyBlogs(ids:string) {
    return await axios.post(`/blogs/destroy`, {ids});
}
export async function getDestroiedBlogsRecord(page=1, sort, search="*") {
    return await axios.get(`/blogs/deleted`);
}
export async function saveBlogAsDraft(formData) {
    return await axios.post('/blogs/update', { ...formData, is_published: false });
}