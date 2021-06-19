import { useRef, useState } from 'react';
import Navigation from './components/Navigation';
import './App.css';

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

function App() {
  const [src, setSrc] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const onPlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Previous song
  const prevSong = () => {
    let songIndex = songs.indexOf(src);
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    setSrc(songs[songIndex]);
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Next song
  const nextSong = () => {
    let songIndex = songs.indexOf(src);
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    setSrc(songs[songIndex]);
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Set progress bar
  const setProgress = (e) => {
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const { duration } = audioRef.current;

    audioRef.current.currentTime = (clickX / width) * duration;
  };

  // Update progress bar
  const updateProgress = (e) => {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressRef.current.style.width = `${progressPercent}%`;
  };

  return (
    <div className="app">
      <h1>Music Player</h1>

      <div className={`music-container${isPlaying ? ' play' : ''}`}>
        <div className="music-info">
          <h4 id="title">{isPlaying && src}</h4>
          <div className="progress-container" onClick={setProgress}>
            <div className="progress" ref={progressRef}></div>
          </div>
        </div>

        <audio ref={audioRef} src={`music/${src}.mp3`} onTimeUpdate={updateProgress}></audio>

        <div className="img-container">
          <img src={`images/${src}.jpg`} alt="music-cover" id="cover" />
        </div>
        <Navigation onPlayPause={onPlayPause} prevSong={prevSong} nextSong={nextSong} isPlaying={isPlaying} />
      </div>
    </div>
  );
}

export default App;
