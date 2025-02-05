import { useNotification } from "src/stores/notification";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
};

const Notification = () => {
  const notification = useNotification();
  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
