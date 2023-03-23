import axios from 'provider/http';

export async function createBlogs(blog) {
    return await axios.post(`/blogs/create`, blog);
}

export default async function getBlogs(page=1, sort, search="*") {
    return await axios.get(`/blogs/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function getBlogsRead(id:string) {
    return await axios.get(`/blogs/read?id=${id}`);
}

export async function updateBlogs(blogs) {
    return await axios.post(`/blogs/update`, blogs);
}

export async function destroyBlogs(id:string) {
    return await axios.post(`/blogs/destroy/`, {ids: []});
}