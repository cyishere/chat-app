import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../context/auth";

const DynamicRoute = ({ authenticated, guest, ...rest }) => {
  const { user } = useAuthState();

  if (authenticated && !user) {
    return <Redirect to="/login" />;
  } else if (guest && user) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest} />;
  }
};

export default DynamicRoute;
