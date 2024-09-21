import Container from "./container/Container";

const ShimmerCard = () => {
  return (
    <div className="animate-pulse w-full  h-[380px]  shadow-xl border-2 rounded-xl p-4 ">
      <div className="h-[250px] w-full border-2 rounded-2xl bg-gray-200"></div>
      <div className="relative w-full ml-1 h-[28%]">
        <h2 className="w-[80%] h-6 bg-gray-200 ml-1 rounded-md my-2  text-xl font-semibold text-pretty"></h2>
        <h2 className="italic text-sm w-[30%] h-6 bg-gray-200 ml-1 rounded-md my-1"></h2>
        <button className="absolute bottom-0 right-2 bg-gray-200 font-semibold text-white px-2 py-1 rounded-md h-6 w-14 hover:bg-blue-600 cursor-pointer">
          {" "}
        </button>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="w-full bg-white ">
      <Container>
        <div className=" py-8 flex flex-col md:flex-row flex-wrap ">
          {Array(10)
            .fill(" ")
            .map((index) => (
              <div
                key={index}
                className="p-2 w-[90%] mx-auto md:mx-0 md:w-1/4 h-1/2 "
              >
                <ShimmerCard />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export const PostShimmer = () => {
  return (
    <div className="py-8 bg-slate-100">
      <Container>
        <div>
          <div className="animate-pulse h-[450px] bg-gray-300 border-2"></div>
          <div className="w-full my-10 mb-6 flex flex-col justify-center gap-2">
            <div className="w-[60%] mx-auto bg-gray-300 animate-pulse h-8 border-2"></div>
            <div className="w-[30%] mx-auto bg-gray-300 animate-pulse h-4 border-2"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const PostFormShimmer = () => {
  return (
    <div className="py-8 bg-slate-100">
      <Container>
        <div className="bg-white w-full h-full  shadow-xl px-10 py-4 rounded-md">
          <div className="my-20 space-y-10">
            <div className="mx-auto bg-gray-300 animate-pulse h-10 border-2 rounded-lg"></div>
            <div className="mx-auto bg-gray-300 animate-pulse h-10 border-2 rounded-lg"></div>
            <div className="mx-auto bg-gray-300 animate-pulse h-[400px] border-2 rounded-lg"></div>
            <div className="mx-auto bg-gray-300 animate-pulse h-10 border-2 rounded-lg"></div>
            <div className="mx-auto bg-gray-300 animate-pulse h-10 border-2 rounded-lg"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shimmer;
