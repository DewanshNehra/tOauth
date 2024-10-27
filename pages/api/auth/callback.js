// pages/api/auth/callback.js
import axios from 'axios';

export default async function handler(req, res) {
  const { code, state } = req.query;
  const redirectUri = process.env.REDIRECT_URI;

  let tokenResponse, userResponse;

  try {
    if (state === 'google') {
      tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code,
        })
      );

      userResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      });

    } else if (state === 'github') {
      tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          redirect_uri: redirectUri,
          code,
        }),
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      });
    } else if (state === 'discord') {
      tokenResponse = await axios.post(
        'https://discord.com/api/oauth2/token',
        new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code,
        })
      );

      userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      });
    }

    if (!userResponse || !userResponse.data) {
      throw new Error('Failed to fetch user data');
    }
    console.log('User data:', userResponse.data);
    res.redirect(`/dashboard?userData=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}