import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const formattedContentType = contentType === "movie" ? "Movies" : "Tv Shows";
  const formattedCategory =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [contentType, category]);
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
  return (
    <div
      className="text-white bg-black relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategory} {formattedContentType}
      </h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative hover:scale-[1.12] hover:opacity-70 transform transition-transform duration-300 ease-in-out"
            key={item.id}
          >
            <div className="rounded-lg overflow-hiddens">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie Image"
                className="transition-transform duration-300 ease-in-out group rounded-md"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-[85px] size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 flex items-center justify-center"
            onClick={scrollLeft}
          >
            <ChevronLeft className="cursor-pointer" size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-[85px] size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 flex items-center justify-center"
            onClick={scrollRight}
          >
            <ChevronRight className="cursor-pointer" size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
