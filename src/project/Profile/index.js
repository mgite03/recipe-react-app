import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as AccountService from "../services/AccountService";
import { setCurrentUser } from "../users/reducer";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.usersReducer);

  const [account, setAccount] = useState(null);
  const [mode, setMode] = useState(false); // true if viewing your own profile
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState(null);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likes, setLikes] = useState([]);
  function initFields(data) {
    setUser(data);
    setUsernameField(data.username);
    setPassword(data.password);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAccountType(data.accountType);
    setFollowers(data.followers);
    setFollowing(data.follows);
    setLikes(data.likes);
    console.log("DATA", data);
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

  const unfollowUser = async () => {
    if (!currentUser) {
      alert("Must be signed in to follow!");
      return;
    }
    const updated_account = {
      ...currentUser,
      follows: currentUser.follows.filter((u) => u !== user.username),
    };
    const to_follow_updated = {
      ...user,
      followers: user.followers.filter((user) => user !== currentUser.username),
    };

    try {
      await AccountService.updateUser(to_follow_updated);
      await AccountService.updateUser(updated_account);
      setFollowers(followers.filter((f) => f !== currentUser.username));
      // add the logged in user to the followers list of the other account
    } catch (err) {
      console.log("couldn't update follower user");
    }
    // HAVE to add this users to `to_follow`'s list of followers
  };

  const followUser = async () => {
    if (!currentUser) {
      alert("Must be signed in to follow!");
      return;
    }
    console.log("CURRENT USER", currentUser);
    const updated_account = {
      ...currentUser,
      follows: currentUser.follows
        ? [...currentUser.follows, username]
        : [username],
    };
    const to_follow_updated = {
      ...user,
      followers: user.followers
        ? [...user.followers, currentUser.username]
        : [currentUser.username],
    };

    try {
      await AccountService.updateUser(to_follow_updated);
      await AccountService.updateUser(updated_account);
      setFollowers([...followers, currentUser.username]);
      // add the logged in user to the followers list of the other account
    } catch (err) {
      console.log("couldn't update follower user");
    }
  };
  useEffect(() => {
    if (username) {
      try {
        fetchData();
        if (currentUser && currentUser.username === username) {
          initFields(currentUser);
          console.log("CURR USER", currentUser);
          setMode(true);
        } else if (currentUser && currentUser.username !== username) {
          setMode(false);
          console.log("HI");
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
      {!mode &&
        (followers.includes(currentUser.username) ? (
          <button onClick={unfollowUser}>Unfollow</button>
        ) : (
          <button onClick={followUser}>Follow</button>
        ))}

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
          <div className="lists">
            Following: {following}
            <br></br>
            Followers: {followers}
            {console.log(following)}
            <br></br>
            Likes: {likes}
          </div>
        </div>
      ) : (
        <>Not signed in</>
      )}
    </div>
  );
};

export default Profile;
