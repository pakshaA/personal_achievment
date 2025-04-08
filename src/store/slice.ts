import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  id: string;
  date: string;
  text: string;
}

interface CardsArray {
    cards: CardState[]
}

const initialState: CardsArray = {
  cards: []
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardState>) => {
        state.cards.push(action.payload)
    },
    editCard: (state, action: PayloadAction<CardState>) => {
        const card = state.cards.find(c => c.id === action.payload.id)
        if (card) card.text = action.payload.text
    },
    deleteCard: (state, action: PayloadAction<CardState>) => {
        state.cards = state.cards.filter(c => c.id !== action.payload.id);
    }
  },
});

export const { addCard, editCard, deleteCard } = cardSlice.actions;

export const cardsReducer = cardSlice.reducer;
