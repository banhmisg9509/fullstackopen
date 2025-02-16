import { useNotification, NotificationType } from 'src/stores/notifaction'

export const Notification = () => {
  const notification = useNotification()
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
