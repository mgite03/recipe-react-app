import { FaUser } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate, Link } from "react-router-dom";
import * as AccountService from "../services/AccountService";
import * as RecipeService from "../services/RecipeService";
import * as CommentsService from "../services/CommentsService";
import { setCurrentUser } from "../users/reducer";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import "./profile.css";
import "./Popup.css";
import Popup from "./Popup";
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

  const [followingPopup, setFollowingPopup] = useState(false);
  const [followerPopup, setFollowerPopup] = useState(false);
  const [likesModal, setLikesModal] = useState(false);

  const [commentsList, setCommentsList] = useState([]);
  function initFields(data) {
    setUser(data);
    setUsernameField(data.username);
    setPassword(data.password);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAccountType(data.accountType);
    setFollowers(data.followers);
    setFollowing(data.follows);
    console.log("Likes is :" + data.likes)
    setLikes(data.likes);
  }
  const fetchData = async () => {
    try {
      const data = await AccountService.getAccount(username);
      const comments = await CommentsService.getCommentsByUser(username);
      initFields(data);
      setCommentsList(comments);
      console.log(data);
    } catch (err) {}
  };

  // const getRecipeAtId = async (repId) => {
  //   try {
  //     let recipeName = await RecipeService.getRecipeAt(repId);
  //     return recipeName.name;
  //   } catch (err) {}
  // }

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
  };
  const openFollowingModal = () => {
    setFollowingPopup(true);
  };
  const openFollowerModal = () => {
    setFollowerPopup(true);
  };
  const openLikesModal = () => {
    setLikesModal(true);
  };
  const followUser = async () => {
    if (!currentUser) {
      alert("Must be signed in to follow!");
      return;
    }
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
      {followerPopup && (
        <Popup
          onClose={() => setFollowerPopup(false)}
          data={followers}
          title={"Followers"}
        />
      )}
      {followingPopup && (
        <Popup
          onClose={() => setFollowingPopup(false)}
          data={following}
          title={"Following"}
        />
      )}
      {likesModal && (
        <Popup
          onClose={() => setLikesModal(false)}
          data={likes}
          title={"Likes"}
        />
      )}
        {!mode && currentUser &&
          (currentUser && followers.includes(currentUser.username) ? (
            <button className="toFollowButton" onClick={unfollowUser}>Unfollow</button>
          ) : (
            <button className="toFollowButton" onClick={followUser}>Follow</button>
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
              <div className="profCasInput">
                <input
                  type="radio"
                  id="userTypePro"
                  name="userType"
                  onChange={() => setAccountType("Admin")}
                  checked={accountType === "Admin"}
                />
                <label for="userTypePro">Admin</label>
                &nbsp;&nbsp;
                <input
                  type="radio"
                  id="userTypeCas"
                  name="userType"
                  onChange={() => setAccountType("User")}
                  checked={accountType === "User"}
                />
                <label for="userTypeCas">User</label>
              </div>
            </>
          ) : (
            <div>
              <div className="accountType">
                <span className="accountTypeTitle">
                  {/* Account Type: {accountType} */}
                </span>
                <br></br>
                {user.username}
              </div>
              <br />
              <FaUser className="faUser" />
            </div>
          )}
          <div>
            {editState && (
              <input
                className="editState firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
          </div>
          <div>
            {editState ? (
              <input
                className="editState lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            ) : (
              <span>
                {user.firstName} {user.lastName}
              </span>
            )}
          </div>
          <div>
            {editState ? (
              <input
                className="editState password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            ) : <span>{user.username === currentUser.username && ("Password: "+ user.password)}</span>
            }
          </div>
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

          <br />

          <div className="button-group">
            <button className="followingButton" onClick={openFollowingModal}>
              Following: {following.length}
            </button>
            <button className="followingButton" onClick={openFollowerModal}>
              Followers: {followers.length}
            </button>
            <button onClick={openLikesModal}>Likes: {likes.length}</button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Comments</th>
              </tr>
            </thead>
            <tbody>
            {commentsList.map((comment, idx) => (
              <tr key={comment.id}>
                <td className="m-75">
                  <Link to={`../details/${comment.recipeId}`}>
                    {username}: {comment.description}
                    {/* {console.log(getRecipeAt(comment.recipeId).name)}
                    {getRecipeAt(comment.recipeId).name} */}
                  </Link>
                </td>
                {/* <td>{comment.description}</td> */}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>Not signed in</>
      )}
    </div>
  );
};

export default Profile;
