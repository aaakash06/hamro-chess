import { useNavigate } from "react-router-dom";
import ChessImage from "./ChessImage";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-neutral-800  text-center">
      <div className="h-screen sm:w-[89%] w-[97%] mx-auto">
        <h1 className="pt-[5rem] text-white text-3xl font-mono tracking-wider font-extrabold max-md:text-2xl">
          Home
        </h1>
        <div className="flex max-lg:flex-col max-lg:gap-5 lg:justify-evenly  mt-10 max-md:mt-0">
          <ChessImage />
          <div className="button-div rounded-sm lg:bg-gray-700 px-10">
            <button
              className="p-3 px-10 rounded-md bg-black lg:mt-4 text-white tracking-wider"
              onClick={() => navigate("/board")}
            >
              {" "}
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
