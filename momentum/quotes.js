const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  blockquote.textContent = data.quote.body;
  figcaption.textContent = data.quote.author;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
