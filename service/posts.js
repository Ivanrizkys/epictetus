import api from "../config"

export const getAllPost = async () => {
    const res = await api.get("/posts?populate=*")
    return res.data
}

export const getFeaturedPost = async () => {
    const res = await api.get("/posts?filters[featured][$eq]=true&populate=*")
    return res.data
}

export const getDetailPost = async (slug) => {
    const res = await api.get(`/posts?filters[slug][$eq]=${slug}&populate=*`)
    return res.data
}