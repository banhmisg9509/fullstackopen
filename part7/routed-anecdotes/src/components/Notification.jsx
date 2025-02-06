import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  if (!notification) return null;
  return <p>{notification}</p>;
};
Notification.propTypes = {
  notification: PropTypes.string,
};
export default Notification;
