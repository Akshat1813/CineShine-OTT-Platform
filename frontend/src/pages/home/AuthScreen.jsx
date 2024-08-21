import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Minus } from "lucide-react";
const AuthScreen = () => {
    
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) =>{
    e.preventDefault();
    navigate("/signup?email=" + email)

  }
  return (
    <div className="hero-bg relative">
      {/*NavBar Section*/}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <div className="flex flex-row items-center scale-[80%]">
          <img src="/favicon.png" alt="logo" className="w-16 md:w-20 mt-2" />
          <div
            className=" title text-white text-1xl md:text-2xl font-bold ml-2 mt-20 md:mt-24"
          >
            CINESHINE
          </div>
        </div>
        <Link
          to={"/login"}
        >
         <button className="glow-on-hover h-20 text-center font-semibold py-3 px-4">
            Sign In
          </button>
        </Link>
      </header>
      {/*Hero Section*/}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited Movies, TV Shows and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel Anytime.</p>
        <p className="mb-4">Ready to watch? Enter your email to get started</p>
        <form className="flex flex-col md:flex-row gap-2 w-1/2" onSubmit={handleFormSubmit}>
          <input
            type="email"
            className="p-2 rounded flex-1 bg-black/80 border-2 border-[#3e3e3e] hover:border-[#704bb3] cursor-pointer transition"
            placeholder="Email address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <button className="bg-blue-700 text-xl lg:text-2xl px-2 lg:px-6 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button> */}
          <div className="flex-1 md:max-w-52 md:h-14 h-14">
          {/* <CustomButton text="Get Started" h="h-14" w="w-full"  fontSize="text-lg" /> */}
          <button className="glow-on-hover h-20 text-center font-semibold py-3 md:mt-0 mt-1">
            Get Started
          </button>

          </div>
        </form>
      </div>
      {/* Seperator */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st Section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left Side */}

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Enjoy your TV.
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, Laptops, PCs, Mobile Phones and more.
            </p>
          </div>
          {/* Right Side */}
          <div className="flex-1 relative">
            <img src="tv.png" alt="TV image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-1/2"
              autoPlay={true}
              playsInline
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* Seperator */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 2nd Section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse  px-4 md:px-2">
        {/* Left Side */}
        <div className="flex-1">
            <div className="relative">
                <img src="/stranger-things-lg.png" alt="Stranger Things Large image" className="mt-4"/>
                <div className="flex items-center gap-2 bottom-5 absolute left-1/2 -translate-x-1/2  bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                    <img src="/stranger-things-sm.png" alt="Stranger Things small image" className="h-full"/>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col gap-0">
                            <span className="text-md lg:text-lg font-bold">
                                Strange Things
                            </span>
                            <span className="text-sm text-blue-500">
                                Downloading...
                            </span>
                        </div>
                        <img src="/download-icon.gif" alt="" className="h-12" />
                    </div>
                </div>
            </div>

        </div>
        {/* Right Side */}
        <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch online.
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>

        </div>
      </div>
      {/* Seperator */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 3rd Section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left Side */}

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Watch Anywhere.
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies, TV shows on your phone, laptop, tablet or TV.
            </p>
          </div>
          {/* Right Side */}
          <div className="flex-1 relative overflow-hidden">
            <img src="device-pile.png" alt="Device image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-4/6 max-w-[63%]"
              autoPlay={true}
              playsInline
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>  
      {/* Seperator */}

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 4th Section */}  
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
            {/* Left Section */}
            <div className="flex-1 relative" >
                <img src="/kids.png" alt="kids image" className="mt-4"/>

            </div>
            {/* Right Section */}
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Create profile for kids.
                </h2>
                <p className="text-lg md:text-xl">
                    Send kids on an adventure with thier favorite characters in a space made just for them.
                </p>
                <div className="flex flex-row mt-4 md:justify-start justify-center">
                    <Minus className="mt-1"/>
                    <p className="text-lg md:text-xl font-bold ml-1">free with your membership.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
