import api from "../config"

export const getAllCategories = async () => {
    const res = await api.get("/categories")
    return res.data
}