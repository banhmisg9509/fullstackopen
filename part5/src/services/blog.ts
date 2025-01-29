import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}
const removeBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`)
  return response.data
}

export default { getAll, createBlog, updateBlog, removeBlog }
