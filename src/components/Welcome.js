import React from 'react';
import styled from 'styled-components';
import teddy from '../Assets/teddy.gif';


const Welcome = ({currentUser}) => {
  return (
    <Container>
      <div className='welcome-container'>
        <img src={teddy} alt='teddy welcome note' />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to start Messaging.</h3>
      </div>
        
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column:
color: #020c22;

img {
  height: 20rem;
}
span {
  color: #7D1224;
}
.welcome-container h1 {
  margin-left: 8rem;
}
.welcome-container h3 {
  margin-left: 5rem;
}

`;
export default Welcome;