const express = require('express');
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
  const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000)).toISOString();

  // Get GitHub URL of the file being run
  const githubFileUrl = `https://github.com/username/repo/blob/main/app.js`;

  // Get GitHub URL of the full source code
  const githubRepoUrl = 'https://github.com/username/repo';

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
