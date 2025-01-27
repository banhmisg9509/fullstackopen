const sortBlogs = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs
}

const ownBlog = (user, blog) => user.username === blog.user.username

export { sortBlogs, ownBlog }
