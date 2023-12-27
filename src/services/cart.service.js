import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT_SALE = '/shopping'

export const addToCartApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_SALE}/users/cart`, data)
}

export const getCartApi = async () => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_SALE}/users/me/cart`)
}


