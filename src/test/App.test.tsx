import { render, screen } from '@testing-library/react';
import App from '../App';
import { getStores } from '../services/storeService';

test('renders learn react link', () => {
  render(<App />);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  const storesPromise=getStores();
  storesPromise.then((stores)=>{
    expect(stores).toEqual(2);
  })

  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});