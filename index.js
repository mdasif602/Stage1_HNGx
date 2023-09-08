import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name || !track) {
    return res.status(400).json({ error: 'slack_name and track are required parameters' });
  }

  // Get current day of the week
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Get current UTC time
  const now = new Date();

  // Extract the date and time components
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

    // Format the UTC time as "yyyy-MM-ddTHH:mm:ssZ"
    const utcTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;


  // Get GitHub URL of the file being run
  const githubFileUrl = `https://github.com/mdasif602/Stage1_HNGx/blob/main/index.js`;

  // Get GitHub URL of the full source code
  const githubRepoUrl = 'https://github.com/mdasif602/Stage1_HNGx';

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
