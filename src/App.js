import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SearchPage from "./component/pages/searchPage";
import ResultPage from "./component/pages/resultPage";
import StudioPage from "./component/pages/studioPage";

export default function App() {
  return (
      <Router>
          <Switch>
              <Route path="/" component={SearchPage} exact />
              <Route path="/studios/" component={ResultPage} exact />
              <Route path="/studio_page/:id" component={StudioPage} exact />
          </Switch>
      </Router>
  );
}