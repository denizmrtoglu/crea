import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import AppHeader from "../components/AppHeader/AppHeader";
import { IStore } from "../models/store";
const { Content } = Layout;

type Props = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { token } = useSelector((state: IStore) => state.auth);

  return !!token ? (
    <Layout>
      <AppHeader />
      <Content style={{ padding: "50px" }}>{children}</Content>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
