import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = { Home: undefined };
export type ProjectsStackParamList = { Projects: undefined };
export type MediaStackParamList = { Media: undefined };
export type MoreStackParamList = { More: undefined };
export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ProjectsTab: NavigatorScreenParams<ProjectsStackParamList>;
  MediaTab: NavigatorScreenParams<MediaStackParamList>;
  MoreTab: NavigatorScreenParams<MoreStackParamList>;
};

export type RootStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  SessionExpired: undefined;
  Main: NavigatorScreenParams<RootTabParamList>;
};
