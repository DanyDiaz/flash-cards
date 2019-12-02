import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
    hasCards = () => {
        return this.props.deck.questions.length > 0
    }

    render() {
        const { deck } = this.props
        
        return (
            <View style={styles.container}>
                <Text style={{color: '#000000', fontSize: 40, fontWeight: 'bold'}}>
                    {deck.title}
                </Text>
                <Text style={{color: '#000000', fontSize: 25, fontStyle: 'italic'}}>{
                    deck.questions.length} cards
                </Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.props.navigation.navigate('AddCard')}
                    >
                    <Text style={styles.btnText}>
                        Add card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={this.hasCards() ? styles.btn : styles.disabledBtn}
                    onPress={() => this.props.navigation.navigate('Quiz')}
                    //disabled={!this.hasCards()}
                    >
                    <Text style={styles.btnText}>
                        Start quiz
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
    btn: {
        padding: 20,
        margin: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#009136' /*green*/,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledBtn: {
        padding: 20,
        margin: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#83d6a1' /*green*/,
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
        deck: decks[deckTitle]
    }
}

export default connect(mapStateToProps)(Deck)