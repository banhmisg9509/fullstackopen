import { useAppSelector } from 'src/stores'
import { NotificationType } from 'src/stores/notification'

export const Notification = () => {
  const notification = useAppSelector((state) => state.notification)
  if (!notification.content) return null
  return (
    <div
      className={`border-2 font-medium bg-neutral-300 rounded-[4px] p-4 mx-2 ${
        notification.type === NotificationType.ERROR
          ? 'border-red-600 text-red-500'
          : 'border-green-700 text-green-700'
      }`}
    >
      {notification.content}
    </div>
  )
}

