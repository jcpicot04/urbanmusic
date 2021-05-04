import React, { useState, useEffect, useRef } from "react";
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import data
import chillhop from "./data";

//import AllSongs from "./components/AllSongs";
//Util
import { playAudio } from "./util";

function Prueba() {
  //Ref

  const [hasErrors, setErrors] = useState(false);
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);

  async function getData() {
    const res = await fetch("/api/songs");
    res
      .json()
      .then((res) => {
        setSongs(res), setCurrentSong(res[0]);
      })
      .catch((err) => setErrors(err));
  }
  useEffect(() => {
    getData();
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    playAudio(isPlaying, audioRef);
    return;
  };
  if (currentSong.length == 0) {
    return <span>Loading...</span>;
  } else {
    return (
      <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song isPlaying={isPlaying} currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          isPlaying={isPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
        />
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
        />
        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
        ></audio>
      </div>
    );
  }
}

export default Prueba;
