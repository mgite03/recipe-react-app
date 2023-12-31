import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const { currentUser } = useSelector((state) => state.usersReducer);
  if (currentUser && currentUser.accountType === "Admin") {
    return children;
  }
  return <Navigate to="/login" />;
}

export default ProtectedAdminRoute;