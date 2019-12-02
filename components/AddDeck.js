import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'

class AddDeck extends Component {
    state = {
        deckTitle: ''
    }

    isTitleValid = () => {
        const { decks } = this.props
        const { deckTitle } = this.state
        return deckTitle.trim() !== ''
            && !decks.map(deck => deck.title).includes(deckTitle)
    }

    changeDeckTitle = (deckTitle) => {
        this.setState(() => ({
            deckTitle: deckTitle.trim()
        }))
    }

    createNewDeck = () => {
        this.props.addNewDeck(this.state.deckTitle)
        this.setState(() => ({ deckTitle: '' }))
    }

    render() {
        const { decks } = this.props
        const { deckTitle } = this.state

        return (
            <KeyboardAvoidingView 
                behavior='padding'
                style={styles.container}>
                <Text>Title of Deck</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Deck title'
                    onChangeText={this.changeDeckTitle}
                    value={deckTitle}
                />
                <TouchableOpacity 
                    disabled={!this.isTitleValid()}
                    onPress={this.createNewDeck}
                    style={this.isTitleValid() ? styles.submitBtn : styles.disabledSubmitBtn}>
                    <Text style={styles.submitText}>Create deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#676767',
        borderRadius: 5,
        width: 200
    },
    submitBtn: {
        backgroundColor: '#009136',
        padding: 10,
        borderRadius: 5
    },
    disabledSubmitBtn: {
        backgroundColor: '#83d6a1',
        padding: 10,
        borderRadius: 5
    },
    submitText: {
        color: '#ffffff'
    }
})

function mapStateToProps(decks) {
    return {
        decks: Object.values(decks)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewDeck: (deckTitle) => dispatch(handleAddDeck(deckTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)