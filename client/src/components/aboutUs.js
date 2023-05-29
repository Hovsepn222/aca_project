import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
  margin: auto;
  max-width: 600px;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
`;

const Content = styled.h3`
  text-align: center;
  color: white;
`;

const AboutUs = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
      </Content>
      <Content>
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
      </Content>
    </Container>
  );
};

export default AboutUs;
