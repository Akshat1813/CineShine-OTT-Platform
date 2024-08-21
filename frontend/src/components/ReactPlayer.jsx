import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css'; // Import your custom CSS file
import { BiSolidMoviePlay, BiSolidVolumeFull, BiExitFullscreen, BiFullscreen, BiSolidVolumeMute } from 'react-icons/bi';
import PlayButton from './PlayButton';
import { parse } from 'dotenv';
import { set } from 'mongoose';

const VideoPlayer = ({ trailers, currentTrailerIdx }) => {
  const [playing, setPlaying] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [vol, setVol] = useState(1);
  
  const videoUrl = `https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}&modestbranding=1&controls=0&showinfo=0&rel=0`;

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    setSeeking(true);
    playerRef.current.seekTo(e.target.value);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };
  const handleMute = () => { 
    if (volume > 0) {
        setVol(volume);
      setVolume(parseFloat(0));
    } else {
      if(vol===0)
        setVol(parseFloat(1));
      setVolume(parseFloat(vol));
    }
  };
  const handleRepeat = () => {
    setSeeking(true);
    playerRef.current.seekTo(parseFloat(0));
    setSeeking(false);
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) { // Firefox
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { // IE/Edge
        containerRef.current.msRequestFullscreen();
      }
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      setFullscreen(false);
    }
  };

  return (
    <div className={`video-container ${fullscreen ? 'fullscreen ' : ''}`} ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        width="100%"
        height="100%"
        muted={false}
        loop={true}
        controls={false} // Disable default controls
        className="react-player"
      />
      <div className="custom-controls flex">
        <PlayButton onClick={handlePlayPause} isPlaying={playing}/>
        <div className='flex items-center ml-2 mb-2'>
          <BiSolidMoviePlay className='mr-4 cursor-pointer' onClick={handleRepeat}/>
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={played}
              onChange={handleSeek}
              onMouseUp={handleSeekMouseUp}
              className="progress-bar cursor-pointer"
            />
        </div>
        <div className='flex items-center ml-2'>
          {volume > 0 ? <BiSolidVolumeFull className='mr-4 cursor-pointer' onClick={handleMute}/> : <BiSolidVolumeMute className='mr-4 cursor-pointer' onClick={handleMute}/>}
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-control cursor-pointer"
          />
        </div>
        <button className={`fullscreen-button ${fullscreen ? "bg-black bg-opacity-0" : "bg-black w-28 sm:bg-opacity-100 bg-opacity-0 pb-2 sm:translate-y-0 -translate-y-[1.5rem] pt-0 ml-auto pr-10"} `}>
          {fullscreen ? <BiExitFullscreen className='mx-[98%] cursor-pointer mb-12' onClick={toggleFullscreen} /> : <BiFullscreen className='mx-[95%] cursor-pointer' onClick={toggleFullscreen} />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
