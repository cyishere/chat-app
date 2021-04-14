import Message from "./Messages";
import InputBox from "./InputBox";

const Window = () => {
  return (
    <main className="col-span-3 bg-gray-200 p-4 flex flex-col justify-between">
      <Message />

      <InputBox />
    </main>
  );
};

export default Window;
