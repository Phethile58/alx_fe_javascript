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
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  // Create elements
  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = "newQuoteText";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.id = "newQuoteCategory";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.id = "addQuoteBtn";

  // Attach event listener
  addButton.addEventListener("click", addQuote);

  // Append to container
  formContainer.appendChild(inputText);
  formContainer.appendChild(inputCategory);
  formContainer.appendChild(addButton);
  createAddQuoteForm();

}


// Add new quote
function addquote() {
    const textInput = document.getElementById('newQuotetext');
    const categoryInput = document.getElementById('newQuoteCategory');

    const newText = textInput.Value.trim();
    const newCategory = categoryInput.Value.trim();

    if (!newText || !newCategory) {
        alert("Please fill in both fieds.");
        return;
    }

    quotes.push = ({ text: newText, category: newCategory });

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

createAddQuoteForm(); // ✅ Now this is included!
