import React from 'react';

const OAuthButtons = () => {
  const baseURL = 'http://localhost:5000/api/auth';

  return (
    <div>
      <h3>Login with:</h3>
      <button onClick={() => window.location.href = `${baseURL}/google`}>Google</button>
      <button onClick={() => window.location.href = `${baseURL}/discord`}>Discord</button>
      <button onClick={() => window.location.href = `${baseURL}/twitch`}>Twitch</button>
    </div>
  );
};

export default OAuthButtons;
import React from 'react';
import OAuthButtons from './OAuthButtons';

const LoginPage = () => {
  return (
    <div>
      <h2>Login</h2>
      <OAuthButtons />
    </div>
  );
};

export default LoginPage;
