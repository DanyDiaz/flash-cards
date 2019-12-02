import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import DeckList from '../components/DeckList'
import AddDeck from '../components/AddDeck'
import Deck from '../components/Deck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

const BottomTabNavigator = createBottomTabNavigator({
    Decks: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Deck list',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add deck',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='library-add' size={30} color={tintColor} />
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: '#009136',
        style: {
            height: 56,
            backgroundColor: '#232323',
            shadowColor: 'rgba(0,0,0,0.25)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const StackNavigator = createStackNavigator({
    Home: {
        screen: BottomTabNavigator,
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerTitle: 'Deck view',
            headerStyle: {
                backgroundColor: '#232323'
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerTitle: 'Adding new card',
            headerStyle: {
                backgroundColor: '#232323'
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: '#ffffff',
            headerTitle: 'Taking quiz',
            headerStyle: {
                backgroundColor: '#232323'
            }
        }
    }
})

const TabsRoot = createAppContainer(StackNavigator)

export default TabsRoot