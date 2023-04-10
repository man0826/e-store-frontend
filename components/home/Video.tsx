import dynamic from "next/dynamic";
import { useState } from "react";
import Loading from "../ui/Loading";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Video = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-[88vh] relative">
      <ReactPlayer
        muted={true}
        loop={true}
        width="100%"
        height="100%"
        playing={true}
        url="video/top_mv.mp4"
        onReady={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-[88vh] flex justify-center items-center bg-[#f5f5f5]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Video;
