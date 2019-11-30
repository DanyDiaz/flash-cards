import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function DeckPreview(props) {
    const { title, numberOfCards } = props

    return (
        <View style={styles.container}>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: 'bold'}}>{title}</Text>
            <Text style={{color: '#ffffff', fontSize: 20}}>{numberOfCards} cards</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        height: 100,
        backgroundColor: '#00ab3f' /*green*/,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default DeckPreview