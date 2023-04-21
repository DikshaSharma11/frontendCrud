import React, { useState, useContext, createContext, useEffect } from "react";
import "./style.css";

// Create a UserContext to hold the user data
export const UserContext = createContext();

// Create a UserProvider component to wrap the app and provide the user data
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // Add a user to the users array
  const addUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Edit a user in the users array
  const editUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Delete a user from the users array
  const deleteUser = (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  };

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a UserForm component to handle adding and editing users
const UserForm = ({ userToEdit, setUserToEdit }) => {
  const [name, setName] = useState(userToEdit ? userToEdit.name : "");
  const [age, setAge] = useState(userToEdit ? userToEdit.age : "");
  const [email, setEmail] = useState(userToEdit ? userToEdit.email : "");
  const [phoneNumber, setPhoneNumber] = useState(
    userToEdit ? userToEdit.phoneNumber : ""
  );
  const { addUser, editUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, age, email, phoneNumber };
    if (userToEdit) {
      const updatedUser = { ...userToEdit, ...user };
      editUser(updatedUser);
      setUserToEdit(null);
    } else {
      addUser({ ...user, id: Date.now() });
    }
    setName("");
    setAge("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container form-group">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button type="submit">{userToEdit ? "Save" : "Add User"}</button>
    </form>
  );
};

// Create a UserList component to display the list of users and handle deleting users
const UserList = ({ setUserToEdit }) => {
  const { users, deleteUser } = useContext(UserContext);

  return (
    <ul className="list-container">
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.age}), {user.email}, {user.phoneNumber}{" "}
          <button onClick={() => setUserToEdit(user)}>Edit</button>{" "}
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export { UserProvider, UserForm, UserList }