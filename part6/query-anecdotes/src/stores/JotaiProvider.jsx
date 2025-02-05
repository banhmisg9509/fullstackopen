import { Provider } from "jotai";
import PropType from "prop-types";
import { store } from ".";

const JotaiProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

JotaiProvider.propTypes = {
  children: PropType.element,
};

export default JotaiProvider;
