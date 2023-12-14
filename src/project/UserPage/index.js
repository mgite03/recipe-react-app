import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as AccountService from "../services/AccountService.js";
import "./UserPage.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [users, setUsers] = useState([]);
  const [originalUser, setOriginalUser] = useState();
  const [user, setUser] = useState({
    username: "",
    accountType: "Admin",
  });
  const fetchUsers = async () => {
    const users = await AccountService.findAllUsers();
    setUsers(users);
  };
  const selectUser = async (user) => {
    try {
      const u = await AccountService.getAccount(user.username);
      setUser(u);
      setOriginalUser(u.username);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (user) => {
    try {
      await AccountService.deleteUser(user.username);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      const status = await AccountService.updateUserUsername(
        user,
        originalUser
      );
      let reload = currentUser.username === originalUser;
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
      if (reload) {
        // have to signout or reload page page
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return !currentUser || currentUser.accountType !== "Admin" ? (
    <div className="CheckOutOtherUsers">
      <h1 className="user-title">User List</h1>
      <table className="table w-75 m-auto">
        <thead>
          <tr>
            <th>Username</th>
            <th>Follows</th>
            <th>Followers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/profile/${user.username}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.follows}</td>
              <td>{user.followers}</td>
              <td>
                {currentUser &&
                  <><button className="btn btn-primary followButton" onClick={() => {
                    AccountService.followUser(user.username, currentUser)
                    window.location.reload(false)
                  }}>Follow</button>
                    <button className="btn btn-primary followButton" onClick={() => {
                      AccountService.unFollowUser(user.username, currentUser)
                      window.location.reload(false)
                    }}>Unfollow</button></>}
                {!currentUser && <label>Sign in to Follow or Unfollow!</label>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="admin-panel">
      <h1 className="admin-title">Admin Panel</h1>
      <table className="table w-50 m-auto ">
        <thead>
          <tr>
            <th>Username</th>
            <th>Account Type</th>
            <th>Follows</th>
            <th>Followers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </td>
            <td>
              <select
                value={user.accountType}
                onChange={(e) =>
                  setUser({ ...user, accountType: e.target.value })
                }
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </td>
            <td></td>
            <td></td>
            <td className="buttons">
              <button className="updateButton" onClick={handleUpdate}>
                Update User
              </button>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user._id}>
              <Link to={`/profile/${user.username}`}>
                {user.username}
              </Link>
              <td>{user.accountType}</td>
              <td style={{width: "10px"}}>{user.follows}</td>
              <td>{user.followers}</td>
              <td className="buttons">
                <button className="btn btn-primary followButton" onClick={() => {
                  AccountService.followUser(user.username, currentUser)
                  window.location.reload(false)
                }}>Follow</button>
                <button className="btn btn-primary followButton" onClick={() => {
                  AccountService.unFollowUser(user.username, currentUser)
                  window.location.reload(false)
                }}>Unfollow</button>
                <button
                  className="selectButton"
                  onClick={() => selectUser(user)}
                >
                  Select
                </button>
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(user)}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
