import { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useAuthState } from "../../context/auth";
import { useMessageDispatch, useMessageState } from "../../context/message";
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

  const dispatch = useMessageDispatch();
  const { messages } = useMessageState();

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: messagesData.getMessages,
      });
    }
  }, [dispatch, messagesData, selectedUser]);

  let markup;

  if (messagesError) {
    markup = <p className="text-center">{messagesError.message}</p>;
  } else if (messagesLoading) {
    markup = <p className="text-center">Loading...</p>;
  } else if (!messagesData) {
    markup = (
      <p className="text-center">Please select a friend to see the messages.</p>
    );
  } else if (messages?.length === 0) {
    markup = <p className="text-center">You haven&#39;t talked yet.</p>;
  } else if (messages) {
    markup = (
      <ul>
        {messages.map((message) => (
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

  return (
    <main className="col-span-3 bg-gray-200 p-4 flex flex-col justify-between">
      {markup}

      <InputBox selectedUser={selectedUser} user={user} />
    </main>
  );
};

export default Window;
