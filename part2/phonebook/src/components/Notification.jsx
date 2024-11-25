import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (!message.content) return <></>;
  return (
    <div className={`notification ${message.type}`}>{message.content}</div>
  );
};

Notification.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default Notification;
