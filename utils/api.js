import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'dd:FlashCards'

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(results => results === null ? {} : JSON.parse(results))
}

export function saveDeckTitle(deckTitle) {
    let newDeck = {
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    }
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY,
        JSON.stringify(newDeck))
        .then(() => newDeck)
}