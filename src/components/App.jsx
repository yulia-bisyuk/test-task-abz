import { Header } from './Header';
import { Hero } from './Hero';
import { Users } from './Users';
import { SignUpForm } from './SignUpForm';
import { useState } from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <Header />
      <Hero />
      <Users page={page} setPage={setPage} />
      <SignUpForm page={page} setPage={setPage} />
    </>
  );
};
