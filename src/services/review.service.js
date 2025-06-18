import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT_REVIEW = '/reviews'


export const postReviewOrderItemApi = async (orderItemId, data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_REVIEW}/reviews/${orderItemId}`, data)
}

export const getProductReviews = async (productId, data) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_REVIEW}/reviews/products/${productId}`, { params: data })
}


