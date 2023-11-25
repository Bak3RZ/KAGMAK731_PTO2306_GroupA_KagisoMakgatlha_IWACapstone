// import script elements from 'data.js'
import {BOOKS_PER_PAGE, authors, genres, books} from './data';

// Import HTML references
const dataHeaderSearch = document.getElementById('data-header-search');
const dataHeaderSettings = document.getElementById('data-header-settings');
const dataListItems = document.getElementById('data-list-items')
const dataListMessage = document.getElementById('data-list-message');
const dataListButton = document.getElementById('data-list-button')
const dataListActive = document.getElementById('data-list-active')
const dataListBlur = document.getElementById('data-list-blur')
const dataListImage = document.getElementById('data-list-image')
const dataListTitle = document.getElementById('data-list-title')
const dataListSubtitle = document.getElementById('data-list-subtitle')
const dataListDescription = document.getElementById('data-list-description')
const dataListClose = document.getElementById('data-list-close')
const dataSearchOverlay = document.getElementById('data-search-overlay')
const dataSearchForm = document.getElementById('data-search-form')
const dataSearchTitle = document.getElementById('data-search-title')
const dataSearchGenres = document.getElementById('data-search-genres')
const dataSearchAuthors = document.getElementById('data-search-authors')
const dataSearchCancel = document.getElementById('data-search-cancel')
const dataSettingsOverlay = document.getElementById('ata-settings-overlay')
const dataSettingsForm = document.getElementById('data-settings-form')
const dataSettingsCancel = document.getElementById('data-settings-cancel')
const dataListDisabled = document.getElementById('data-list-disabled')

let matches = books; // set value 'books' to variable/identifier 'matches' and declare with 'let'
let page = 1; // set number '1' to variable/identifier 'page' and declare with 'let'
const range ="";
let summary;


// code creates an object that represents the lighting conditions during a day, with two states: 'dark' and 'light'.
let day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}; 
// code creates an object that represents the lighting conditions during the night, with two states: 'dark' and 'light'.
let night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

// COLOR THEME
let v;
if (dataHeaderSettings.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
 v = 'night';
} else {
 v = 'day';
};

// documentElement.style.setProperty()' is used to set/modify CSS properties of HTML element.
document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);

// a temporary container for a collection of nodes which will later be manipulated.
let fragment = document.createDocumentFragment();

// INPUT VALIDATION
if (!books && !Array.isArray(books)) throw new Error('Source required');
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers');

// Extract the first 36 books from the 'books' array
const extracted = books.slice(0, 36); 

// BOOK PREVIEW
// Sample summaries for each book (replace these with actual book summaries)
const bookSummaries = {
    book1: "A thrilling adventure full of suspense and mystery.",
    book2: "A heartwarming story about love and friendship.",
    // Add more summaries for each book as needed
};

// Function to create and append book previews to the DOM
function displayBookPreviews() {
    // Clear the existing content of dataListItems
    dataListItems.innerHTML = '';

    // Iterate over each book in the 'matches' array
    for (const { author, id, image, title, published } of matches) {
        const preview = createBookPreview({
            author,
            id,
            image,
            title,
            published,
        });

        dataListItems.appendChild(preview);
    };
};

// Function to create book previews
function createBookPreview({ author, id, image, title, published }) {
    const preview = document.createElement('div');
    preview.classList.add('book-preview');

    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.alt = title;

    const titleElement = document.createElement('h3');
    titleElement.innerText = title;

    const authorElement = document.createElement('p');
    authorElement.innerText = `Author: ${author}`;

    // New element for displaying the publication date
    const dateElement = document.createElement('p');
    dateElement.innerText = `Published: ${new Date(published).toLocaleDateString()}`;

    const summaryButton = document.createElement('button');
    summaryButton.innerText = 'Read Summary';
    summaryButton.addEventListener('click', () => showSummary(id));

    preview.appendChild(imageElement);
    preview.appendChild(titleElement);
    preview.appendChild(authorElement);
    preview.appendChild(dateElement); // Add the date element
    preview.appendChild(summaryButton);

    return preview;
};

