import { useNotification } from "src/stores/notification";

const getNotificationClassName = (notification) => {
  switch (notification.type) {
    case "error":
      return "text-white bg-red-600 border-red-600";
    default:
      return "text-white bg-green-600 border-green-600";
  }
};

const Notification = () => {
  const notification = useNotification();

  return (
    <div
      className={`border text-lg rounded-md p-3 mb-2  origin-top transition-all ease-in duration-300 ${
        notification.content ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 p-0"
      }  ${getNotificationClassName(notification)}`}
    >
      {notification.content}
    </div>
  );
};

export default Notification;
