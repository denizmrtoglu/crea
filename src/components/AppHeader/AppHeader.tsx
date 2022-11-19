import { Button, Image, Layout } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppDispatch } from "../../App";
import { setUserState } from "../../store/auth";
import "./appheader.css";

const { Header } = Layout;

function AppHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onHandleLogout = () => {
    dispatch(setUserState(null));
    Cookies.remove("jwt");
  };

  return (
    <Header className="app-header">
      <Image
        className="header-image"
        width={100}
        src="https://www.creainc.us/assets/img/logo.svg"
        preview={false}
        onClick={() => navigate("/")}
      />
      <Button type="primary" onClick={() => onHandleLogout()}>
        Log out
      </Button>
    </Header>
  );
}

export default AppHeader;
