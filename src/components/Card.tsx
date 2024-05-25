import React from 'react';
import styles from '../pages/home/home.module.scss';

type CardProps = {
  id: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
};

const Card: React.FC<CardProps> = ({ id, title, description, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className={styles.editButton} onClick={() => onEdit(id, title, description)}>Edit</button>
      <button className={styles.deleteButton} onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Card;
