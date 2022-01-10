import { Provider } from "react-redux";

import Router from "router";
import store from "store";

import "styles/index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
