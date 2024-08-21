import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent.jsx";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants.js";
import { useContentStore } from "../../store/content.js";
import MovieSlider from "../../components/MovieSlider.jsx";
import { useState } from "react";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [ imgLoading, setImgLoading ] = useState(true);
  

  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero"
          className="absolute top-0 left-0 -z-50 object-cover w-full h-full"
          onLoad={() => setImgLoading(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
            <div className="bg-gradient-to-b from-black/80 via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />
            <div className="max-w-2xl">
              <h1 className="text-6xl mt-4 font-extrabold text-balance">
                {trendingContent?.title || trendingContent?.name}
              </h1>
              <p className="mt-2 text-lg">
                {trendingContent?.release_date?.split("-")[0] ||
                  trendingContent?.first_air_date.split("-")[0]}{" "}
                | {trendingContent?.adult ? "18+" : "PG-13"}
              </p>
              <p className="mt-4 text-lg">
                {trendingContent?.overview.length > 200
                  ? trendingContent?.overview.substring(0, 200) + "..."
                  : trendingContent?.overview}
              </p>
            </div>
            <div className="flex mt-8 gap-1">
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="duration-300 ease-in-out hover:scale-110 glow-on-hover max-w-24 py-4 cursor-pointer hover:text-black/90 font-bold px-4 rounded mr-4 flex items-center hover:-translate-y-1 transform transition"
              >
                <Play className="size-6 mr-2 fill-black" />
                Play
              </Link>
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="duration-300 ease-in-out max-w-32 hover:scale-110 glow-info cursor-pointer text-white font-semibold rounded flex items-center hover:-translate-y-1 transform transition justify-center"
              >
                <Info className="size-6 mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
