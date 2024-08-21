import { useState } from "react";
import { useContentStore } from "../../store/content";
import Navbar from "../../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `api/v1/search/${activeTab}/${searchTerm}`
      );
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "No results found, make sure you are searching for the right content"
        );
      } else {
        console.log("Something went wrong, please try again later");
      }
    }
  };
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-center gap-5 mb-4">
          <button
            className={`py-2 px-4 rounded transform transition duration-500 ${
              activeTab === "movie"
                ? "bg-blue-700 scale-110"
                : "bg-gray-800 hover:bg-orange-600/80"
            } hover:scale-110`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded transform transition duration-500 ${
              activeTab === "tv"
                ? "bg-blue-700 scale-110"
                : "bg-gray-800 hover:bg-orange-600/80"
            } hover:scale-110`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded transform transition duration-500 ${
              activeTab === "person"
                ? "bg-blue-700 scale-110"
                : "bg-gray-800 hover:bg-orange-600/80"
            } hover:scale-110`}
            onClick={() => handleTabClick("person")}
          >
            person
          </button>
        </div>
        <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder={"Search for a " + activeTab}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded"
          />
          <button className="bg-blue-700 transform transition duration-500 hover:bg-orange-600/80 text-white p-2 rounded" onClick={handleSearch}>
            <Search />
          </button>
        </form>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {results.map((result) => {
                if(!result.poster_path && !result.profile_path) return null;
                return(
                    <div key={result.id} className="bg-gray-800/60 transform transition duration-500 hover:bg-blue-700/60 hover:scale-110 p-4 mb-8 rounded">
                        {activeTab === "person" ? (
                            <div to={"/actor/" + result.name} className="flex flex-col">
                            <img src={ORIGINAL_IMG_BASE_URL + result.profile_path} alt={result.name} className="max-h-96 rounded mx-auto"/>
                            <h2 className="mt-2 text-xl font-bold">
                                {result.name}
                            </h2>
                            </div>
                        ) : (
                            <Link to={"/watch/" + result.id} 
                            onClick={() => setContentType(activeTab)}
                            className="flex flex-col items-center">
                            <img src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt={result.title || result.name} className="w-full rounded h-auto"/>
                            <h2 className="mt-2 text-xl font-bold">
                                {result.title || result.name}
                            </h2>
                            </Link>
                        )}
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
