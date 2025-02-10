import { useParams } from 'react-router'
import { useField } from 'src/hooks/useField'
import { useCreateCommentMutation } from 'src/stores/blog'
import { Button } from './Button'
import { Input } from './Input'

export const CreateCommentForm = () => {
  const { id: blogId } = useParams()

  const [addComment] = useCreateCommentMutation()

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
    }).unwrap()

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
