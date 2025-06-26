const axios = require('axios');
const m3u8 = require('m3u8-parser');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'M3U URL is required' });
  }

  try {
    // Fetch M3U playlist
    const response = await axios.get(url);
    const parser = new m3u8.Parser();
    parser.push(response.data);
    parser.end();
    const manifest = parser.manifest;

    // Extract metadata
    const result = {
      isValid: manifest.playlists?.length > 0 || manifest.segments?.length > 0,
      provider: extractProvider(url),
      expiry: 'N/A', // Requires provider-specific API call
      maxConnections: 'N/A', // Requires provider-specific API call
      currentConnections: 'N/A', // Requires provider-specific API call
      categories: [],
      channels: []
    };

    // Extract categories and channels
    if (manifest.playlists) {
      const uniqueCategories = new Set();
      const channels = [];

      for (const playlist of manifest.playlists) {
        const groupTitle = playlist.attributes['GROUP-TITLE'] || 'Uncategorized';
        uniqueCategories.add(groupTitle);

        // Check channel status
        const status = await checkStreamStatus(playlist.uri);
        channels.push({
          name: playlist.attributes.NAME || 'Unknown Channel',
          status: status.ok ? 'Online' : 'Offline'
        });
      }

      result.categories = Array.from(uniqueCategories);
      result.channels = channels;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process M3U URL' });
  }
};

// Helper function to check stream status
async function checkStreamStatus(url) {
  try {
    const response = await axios.head(url, { timeout: 5000 });
    return { ok: response.status === 200 };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

// Helper function to extract provider from URL
function extractProvider(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

// Placeholder for provider API call
async function fetchProviderData(url) {
  // Customize based on your provider's API
  return {
    expiry: 'N/A',
    maxConnections: 'N/A',
    currentConnections: 'N/A'
  };
}
