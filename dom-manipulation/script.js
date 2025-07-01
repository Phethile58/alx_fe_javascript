// ==========================
// 1. Load Quotes from Local Storage or Defaults
// ==========================
let quotes = [];

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {

// initial quote array
 quotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Success" }
];
saveQuotes();
  }
}

function saveQuotes(){
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ==========================
// 2. Show a Random Quote + Store in Session Storage
// ==========================
function showRandomQuote() {
    if (quote.lengh === 0) {
    document.getElementById("quoteDisplay").textContent = "no quotes avaliable";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <P class="quote-category">Category: ${quote.category}</p>
    `;

    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Optional: Restore last viewed quote from session storage
function loadLastViewedQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const quote = JSON.parse(last);
    document.getElementById("quoteDisplay").innerHTML = `
      <blockquote>"${quote.text}"</blockquote>
      <p class="quote-category">Category: ${quote.category}</p>
    `;
  }
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
  addButton.addEventListener("click", addquote);

// Export Button
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Quotes";
  exportBtn.id = "exportBtn";
  exportBtn.addEventListener("click", exportQuotes);

  // Import Input
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.id = "importFile";
  importInput.addEventListener("change", importFromJsonFile);

  // Append all to container
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
    saveQuotes();
    showRandomQuote();

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
}

// ==========================
// 5. Export Quotes to JSON File
// ==========================
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ==========================
// 6. Import Quotes from JSON File
// ==========================
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showRandomQuote();
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


// Initial quote display

loadQuotes();
createAddQuoteForm(); 
loadLastViewedQuote();
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
