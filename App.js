import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeesScreen from './components/EmployeesScreen';
import BuildingScreen from './components/BuildingScreen';
import RoomScreen from './components/RoomScreen';
import ServicesScreen from './components/ServicesScreen';
import LoginPage from './components/LoginPage';
import RoutesScreen from './components/RoutesScreen';
import AllBuildingScreen from './components/AllBuildingsScreen';
import CustomCamera from './components/CustomCamera';
import ServicesAdminScreen from './components/ServicesAdminScreen';
import TasksScreen from './components/TasksScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Rotas" component={RoutesScreen} />
        <Stack.Screen name="Funcionários" component={EmployeesScreen} />
        <Stack.Screen name="Prédios" component={BuildingScreen} />
        <Stack.Screen name="Salas" component={RoomScreen} />
        <Stack.Screen name="Serviços" component={ServicesScreen} />
        <Stack.Screen name="Serviços Admin" component={ServicesAdminScreen} />
        <Stack.Screen name="Todos Prédios" component={AllBuildingScreen} />
        <Stack.Screen name="Camera" component={CustomCamera} />
        <Stack.Screen name="Tarefas" component={TasksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
