import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {PostAddForm} from './src/screens/';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <PostAddForm />
    </PaperProvider>
  );
}

export default App;