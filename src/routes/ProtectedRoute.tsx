import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../models/store";

type Props = {
  children: JSX.Element;
};
const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { token } = useSelector((state: IStore) => state.auth);
  return !token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
