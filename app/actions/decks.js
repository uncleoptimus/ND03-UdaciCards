// action creators

import * as actions from './action_types';

import {
  addCardToDeck,
  getDecks,
  removeDeckByTitle,
  removeQuestionByIndex,
  saveDeckTitle
} from '../utils/api';

export function receiveDecks() {
  return async dispatch => {
    const decks = await getDecks();

    dispatch({
      type: actions.RECEIVE_DECKS,
      decks
    });
  };
}

export function createDeck(title, onCreate) {
  return async dispatch => {
    try {
      const result = await saveDeckTitle(title);

      dispatch({
        type: actions.ADD_DECK,
        new_deck: {
          title,
          questions: []
        }
      });

      // if callback exists, invoke after async create
      if (onCreate) {
        onCreate();
      }
    } catch (error) {
      // set notification that save failed?
      console.log('problem creating new deck...', error);
    }
  };
}

export function addQuestion({ deck_title, answer_text, question_text }) {
  const new_card = { question: question_text, answer: answer_text };

  addCardToDeck(deck_title, new_card);

  return {
    type: actions.ADD_QUESTION,
    target_deck: {
      title: deck_title,
      card: new_card
    }
  };
}

export function removeQuestion(deck_title, question_index) {
  removeQuestionByIndex(deck_title, question_index);

  return {
    type: actions.REMOVE_QUESTION,
    target: {
      deck_title,
      question_index
    }
  };
}

export function removeDeck(deck_title) {
  removeDeckByTitle(deck_title);

  return {
    type: actions.REMOVE_DECK,
    deck_title
  };
}
