// import React from 'react';

// const PlayButton = () => {
//   return (
//     <label onClick={onClick}
//       className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center"
//     >
//       <input className="hidden peer" type="checkbox" checked={isPlaying} />
//       <div
//         className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-center rotate-90 -translate-x-[0.3rem] translate-y-[0.1rem] peer-checked:translate-y-[0.1rem]"
//       ></div>
//       <div
//         className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center rotate-90 translate-x-[0.3rem] -translate-y-[0.05rem] peer-checked:rotate-[-30deg] peer-checked:translate-y-[0.22rem] peer-checked:translate-x-[0.15rem]"
//       ></div>
//       <div
//         className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center rotate-90 translate-x-[0.3rem] -translate-y-[0.16rem] peer-checked:rotate-[30deg] peer-checked:translate-y-[-0.4rem] peer-checked:translate-x-[0.15rem]"
//       ></div>
//     </label>
//   );
// };

// export default PlayButton;

import React from 'react';

const PlayButton = ({ onClick, isPlaying }) => {
  return (
    <button
      onClick={onClick}
      className=" w-9 h-10 flex flex-col items-center justify-center bg-transparent border-none cursor-pointer relative"
    >
      <input className="hidden peer" type="checkbox" />
      <div
        className={`w-[50%] h-[2px] bg-white rounded-sm transition-transform duration-300 origin-center absolute rotate-90 -translate-x-2 ${!isPlaying ? 'opacity-[200%]' : ''}`}
      ></div>
      <div
        className={`w-[50%] h-[2px] bg-white rounded-md transition-transform duration-300 origin-center absolute ${!isPlaying ? 'rotate-[45deg] -translate-y-[0.2rem] -translate-x-[0.2rem] w-[34%] h-[2px]' : 'w-[50%] h-[2px] rotate-90 translate-x-[0.05rem]'}`}
      ></div>
      <div
        className={`bg-white rounded-md transition-transform duration-300 origin-center absolute ${!isPlaying ? '-rotate-[45deg] translate-y-[0.2rem] -translate-x-[0.2rem] w-[34%] h-[2px]' : 'w-[50%] h-[2px] rotate-90 translate-x-[0.05rem]'}`}
      ></div>
    </button>
  );
};

export default PlayButton;
