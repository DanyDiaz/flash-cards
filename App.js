import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers/decks'
import { getDecks } from './utils/api'
import { receiveDecks } from './actions/decks'
import middleware from './middleware'
import DeckList from './components/DeckList'

const store = createStore(decks, middleware)

class App extends Component {
  componentDidMount() {
    getDecks()
      .then((decks) => {
        store.dispatch(receiveDecks(decks))
      })
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <DeckList />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App