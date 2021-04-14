import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useAuthState } from "../../context/auth";
import MessageItem from "./MessageItem";
import InputBox from "./InputBox";

const GET_MESSAGES = gql`
  query GetMessages($from: String!) {
    getMessages(from: $from) {
      id
      content
      from
      to
      createdAt
    }
  }
`;

const Window = ({ selectedUser }) => {
  const { user } = useAuthState();
  const [
    getMessages,
    { loading: messagesLoading, data: messagesData, error: messagesError },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [getMessages, selectedUser]);

  let markup;

  if (messagesError) {
    markup = <p className="text-center">{messagesError.message}</p>;
  } else if (messagesLoading) {
    markup = <p className="text-center">Loading...</p>;
  } else if (!messagesData) {
    markup = (
      <p className="text-center">Please select a friend to see the messages.</p>
    );
  } else if (messagesData.getMessages.length === 0) {
    markup = <p className="text-center">You haven't talked yet.</p>;
  } else if (messagesData.getMessages) {
    markup = (
      <ul>
        {messagesData.getMessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            user={user}
            selectedUser={selectedUser}
          />
        ))}
      </ul>
    );
  }

  if (messagesData?.getMessages) {
    console.log("messages:", messagesData.getMessages);
  }

  return (
    <main className="col-span-3 bg-gray-200 p-4 flex flex-col justify-between">
      {markup}

      <InputBox />
    </main>
  );
};

export default Window;
