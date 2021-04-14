import InputBox from "./InputBox";

const Window = () => {
  return (
    <main className="col-span-3 bg-gray-200 p-4 flex flex-col justify-between">
      <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
        Home Page
      </h1>

      <InputBox />
    </main>
  );
};

export default Window;
