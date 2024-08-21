import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "../components/ReactPlayer.jsx";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../utils/constants.js";
import { formatReleaseDate } from "../utils/dateFunction.js";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  if (content === null)
    return (
      <div className="min-h-screen bg-black p-10">
        <div className="flex flex-col-reverse md:flex-row h-screen">
          <div className="flex-1 flex items-center justify-end">
          <div className="flex flex-col md:items-end items-center md:translate-y-0 -translate-y-16"> {/* Added items-end to align content to the right */}
        <h1 className="text-4xl mb-4 bungee-tint-regular">UH-OH ! Looks like you're lost ☹️</h1>
        <Link to={"/"} className="text-blue-500 mt-2 hover:text-green-500 text-3xl font-bold transition transform hover:-translate-y-3 hover:bg-gray-500/20 rounded-md p-3">
          Go Home 🏠
        </Link>
      </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/robot404largeNoBg.jpg.png"
              alt="Content Not Found"
              className="md:h-96 md:w-52 h-52 w-32"
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="mx-auto container px-4 py-16 h-full">
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            // <div className="scale-110">
            <ReactPlayer
              trailers={trailers}
              currentTrailerIdx={currentTrailerIdx}
            />
            // </div>
          )}
          {trailers.length === 0 && (
            <h2 className="text-center text-xl mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name} 😢
              </span>
            </h2>
          )}
        </div>
        {/* movie details */}
        <div className="flex flex-col md:flex-row gap-20 items-center justify-between max-w-6xl mx-auto mt-24">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {" "}
              {content?.title || content?.name}{" "}
            </h2>
            <p className="text-lg mt-2">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster Image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/TV Shows</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none hover:scale-110 transition-transform duration-300 ease-in-out hover:opacity-70" 
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content?.poster_path}
                      alt="poser path"
                      className="h-auto w-full rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}
              <button
                className="absolute top-1/2 -translate-y-1/2 left-5 md:left-3 size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 flex items-center justify-center"
                onClick={scrollLeft}
              >
                <ChevronLeft className="cursor-pointer" size={24} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-5 md:right-3 size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 flex items-center justify-center"
                onClick={scrollRight}
              >
                <ChevronRight className="cursor-pointer" size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
