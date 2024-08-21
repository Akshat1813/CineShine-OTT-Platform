import { LogOut, Menu, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { user, logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();
  const [mov, setMov] = useState(true);
  const [tv, setTv] = useState(false);
  const [history, setHistory] = useState(false);


  const handleMov = () => {
    setMov(true);
    setContentType("movie");
    setTv(false);
    setHistory(false);
  };
  const handleTv = () => {
    setMov(false);
    setContentType("tv");
    setTv(true);
    setHistory(false);
  };
  const handleHistory = () => {
    setMov(false);
    setTv(false);
    setHistory(true);
  };
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 h-20 mb-8">
      <div className="flex items-center gap-8 z-50 mt-12 scale-[80%]">
        <Link to={"/"} className="flex">
          <img src="/favicon.png" alt="logo" className="w-16 md:w-20 mt-2" />
          <span className="title text-white text-1xl md:text-2xl font-bold ml-2 mt-20 md:mt-24">
            CINESHINE
          </span>
        </Link>
        <Link to={"/"}></Link>
        {/* Desktop navbar items */}
        <div className="hidden sm:flex gap-5 items-center mt-20 md:mt-24 text-1xl md:text-2xl">
          <Link
            to="/"
            className={`hover:text-orange-500 hover:bg-gray-600/70 rounded-md py-2 px-4 transform transition hover:-translate-y-2 ${
              contentType === "movie" && mov
                ? "bg-gray-600/30 rounded-md py-2 px-4 transform transition text-orange-500"
                : ""
            }`}
            onClick={() => {
              setContentType("movie");
              handleMov();
            }}
          >
            Movies
          </Link>
          <Link
            to="/"
            className={`hover:text-orange-500 hover:bg-gray-600/70 rounded-md py-2 px-4 transform transition hover:-translate-y-2 ${
              contentType === "tv" && tv
                ? "bg-gray-600/30 rounded-md py-2 px-6 transform transition text-orange-500"
                : ""
            }`}
            onClick={() => {
              setContentType("tv");
              handleTv();
            }}
          >
            Tv Shows
          </Link>
          <Link
            to="/history"
            className={`hover:text-orange-500 hover:bg-gray-600/70 rounded-md py-2 px-4 transform transition hover:-translate-y-2 ${
              history
                ? "bg-gray-600/30 rounded-md py-2 px-6 transform transition text-orange-500"
                : ""
            }`}
            onClick={() => {
              handleHistory();
            }}
          >
            Search History
          </Link>
        </div>
      </div>
      <div className="flex gap-2 mt-12 items-center z-50">
        <Link to="/search" onClick={() => {
              handleHistory();
            }}>
          <Search className="size-8 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <div>

        <LogOut className="size-8 cursor-pointer" onClick={logout} />
        </div>
        <div className="sm:hidden">
          <Menu className="size-8 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>
      {/* Mobiile navbar items */}
      {isMobileMenuOpen && (
        <div className="sm:hidden w-full mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to="/"
            className="block p-2 hover:{text-gray-700 underline}"
            onClick={() => {
              setContentType("movie");
              handleMov();
              toggleMobileMenu();
            }}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="block p-2 hover:{text-gray-700 underline}"
            onClick={() => {
              setContentType("tv");
              handleTv();
              toggleMobileMenu();
            }}
          >
            Tv Shows
          </Link>
          <Link
            to="/history"
            className="block p-2 hover:{text-gray-700 underline}"
            onClick={() => {
              handleHistory();
              toggleMobileMenu();
            }}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
