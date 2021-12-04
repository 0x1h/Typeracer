import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/Landing";
import Playground from "./Components/Playground"
import Results from "./Components/Results";

const RouterComponent = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Landing />
        </Route>
        <Route path="/playground">
          <Playground />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterComponent;
