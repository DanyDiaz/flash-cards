import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions/decks'

export default function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deckTitle]: {
                    ...state[action.deckTitle],
                    questions: [
                        ...state[action.deckTitle].questions,
                        action.card
                    ]
                }
            }
        case REMOVE_DECK:
            let newState = { ...state }
            newState[action.deckTitle] = undefined
            delete newState[action.deckTitle]
            return newState
        default:
            return state
    }
}