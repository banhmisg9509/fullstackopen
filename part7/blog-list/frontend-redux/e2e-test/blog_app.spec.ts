import { test, expect, Page } from '@playwright/test'

const baseURL = 'http://localhost:5173'
const backendBaseURL = 'http://localhost:3001'
const users = [
  {
    name: 'Hung Nguyen',
    username: 'ndhung',
    password: '123456',
  },
  {
    name: 'Tri Nguyen',
    username: 'nvtri',
    password: '123456',
  },
]
const loginWith = async (page: Page, username: string, password: string) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByText('Login').click()
  await page.locator('h2').waitFor({ state: 'visible' })
}

const createBlog = async (page: Page, blog: any) => {
  // click button to show form
  await page.getByTestId('new-note').click()

  // fill form
  await page.getByTestId('title-field').fill(blog.title)
  await page.getByTestId('author-field').fill(blog.author)
  await page.getByTestId('url-field').fill(blog.url)

  // click button to creating a new blog
  await page.getByTestId('create').click()
}

test.describe('Blog App', () => {
  test.beforeAll(async ({ request }) => {
    await request.post(`${backendBaseURL}/api/testing/reset`)
    await request.post(`${backendBaseURL}/api/testing/createUser`, {
      data: { users },
    })
  })

  test.beforeEach(async ({ page, request }) => {
    await page.goto(baseURL)
  })

  test.describe('Login', () => {
    test('Login form is shown', async ({ page }) => {
      const title = page.getByText('Log in to application')
      const usernameLabel = page.getByText('username')
      const passwordLabel = page.getByText('password')
      const usernameInput = page.getByTestId('username')
      const passwordInput = page.getByTestId('password')

      await expect(title).toBeVisible()
      await expect(usernameLabel).toBeVisible()
      await expect(usernameInput).toBeVisible()
      await expect(passwordLabel).toBeVisible()
      await expect(passwordInput).toBeVisible()
    })

    test('Login succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, users[0].username, users[0].password)

      const title = page.getByText('blogs')
      const userStatus = page.getByText(`${users[0].name} logged in`)

      await expect(title).toBeVisible()
      await expect(userStatus).toBeVisible()
    })

    test('Login fails with wrong credentials', async ({ page }) => {
      await loginWith(
        page,
        users[0].username,
        users[0].password + users[0].password
      )

      const notification = page.getByText('Invalid username or password')

      await expect(notification).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, users[0].username, users[0].password)
    })

    test('user can create a blog', async ({ page }) => {
      const blog = {
        title: 'Blog Title 1',
        author: 'Author',
        url: 'blog-title',
      }
      await createBlog(page, blog)

      await expect(
        page.getByText(`a new blog ${blog.title} by ${blog.author} added`)
      ).toBeVisible()

      await expect(
        page.getByText(`${blog.title} by ${blog.author}`, { exact: true })
      ).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
      const blog = {
        title: 'Blog Title 2',
        author: 'Author',
        url: 'blog-title-2',
      }
      await createBlog(page, blog)

      // click button to show blog detail
      await page.getByTestId(`blog ${blog.title}`).getByTestId('view').click()

      await expect(page.getByText('likes 0')).toBeVisible()

      // click the like button and hope that the number of likes will be increased by 1
      await page.getByTestId('like').click()

      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('user can delete a blog', async ({ page }) => {
      const blog = {
        title: 'Blog Title 3',
        author: 'Author',
        url: 'blog-title-3',
      }
      await createBlog(page, blog)

      await expect(
        page.getByText(`${blog.title} by ${blog.author}`, { exact: true })
      ).toHaveCount(1)

      const blogListLength = await page
        .locator('[data-testid="blog-list"] > div')
        .count()

      await page.getByTestId(`blog ${blog.title}`).getByTestId('view').click()

      page.on('dialog', (dialog) => dialog.accept())
      await page.getByTestId('remove').click()

      await expect(
        page.getByText(`${blog.title} by ${blog.author}`, { exact: true })
      ).toHaveCount(0)

      expect(
        await page.locator('[data-testid="blog-list"] > div').count()
      ).toBe(blogListLength - 1)
    })

    test('only owner see the remove button', async ({ page }) => {
      const blog = {
        title: 'Blog Title 4',
        author: 'ndhung',
        url: 'blog-title-4',
      }

      await createBlog(page, blog)

      await page.getByTestId('logout').click()

      await loginWith(page, users[1].username, users[1].password)

      await page.getByTestId(`blog ${blog.title}`).getByTestId('view').click()

      await expect(page.getByTestId('remove')).toHaveCount(0)
    })
  })

  test.describe('Sorted blogs', () => {
    const blogs = [
      { title: 'Blog 1', author: 'author', url: 'blog-1' },
      { title: 'Blog 2', author: 'author', url: 'blog-2' },
      { title: 'Blog 3', author: 'author', url: 'blog-3' },
    ]
    test.beforeAll(async ({ request }) => {
      await request.post(`${backendBaseURL}/api/testing/reset`)
      await request.post(`${backendBaseURL}/api/testing/createUser`, {
        data: { users },
      })
    })

    test.beforeEach(async ({ page }) => {
      await loginWith(page, users[0].username, users[0].password)

      for (const blog of blogs) {
        await createBlog(page, blog)
      }
    })

    test('blogs are sorted based on likes', async ({ page }) => {
      const lastBlog = page.getByTestId(`blog ${blogs[blogs.length - 1].title}`)

      const lastBlogViewButton = lastBlog.getByTestId('view')

      await lastBlogViewButton.click()

      const likeButton = lastBlog.getByTestId('like')

      await likeButton.click()
      await expect(page.getByText('likes 1')).toBeVisible()

      await likeButton.click()
      await expect(page.getByText('likes 2')).toBeVisible()

      await likeButton.click()
      await expect(page.getByText('likes 3')).toBeVisible()

      await lastBlogViewButton.click()

      const firstBlog = page.locator('[data-testid="blog-list"] > div').first()

      const firstBlogTitle = firstBlog.getByTestId('title')
      const lastBlogTitle = lastBlog.getByTestId('title')

      expect(await firstBlogTitle.innerText()).toBe(
        await lastBlogTitle.innerText()
      )
    })
  })
})
