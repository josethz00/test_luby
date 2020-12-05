import React from 'react';
import { Title } from './styles';


const PageTitle: React.FC = ({ children }) => {

  return (
      <Title>
          {children}
      </Title>
  );
  
}

export default PageTitle;