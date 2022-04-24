import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './index';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) =>
    res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.png',
        },
        {
          userId: 1,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.png',
        },
        {
          userId: 1,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.png',
        },
      ]),
    ),
  ),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('No posts found');
    await waitForElementToBeRemoved(noMorePosts);
    expect.assertions(3);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();

    const posts = screen.getAllByRole('img');
    expect(posts).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('No posts found');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /no posts found/i })).not.toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();

    userEvent.type(search, 'anything');
    expect(screen.getByRole('heading', { name: /no posts found/i })).toBeInTheDocument();
  });

  it('should load more posts on button click', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('No posts found');
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', /load more posts/i);
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getAllByRole('heading')).toHaveLength(3);
    expect(button).toBeDisabled();
  });
});
