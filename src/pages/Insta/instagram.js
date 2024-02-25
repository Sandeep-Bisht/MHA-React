import React, { useState, useEffect } from 'react';
import InstagramFeed from 'react-ig-feed';

const Instagram = () => {
  const [token, setToken] = useState('IGQWRORmJnbTZAzanFIQVFNZAjRxSmdLeU54VU1EYjR6dUk2ZAndvYmVWOTJvRzl5dEdKQ1VWekdTWEtZAUjhOYm9zdnBEZAW9LbEluamlXUEhwaHVaR1lfR2hxbXZAhQ29sb3dVeEs1VmxaYmc5S3BtX3dOZAVJzRWM5dDgZD');

  useEffect(() => {
    validateToken(token)
  }, [])
  
  const validateToken = async (token) => {
    try {
      const response = await fetch(`https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&&access_token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Token is valid
        // console.log('Instagram token is valid:',response, "data", data);
      } else {
        // Token is not valid
        setToken(undefined)
        console.error('Instagram token validation failed:', data);
      }
    } catch (error) {
        setToken(undefined)
      console.error('Error validating Instagram token:', error);
    }
  };

  return (
    <>
      {token && (
        <section className="homepage-follow-modern-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="follow-up-email-text">
                <h4 className="common-heading">
                  Follow @modernhouseofantiques
                </h4>
              </div>
            </div>
          </div>
          <div className="row">
          {/* Render your InstagramFeed component here */}
          <InstagramFeed token={token} counter="6" />
          </div>
        </div>
      </section>
        
      )}
    </>
  );
};

export default Instagram;