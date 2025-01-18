import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import './NuevoVideo.css';

const NuevoVideo = () => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: 'frontend',
    thumbnail: '',
    videoUrl: '',
    description: ''
  });
  const navigate = useNavigate();

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVideo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Añadir el video mediante una petición HTTP POST
    fetch('http://localhost:3000/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el video');
      }
      return response.json();
    })
    .then(data => {
      console.log('Nuevo video añadido:', data);
      // Redireccionar a la página principal después de añadir el video
      navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
      // Aquí podrías mostrar un mensaje al usuario sobre el error
    });
  };

  // Manejador para cancelar y volver a la página principal
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="nuevo-video-page">
      <Header />
      <main>
        <h1>Agregar Nuevo Video</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Título
            <input 
              type="text" 
              name="title" 
              value={newVideo.title} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Categoría
            <select 
              name="category" 
              value={newVideo.category} 
              onChange={handleChange}
              required
            >
              <option value="frontend">frontend</option>
              <option value="backend">backend</option>
              <option value="innovation">innovation</option>
            </select>
          </label>
          <label>
            Imagen (URL)
            <input 
              type="url" 
              name="thumbnail" 
              value={newVideo.thumbnail} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Video (URL)
            <input 
              type="url" 
              name="videoUrl" 
              value={newVideo.videoUrl} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Descripción
            <textarea 
              name="description" 
              value={newVideo.description} 
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <div className="form-actions">
            <button type="button" onClick={handleCancel}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default NuevoVideo;