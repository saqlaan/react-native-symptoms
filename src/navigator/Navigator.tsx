import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '@views/Home';
import Detail from '@views/Detail';
import Entry from '@views/Entry';

export type RootStackParamList = {
  Home: undefined;
  Entry: undefined;
  Detail: {
    symptomId: string;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();
interface NavigatorProps {
  initialRouteName: 'Home';
}

function Navigator({ initialRouteName }: NavigatorProps) {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Entry" component={Entry} />
        <RootStack.Screen name="Detail" component={Detail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
