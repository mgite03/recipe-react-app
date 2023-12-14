import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as AccountService from "../services/AccountService.js";
import "./UserPage.css";
const UserPage = () => {
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
    <div className="Check out other users!">
      <h1 className="user-title">User List</h1>
      <table className="table">
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
              <td>{user.username}</td>
              <td>{user.follows}</td>
              <td>{user.followers}</td>
              <td>
                <button className="btn">Follow</button>
                <button className="btn">Unfollow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="admin-panel">
      <h1 className="admin-title">Admin Panel</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Account Type</th>
            <th></th>
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
            <td className="buttons">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update User
              </button>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.accountType}</td>
              <td className="buttons">
                <button className="btn">Follow</button>
                <button className="btn">Unfollow</button>
                <button
                  className="btn btn-secondary"
                  onClick={() => selectUser(user)}
                >
                  Select
                </button>
                <button
                  className="btn btn-danger"
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
