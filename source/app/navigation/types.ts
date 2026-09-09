import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = { Home: undefined };
export type ProfileStackParamList = { Profile: undefined };
export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};
