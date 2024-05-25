import React, { useState } from 'react';
import styles from '../pages/home/home.module.scss';

type CardFormProps = {
  onSave: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
};

const CardForm: React.FC<CardFormProps> = ({ onSave, initialTitle = '', initialDescription = '', isEditing = false }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSave(title, description);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.cardForm}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <div className={styles.error}>{error}</div>}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Card</button>
    </form>
  );
};

export default CardForm;