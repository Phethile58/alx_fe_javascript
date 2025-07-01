// ====== Configuration ======
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts" ; // Replace with actual URL

let quotes = [];
let selectedCategory = "all";

// ====== Fetch Quotes From Server ======
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    return serverQuotes;
  } catch (error) {
    notify("Error fetching from server: " + error.message);
    return [];
  }
} 

// ====== Sync Quotes (wrapper function) ======
async function syncQuotes() {
  await syncWithServer();
}

// ====== Load and Save Quotes ======
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
 quotes = storedQuotes ? JSON.parse(storedQuotes) : [];

const storedCategory = localStorage.getItem("selectedCategory");
  if (storedCategory) {
    selectedCategory = storedCategory;
  }
}

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    localStorage.setItem("selectedCategory", selectedCategory);
}

// ===== Populate categories =====

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = selectedCategory;
}
// ===== Filter and Show Quote ======
function filterQuote() {
const selected = document.getElementById("categoryFilter").value;
  selectedCategory = selected;
  saveQuotes();

  const filteredQuotes = selected === "all" 
  ? quotes 
  : quotes.filter(q => q.category === selected);

    if (filterQuote.lengh === 0) {
    document.getElementById("quoteDisplay").textContent = "no quotes avaliable";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

   document.getElementById ("quoteDisplay").innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <P class="quote-category">Category: ${quote.category}</p>
    `;

    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

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
// ====== Add Quote ======
async function addquote() {
    const textInput = document.getElementById('newQuotetext');
    const categoryInput = document.getElementById('newQuoteCategory');

    const newText = textInput.Value.trim();
    const newCategory = categoryInput.Value.trim();

    if (!newText || !newCategory) {
        alert("Please fill in both fieds.");
        return;
    }

    const newQuote={ text: newText, category: newCategory };
    quotes.push (newQuote);
    saveQuotes();
    populateCategories();
    filterQuote(); 

    textInput.value = "";
    categoryInput.value = "";

    try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuote)
    });
    notify("Quote synced to server.");
  } catch (err) {
    notify("⚠️ Failed to sync to server.");
  }
}

// ====== Export Quotes ======
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ====== Import Quotes ======
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
         populateCategories();
        filterQuote();
        notify("✅ Quotes imported.")
      } else {
        notify("Invalid JSON format.");
      }
    } catch (err) {
      notify("Error importing: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ====== Sync With Server ======

async function syncWithServer() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    const mergedQuotes = resolveConflicts(localQuotes, serverQuotes);
    quotes = mergedQuotes;
    saveQuotes();
    populateCategories();
    filterQuote();
    notify("Quotes synced with server.");
  } catch (err) {
    notify("⚠️ Sync failed: " + err.message);
  }
}

function resolveConflicts(local, server) {
  const map = new Map();
  server.forEach(q => map.set(q.text.toLowerCase(), q));
  local.forEach(q => {
    const key = q.text.toLowerCase();
    if (!map.has(key)) map.set(key, q);
  });
  return Array.from(map.values());
}

// ====== Notifications ======
function notify(message) {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.background = "#fffae6";
  note.style.color = "#333";
  note.style.border = "1px solid #e1c100";
  note.style.padding = "10px";
  note.style.marginTop = "1rem";
  note.style.borderRadius = "5px";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 4000);
}

// === Initialize App =====
loadQuotes();
populateCategories();
loadLastViewedQuote();
filterQuote();
syncQuotes(); 
setInterval(syncQuotes, 60000); // auto-sync every 60s


// ===== Event listeners =====
document.getElementById('newQuote').addEventListener('click', filterQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addquote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);