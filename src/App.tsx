import React, { useEffect } from "react";
import "./App.css";
import Chart from "./Component/Chart/Chart";
import AssesModal from "./Component/AssestModal/AssesModal";
import store from "./Redux/Store";
import { Provider } from "react-redux/es/exports";
import Form from "./Form";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Chart />
        <AssesModal />
      </Provider>
    </div>
  );
}

export default App;
