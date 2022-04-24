import { render, screen } from '@testing-library/react';
import PostCard from '.';
import mock from './mock';

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard posts={mock} />);

    expect(screen.getByRole('img', { name: mock.title })).toHaveAttribute('src', mock.img);

    expect(screen.getByRole('heading', { name: mock.title })).toBeInTheDocument();

    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard posts={mock} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
