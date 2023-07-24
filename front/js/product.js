async function getProductIdFromURL() {
    //Récupération de l'ID du produit à partir de l'URL
    const params = new URLSearchParams(window.location.search);
    if (params.has('id')) {
        console.log(params.get('id'));
        return params.get('id');
    } else {
        return "Erreur";
    }
}

async function getProductDetails() {
    try {
        //Récupération de l'ID du produit puis de ses informations via l'API
        const id = await getProductIdFromURL();
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const product = await response.json();
        console.log(product);
        return product;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
  }
}

async function displayProductDetails() {
    //Récupération des informations du produit
    const productDetails = await getProductDetails();
    
    //Création des variables pour chacune des informations
    const imageElement = document.createElement('img');
    const titleElement = document.getElementById('title');
    const priceElement = document.getElementById('price');
    const descriptionElement = document.getElementById('description');
    const colorsSelectElement = document.getElementById('colors');

    //Rattachage des informations aux variables
    imageElement.src = productDetails.imageUrl;
    imageElement.alt = productDetails.altTxt;
    titleElement.textContent = productDetails.name;
    priceElement.textContent = productDetails.price;
    descriptionElement.textContent = productDetails.description;
    colorsSelectElement.textContent = productDetails.colors;
    
    // Insertion de l'image dans la div prévue à cet effet avec la classe "item__img"
    const itemImgDiv = document.querySelector('.item__img');
    itemImgDiv.appendChild(imageElement);

    //Création des options pour chacune des couleurs des produits
    productDetails.colors.forEach((color) => {
        const optionElement = document.createElement('option');
        optionElement.value = color;
        optionElement.textContent = color;
        colorsSelectElement.appendChild(optionElement);
    });
}

//Lancement de la fonction une fois que la page est chargée
document.addEventListener('DOMContentLoaded', displayProductDetails);
