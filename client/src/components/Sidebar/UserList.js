import { gql, useQuery } from "@apollo/client";
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
  const {
    loading: usersLoading,
    data: usersData,
    error: usersError,
  } = useQuery(GET_USERS);

  let usersMarkup;

  if (usersError) {
    usersMarkup = <p>usersError.message</p>;
  } else if (!usersData || usersLoading) {
    usersMarkup = <p>Loading...</p>;
  } else if (usersData.getUsers.length === 0) {
    usersMarkup = <p>No users join yet.</p>;
  } else if (usersData.getUsers.length > 0) {
    usersMarkup = (
      <ul>
        {usersData.getUsers.map((user) => (
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
