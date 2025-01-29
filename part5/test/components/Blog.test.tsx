import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'

test('only title and author appeared initially', () => {
  const blog = {
    title: 'Blog Title',
    author: 'ndhung',
    url: 'blog-title',
    likes: 69,
  }

  render(
    <Blog
      blog={blog}
      onLike={() => {}}
      onRemove={() => {}}
      showRemoveButton={true}
    />
  )

  const element = screen.getByTestId('title')

  expect(element.innerText).toBe(`${blog.title} by ${blog.author}`)
})

test('render url and likes are shown when clicking view button', async () => {
  const blog = {
    title: 'Blog Title',
    author: 'ndhung',
    url: 'blog-title',
    likes: 69,
    user: {
      name: 'Tester Nguyen',
    },
  }

  render(
    <Blog
      blog={blog}
      onLike={() => {}}
      onRemove={() => {}}
      showRemoveButton={true}
    />
  )

  const viewButton = screen.getByTestId('view')
  await UserEvent.click(viewButton)

  const urlElement = screen.getByTestId('url')
  const likesElement = screen.getByTestId('likes')

  expect(urlElement.innerText).toBe(blog.url)
  expect(likesElement.innerText).toBe(`likes ${blog.likes}`)
})

test('click like button twice', async () => {
  const blog = {
    title: 'Blog Title',
    author: 'ndhung',
    url: 'blog-title',
    likes: 69,
    user: {
      name: 'Tester Nguyen',
    },
  }

  const onLikeHander = vi.fn()

  render(
    <Blog
      blog={blog}
      onLike={onLikeHander}
      onRemove={() => {}}
      showRemoveButton={true}
    />
  )

  const viewButton = screen.getByTestId('view')
  await UserEvent.click(viewButton)

  const likeButton = screen.getByTestId('like')
  await UserEvent.click(likeButton)
  await UserEvent.click(likeButton)

  expect(onLikeHander).toHaveBeenCalledTimes(2)
})
