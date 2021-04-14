import UserList from "./UserList";
import Footer from "./Footer";

const Container = ({ selectedUser, setSelectedUser }) => {
  return (
    <aside className="p-4 flex chat-window">
      <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <Footer />
    </aside>
  );
};

export default Container;
