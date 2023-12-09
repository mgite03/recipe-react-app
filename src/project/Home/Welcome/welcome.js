import { useSelector } from "react-redux";
// import * as AccountService from "../../services/AccountService";

function Welcome() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  // const firstName = AccountService.getAccount();
  return(
    <>
    {!currentUser && (
      <h1>Welcome to Goodeats!</h1>
    )}
    {currentUser && (
      <>
        <h1>Welcome back, <span>{currentUser.firstName}</span>!</h1>
      </>
    )}
    </>
  );
}
export default Welcome;