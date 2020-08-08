const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    showLoadingSpinner(); //first if anything happens
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' ; /* resolve CORS error */
    //fetch -  Без options это простой GET-запрос, скачивающий содержимое по адресу url.
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quote
        if(data.quoteText.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        removeLoadingSpinner(); 
    } catch (error) {
        getQuote(); /* for next call after failing reload page */
        console.log('woops, is no quote', error);
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();