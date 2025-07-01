let quotes = [];
let selectedCategory = "all";

// Load quotes and selected category from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
 quotes = storedQuotes ? JSON.parse(storedQuotes) : [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Be yourself; everyone else is already taken.", category: "Life" },
    { text: "Success is not final, failure is not fatal.", category: "Success" }
];
saveQuotes();

const storedCategory = localStorage.getItem("selectedCategory");
  if (storedCategory) {
    selectedCategory = storedCategory;
    document.getElementById("categoryFilter").value = selectedCategory;
  }
}

function saveQuotes(){
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate categories dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  // Clear existing options (except "All")
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected
  categoryFilter.value = selectedCategory;
}
// Display a filtered/random quote
function filterQuote() {
const selected = document.getElementById("categoryFilter").value;
  selectedCategory = selected;
  localStorage.setItem("selectedCategory", selected);

  const filteredQuotes = selected === "all" ? quotes : quotes.filter(q => q.category === selected);

    if (filterQuote.lengh === 0) {
    document.getElementById("quoteDisplay").textContent = "no quotes avaliable";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredquotes.length);
    const quote = filteredQuotes[randomIndex];

   document.getElementById ("quoteDisplay").innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <P class="quote-category">Category: ${quote.category}</p>
    `;

    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

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
    populateCategories();
    filterQuote(); // Show a new quote from possibly updated category

    textInput.value = "";
    categoryInput.value = "";
}

function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
         populateCategories();
        alert("Quotes imported successfully!");
        filterQuote();
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// === INITIALIZE ===
loadQuotes();
populateCategories();
filterQuotes();

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);