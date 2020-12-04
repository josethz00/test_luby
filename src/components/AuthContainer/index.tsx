import React from 'react';

import { Container } from './styles';

const AuthContainer: React.FC = ({ children }) => {
  return (
    <Container>
        {children}
    </Container>
  );
}

export default AuthContainer;