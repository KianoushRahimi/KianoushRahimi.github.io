/*
 * script.js
 *
 * This script selects a video from the `videos` array based on the
 * current day of the year. It then injects an iframe into the page to
 * display the corresponding motivational clip. If the array has fewer
 * than 365 entries, it will cycle through the available ones.
 */

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function showDailyVideo() {
  const today = new Date();
  const dayIndex = getDayOfYear(today) % videos.length;
  const video = videos[dayIndex];
  const container = document.getElementById('video-container');
  // Clear any existing content
  container.innerHTML = '';
  // Create an iframe for the video
  const iframe = document.createElement('iframe');
  iframe.src = video.embedUrl;
  iframe.title = video.title;
  iframe.width = '640';
  iframe.height = '360';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  container.appendChild(iframe);
  // Add a caption below the video
  const caption = document.createElement('p');
  caption.className = 'caption';
  caption.textContent = video.title;
  container.appendChild(caption);
}

// Wait for the DOM to load before injecting the video
document.addEventListener('DOMContentLoaded', showDailyVideo);