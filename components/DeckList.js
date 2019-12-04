import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import DeckPreview from './DeckPreview'

class DeckList extends Component {
    renderDeck = ({ item }) => (
        <DeckPreview 
            title={item.title}
            numberOfCards={item.questions.length}
            navigation={this.props.navigation} />
    )

    render() {
        const { decks } = this.props

        if(decks.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.generalText}>
                        There are no decks for the moment.
                    </Text>
                    <View style={{height: 50}}></View>
                    <Text style={styles.generalText}>
                        Go to "Add deck" in the tab menu at the bottom to create a new deck.
                    </Text>
                </View>
            )
        }

        return (
            <View style={{flex: 1, width: '100%'}}>
                <FlatList
                    data={decks}
                    renderItem={this.renderDeck}
                    keyExtractor={item => item.title} />
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
    generalText: {
        fontSize: 30, 
        textAlign: 'center',
        fontStyle: 'italic'
    }
})

function mapStateToProps(decks) {
    return {
        decks: Object.values(decks).sort((a, b) => a.title.localeCompare(b.title))
    }
} 

export default connect(mapStateToProps)(DeckList)