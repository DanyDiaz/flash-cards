import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import DeckPreview from './DeckPreview'

class DeckList extends Component {
    renderDeck = ({ item }) => (
        <DeckPreview 
            title={item.title}
            numberOfCards={item.questions.length} />
    )

    render() {
        const { decks } = this.props

        if(decks.length === 0) {
            return (
                <View>
                    <Text style={{fontSize: 30, textAlign: 'center'}}>
                        There are no decks for the moment.
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

function mapStateToProps(decks) {
    return {
        decks: Object.values(decks)
    }
} 

export default connect(mapStateToProps)(DeckList)