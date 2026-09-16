import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '../source/shared/components/Button';
import { TextField } from '../source/shared/components/TextField';

test('loading and disabled buttons block duplicate submissions', () => {
  const onPress = jest.fn();
  const { rerender } = render(
    <Button label="Save" onPress={onPress} loading />,
  );
  fireEvent.press(screen.getByRole('button'));
  expect(onPress).not.toHaveBeenCalled();
  expect(screen.getByRole('button')).toHaveProp('accessibilityState', {
    busy: true,
    disabled: true,
  });
  rerender(<Button label="Save" onPress={onPress} disabled />);
  fireEvent.press(screen.getByRole('button'));
  expect(onPress).not.toHaveBeenCalled();
  rerender(<Button label="Save" onPress={onPress} variant="secondary" />);
  fireEvent.press(screen.getByRole('button'));
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('fields expose errors and forward focus events', () => {
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  render(
    <TextField
      label="Name"
      error="Name is required"
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );
  expect(screen.getByLabelText('Name')).toHaveProp(
    'accessibilityHint',
    'Name is required',
  );
  expect(screen.getByRole('alert')).toHaveTextContent('Name is required');
  fireEvent(screen.getByLabelText('Name'), 'focus', { nativeEvent: {} });
  fireEvent(screen.getByLabelText('Name'), 'blur', { nativeEvent: {} });
  expect(onFocus).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
});
