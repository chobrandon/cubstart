import MembersPage from "../../components/MembersPage";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./home.css";

export default function Home() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <div>
        <Link to={user ? `/profile/${user.userId}` : "/login"}>
          <span>Login</span>
        </Link>
      </div>
      <div>
        <Link to="/register">
          <span>Register</span>
        </Link>
      </div>
      <MembersPage />
    </>
  );
}
