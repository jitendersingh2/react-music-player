import Navigation from './components/Navigation';
import './App.css';
import { useCallback, useRef, useState } from 'react';

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

function App() {
  const [src, setSrc] = useState(songs[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const onPlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, []);

  // Previous song
  const prevSong = useCallback(() => {
    let songIndex = songs.indexOf(src);
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    setSrc(songs[songIndex]);
    audioRef.current.play();
  }, []);

  // Next song
  const nextSong = useCallback(() => {
    let songIndex = songs.indexOf(src);
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    setSrc(songs[songIndex]);
    audioRef.current.play();
  }, []);

  // Set progress bar
  const setProgress = (e) => {
    // const width = e;
    console.log('width- ', progressRef.current, e.target.getAttribute('width'));
    // const clickX = e.offsetX;
    // const duration = audioRef.current.duration;

    // audio.current.currentTime = (clickX / width) * duration;
  };

  // Update progress bar
  const updateProgress = (e) => {
    // const { duration, currentTime } = e.srcElement;
    // const progressPercent = (currentTime / duration) * 100;
    // progressRef.current.style.width = `${progressPercent}%`;
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
