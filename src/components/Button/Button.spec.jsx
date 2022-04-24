import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './index';

describe('<Button />', () => {
  it("should render the button with text 'Load more posts'", () => {
    render(<Button text="Load more posts" />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more posts" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when flag is true', () => {
    render(<Button text="Load more posts" disabled />);
    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(button).toBeDisabled();
  });

  it('should be enable when flag is false', () => {
    render(<Button text="Load more posts" disabled={false} />);
    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load more posts" disabled onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
