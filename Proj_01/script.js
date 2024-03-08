const books = [
  {
    id: 1,
    title: "Dom Casmurro",
    author: "Machado de Assis",
    category: "Ficção",
    reserved: false,
  },
  {
    id: 2,
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    category: "Fantasia",
    reserved: false,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    category: "Ficção Científica",
    reserved: false,
  },
  {
    id: 4,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    category: "Romance",
    reserved: false,
  },
  {
    id: 5,
    title: "O Grande Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Romance",
    reserved: false,
  },

];


const listaLivro = document.getElementById("listaLivro");
const pesquisa = document.getElementById("pesquisa");
const livroBtn = document.getElementById("livroBtn");
const categoriaBtn = document.getElementById("categoriaBtn");

function renderBooks(booksToRender) {
  listaLivro.innerHTML = "";
  booksToRender.forEach(book => {
      const li = document.createElement("li");
      li.classList.add("book");
      li.innerHTML = `<strong>Título:</strong> ${book.title}<br>
                      <strong>Autor:</strong> ${book.author}<br>
                      <strong>Categoria:</strong> ${book.category}<br>
                      <strong>Reservado:</strong> ${book.reserved ? "Sim" : "Não"}
                      <button class="deleteBtn" data-book-id="${book.id}">Excluir</button>
                      <button class="reserveBtn" data-book-id="${book.id}">${book.reserved ? "Devolver" : "Reservar"}</button>`;
      listaLivro.appendChild(li);
  });
}

function searchBooks(query) {
  const filteredBooks = books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(query.toLowerCase());
      const authorMatch = book.author.toLowerCase().includes(query.toLowerCase());
      const categoryMatch = book.category.toLowerCase().includes(query.toLowerCase());
      return titleMatch || authorMatch || categoryMatch;
  });
  renderBooks(filteredBooks);
}

pesquisa.addEventListener("input", () => {
  const query = pesquisa.value.trim();
  searchBooks(query);
});

function deleteBook(bookId) {
  const confirmDelete = confirm("Tem certeza que deseja excluir este livro?");
  if (confirmDelete) {
      const bookIndex = books.findIndex(book => book.id === bookId);
      if (bookIndex !== -1) {
          books.splice(bookIndex, 1);
          renderBooks(books);
      }
  }
}

function reserveBook(bookId) {
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
      books[bookIndex].reserved = !books[bookIndex].reserved;
      renderBooks(books);
  }
}

function addBook(title, author, category) {
  const id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
  books.push({ id, title, author, category, reserved: false });
  renderBooks(books);
}

function addCategory(categoryName) {
  // Aqui você pode adicionar a lógica para adicionar a categoria à sua lista de categorias
  console.log("Categoria adicionada:", categoryName);
}

// adiciona eventos aos botoes 
livroBtn.addEventListener("click", () => {
  const title = prompt("Digite o título do livro:");
  const author = prompt("Digite o autor do livro:");
  const category = prompt("Digite a categoria do livro:");
  if (title && author && category) {
      addBook(title, author, category);
  } else {
      alert("Por favor, preencha todos os campos.");
  }
});

categoriaBtn.addEventListener("click", () => {
  const categoryName = prompt("Digite o nome da nova categoria:");
  if (categoryName) {
      addCategory(categoryName);
  } else {
      alert("Por favor, insira o nome da categoria.");
  }
});

listaLivro.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("deleteBtn")) {
      const bookId = parseInt(target.getAttribute("data-book-id"));
      deleteBook(bookId);
  } else if (target.classList.contains("reserveBtn")) {
      const bookId = parseInt(target.getAttribute("data-book-id"));
      reserveBook(bookId);
  } else if (target.classList.contains("editBtn")) {
      const bookId = parseInt(target.getAttribute("data-book-id"));
      // Chama a função para abrir o modal de edicao passando o id do livro
  }
});

// Inicializando a renderização dos livros
renderBooks(books);
