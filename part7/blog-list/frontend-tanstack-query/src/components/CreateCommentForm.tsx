import { useParams } from 'react-router'
import { useField } from 'src/hooks/useField'
import { useCreateCommentMutation } from 'src/stores/blog-tanstack-query'
import { Input } from './Input'
import { Button } from './Button'

export const CreateCommentForm = () => {
  const { id: blogId } = useParams()

  const { mutateAsync: addComment } = useCreateCommentMutation()

  const content = useField()

  const resetCreateCommentForm = () => {
    content.onReset()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.value) return

    await addComment({
      blogId,
      comment: {
        content: content.value,
      },
    })

    resetCreateCommentForm()
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <div>
        <Input {...content} />
      </div>
      <div>
        <Button type="submit">Add Comment</Button>
      </div>
    </form>
  )
}
