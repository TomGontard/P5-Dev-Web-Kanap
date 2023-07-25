async function listenForBasketChange() {
    // Récupération du panier
    cart = JSON.parse(localStorage.getItem('cart'));
    
    // Mise sous écoute des quantités et suppressions des articles
    const quantityInputs = document.querySelectorAll('.itemQuantity');
    const deleteButtons = document.querySelectorAll('.cart__item__content__settings__delete');

    
    quantityInputs.forEach((input) => {
        // Actualisation lors de la mise à jour des quantités
        input.addEventListener('change', (event) => {
            const quantity = parseInt(event.target.value);
            const article = event.target.closest('.cart__item');
            const id = article.dataset.id;
            const color = article.dataset.color;

            const itemIndex = cart.findIndex((item) => item.id === id && item.color === color);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));;
                displayArticles();
            }
        });
    });

    deleteButtons.forEach((button) => {
        // Actualisation lors de la suppression des produits du panier
        button.addEventListener('click', (event) => {
            const article = event.target.closest('.cart__item');
            const id = article.dataset.id;
            const color = article.dataset.color;

            cart = cart.filter((item) => !(item.id === id && item.color === color));
            localStorage.setItem('cart', JSON.stringify(cart));;
            displayArticles();
        });
    });

}

// Affichage des articles ajoutés au panier
async function displayArticles() {
    // Récupération du panier
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartSection = document.querySelector('#cart__items');

    console.log(cart);

    // Récupération de toutes les informations des produits
    const response = await fetch(`http://localhost:3000/api/products`);
    const products = await response.json();

    cartSection.innerHTML = '';

    // Affichage d'un message d'erreur si le panier est vide
    if (!cart || cart.length === 0) {
        cartSection.innerHTML = '<p>Le panier est vide.</p>';;
        return;
    } else {
        cart.forEach((item) => {
            // Obtention des détails du produit
            const product = products.find((p) => p._id === item.id);

            // Création de toutes les balises HTML et ajout de leur description
            const article = document.createElement('article');
            article.classList.add('cart__item');
            article.dataset.id = item.id;
            article.dataset.color = item.color;

            const imgDiv = document.createElement('div');
            imgDiv.classList.add('cart__item__img');

            const image = document.createElement('img');
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            imgDiv.appendChild(image);

            const contenuDiv = document.createElement('div');
            contenuDiv.classList.add('cart__item__content');


            const descriptionContenuDiv = document.createElement('div');
            descriptionContenuDiv.classList.add('cart__item__content__description');

            const productName = document.createElement('h3');
            productName.textContent = product.name;
            descriptionContenuDiv.appendChild(productName);

            const productColor = document.createElement('p');
            productColor.textContent = item.color;
            descriptionContenuDiv.appendChild(productColor);
            
            const productPrice = document.createElement('p');
            productPrice.textContent = `${product.price} €`;
            descriptionContenuDiv.appendChild(productPrice);


            const parametresProduitDiv = document.createElement('div');
            parametresProduitDiv.classList.add('cart__item__content__settings');

            const quantiteParametresProduitDiv = document.createElement('div');
            quantiteParametresProduitDiv.classList.add('cart__item__content__settings_quantity');
            parametresProduitDiv.appendChild(quantiteParametresProduitDiv);

            const productQuantity = document.createElement('p');
            productQuantity.textContent = 'Qté : ';
            quantiteParametresProduitDiv.appendChild(productQuantity);

            const inputProductQuantity = document.createElement('input');
            inputProductQuantity.type = 'number';
            inputProductQuantity.classList.add('itemQuantity');
            inputProductQuantity.name = 'itemQuantity';
            inputProductQuantity.min = '1';
            inputProductQuantity.max = '100';
            inputProductQuantity.value = item.quantity;
            quantiteParametresProduitDiv.appendChild(inputProductQuantity);


            const deleteProductDiv = document.createElement('div');
            deleteProductDiv.classList.add('cart__item__content__settings__delete');

            const deleteProduct = document.createElement('p');
            deleteProduct.textContent = 'Supprimer';
            deleteProductDiv.appendChild(deleteProduct);

            contenuDiv.appendChild(descriptionContenuDiv);
            contenuDiv.appendChild(parametresProduitDiv);
            contenuDiv.appendChild(deleteProductDiv);

            article.appendChild(imgDiv);
            article.appendChild(contenuDiv);
            
            cartSection.appendChild(article);
        });
    };

    listenForBasketChange();

}


//Lancement de la fonction une fois que la page est chargée
document.addEventListener('DOMContentLoaded', displayArticles);