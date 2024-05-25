
import React, { useState } from 'react';
import Card from 'components/Card';
import CardForm from 'components/CardForm';
import styles from './home.module.scss';
import { v4 as uuidv4 } from 'uuid';

type CardType = {
  id: string;
  title: string;
  description: string;
};

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);

  const addCard = (title: string, description: string) => {
    setCards([...cards, { id: uuidv4(), title, description }]);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const editCard = (id: string, title: string, description: string) => {
    setEditingCard({ id, title, description });
  };

  const updateCard = (title: string, description: string) => {
    if (editingCard) {
      setCards(cards.map(card => (card.id === editingCard.id ? { ...card, title, description } : card)));
      setEditingCard(null);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome!</h1>
      <CardForm
        onSave={editingCard ? updateCard : addCard}
        initialTitle={editingCard?.title}
        initialDescription={editingCard?.description}
        isEditing={!!editingCard}
      />
      <div className={styles.cardList}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            onDelete={deleteCard}
            onEdit={editCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
