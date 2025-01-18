import React from 'react';
import VideoCard from './VideoCard';
import './Section.css';

const Section = ({ title, videos = [], onUpdate, onDelete }) => {
  const isEmpty = Array.isArray(videos) ? videos.length === 0 : true;

  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      {isEmpty ? (
        <p className="empty-message">Añade tus videos aquí</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;