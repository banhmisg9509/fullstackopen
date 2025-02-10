import { FormEventHandler, useState } from 'react'
import { useField } from 'src/hooks/useField'
import { useCreateMutation } from 'src/stores/blog'
import { pushNotification } from 'src/stores/notification/action'
import { Button } from './Button'
import { Input } from './Input'

export const CreateBlogForm = () => {
  const [display, setDisplay] = useState(false)
  const title = useField('')
  const author = useField('')
  const url = useField('')

  const [createBlog] = useCreateMutation()

  const resetCreateBlogForm = () => {
    title.onReset()
    author.onReset()
    url.onReset()
    setDisplay(false)
  }

  const handleOnCreateBlog = async (payload) => {
    const newBlog = await createBlog(payload).unwrap()
    pushNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()
    const payload = { title, author, url }
    await handleOnCreateBlog(payload)
    resetCreateBlogForm()
  }

  if (!display) {
    return (
      <div>
        <button
          data-testid="new-note"
          onClick={() => setDisplay(true)}
          className="border border-black px-2 active:bg-gray-100"
        >
          new note
        </button>
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

