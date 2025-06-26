import axiosApiInstance from '@/plugins/api'
const BASE_ENDPOINT_REVIEW = '/reviews'


export const postReviewOrderItemApi = async (orderItemId, data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_REVIEW}/reviews/${orderItemId}`, data)
}

export const getProductReviews = async (productId, data) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_REVIEW}/reviews/products/${productId}`, { params: data })
}

export const getReviewables = async ({pageIndex}) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_REVIEW}/orders/me/reviewable?PageIndex=${pageIndex}&SortBy=CreatedAt&isDescending=true`)
}

export const getMeReviews = async ({pageIndex}) => {
  return await axiosApiInstance.get(`${BASE_ENDPOINT_REVIEW}/reviews/me?PageIndex=${pageIndex}&SortBy=CreatedAt&isDescending=true`)
}

export const postReview = async (id, data) => {
  return await axiosApiInstance.post(`${BASE_ENDPOINT_REVIEW}/reviews/${id}`, data)
}

