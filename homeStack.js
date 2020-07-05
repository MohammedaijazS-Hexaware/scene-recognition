import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Final from './First';
import F_Home from './cloudinary';

const screens ={

    Scene_Analyzer:{
        screen: F_Home,
        navigationOptions: {
            headerShown: false
        }
    },
    Analysis: {
        screen: Final,
        navigationOptions: {
            headerShown: false
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);