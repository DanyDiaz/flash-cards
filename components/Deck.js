import React, { Component } from 'react'
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { handleRemoveDeck } from '../actions/decks'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'

class Deck extends Component {
    hasCards = () => {
        return this.props.deck.questions.length > 0
    }

    removeDeck = () => {
        const { deck, dispatch, navigation } = this.props
        Alert.alert(
            'Deleting deck',
            `Are you sure you want to delete "${deck.title}" deck?`,
            [
                {text: 'Yes', onPress: () => {
                    dispatch(handleRemoveDeck(deck.title))
                    navigation.goBack()
                }},
                {text: 'No'}
            ],
            { cancelable: false }
        )
    }

    render() {
        const { deck } = this.props

        if(deck === null) {
            return (
                <View style={styles.container}>
                    <Text>Deck does not exist</Text>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>
                <Text style={styles.tittleText}>
                    {deck.title}
                </Text>
                <Text style={styles.cardsText}>{
                    deck.questions.length} cards
                </Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate('AddCard', {'deckTitle': deck.title})}
                    >
                    <Text style={styles.btnText}>
                        Add card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={this.hasCards() ? styles.btn : styles.disabledBtn}
                    onPress={() => {
                        clearLocalNotification()
                            .then(setLocalNotification)
                        this.props.navigation.navigate('Quiz', {'deckTitle': deck.title})
                    }}
                    disabled={!this.hasCards()}
                    >
                    <Text style={styles.btnText}>
                        Start quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.removeDeck}
                    >
                    <Text style={styles.btnText}>
                        Remove deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tittleText: {
        color: '#000000', 
        fontSize: 40, 
        fontWeight: 'bold'
    },
    cardsText: {
        color: '#000000', 
        fontSize: 25, 
        fontStyle: 'italic'
    },
    btn: {
        padding: 20,
        margin: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#009136',
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledBtn: {
        padding: 20,
        margin: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#83d6a1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: '#ffffff',
        fontSize: 25
    }
})

function mapStateToProps(decks, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        deck: decks[deckTitle] === undefined ? null : decks[deckTitle]
    }
}

export default connect(mapStateToProps)(Deck)