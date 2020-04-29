
import React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';


// import * as React from 'react';
// import { TextInput } from 'react-native-paper';

// export default class PostAddForm extends React.Component {
//   state = {
//     text: ''
//   };

//   render(){
//     return (
//       <TextInput
//         label='Email'
//         value={this.state.text}
//         onChangeText={text => this.setState({ text })}
//       />
//     );
//   }
// }
const PostAddForm = () => { 
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    return (
        <View style={styles.container}>
            <TextInput
                mode='outlined'
                value={title}
                label='Title'
                placeholder='Meal for 5 people'
                onChangeText={nextValue => this.setTitle(nextValue)}
            />
            <TextInput
                mode='outlined'
                value={description}
                label='Description'
                placeholder='Homecooked meal for 5 people available in the evening. Vegetables, lentils and rice.'
                onChangeText={nextValue => setDescription(nextValue)}
                multiline={true}
            />
            <Button raised theme={{ roundness: 3 }}>
                Submit Post
            </Button>
        </View>)
};

const styles = StyleSheet.create({
    container: {
        margin: 1,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        marginVertical: 1,
    },
});

export default PostAddForm;