import axios from "axios";
import querystring from 'querystring'

const spotifyDataResolver = (data, playing) => {
  return {
    album: data.album.images[0].url,
    artists: data.artists.map(artist => artist.name),
    is_playing: playing,
    name: data.name,
    url: data.external_urls.spotify
  }
}

export default async (req, res) => {
  const returnFreshAccessToken = async () => {
    const data = {
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_API_REFRESH_TOKEN
    }

    const headers = {
      "Authorization": 'Basic ' + (new Buffer(process.env.SPOTIFY_API_CLIENT_ID + ':' + process.env.SPOTIFY_API_CLIENT_SECRET).toString('base64')),
      "Content-Type": 'application/x-www-form-urlencoded',
    }

    const response = await axios.post(process.env.SPOTIFY_API_ENDPOINT_AUTH, querystring.stringify(data), { headers: headers });
  
    return response.data.access_token;
  }

  const getRecentlyPlayedTrack = async () => {
    const response = await axios.get(process.env.SPOTIFY_API_ENDPOINT_ACCOUNT + 'recently-played', {
      headers: {
        "Authorization": `Bearer ${await returnFreshAccessToken()}`
      }
    });

    return spotifyDataResolver(response.data.items[0].track);
  }

  const getSpotifyData = async () => {  
    const response = await axios.get(process.env.SPOTIFY_API_ENDPOINT_ACCOUNT + 'currently-playing', {
      headers: {
        "Authorization": `Bearer ${await returnFreshAccessToken()}`
      }
    })
    
    if (response.data.is_playing) {
      return spotifyDataResolver(response.data.item, true);
    } else {
      return getRecentlyPlayedTrack();
    }
  }

  res.status(200).json({ data: await getSpotifyData() })
}