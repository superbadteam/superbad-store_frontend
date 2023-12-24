import axiosApiInstance from '@/plugins/api'

export const getCategoriesApi = async () => {
  return await axiosApiInstance.get(`inventory/categories`)
}
