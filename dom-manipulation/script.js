// initial quote array
let quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Success" }
];

// Display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");

    if (quote.lengh === 0) {
        quoteDisplay.textContent = "no quotes avaliable";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <P><em>Category: ${quote.category}</em></p>
    `;
}

// Add new quote
function addquote() {
    const textInput = document.getElementById('newQuotetext');
    const categoryInput = document.getElementById('newQuoteCategory');

    const newText = textInput.Value.trim();
    const newCategory = categoryInput.Value.trim();

    if (newText === "" || newCategory === "") {
        alert("Please fill in both fieds.");
        return;
    }

    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);

    // Optional display the new quote
    showRandomQuote();

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
}

// Attach event listemers
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addquote);

// Initial quote display
showRandomQuote();
