const API_BASE_URL = 'http://localhost:3000';
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to view this page.');
      window.location.href = 'login.html';
      return;
    }
  
    document.getElementById('tweetForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = document.getElementById('tweetText').value;
  
      try {
        const res = await fetch('/api/tweets', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ text })
        });
        const data = await res.json();
        if (data.error) {
          alert(data.error);
        } else {
          loadTweets();
        }
      } catch (err) {
        console.error(err);
      }
    });
  
    const loadTweets = async () => {
      try {
        const res = await fetch(`/api/users/${jwt_decode(token).id}/timeline`, {
          method: 'GET',
          headers: { 'Authorization': token }
        });
        const tweets = await res.json();
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = '';
        tweets.forEach(tweet => {
          const tweetDiv = document.createElement('div');
          tweetDiv.textContent = tweet.text;
          timeline.appendChild(tweetDiv);
        });
      } catch (err) {
        console.error(err);
      }
    };
  
    loadTweets();
  });
  