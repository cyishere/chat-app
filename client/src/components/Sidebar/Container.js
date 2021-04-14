import UserList from "./UserList";
import Footer from "./Footer";

const Container = ({ children }) => {
  return (
    <aside className="p-4 flex chat-window">
      <UserList />
      <Footer />
    </aside>
  );
};

export default Container;
