import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'dd:FlashCards'

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(results => results === null ? {} : JSON.parse(results))
}

function getDeckQuestions(title) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(results => results === null ? null : JSON.parse(results))
        .then(results => results === null || results[title] === 'undefined' ? [] : results[title].questions)
}

export function saveDeckTitle(deckTitle) {
    const newDeck = {
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    }
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,
        JSON.stringify(newDeck))
        .then(() => newDeck)
}

export function addCardToDeck(deckTitle, card) {
    return getDeckQuestions(deckTitle)
    .then(theOtherQuestions => {
        const deck = {
            [deckTitle]: {
                title: deckTitle,
                questions: [...theOtherQuestions, card]
            }
        }

        return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,
            JSON.stringify(deck))
    })
}

export function removeDeck(deckTitle) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        data[deckTitle] = undefined
        delete data[deckTitle]
        return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}