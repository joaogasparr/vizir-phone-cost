import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import PlanCreate from './pages/Plan/Create';
import PlanList from './pages/Plan/List';
import Profile from './pages/Profile';
import RateCreate from './pages/Rate/Create';
import RateList from './pages/Rate/List';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TransparencySelect from './pages/Transparency/Select';
import TransparencyShow from './pages/Transparency/Show';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Transparency: {
              screen: createStackNavigator(
                {
                  TransparencySelect,
                  TransparencyShow,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000000',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Transparências',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="rate-review" size={20} color={tintColor} />
                ),
              },
            },
            Plan: {
              screen: createStackNavigator(
                {
                  PlanList,
                  PlanCreate,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000000',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Planos',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="view-list" size={20} color={tintColor} />
                ),
              },
            },
            Rate: {
              screen: createStackNavigator(
                {
                  RateList,
                  RateCreate,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTitle: '',
                    headerTintColor: '#000000',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Taxas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="attach-money" size={20} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#21507c',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
