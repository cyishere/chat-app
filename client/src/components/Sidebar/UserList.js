import { gql, useQuery } from "@apollo/client";
import { useMessageDispatch, useMessageState } from "../../context/message";
import UserItem from "./UserItem";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        id
        content
        from
        to
        createdAt
      }
    }
  }
`;

const UserList = ({ selectedUser, setSelectedUser }) => {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const { loading: usersLoading, error: usersError } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      dispatch({ type: "SET_USERS", payload: data.getUsers });
    },
  });

  let usersMarkup;

  if (usersError) {
    usersMarkup = <p>usersError.message</p>;
  } else if (!users || usersLoading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users join yet.</p>;
  } else if (users.length > 0) {
    usersMarkup = (
      <ul>
        {users.map((user) => (
          <UserItem
            key={user.username}
            user={user}
            seletedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </ul>
    );
  }

  return usersMarkup;
};

export default UserList;
