import { GoogleOutlined } from '@ant-design/icons';
import { auth } from '../firebase';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>raspberrychat</h2>
        <div className="login-button google" onClick={handleLogin}>
          <GoogleOutlined /> Sign in with Google
        </div>
        <br />
        <div className="description">
          Hello there!
          <br />
          Raspberrychat© is a web-app created for the purpose of chatting by Sans Bhatia.
          <br />
          <br /> It is currently only available to use with your Google mail account
          <br /> <br />
          You dont need to sign up. You can just log in directly.
        </div>
      </div>
    </div>
  );
};

export default Login;
