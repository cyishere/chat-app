import { useEffect } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { useMessageDispatch } from "../../context/message";
import { useFormChange } from "../../utils/hooks";

const SEND_MESSAGE = gql`
  mutation SendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      id
      content
      from
      to
      createdAt
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription NewMessage {
    newMessage {
      id
      content
      to
      from
      createdAt
    }
  }
`;

const InputBox = ({ selectedUser, user }) => {
  const { values, handleChange, resetValues } = useFormChange({
    content: "",
  });
  const dispatch = useMessageDispatch();
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      resetValues();
    },
  });
  const { error: newMessageError, data: newMessageData } =
    useSubscription(NEW_MESSAGE);

  if (error) {
    alert(error);
  }

  useEffect(() => {
    if (newMessageError) console.log("newMessageError:", newMessageError);

    if (newMessageData) {
      const message = newMessageData.newMessage;
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: user.username === message.from ? message.from : message.to,
          message,
        },
      });
    }
  }, [newMessageData, newMessageError]);

  const submitNewMessage = (e) => {
    e.preventDefault();
    sendMessage({ variables: { ...values, to: selectedUser.username } });
  };

  return (
    <form
      className="bg-white p-6 rounded-md flex space-x-4 justify-between"
      onSubmit={submitNewMessage}
    >
      <input
        type="text"
        className="border border-gray-300 flex-grow px-4 placeholder-gray-400 rounded active:border-indigo-500 "
        placeholder="Enter your message here."
        name="content"
        value={values.content}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default InputBox;
