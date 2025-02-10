import { FormEventHandler, useState } from 'react'
import { useCreateMutation } from 'src/stores/blog-tanstack-query'
import { pushNotification } from 'src/stores/notifaction-jotai'
import { useField } from 'src/hooks/useField'
import { Button } from './Button'
import { Input } from './Input'

export const CreateBlogForm = () => {
  const [display, setDisplay] = useState(false)

  const title = useField()
  const author = useField()
  const url = useField()

  const { mutateAsync: createBlog } = useCreateMutation()

  const resetCreateBlogForm = () => {
    title.onReset()
    author.onReset()
    url.onReset()
    setDisplay(false)
  }

  const handleOnCreateBlog = async (payload) => {
    const newBlog = await createBlog(payload)
    pushNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()
    const payload = { title: title.value, author: author.value, url: url.value }
    await handleOnCreateBlog(payload)
    resetCreateBlogForm()
  }

  if (!display) {
    return (
      <div>
        <Button data-testid="new-note" onClick={() => setDisplay(true)}>
          new note
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-1 max-w-64">
      <div>
        <label className="flex">
          <span>title:</span>
          <Input data-testid="title-field" {...title} />
        </label>
      </div>

      <div>
        <label className="flex">
          <span>author:</span>
          <Input data-testid="author-field" {...author} />
        </label>
      </div>

      <div>
        <label className="flex">
          <span>url: </span>
          <Input data-testid="url-field" {...url} />
        </label>
      </div>

      <div className="flex gap-1 mt-3">
        <Button data-testid="create" type="submit">
          create
        </Button>
        <Button onClick={() => setDisplay(false)}>cancel</Button>
      </div>
    </form>
  )
}
