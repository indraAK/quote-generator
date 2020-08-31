document.addEventListener('DOMContentLoaded', (e) => {
   const quoteContainer = document.getElementById('quote-container');
   const quoteText = document.getElementById('quote');
   const quoteAuthor = document.getElementById('author');
   const twitterBtn = document.getElementById('twitter-btn');
   const newquoteBtn = document.getElementById('newquote-btn');
   const loader = document.getElementById('loader');

   // Loading spinner shown
   function showLoadingSpinner() {
      loader.hidden = false;
      quoteContainer.hidden = true;
   }

   // Remove loading spinner
   function removeLoadingSpinner() {
      loader.hidden = true;
      quoteContainer.hidden = false;
   }

   // Get quote from API
   async function getQuote() {
      showLoadingSpinner();

      try {
         const response = await fetch('https://favqs.com/api/qotd');
         const data = await response.json();
         const quote = data.quote;

         updateDOM(quote);
         removeLoadingSpinner();
         throw new Error('oops');
      } catch (error) {
         console.log(error);
      }
   }

   // Update DOM
   function updateDOM(quote) {
      quoteText.innerText = quote.body;
      quoteAuthor.innerText = quote.author;
   }

   // Tweet quote
   function tweetQuote() {
      const quote = quoteText.innerText;
      const author = quoteAuthor.innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
      window.open(twitterUrl, '_blank');
   }

   // Event listener
   newquoteBtn.addEventListener('click', getQuote);
   twitterBtn.addEventListener('click', tweetQuote);

   // On load
   getQuote();
})