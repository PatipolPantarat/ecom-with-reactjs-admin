import AuthService from "../services/authservice";
import { useNavigate } from "react-router-dom";
// Components
import { Button } from "../components/button";
import Content from "../components/dashboard/content";

export default function Dashboard() {
  const navigate = useNavigate();
  // const handleLogout = () => {
  //   try {
  //     AuthService.logout();
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Failed to logout", error);
  //   }
  // };
  return (
    <div>
      <Content />
    </div>
  );
}
