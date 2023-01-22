import UsersProvider from '@/context/UsersProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UsersProvider>
      <Component {...pageProps} />
    </UsersProvider>
  );
}
