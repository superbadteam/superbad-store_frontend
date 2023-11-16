import axiosApiInstance from '@/plugins/api'
export const getUsersApi = async () => {
  return await axiosApiInstance.get('/users')
}
export const updateUserApi = async (id, data) => {
  delete data.id
  delete data.isEmailVerified
  delete data.balance
  return await axiosApiInstance.patch(`/users/${id}`, data)
}
