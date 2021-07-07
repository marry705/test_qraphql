import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { InfoData } from '../../constants';
import InfoAlert from '.';

const renderComponent = (infoTest: InfoData): void => {
  act(() => {
    render(
      <InfoAlert
        info={infoTest}
      />,
    );
  });
};

afterEach(() => {
  cleanup();
});

test('Checking the initial rendering of the component InfoAlert with success message', async () => {
  const infoTest: InfoData = {
    message: 'Test First',
    type: 'success',
  };

  renderComponent(infoTest);

  let testAlert = await screen.queryByRole('alert');
  expect(testAlert).toBeInTheDocument();
  testAlert = await screen.queryByText(infoTest.message);
  expect(testAlert).toBeInTheDocument();
});

test('Checking the initial rendering of the component InfoAlert with error message', async () => {
  const infoTest: InfoData = {
    message: 'Test First',
    type: 'error',
  };

  renderComponent(infoTest);

  let testAlert = await screen.queryByRole('alert');
  expect(testAlert).toBeInTheDocument();
  testAlert = await screen.queryByText(infoTest.message);
  expect(testAlert).toBeInTheDocument();
});

test('Checking the initial rendering of the component InfoAlert with no message', async () => {
  renderComponent(null);

  const testAlert = await screen.queryByRole('alert');
  expect(testAlert).not.toBeInTheDocument();
});
