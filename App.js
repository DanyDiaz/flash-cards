import React, { Component } from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import decks from './reducers/decks'
import { getDecks } from './utils/api'
import { setLocalNotification } from './utils/notifications'
import { receiveDecks } from './actions/decks'
import middleware from './middleware'
import TabsRoot from './components/TabNavigator'
import FlashCardsStatusBar from './components/StatusBar'

const store = createStore(decks, middleware)

class App extends Component {
  componentDidMount() {
    getDecks()
      .then((decks) => {
        store.dispatch(receiveDecks(decks))
      })
    
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor='#232323' barStyle='light-content' />
          <TabsRoot />
        </View>
      </Provider>
    )
  }
}

export default App