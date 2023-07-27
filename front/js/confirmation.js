async function getPurchaseIdFromURL() {
    //Récupération de l'ID du produit à partir de l'URL
    const params = new URLSearchParams(window.location.search);
    if (params.has('id')) {
        return params.get('id');
    } else {
        return "Erreur";
    }
}

async function displayID() {
    try {
        //Récupération de l'ID de la commande et affichage du numéro
        const id = await getPurchaseIdFromURL();
        const span = document.querySelector('#orderId');
        span.textContent = id;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
  }
}

// Lancement de la fonction une fois que la page est chargée
document.addEventListener('DOMContentLoaded', displayID);