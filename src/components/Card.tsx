import React, { useState } from 'react';
import styles from '../pages/home/home.module.scss';

type CardProps = {
  id: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
};

const Card: React.FC<CardProps> = ({ id, title, description, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(id), 500); 
  };

  return (
    <div className={`${styles.card} ${isDeleting ? styles.fadeOut : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button 
        className={styles.editButton} 
        onClick={() => onEdit(id, title, description)}
        disabled={isDeleting} 
      >
        Edit
      </button>
      <button
        className={styles.deleteButton}  
        onClick={handleDelete}
        disabled={isDeleting} 
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
