import React, { Component } from 'react'
import { KeyboardAvoidingView, 
    Text, 
    TextInput, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions/decks'

class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    isThereQuestionAndAnswer = () => {
        return this.state.question.trim() !== '' && this.state.answer.trim() !== ''
    }

    handleChangeQuestion = (newQuestion) => {
        this.setState(() => ({
            question: newQuestion
        }))
    }

    handleChangeAnswer = (newAnswer) => {
        this.setState(() => ({
            answer: newAnswer
        }))
    }

    addNewCard = () => {
        const { question, answer } = this.state
        const { deckTitle } = this.props.navigation.state.params
        const newCard = {
            question,
            answer
        }
        this.props.dispatch(handleAddCard(deckTitle, newCard))
        this.setState(() => ({
            question: '',
            answer: ''
        }))
        this.props.navigation.goBack()
    }

    render() {
        const { question, answer } = this.props

        return (
            <KeyboardAvoidingView 
                behavior='padding'
                style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Write your question here...'
                    onChangeText={this.handleChangeQuestion}
                    value={question}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Write your answer here...'
                    onChangeText={this.handleChangeAnswer}
                    value={answer}
                />
                <TouchableOpacity 
                    disabled={!this.isThereQuestionAndAnswer()}
                    onPress={this.addNewCard}
                    style={this.isThereQuestionAndAnswer() ? styles.submitBtn : styles.disabledSubmitBtn}>
                    <Text style={styles.submitText}>Submit</Text>
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
        width: 300,
        fontSize: 25,
        margin: 10,
        padding: 10,
        textAlignVertical: 'top'
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
    }
})

export default connect()(AddCard)