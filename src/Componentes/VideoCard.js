import React, { useState } from 'react';
import './VideoCard.css';
import EditModal from './EditModal';

const VideoCard = ({ video, onDelete, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Función para guardar los cambios, actualizarás esto cuando implementes la edición con json-server
  const saveVideoChanges = (updatedVideo) => {
    // Aquí implementarás la lógica para actualizar el video en json-server
    onUpdate(updatedVideo);
    closeEditModal();
  };

  // Función para eliminar el video
  const handleDelete = () => {
    fetch(`http://localhost:3000/videos/${video.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('Video borrado con éxito');
        onDelete(); // Llamamos a onDelete para refrescar la lista de videos en el componente padre
      } else {
        console.error('Error al intentar borrar el video');
      }
    })
    .catch(error => {
      console.error('Error al eliminar el video:', error);
    });
  };

  const { title, thumbnail } = video;

  return (
    <div className="video-card">
      <img src={thumbnail} alt={title} className="video-thumbnail" />
      <h3 className="video-title">{title}</h3>
      <div className="video-actions">
        <button className="action-button" onClick={handleDelete}>Borrar</button>
        <button className="action-button" onClick={openEditModal}>Editar</button>
      </div>
      {isEditModalOpen && <EditModal video={video} onClose={closeEditModal} onSave={saveVideoChanges} />}
    </div>
  );
};

export default VideoCard;