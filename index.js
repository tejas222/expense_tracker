/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
 
const ExpenseApp = () => (
  <NavigationContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </NavigationContainer>
);
AppRegistry.registerComponent(appName, () => ExpenseApp);
