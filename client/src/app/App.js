import { BrowserRouter as Router, Switch } from "react-router-dom";
import ApolloProvider from "./ApolloProvider";
import { AuthProvider } from "../context/auth";

import DynamicRoute from "../utils/DynamicRoute";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import "./App.css";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <DynamicRoute exact path="/" component={Home} authenticated />
            <DynamicRoute path="/register" component={Register} guest />
            <DynamicRoute path="/login" component={Login} guest />
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
