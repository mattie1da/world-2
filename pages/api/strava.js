import axios from "axios";
import querystring from 'querystring';

const calculateMovingTime = (seconds) => {
  const secondsAsIsoString = new Date(seconds * 1000).toISOString();
  
  if (seconds < 3600) { // don't need hours
    return secondsAsIsoString.substring(14, 19);
  }

  return secondsAsIsoString.substr(11, 8);
}

const stravaDataResolver = (data) => {
  const mostRecentActivity = data[0];

  return {
    average_heartrate: Math.round(mostRecentActivity.average_heartrate) + 'bpm',
    average_speed: mostRecentActivity.average_speed,
    date: mostRecentActivity.start_date_local,
    distance: Math.round(mostRecentActivity.distance / 10) / 100 + 'km',
    meta: {
      achievements: mostRecentActivity.achievement_count,
      comments: mostRecentActivity.comment_count,
      kudos: mostRecentActivity.kudos_count
    },
    moving_time: calculateMovingTime(mostRecentActivity.moving_time),
    name: mostRecentActivity.name,
  }
}

export default async (req, res) => {
  const returnFreshAccessToken = async () => {
    const data = {
      client_id: process.env.STRAVA_API_CLIENT_ID,
      client_secret: process.env.STRAVA_API_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: process.env.STRAVA_API_REFRESH_TOKEN
    }
    
    const response = await axios.post(process.env.STRAVA_API_ENDPOINT_TOKEN, querystring.stringify(data));

    return response.data.access_token;
  }
  
  try {
    const response = await axios.get(process.env.STRAVA_API_ENDPOINT_ACCOUNT, {
      headers: {
        "Authorization": `Bearer ${await returnFreshAccessToken()}`
      }
    })
    
    res.status(200).json({data: stravaDataResolver(response.data)})
  } catch (err) {
    res.status(500).json({error: "Couldn't fetch strava data"})
  }
}