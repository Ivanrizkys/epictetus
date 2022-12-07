import api from "../config"

export const getAuthor = async () => {
    const req = await api.get("/authors?populate=*")
    return req.data
}