import { useSelector } from "react-redux";
// import * as AccountService from "../../services/AccountService";
import "./welcome.css";

function Welcome() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  // const firstName = AccountService.getAccount();
  return (
    <>
      {!currentUser && (
        <div className="welcome">
          <h2>WELCOME TO</h2>
          <h1>GOODEATS</h1>
        </div>
      )}
      {currentUser && (
        <>
        <div className="welcome">
          <h2>WELCOME TO</h2>
          <h1>GOODEATS</h1>
          <span>Nice to see you again, {currentUser.firstName}!</span>
          </div>
        </>
      )}
    </>
  );
}
export default Welcome;