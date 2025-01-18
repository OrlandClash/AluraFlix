import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './header';
import Section from './Section';
import Footer from './Footer';
import NuevoVideo from './NuevoVideo';
import Banner from './Banner';

function Panel() {
  const [videos, setVideos] = useState({
    frontend: [],
    backend: [],
    innovation: []
  });

  // Función para actualizar un video específico
  const updateVideo = (updatedVideo) => {
    setVideos(prevVideos => {
      const updatedCategory = prevVideos[updatedVideo.category].map(v =>
        v.id === updatedVideo.id ? updatedVideo : v
      );
      return {
        ...prevVideos,
        [updatedVideo.category]: updatedCategory
      };
    });
  };

  useEffect(() => {
    // Cargar videos al montar el componente
    fetch('http://localhost:3000/videos')
      .then(response => response.json())
      .then(data => {
        // Agrupar videos por categoría
        const categorizedVideos = data.reduce((acc, video) => {
          acc[video.category] = [...(acc[video.category] || []), video];
          return acc;
        }, {});
        setVideos(categorizedVideos);
      });
  }, []);

  // Método para actualizar los videos cuando se añade uno nuevo
  const refreshVideos = () => {
    fetch('http://localhost:3000/videos')
      .then(response => response.json())
      .then(data => {
        const categorizedVideos = data.reduce((acc, video) => {
          acc[video.category] = [...(acc[video.category] || []), video];
          return acc;
        }, {});
        setVideos(categorizedVideos);
      });
  };

  return (
    <div className="Panel">
      <Header />
      <Banner />
      <Routes>
        <Route path="/*" element={
          <>
            <Section title="FRONT END" videos={videos.frontend || []} onUpdate={updateVideo} onDelete={refreshVideos} />
            <Section title="BACK END" videos={videos.backend || []} onUpdate={updateVideo} onDelete={refreshVideos} />
            <Section title="INNOVACIÓN Y GESTIÓN" videos={videos.innovation || []} onUpdate={updateVideo} onDelete={refreshVideos} />
            <Footer />
          </>
        } />
        <Route path="/nuevo-video" element={<NuevoVideo onAdd={refreshVideos} />} />
      </Routes>
    </div>
  );
}

export default Panel;