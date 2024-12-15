document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('book-gallery'); 
    const searchInput = document.getElementById('search-input'); 
    let books = []; 

    try {
        
        const response = await fetch('http://localhost:8080/api/v1/books'); 
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json(); 
        books = data.data; 

        displayBooks(books); 
    } catch (error) {
        console.error('Error fetching books:', error);
        gallery.innerHTML = '<p class="text-danger">Failed to load books.</p>';
    }

    
    function displayBooks(filteredBooks) {
        gallery.innerHTML = ''; 

        if (filteredBooks.length === 0) {
            gallery.innerHTML = '<p class="text-danger">No books found.</p>';
            return;
        }

        filteredBooks.forEach(book => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100" data-id="${book.booksid}" data-bs-toggle="modal" data-bs-target="#bookModal">
                        <img src="${book.image_url || 'https://via.placeholder.com/400x400'}" class="card-img-top" alt="${book.booksname || 'No Title'}">
                        <div class="card-body">
                            <h5 class="card-title">${book.booksname || 'No Title'}</h5>
                        </div>
                    </div>
                </div>
            `;
            gallery.insertAdjacentHTML('beforeend', card);
        });
    }

    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase(); 
        const filteredBooks = books.filter(book =>
            (book.booksname && book.booksname.toLowerCase().includes(query)) ||
            (book.author && book.author.toLowerCase().includes(query)) ||
            (book.category && book.category.toLowerCase().includes(query))
        );
        displayBooks(filteredBooks); 
    });

    
    gallery.addEventListener('click', (event) => {
        const card = event.target.closest('.card'); 
        if (card) {
            const bookId = card.dataset.id; 
            const book = books.find(b => b.booksid == bookId); 

            if (book) {
                
                document.getElementById('modal-image').src = book.image_url || 'https://via.placeholder.com/400x400';
                document.getElementById('modal-booksname').textContent = book.booksname || 'No Title';
                document.getElementById('modal-author').textContent = book.author || 'Unknown Author';
                document.getElementById('modal-category').textContent = book.category || 'No Category';
                document.getElementById('modal-publisheddate').textContent = book.publisheddate || 'No Date';
                document.getElementById('modal-summary').textContent = book.summary || 'No Summary';
            }
        }
    });
});

