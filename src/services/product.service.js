import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT = '/inventory'

export const uploadApi = async (formData) => {
  return await axiosApiInstance.post('/shared/uploads/images', formData)
}

export const createProductApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT}/products`, data)
}

export const getProductsApi = async (params) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT}/products`, { params })
}

export const getMyProductsApi = async (params) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT}/products/me`, { params })
}

export const getProductApi = async (id) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT}/products/me/${id}`)
}
