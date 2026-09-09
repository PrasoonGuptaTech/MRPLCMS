import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert, Linking } from 'react-native';
import { ForceUpdateGate } from '../source/features/force-update/components/ForceUpdateGate';
import { useForceUpdate } from '../source/features/force-update/hooks/useForceUpdate';

jest.mock('../source/features/force-update/hooks/useForceUpdate', () => ({
  useForceUpdate: jest.fn(),
}));

const mockUseForceUpdate = jest.mocked(useForceUpdate);
const retry = jest.fn();

describe('ForceUpdateGate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseForceUpdate.mockReturnValue({
      required: true,
      message: 'Upgrade required',
      updateUrl: 'https://example.com/update',
      loading: false,
      retry,
    });
  });

  it('does not render when an update is not required', () => {
    mockUseForceUpdate.mockReturnValue({
      required: false,
      message: '',
      updateUrl: '',
      loading: false,
      retry,
    });
    expect(
      render(<ForceUpdateGate />).queryByText('Update required'),
    ).toBeNull();
  });

  it('opens the configured application store URL', async () => {
    jest.spyOn(Linking, 'openURL').mockResolvedValueOnce(undefined);
    const screen = render(<ForceUpdateGate />);
    fireEvent.press(screen.getByText('Update now'));
    await waitFor(() =>
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://example.com/update',
      ),
    );
  });

  it('offers a retry when the store URL is absent', () => {
    mockUseForceUpdate.mockReturnValue({
      required: true,
      message: 'Upgrade required',
      updateUrl: '',
      loading: false,
      retry,
    });
    const screen = render(<ForceUpdateGate />);
    fireEvent.press(screen.getByText('Check again'));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('shows a useful error if the store cannot be opened', async () => {
    jest
      .spyOn(Linking, 'openURL')
      .mockRejectedValueOnce(new Error('unavailable'));
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const screen = render(<ForceUpdateGate />);
    fireEvent.press(screen.getByText('Update now'));
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Unable to open the store',
        expect.any(String),
      ),
    );
  });
});
