import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataReports from "./views/DataReports";

function App() {
  return (
    <div className="App">
      <Router>
        <Header>Data Reports</Header>
        <div className="pl-10 pr-10 mt-10">
          <Route path="/" component={DataReports} />
        </div>
      </Router>
    </div>
  );
}

export default App;
