import React from 'react';
import { TextInput, Button, Divider, Title, Portal, Modal } from 'react-native-paper';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const PostAddForm = () => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    // const [itemType, setItemType] = React.useState('');
    // const [listingDays, setListingDays] = React.useState(2);
    const [showMap, setShowMap] = React.useState(false);
    // const itemTypeOptions = [{ cookedMeals: 'Cooked Meals', groceries: 'Groceries', supplies: 'Supplies (Non-food items)' }];

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Title>Post Contribution/Need</Title>
            <TextInput
                mode='outlined'
                value={title}
                label='Title'
                placeholder='Meal for 5 people'
                onChangeText={nextValue => setTitle(nextValue)}
                style={styles.input}
            />
            <TextInput
                mode='outlined'
                value={description}
                label='Description'
                placeholder='Homecooked meal for 5 people available in the evening. Vegetables, lentils and rice.'
                onChangeText={nextValue => setDescription(nextValue)}
                multiline={true}
                numberOfLines={5}
                style={styles.input}
                dense={true}
            />
            <TextInput
                mode='outlined'
                value={address}
                label='Address'
                placeholder='12/13 Pragati Maidan, near Bansi Sweets, Delhi'
                onChangeText={nextValue => setAddress(nextValue)}
                multiline={true}
                numberOfLines={3}
                style={styles.input}
                dense={true}
            />
            <TextInput
                mode='outlined'
                value={phoneNumber}
                label='Phone Number'
                placeholder='Meal for 5 people'
                onChangeText={nextValue => setPhoneNumber(nextValue)}
                style={styles.input}
            />
            <Button icon="map-marker-plus" mode="outlined" compact={true} style={styles.submitButton} onPress={() => { setShowMap(true) }}/>
            {
                showMap ?
                <Portal>
                    <Modal visible={showMap} onDismiss={() => {setShowMap(false)}}>
                        <MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        >
                        </MapView>
                    </Modal>
                 </Portal>
                : 
                null
            }
            {/* {isProviding ? Pictures URI : ''} */}
            {/* ItemType */}
            {/* listingDays */}
            <Divider />
            <Divider />
            <Divider />
            <Button icon="arrow-right" mode="contained" compact={true} style={styles.submitButton}>
                Submit Post
            </Button>
        </KeyboardAvoidingView>)
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        marginVertical: 8,
        width: '100%'
    },
    submitButton: {
        margin: 8,
        borderRadius: 8
    },
    map: {
        height: '90%',
        width: '90%',
        margin: 20
    }
});

export default PostAddForm;