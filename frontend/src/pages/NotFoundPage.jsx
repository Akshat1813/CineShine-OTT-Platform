import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
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
}

export default NotFoundPage