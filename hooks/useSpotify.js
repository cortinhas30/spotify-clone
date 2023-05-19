import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from '../lib/spotify';

function useSpotify() {
    const {data: session, status} = useSession();

    useEffect(()=> {
        if(session){
            // se o refesh access token falhar, ele vai direcionar ao login...
            if(session.error === "RefreshAccessTokenError"){
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

  return spotifyApi;
}

export default useSpotify