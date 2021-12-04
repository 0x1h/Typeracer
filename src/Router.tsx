import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";

const RouterComponent = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Landing></Landing>
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterComponent;
