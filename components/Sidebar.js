import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/outline';
import { signOut, useSession } from "next-auth/react";
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistID, setPlaylistID] = useRecoilState(playlistIdState);

    console.log("vc escolheu a playlist: ", playlistID);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-sm lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                    <p>Log out</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Procurar</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Biblioteca</p>
                </button>
                <hr className="border-t-[o.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Criar Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Musicas curtidas</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Atualizações</p>
                </button>
                <hr className="border-t-[o.1px] border-gray-900" />

                {playlists.map((playlist) => (
                    <p 
                    key={playlist.id} onClick={() => setPlaylistID(playlist.id)} 
                    className="cursor-pointer hover:text-white"
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar