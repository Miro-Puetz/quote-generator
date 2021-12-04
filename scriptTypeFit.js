let apiQuotes = []
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const apiUrl = 'https://type.fit/api/quotes'; 

// Show new quote
function newQuote() {
    showLoadingSpinner()
    // Pick a random quote from apiQuotes array
    const index = Math.floor(Math.random() * apiQuotes.length-1)
    const quote = apiQuotes[index] 
    text = quote.text
    author = quote.author

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
async function getQuotes() {
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        console.log(apiQuotes)
        newQuote();
        
    } catch(error) {
        getQuotes();
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
newQuoteBtn.addEventListener("click", newQuote)    

showLoadingSpinner()
getQuotes()