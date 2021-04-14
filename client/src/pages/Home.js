import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="grid grid-cols-4 bg-white grid-flow-row h-screen">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default Home;
