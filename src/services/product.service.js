import axiosApiInstance from '@/plugins/api'
const BASE_INVENTORY_ENDPOINT = '/inventory'
const BASE_SALES_ENDPOINT = '/shopping'

export const uploadApi = async (formData) => {
  return await axiosApiInstance.post('/shared/uploads/images', formData)
}

export const createProductApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_INVENTORY_ENDPOINT}/products`, data)
}

export const updateProductApi = async (id, data) => {
  return await axiosApiInstance.put(`${BASE_INVENTORY_ENDPOINT}/products/${id}`, data)
}

export const getProductsApi = async (params) => {
  return await axiosApiInstance.get(`${BASE_INVENTORY_ENDPOINT}/products`, { params })
}

export const getMyProductsApi = async (params) => {
  return await axiosApiInstance.get(`${BASE_INVENTORY_ENDPOINT}/products/me`, { params })
}

export const getProductApi = async (id) => {
  return await axiosApiInstance.get(`${BASE_SALES_ENDPOINT}/products/${id}`)
}

export const searchProductsApi = async (query) => {
  return await axiosApiInstance.get(`${BASE_SALES_ENDPOINT}/products?${query}`)
}
