import { saveDeckTitle, addCardToDeck, removeDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function handleAddDeck(deckTitle) {
    return (dispatch) => {
        return saveDeckTitle(deckTitle)
            .then(newDeck => {
                dispatch(addDeck(newDeck))
            })
    }
}

function addCard(deckTitle, card) {
    return {
        type: ADD_CARD,
        deckTitle,
        card
    }
}

export function handleAddCard(deckTitle, card) {
    return (dispatch) => {
        return addCardToDeck(deckTitle, card)
            .then(() => {
                dispatch(addCard(deckTitle, card))
            })
    }
}

function removeDeckAction(deckTitle) {
    return {
        type: REMOVE_DECK,
        deckTitle
    }
}

export function handleRemoveDeck(deckTitle) {
    return (dispatch) => {
        return removeDeck(deckTitle)
            .then(() => {
                dispatch(removeDeckAction(deckTitle))
            })
    }
}