// Function to show the summary when the "Read Summary" button is clicked
function showSummary(bookId) {
    const summary = bookSummaries[bookId] || "Summary not available.";
    alert(summary);
};
// Call the function to display book previews
displayBookPreviews();

// GENRES
element = document.createElement('option'); // creates a new 'option' element.
element.value = 'any'; // sets the value of the new option element to 'any'.
element.innerText = 'All Genres'; // sets the text of the new option element to 'All Genres'.
genres.appendChild(element); // appends the new option element to the "genres" document fragment.

// list for genres allowing users to choose their genre preference from a dropdown list.
let genresFragment = document.createDocumentFragment();

for (const [id, name] of Object.entries(genres)) { // Used const [id, name] to correctly destructure the entries of genres.
    const element = document.createElement('option'); // Created a new option element inside the loop using document.createElement.
    element.value = id; // sets 'id' as the property for the value
    element.innerText = name; // Set the value and innerText properties of the option element.
    genresFragment.appendChild(element); // Appends the option element to the authors element.
};

dataSearchGenres.appendChild(genresFragment); // append 'genres' document fragment to the DOM element

// AUTHORS
element = document.createElement('option'); // creates an empty 'option' element.
element.value = 'any'; // sets the value of 'option' to 'any'
element.innerText = 'All Authors'; // sets the content of 'option' element to 'all authors'
authors.appendChild(element); // adds the new 'option' element to the list of 'option' elements within 'authors' DocumentFragment.

// list for authors allowing users to choose their author preference from a dropdown list.
let authorsFragment = document.createDocumentFragment();

for (const [id, name] of Object.entries(authors)) {  // Used const [id, name] to correctly destructure the entries of authors.
    const element = document.createElement('option'); // Created a new option element inside the loop using document.createElement.
    element.value = id; // Assuming 'id' is the correct property for the value
    element.innerText = name; // Set the value and innerText properties of the option element.
    authorsFragment.appendChild(element); // Appends the option element to the authors element.
};

dataSearchAuthors.appendChild(authors) // append 'authors' document fragment to the DOM element

// LIST BUTTON
// code is updating the text content of an HTML element with the id 'data-list-button'.
dataListButton.textContent = `Show more (${books.length - BOOKS_PER_PAGE})`;
// code disables the "Show more" button when there are no more additional items to display
dataListDi = !(matches.length - [page * BOOKS_PER_PAGE] > 0);
// code allows the user to see the number of remaining items that can be displayed when they click the "Show more" button.
dataListButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})</span>
`;

// code creates a list of buttons with embedded images, titles, and author names, using data extracted from the source array.
dataListItems.innerHTML = ''
const fragment2 = document.createDocumentFragment()
const extracted2 = books.slice(0, BOOKS_PER_PAGE);

for (let i = 0; i < extracted.length; i++) {
    const { author: authorId, id, image, title } = extracted[i]; // retrieves author's id, image, and title from the current element.

    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    // Template literal that contains the structure of the content of each list item
    element.innerHTML = /* html */ `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `;

    fragment.appendChild(element);
};
    
dataListItems.appendChild(fragment); 

/** DISABLING DATA-LIST-BUTTON
 * this line of code disables the 'data-list-button' if there are still matches to be shown on the page, 
 * based on the number of remaining matches after all previous pages have been shown.
 */
const initial = matches.length - (page * BOOKS_PER_PAGE); // code gives the remaining number of matches after all previous pages have been shown.
const remaining = hasRemaining ? initial : 0; // variable 'remaining' is assigned a value based on the condition 'hasRemaining'.
dataListButton.disabled = initial > 0; //  button will be disabled if there are still matches to be shown on the page.

// code updates the inner HTML content of the 'data-list-button' element, replacing the original text.
dataListButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
`;

// EVENT LISTENER - cancel search
// code allows the user to close the search overlay when they click the "data-search-cancel" button.
dataSearchCancel.addEventListener('click', function() {
    dataSearchOverlay.open !== true;
});

// EVENT LISTENER - cancel settings
// coode allows the user to close the settings overlay when they click the "data-settings-cancel" button.
dataSettingsCancel.addEventListener('click', function() {
    document.querySelector('data-settings-overlay').open = false;
});

