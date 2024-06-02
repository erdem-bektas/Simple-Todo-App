'use client';

import { Container, NavLink, Notification } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import LoginPage from './login/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <header className={classes.header}>
        <Container size="xl" className={classes.inner}>
          <NavLink href='/login' color="blue.6" variant="light" active autoContrast label="Login" />
          <NavLink href='/todo' color="blue.6" variant="light" active autoContrast label="Todos" />
        </Container>
      </header>

      <Notification withBorder color="violet" radius="md" title="First Step">
        To start taking notes on your to-do list, you must first log in
      </Notification>
      <LoginPage />

    </main>
  );
}
