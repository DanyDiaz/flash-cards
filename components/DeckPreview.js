import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

function DeckPreview(props) {
    const { title, numberOfCards } = props

    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('Deck', {deckTitle: title})}
            style={styles.container}>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: 'bold'}}>{title}</Text>
            <Text style={{color: '#ffffff', fontSize: 20}}>{numberOfCards} cards</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        height: 100,
        backgroundColor: '#009136' /*green*/,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DeckPreview