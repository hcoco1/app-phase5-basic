import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut(props) {
  const navigate = useNavigate();
  useEffect(() => {
    async function signOutUser() {
      try {
        const response = await fetch("http://127.0.0.1:5555/sign_out", {
          method: 'DELETE'
           // Important to send cookies with the request
        });

        if (response.ok) {
          console.log("Successfully signed out");
          navigate('/');
        } else {
          console.error("Error during sign out");
          console.log("Status:", response.status);
          console.log("Status Text:", response.statusText);
          const responseBody = await response.text();
          console.log("Response Body:", responseBody);
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    }

    signOutUser();
  }, [navigate]);

  return (
    <div>
      Signing out...
    </div>
  );
}

export default SignOut;


