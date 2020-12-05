import React from 'react';

import { Container } from './styles';

const CenteredContainer: React.FC = ({ children }) => {

  return (
    <Container>
        {children}
    </Container>
  );

}

export default CenteredContainer;