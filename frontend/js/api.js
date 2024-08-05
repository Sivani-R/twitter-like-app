// api.js

// Function to send a request to the server
async function apiRequest(url, method = 'GET', body = null, token = null) {
    const headers = {
      'Content-Type': 'application/json'
    };
  
    if (token) {
      headers['Authorization'] = token;
    }
  
    const options = {
      method,
      headers,
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Something went wrong');
    }
  }
  
  // Register new user
  async function registerUser(username, password) {
    return await apiRequest('/api/users/register', 'POST', { username, password });
  }
  
  // Login user
  async function loginUser(username, password) {
    return await apiRequest('/api/users/login', 'POST', { username, password });
  }
  
  // Post a tweet
  async function postTweet(text, token) {
    return await apiRequest('/api/tweets', 'POST', { text }, token);
  }
  
  // Fetch user timeline
  async function fetchTimeline(userId, token) {
    return await apiRequest(`/api/users/${userId}/timeline`, 'GET', null, token);
  }
  
  // Decode JWT token
  function jwtDecode(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT:', e);
      return null;
    }
  }
  
  // Example usage of the API functions
  document.addEventListener('DOMContentLoaded', () => {
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await registerUser(username, password);
          alert(response.message || response.error);
        } catch (err) {
          console.error(err);
        }
      });
    }
  
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        try {
          const response = await loginUser(username, password);
          if (response.token) {
            localStorage.setItem('token', response.token);
            window.location.href = 'timeline.html';
          } else {
            alert(response.error);
          }
        } catch (err) {
          console.error(err);
        }
      });
    }
  
    // Tweet form submission and fetching timeline
    const tweetForm = document.getElementById('tweetForm');
    if (tweetForm) {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id;
  
      tweetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = document.getElementById('tweetText').value;
  
        try {
          await postTweet(text, token);
          loadTimeline(userId, token);
        } catch (err) {
          console.error(err);
        }
      });
  
      async function loadTimeline(userId, token) {
        try {
          const tweets = await fetchTimeline(userId, token);
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
      }
  
      loadTimeline(userId, token);
    }
  });
  