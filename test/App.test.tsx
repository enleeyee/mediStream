import React from 'react'; // Import React
import { fireEvent, render, screen } from '@testing-library/react';
import { createRenderer } from 'react-test-renderer/shallow';
import App from '../src/App';
import { act } from 'react-test-renderer';
import { Predictions } from '@aws-amplify/predictions';

// Shallow Renderer Setup
const renderer = createRenderer();

// Mock AWS Amplify Predictions
jest.mock('@aws-amplify/predictions', () => ({
  Predictions: {
    interpret: jest.fn(),
  },
}));

const defaultComponent = <App />;

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should display correct initial text in the input field', () => {
    const { getByDisplayValue } = render(defaultComponent);
    expect(getByDisplayValue('write some text here to interpret')).toBeInTheDocument();
  });

  it('Test button is clickable and calls interpretFromPredictions', async () => {
    const { getByText, getByDisplayValue } = render(defaultComponent);
    const TestButton = getByText('Test');
    const InputField = getByDisplayValue('write some text here to interpret');

    // Mock a response for Predictions.interpret
    (Predictions.interpret as jest.Mock).mockResolvedValue({
      textInterpretation: {
        interpretations: [{ intent: 'Test Intent', nluConfidence: 0.9 }],
      },
    });

    // Act: Change the input value and click the button
    await act(async () => {
      fireEvent.change(InputField, { target: { value: 'test input' } });
      fireEvent.click(TestButton);
    });

    // Assert that the Predictions.interpret function was called
    expect(Predictions.interpret).toHaveBeenCalledWith({
      text: {
        source: {
          text: 'test input',
        },
        type: 'all',
      },
    });
  });

  it('A valid interpretation response is shown', async () => {
    const { getByText, getByDisplayValue } = render(defaultComponent);
    const TestButton = getByText('Test');
    const InputField = getByDisplayValue('write some text here to interpret');

    // Mock a response for Predictions.interpret
    (Predictions.interpret as jest.Mock).mockResolvedValue({
      textInterpretation: {
        interpretations: [{ intent: 'Test Intent', nluConfidence: 0.95 }],
      },
    });

    // Act: Change the input value and click the button
    await act(async () => {
      fireEvent.change(InputField, { target: { value: 'test input' } });
      fireEvent.click(TestButton);
    });

    // Assert that the interpretation result is displayed
    expect(await screen.findByText(/Test Intent/i)).toBeInTheDocument();
  });

  it('A validation message should be shown if input is empty', async () => {
    const { getByText, getByDisplayValue } = render(defaultComponent);
    const TestButton = getByText('Test');
    const InputField = getByDisplayValue('write some text here to interpret');

    // Simulate clearing the input field and clicking the button
    await act(async () => {
      fireEvent.change(InputField, { target: { value: '' } });
      fireEvent.click(TestButton);
    });

    // Assert that a validation error message is shown (if validation exists)
    expect(Predictions.interpret).not.toHaveBeenCalled();
    expect(screen.getByText('Input some text and click enter to test')).toBeInTheDocument();
  });

  it('Check if input value is updated correctly', () => {
    const { getByDisplayValue } = render(defaultComponent);
    const InputField = getByDisplayValue('write some text here to interpret');

    // Act: Change the input value
    fireEvent.change(InputField, { target: { value: 'updated text' } });

    // Assert: The input value should be updated
    expect(getByDisplayValue('updated text')).toBeInTheDocument();
  });
});