import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './components/CategoriesScreen';
import EmployeesScreen from './components/EmployeesScreen';
import BuildingScreen from './components/BuildingScreen';
import RoomScreen from './components/RoomScreen';
import PhotosScreen from './components/PhotosScreen';
import LoginPage from './components/LoginPage';
import RoutesScreen from './components/RoutesScreen';
import FirebaseConfig from './FirebaseConfig';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDEhPx4iMbjtpldTwmxqYWvWUaXd8ROcE4",
  authDomain: "sul-construtora.firebaseapp.com",
  projectId: "sul-construtora",
  storageBucket: "sul-construtora.appspot.com",
  messagingSenderId: "1034858903440",
  appId: "1:1034858903440:web:08029b00427ad6a5dca515",
  measurementId: "G-4E05JJKYDL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Rotas" component={RoutesScreen} />
        <Stack.Screen name="Categorias" component={CategoriesScreen} />
        <Stack.Screen name="Funcionários" component={EmployeesScreen} />
        <Stack.Screen name="Prédios" component={BuildingScreen} />
        <Stack.Screen name="Salas" component={RoomScreen} />
        <Stack.Screen name="Fotos" component={PhotosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
