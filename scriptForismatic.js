const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

// Show new quote
function updateUI(apiQuote) {
    text = apiQuote.quoteText 
    author = apiQuote.quoteAuthor

    quoteText.textContent = text
    if (text.length > 100) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    if (!author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = author
    }
    removeLoadingSpinner()
}
// Get quotes from API
async function getQuote() {
    showLoadingSpinner()
    url = proxyUrl + apiUrl
    try {
        const response = await fetch(url);
        let apiQuote = await response.json()
        console.log(apiQuote)
        updateUI(apiQuote);
        
    } catch(error) {
       if (error instanceof SyntaxError) {
           getQuote()
       } 
        alert(error)
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); 
}

function showLoadingSpinner() {
    quoteContainer.hidden = true
    loader.hidden = false;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

twitterBtn.addEventListener("click", tweetQuote)    
newQuoteBtn.addEventListener("click", getQuote)    

getQuote()