import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloProvider from "./ApolloProvider";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <ApolloProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
