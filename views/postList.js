const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

module.exports = posts => html`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => html`
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <p>
          <a>${post.content}</a>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${timeAgo(post.date)}
          </small>
          <button id='step_btn' class='button'>Delete</button>
        </div>`
      )}
    </div>
  </body>
  </html>`;
