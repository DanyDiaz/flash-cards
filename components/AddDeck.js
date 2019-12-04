import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions/decks'

class AddDeck extends Component {
    state = {
        deckTitle: '',
        created: false
    }

    isTitleValid = () => {
        const { decks } = this.props
        const { deckTitle } = this.state
        return deckTitle.trim() !== ''
            && !decks.includes(deckTitle)
    }

    changeDeckTitle = (deckTitle) => {
        let { created } = this.state
        if(deckTitle.trim() !== '') {
            created = false
        }

        this.setState(() => ({
            deckTitle: deckTitle.trim(),
            created
        }))
    }

    createNewDeck = () => {
        this.props.addNewDeck(this.state.deckTitle)
        this.props.navigation.navigate('Deck', {deckTitle: this.state.deckTitle})
        this.setState(() => ({ 
            deckTitle: '',
            created: true
        }))
    }

    setCreatedToFalse = () => {
        this.setState(() => ({
            created: false
        }))
    }

    render() {
        const { decks } = this.props
        const { deckTitle, created } = this.state

        return (
            <KeyboardAvoidingView 
                behavior='padding'
                style={styles.container}>
                <Text style={styles.titleText}>Title of deck</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Deck title'
                    onChangeText={this.changeDeckTitle}
                    value={deckTitle}
                    onBlur={this.setCreatedToFalse}
                />
                {decks.includes(deckTitle) && (
                    <Text style={styles.errorText}>This title already exists in the application.</Text>
                )}
                <TouchableOpacity 
                    disabled={!this.isTitleValid()}
                    onPress={this.createNewDeck}
                    style={this.isTitleValid() ? styles.submitBtn : styles.disabledSubmitBtn}>
                    <Text style={styles.submitText}>Create deck</Text>
                </TouchableOpacity>
                {created && (
                    <Text style={styles.confirmationText}>Deck created successfully.</Text>
                )}
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
    titleText: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#676767',
        borderRadius: 5,
        width: 300,
        fontSize: 25,
        margin: 10,
        padding: 10
    },
    errorText: {
        fontSize: 20,
        color: '#ff0000',
        fontStyle: 'italic'
    },
    submitBtn: {
        padding: 20,
        margin: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#009136',
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledSubmitBtn: {
        padding: 20,
        margin: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: '#83d6a1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        color: '#ffffff',
        fontSize: 25
    },
    confirmationText: {
        fontSize: 20,
        color: '#009136',
        fontStyle: 'italic'
    }
})

function mapStateToProps(decks) {
    return {
        decks: Object.keys(decks)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewDeck: (deckTitle) => dispatch(handleAddDeck(deckTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)