// EVENT LISTENER - form settings
// code handles form submissions.
dataSettingsForm.addEventListener('submit', function() {
    actions.settings.submit();
});

// EVENT LISTENER - list
// code handles clicks on the "data-list-close" element and closes the settings overlay when the user clicks on it.
dataListClose.addEventListener('click', function() {
    dataSettingsOverlay.open = false;
});

// EVENT LISTENER - button list
// code handles clicks on the "data-list-button" element and updates the matches list by appending new matches to the list.
dataListButton.addEventListener('click', function() {
    const matchesFragment = createMatchesFragment(matches);
    document.querySelector('data-list-items').appendChild(matchesFragment);
    actions.list.updateRemaining();
    page = page + 1;
});


// EVENT LISTENER - header search
// code sets the focus to the search input field when the user clicks on the search button. 
dataHeaderSearch.addEventListener('click', function() {
    dataSearchOverlay.open !== true;
    dataSearchTitle.focus();
});

// code defines a function that creates a new HTML fragment representing the matches on the current page.
function createMatchesFragment(matches) {
    return createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)
};

/**
 * EVENT LISTENER - Form Search
 * Finds books based on specific text phrases
 * Filters books based on genre/ author
 */ 
dataSearchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // ensures that the page does not refresh when the form is submitted.
    const formData = new FormData(event.target); // gather up form inputs into a set that can be sent off to the server.
    const filters = Object.fromEntries(formData); // convert FormData into an object
    const result = [];

    // contains all the book objects and filters
    for (const book of books) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        
        // FILTER BOOK BY AUTHOR
        const authorMatch = filters.author === 'any' || book.author === filters.author;

        // FILTER BOOK BY GENRE
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);

        // Additional condition to check if the book's description includes the search phrase
        const descriptionMatch = filters.description.trim() === '' || book.description.toLowerCase().includes(filters.description.toLowerCase());

        // ensures that a book is added to the result array only if it satisfies all the specified conditions/filters
        if (titleMatch && authorMatch && genreMatch && descriptionMatch) {
            result.push(book);
        };
    };

    if (result.length < 1) {
        // check if the length of 'result' is less than one.
        dataListMessage.classList.add('list__message_show'); // if true, display is empty
    } else {
        dataListMessage.classList.remove('list__message_show'); // if false, display is not empty
    };
});

window.scrollTo({ top: 0, behavior: 'smooth' }); // scrolls the page to the top
dataSearchOverlay.open !== true == false; // checks the truthy condition of 'data-search-overlay'.

// EVENT LISTENER - overlay settings
dataSettingsOverlay.addEventListener('submit', function(event) {
    event.preventDefault(); // prevents default behaviour
    const formData = new FormData(event.target); // new 'FormData' created
    const result = Object.fromEntries(formData); // converts 'FormData' object into a JavaScript object 
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark); // updates the CSS custom properties with the new values from 'result.theme' object.
    document.documentElement.style.setProperty('--color-light', css[result.theme].light); // same as above comment.
    dataSettingsOverlay.open = false; // closes the overlay
});

// EVENT LISTENER - items list
// // used to find the active list item. displays additional information about the active book.
dataListItems.addEventListener('click', function(event) { // event listener added
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (const node of pathArray) { // correct the loop syntax to 'for'
        if (active) break; // if variable has been assigned a value, breaks.

        const previewId = node?.dataset?.preview; // replaced 'id' with 'previewID'

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            };
        };
    };

    if (!active) return; // corrected 'if' syntax

    dataSettingsOverlay.open = true; // property is set to true, indicating the list is active
    dataListImage.src = active.image; // element is updated with the image URL of the active book.
    dataListTitle.innerText = active.title; // element is updated with the title of the active book
    
    const author = authors[active.author] || 'Unknown Author';
    const year = new Date(active.published).getFullYear();
    dataListSubtitle.innerText = `${author} (${year})`; // element is updated with the authors name and the publication year of active book.
    
    dataListDescription.innerText = active.description; // element is updated with the description of the active book
});