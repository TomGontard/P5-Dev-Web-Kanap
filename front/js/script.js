// Fonction pour récupérer les produits de l'API
async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
  }
}

// Fonction pour créer et insérer les éléments HTML des produits dans la section "items"
async function insertProductsIntoDOM() {
  const itemsSection = document.getElementById('items');

  // Récupérer les produits de l'API
  const products = await getProducts();

  // Parcourir les produits et les insérer dans le DOM
  products.forEach((product) => {
    const link = document.createElement('a');
    const article = document.createElement('article');
    const image = document.createElement('img');
    const productName = document.createElement('h3');
    const productDescription = document.createElement('p');

    // Attribuer les classes et les attributs nécessaires aux éléments
    link.href = `./product.html?id=${product.id}`; // Lien vers la page produit avec l'ID du produit
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    productName.textContent = product.name;
    productDescription.textContent = product.description;

    // Ajouter les éléments à la page
    link.appendChild(article);
    article.appendChild(image);
    article.appendChild(productName);
    article.appendChild(productDescription);
    itemsSection.appendChild(link);
  });
}

// Appeler la fonction pour insérer les produits lorsque la page est chargée
document.addEventListener('DOMContentLoaded', insertProductsIntoDOM);
