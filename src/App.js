import { useState } from "react";
import { UserProvider, UserForm, UserList } from "./components/CRUD";

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  

  return (
    <UserProvider>
      <UserForm userToEdit={userToEdit} setUserToEdit={setUserToEdit} />
      <UserList setUserToEdit={setUserToEdit} />
    </UserProvider>
  );
};

export default App;
