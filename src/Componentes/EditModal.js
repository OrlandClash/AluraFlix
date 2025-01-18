import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './EditModal.css';

const EditModal = ({ video, onClose, onSave }) => {
  const modalRef = useRef(null);
  const [editedVideo, setEditedVideo] = useState({ ...video });

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.add('show');
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.classList.remove('show');
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVideo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/videos/${editedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedVideo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      return response.json();
    })
    .then(data => {
      console.log('Video editado con éxito:', data);
      onClose(); // Cerramos el modal
      onSave(data); // Notificamos al componente padre que el video ha sido actualizado
    })
    .catch(error => {
      console.error('Error al editar el video:', error);
      // Aquí podrías manejar el error de alguna manera, como mostrando un mensaje al usuario
    });
  };

  const handleClear = () => {
    setEditedVideo({
      ...video,
      title: '',
      category: 'frontend',
      thumbnail: '',
      videoUrl: '',
      description: ''
    });
  };

  return ReactDOM.createPortal(
    <div ref={modalRef} className="modal-overlay">
      <div className="modal-content">
        <h2>EDITAR CARD: {editedVideo.category.toUpperCase()}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título
            <input
              type="text"
              name="title"
              value={editedVideo.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Categoría
            <select
              name="category"
              value={editedVideo.category}
              onChange={handleChange}
              required
            >
              <option value="frontend">frontend</option>
              <option value="backend">backend</option>
              <option value="innovation">innovation</option>
            </select>
          </label>
          <label>
            Imagen
            <input
              type="text"
              name="thumbnail"
              value={editedVideo.thumbnail}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Video
            <input
              type="text"
              name="videoUrl"
              value={editedVideo.videoUrl}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Descripción
            <textarea
              name="description"
              value={editedVideo.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cerrar</button>
            <button type="submit">Guardar</button>
            <button type="button" onClick={handleClear}>Limpiar</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default EditModal;