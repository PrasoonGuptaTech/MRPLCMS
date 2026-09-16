import { Component, type ErrorInfo, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';
import { Button } from '../components/Button';
import { colors, typography } from '../theme';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    recordError(
      getCrashlytics(),
      new Error(
        `${error.name}: ${error.message}\n${info.componentStack ?? ''}`,
      ),
    );
  }

  private retry = () => this.setState({ hasError: false });

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <View style={styles.container} accessibilityRole="alert">
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>
          Please try loading the application again.
        </Text>
        <Button label="Try again" onPress={this.retry} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.surface,
  },
  title: { ...typography.heading, color: colors.text },
  message: {
    ...typography.body,
    color: colors.text,
    marginVertical: 16,
    textAlign: 'center',
  },
});
