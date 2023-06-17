import { useRouter } from 'next/router';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';

const Chats = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], 'userPhoto.jpeg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    axios
      .get('https://api.chatengine.io/users/me/', {
        headers: {
          'project-id': '50e5af23-9fd2-49c1-a987-cf84a9ff246b',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);

          axios
            .post(
              'https://api.chatengine.io/users/',
              formdata,
              {
                headers: { 'private-key': '759bff65-0bad-40a0-aa62-5ad30396b655' },
              }
            )
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, router]);

  if (!user || loading) return 'Loading..';

  return (
    <div className="chat-page" style={{ fontFamily: 'Helvetica Neue' }}>
      <div className="nav-bar">
        <div className="logo-tab" align="center">
          raspberrychat
        </div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
        <div align="center" className="createdby">
          created by Sans Bhatia (@raspberrysans)
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 77px)"
        projectID="50e5af23-9fd2-49c1-a987-cf84a9ff246b"
        userName={user.email}
        userSecret={user.uid}
        renderIsTyping={(typers) => <div />}
      />
    </div>
  );
};

export default Chats;
