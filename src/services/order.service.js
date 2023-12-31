import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT_ORDERS = '/orders'

/**
 *
 * @param {*} data
 * @param {"TakeFormCart" | "Direct"} method
 * @returns
 */
export const orderApi = async (data, method) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_ORDERS}/orders?method=${method}`, data)
}

export const getTrackingApi = async (id) => {
  return await axiosApiInstance.get(`https://658c0196859b3491d3f54467.mockapi.io/tracking-order?code=${id}`)
}

export const addTrackingApi = async (data) => {
  return await axiosApiInstance.post(`https://658c0196859b3491d3f54467.mockapi.io/tracking-order`, data)
}

export const getLocationApi = async () => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_ORDERS}/locations`)
}

export const addNewShippingAddressApi = async (data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_ORDERS}/users/me/shipping-addresses`, data)
}

export const getShippingAddressApi = async () => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_ORDERS}/users/me/shipping-addresses`)
}
