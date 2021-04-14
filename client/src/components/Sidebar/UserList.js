import { gql, useQuery } from "@apollo/client";
import UserItem from "./UserItem";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      username
    }
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (error) console.log(error);

  if (data) console.log(data);

  if (!data || loading) {
    return <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    return <p>No users join yet.</p>;
  } else if (data.getUsers.length > 0) {
    return (
      <ul>
        {data.getUsers.map((user) => (
          <UserItem key={user.username} user={user} />
        ))}
      </ul>
    );
  }
};

export default UserList;
