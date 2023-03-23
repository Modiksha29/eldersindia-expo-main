import axios from 'provider/http';

export default async function getNews(page=1, sort, search="*") {
    return await axios.get(`/news/search?page=${page}&sort=${sort}&search=${search}`);
}

export async function createNews(news) {
    return await axios.post(`/blogs/create`, news);
}

export async function getNewsRead(id:string) {
    return await axios.get(`/news/read?id=${id}`);
}

export async function updateNews(news) {
    return await axios.post(`/news/update`, news);
}

export async function destroyNews(id:string) {
    return await axios.delete(`/news/destroy/${id}`);
}