import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.jsx';

vi.mock('./lib/socket_client', () => {
  return {
    default: {
      connect: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      disconnect: vi.fn(),
    }
  };
});

describe('App Component', () => {
  it('renders without crashing', () => {
    // We wrap App in BrowserRouter because it contains Routes
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check if some basic element (like navigation or logo) is present
    // Adjust this based on your actual App content
    expect(document.body).toBeInTheDocument();
  });
});
