import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (!message.content) return null
  return (
    <div
      className={`border-2 font-medium bg-neutral-300 rounded-[4px] p-4 mx-2 ${
        message.type === 'error'
          ? 'border-red-600 text-red-500'
          : 'border-green-700 text-green-700'
      }`}
    >
      {message.content}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification
