import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, Platform, ScrollView } from 'react-native';

import Flex from './cpn/flex';

function App() {

    const list = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <View style={ { ...styles.container } }>
            <Text style={ styles.text_16 }>HẾ Lô, xin chào cả nhà yêu của kem</Text>
            <Text style={ {...styles.text_16, marginTop: "2rem"} }>HẾ Lô, xin chào cả nhà yêu của kem</Text>

            <ScrollView style={{ height: 200 }}>
                { list.map( item =>
                    <View key={ item } style={{ margin: "4px", backgroundColor: "#ff6655", width: "200px", padding: "8px", textAlign: "center" }}>
                        <Text style={{ color: "#FFF", fontSize: "24px" }}>{ item }</Text>
                    </View>
                )}
            </ScrollView>
            <Text style={ {...styles.text_16, marginTop: "2rem"} }>HẾ Lô, xin chào cả nhà yêu của kem</Text>
        </View>
    );
}

const Height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_16: {
        color: "#555",
        fontSize: "16px",
    }
});
export default App;
