import { type NextPage } from 'next';
import { ReactNode } from 'react';
import '../styles/globals.css'

type Props = {
  children: ReactNode;
};

const RootLayout: NextPage<Props> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
