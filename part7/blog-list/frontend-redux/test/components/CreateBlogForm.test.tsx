import { screen, render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { CreateBlogForm } from 'src/components'

test('creating new blog', async () => {
  const blogInfo = {
    title: 'test blog',
    url: 'test-blog',
    author: 'tester',
  }

  const handleOnCreateBlog = vi.fn()

  render(<CreateBlogForm />)

  // click new note button to show form
  await UserEvent.click(await screen.findByTestId('new-note'))

  // input fields
  await UserEvent.type(await screen.findByTestId('title-field'), blogInfo.title)
  await UserEvent.type(await screen.findByTestId('author-field'), blogInfo.author)
  await UserEvent.type(await screen.findByTestId('url-field'), blogInfo.url)

  // click create button
  await UserEvent.click(await screen.findByTestId('create'))

  expect(handleOnCreateBlog.mock.calls[0][0]).toStrictEqual(blogInfo)

  // click new note button to show form
  await UserEvent.click(await screen.findByTestId('new-note'))

  expect(await screen.findByTestId('title-field')).toHaveValue('')
  expect(await screen.findByTestId('author-field')).toHaveValue('')
  expect(await screen.findByTestId('url-field')).toHaveValue('')
})
