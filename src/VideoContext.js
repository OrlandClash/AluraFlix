import React from 'react';

export const VideoContext = React.createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = React.useState({
    frontend: [],
    backend: [],
    innovation: []
  });

  // Función para añadir un nuevo video
  const addVideo = (newVideo) => {
    setVideos(prevVideos => {
      const categoriasValidas = ['frontend', 'backend', 'innovation'];
      if (categoriasValidas.includes(newVideo.category)) {
        return {
          ...prevVideos,
          [newVideo.category]: [...prevVideos[newVideo.category], newVideo]
        };
      } else {
        console.error('Categoría no válida:', newVideo.category);
        return prevVideos;
      }
    });
  };

  // Función para editar un video existente
  const editVideo = (category, updatedVideo) => {
    setVideos(prevVideos => {
      const updatedCategory = prevVideos[category].map(video => 
        video.id === updatedVideo.id ? { ...video, ...updatedVideo } : video
      );
      return {
        ...prevVideos,
        [category]: updatedCategory
      };
    });
  };

  // Nueva función para eliminar un video
  const removeVideo = (category, videoId) => {
    setVideos(prevVideos => {
      const updatedCategory = prevVideos[category].filter(video => video.id !== videoId);
      return {
        ...prevVideos,
        [category]: updatedCategory
      };
    });
  };

  // Nueva función para verificar si existe un video por su id en cualquier categoría
  const videoExists = (videoId) => {
    return Object.values(videos).some(category => 
      category.some(video => video.id === videoId)
    );
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo, editVideo, removeVideo, videoExists }}>
      {children}
    </VideoContext.Provider>
  );
};