import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="testing" />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input).toBeInTheDocument();

    expect(input.value).toBe('testing');
  });

  it('should call handleChange on each key press', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} />);
    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'Typed value';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
