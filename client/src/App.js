import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloProvider from "./ApolloProvider";
import { AuthProvider } from "./context/auth";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
