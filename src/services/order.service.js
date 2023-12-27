import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT_SALE = '/orders'

/**
 *
 * @param {*} data
 * @param {"TakeFormCart" | "Direct"} method
 * @returns
 */
export const orderApi = async (data, method) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_SALE}/orders?method=${method}`, data)
}

export const getTrackingApi = async (id) => {
  return await axiosApiInstance.get(`https://658c0196859b3491d3f54467.mockapi.io/tracking-order?code=${id}`)
}
