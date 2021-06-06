import { useCallback, useState } from 'react';
import './Navigation.css';

const Navigation = ({ isPlaying, prevSong, onPlayPause, nextSong }) => {
    return (
        <div className="navigation">
          <button className="action-btn" onClick={prevSong}>
            <i className="fas fa-backward"></i>
          </button>
          <button className="action-btn action-btn-big" onClick={onPlayPause}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button className="action-btn" onClick={nextSong}>
            <i className="fas fa-forward"></i>
          </button>
        </div>
    );
}

export default Navigation;
