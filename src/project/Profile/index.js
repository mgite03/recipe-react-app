import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AccountService from "../services/AccountService";
import { setCurrentUser } from "../users/reducer";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const signout = async () => {
    await AccountService.signout();
    dispatch(setCurrentUser(null));
    navigate("../login");
  };
  const [account, setAccount] = useState(null);
  const [mode, setMode] = useState(false); // true if viewing your own profile
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState(null);
  function initFields(data) {
    setUser(data);
    setUsernameField(data.username);
    setPassword(data.password);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAccountType(data.accountType);
  }
  const fetchData = async () => {
    try {
      const data = await AccountService.getAccount(username);
      initFields(data);
      console.log(data);
    } catch (err) {}
  };

  const handleChanges = async () => {
    console.log("RUN");
    const updatedAccount = {
      username: usernameField,
      password,
      firstName,
      lastName,
      accountType,
    };
    setAccount(updatedAccount);
    try {
      console.log("ACCOUNT IS ", updatedAccount);
      await AccountService.updateUser(updatedAccount);
      setEditState(false);
      setUser(updatedAccount);
    } catch (err) {
      console.log("ERROR");
    }
  };

  useEffect(() => {
    if (username) {
      try {
        fetchData();
        if (currentUser && currentUser.username === username) {
          initFields(currentUser);
          setMode(true);
        } else if (currentUser && currentUser.username !== username) {
          setMode(false);
          console.log("FALSE");
        } else {
          console.log("FALSE");
          setMode(false);
        }
      } catch (e) {}
      // paramsid
    } else if (currentUser) {
      // viewing own profile after pressing button
      navigate(`./${currentUser.username}`);
      initFields(currentUser);
      setMode(true);
    }
  }, []);

  return (
    <div className="profile-page">
      {mode && !editState ? (
        <>
          <button
            className="editProfile"
            onClick={() => {
              setEditState(!editState);
            }}
          >
            Edit Profile
          </button>
          <button onClick={signout}>Signout</button>
        </>
      ) : (
        <></>
      )}
      {user ? (
        <div className="personal-info">
          {editState ? (
            <>
              <label for="userTypePro">Professional</label>
              <input
                type="radio"
                id="userTypePro"
                name="userType"
                onChange={() => setAccountType("Professional")}
                checked={accountType === "Professional"}
              />
              <label for="userTypeCas">Casual</label>
              <input
                type="radio"
                id="userTypeCas"
                name="userType"
                onChange={() => setAccountType("Casual")}
                checked={accountType === "Casual"}
              />
            </>
          ) : (
            <span>{accountType}</span>
          )}
          {editState ? (
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <span>{user.firstName}</span>
          )}
          {editState ? (
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <span>{user.lastName}</span>
          )}
          {editState ? (
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          ) : (
            <></>
          )}
          {editState ? (
            <div className="editButtons">
              <button className="saveChanges" onClick={handleChanges}>
                Save
              </button>
              <button
                className="cancelChanges"
                onClick={() => setEditState(!editState)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>Not signed in</>
      )}
    </div>
  );
};

export default Profile;
