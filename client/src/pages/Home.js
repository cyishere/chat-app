import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  return (
    <div className="grid grid-cols-4 bg-white grid-flow-row h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default Home;
