import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, showRemoveButton }) => {
  const [display, setDisplay] = useState(false)

  return (
    <div
      className="border border-black py-3 px-1"
      data-testid={`blog ${blog.title}`}
    >
      <div className="flex gap-1">
        <span data-testid="title">
          {blog.title} by {blog.author}
        </span>
        <button
          data-testid="view"
          onClick={() => setDisplay((value) => !value)}
          className="border border-black px-2 active:bg-gray-100"
        >
          view
        </button>
      </div>
      {display && (
        <>
          <p data-testid="url">{blog.url}</p>
          <p>
            <span data-testid="likes">likes {blog.likes} </span>
            <button
              data-testid="like"
              onClick={() => onLike(blog)}
              className="border border-black px-2 active:bg-gray-100"
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {showRemoveButton && (
            <div className="mt-1">
              <button
                data-testid="remove"
                onClick={() => onRemove(blog)}
                className="bg-red-500 active:bg-red-700 text-white px-2"
              >
                remove
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
}

export default Blog
