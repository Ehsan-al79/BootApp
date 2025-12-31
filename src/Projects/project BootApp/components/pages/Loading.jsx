import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#f7f7f7]">

        <RotatingLines
          visible={true}
          height="100"
          width="100"
          color="#f73816"
          strokeWidth="4"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
       

    </div>
  );
}
