import React, { Component } from 'react'
import { View, 
    Text, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        isQuestion: true,
        answers: []
    }

    toggleCard = () => {
        this.setState(() => ({
            isQuestion: !this.state.isQuestion
        }))
    }

    markAsCorrect = () => {
        this.setState((currentState) => ({
            currentQuestion: currentState.currentQuestion + 1,
            isQuestion: true,
            answers: currentState.answers.concat([1])
        }))
    }

    markAsIncorrect = () => {
        this.setState((currentState) => ({
            currentQuestion: currentState.currentQuestion + 1,
            isQuestion: true,
            answers: currentState.answers.concat([0])
        }))
    }

    startOver = () => {
        this.setState(() => ({
            currentQuestion: 0,
            isQuestion: true,
            answers: []
        }))
    }

    goToDeckView = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { currentQuestion, isQuestion, answers } = this.state
        const { cards } = this.props

        if(currentQuestion >= cards.length) {
            return (
                <View style={styles.resultsContainer}>
                    <Text style={styles.firstHeaderText}>Quiz Results</Text>
                    <Text style={styles.headerText}>Correct answers</Text>
                    <Text style={styles.resultsText}>{answers.filter(answer => answer === 1).length}</Text>
                    <Text style={styles.headerText}>Incorrect answers</Text>
                    <Text style={styles.resultsText}>{answers.filter(answer => answer === 0).length}</Text>
                    <Text style={styles.headerText}>Score</Text>
                    <Text style={styles.resultsText}>
                        {`${Math.round((parseFloat(answers.filter(answer => answer === 1).length) / parseFloat(answers.length)) * 100)}%`}
                    </Text>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.startOver}
                        >
                        <Text style={styles.submitText}>
                            Start Over
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.goToDeckView}
                        >
                        <Text style={styles.submitText}>
                            Back to deck
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.generalText}>
                        {isQuestion ? 'Question ' : 'Answer '}
                        {(currentQuestion + 1)} of {cards.length}
                    </Text>
                </View>
                <View style={[styles.card, isQuestion ? styles.frontCard : styles.backCard]}>
                    <Text style={[styles.cardText, isQuestion ? styles.frontCardText : styles.backCardText]}>
                        {isQuestion 
                            ? cards[currentQuestion].question
                            : cards[currentQuestion].answer
                        }
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.toggleCard}
                    >
                    <Text style={styles.submitText}>
                        {isQuestion ? 'Show answer' : 'Return to question'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.markAsCorrect}
                    >
                    <Text style={styles.submitText}>
                        Mark as correct
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.markAsIncorrect}
                    >
                    <Text style={styles.submitText}>
                        Mark as incorrect
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    resultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstHeaderText: {
        color: '#000000', 
        fontSize: 30, 
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    headerText: {
        marginTop: 20,
        color: '#000000', 
        fontSize: 30, 
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    resultsText: {
        fontSize: 30
    },
    generalText: {
        fontSize: 25
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 20,
        margin: 10,
        width: '90%',
        height: '40%'
    },
    cardText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    frontCard: {
        backgroundColor: '#000000'
    },
    backCard: {
        backgroundColor: '#ffffff',
        borderWidth: 3
    },
    frontCardText: {
        color: '#ffffff'
    },
    backCardText: {
        color: '#000000'
    },
    submitBtn: {
        padding: 20,
        margin: 10,
        width: 250,
        borderRadius: 5,
        backgroundColor: '#009136',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        color: '#ffffff',
        fontSize: 25
    }
})

function mapStateToProps(decks, { navigation }) {
    const { deckTitle } = navigation.state.params
    return {
        cards: decks[deckTitle].questions
    }
}

export default connect(mapStateToProps)(Quiz)