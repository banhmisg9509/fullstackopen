import { screen, render } from '@testing-library/react'
import CreateBlogForm from '../../src/components/CreateBlogForm'
import UserEvent from '@testing-library/user-event'

test('creating new blog', async () => {
  const blogInfo = {
    title: 'test blog',
    url: 'test-blog',
    author: 'tester',
  }

  const handleOnCreateBlog = vi.fn()

  render(<CreateBlogForm onCreateBlog={handleOnCreateBlog} />)

  // click new note button to show form
  await UserEvent.click(await screen.findByTestId('new-note'))

  // input fields
  await UserEvent.type(await screen.findByTestId('title'), blogInfo.title)
  await UserEvent.type(await screen.findByTestId('author'), blogInfo.author)
  await UserEvent.type(await screen.findByTestId('url'), blogInfo.url)

  // click create button
  await UserEvent.click(await screen.findByTestId('create'))

  expect(handleOnCreateBlog.mock.calls[0][0]).toStrictEqual(blogInfo)

  // click new note button to show form
  await UserEvent.click(await screen.findByTestId('new-note'))

  expect(await screen.findByTestId('title')).toHaveValue('')
  expect(await screen.findByTestId('author')).toHaveValue('')
  expect(await screen.findByTestId('url')).toHaveValue('')
})
