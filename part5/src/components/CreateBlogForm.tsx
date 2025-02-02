import { FormEventHandler, useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ onCreateBlog }) => {
  const [display, setDisplay] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetCreateBlogForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setDisplay(false)
  }

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()
    const payload = { title, author, url }
    await onCreateBlog(payload)
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
          <input
            data-testid="title-field"
            type="text"
            className="border border-black ml-auto px-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="flex">
          <span>author:</span>
          <input
            data-testid="author-field"
            type="text"
            className="border border-black ml-auto px-1"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="flex">
          <span>url: </span>
          <input
            data-testid="url-field"
            type="text"
            className="border border-black ml-auto px-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>

      <div className="flex gap-1 mt-3">
        <button
          data-testid="create"
          type="submit"
          className="border border-black px-2 active:bg-gray-100"
        >
          create
        </button>

        <button
          onClick={() => setDisplay(false)}
          className="border border-black px-2 active:bg-gray-100"
        >
          cancel
        </button>
      </div>
    </form>
  )
}

CreateBlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
