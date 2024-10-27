
// ==================================================================================================================================
// ----------------------------------------------------------------------------------------------------------------------------------
// AFFICHAGE DE LA CARTE

const latitude = 49.83763;
const longitude = 3.26675;

var map = L.map('map').setView([latitude, longitude], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([latitude, longitude]).addTo(map)
    .bindPopup('L\'aura Natur\'elle.')
    .openPopup();


    
// ==================================================================================================================================
// ----------------------------------------------------------------------------------------------------------------------------------
// MODIFICATION DYNAMIQUE DES IMAGES DE PRESTATIONS


let currentIndex = 0; // Index de l'image actuellement affichée
const image = document.querySelector('.services-index-img');
const text = document.querySelector('.prestations-text-index');
const btn = document.querySelector('.btn-services-index');
const source = document.querySelector('#diapo source');
const img = document.querySelector('#diapo img');

// Fonction pour changer l'image toutes les X millisecondes
const changeImage = () => {

    text.classList.remove('lightmode');
    btn.classList.remove('lightmode');

    image.style.opacity = 0;

    setTimeout(() => {

        // ! Changer le lien une fois le passage en back
        let linkImg = './public/assets/img/illustrations/prestations/';

        // ! Remplacer 6 après le modulo par le nombre de catégories existantes en BDD avec de l'AJAX
        currentIndex = (currentIndex + 1) % 6;

        source.srcset = linkImg + `${currentIndex +1}-xl.webp`;
        img.src = linkImg + `${currentIndex +1}.webp`;
        
        image.style.opacity = 1;

        // ! Remplacer la condition par la vérification du darkmode enregistré en BDD
        if (currentIndex == 2 || currentIndex == 4) {
            text.classList.add('lightmode');
            btn.classList.add('lightmode');
        }
    }, 1000);
}


// Lancement de l'animation uniquement pour les formats tablettes et supérieurs
if (window.innerWidth >= 768) {
    // 1000 = 1s
    setInterval(changeImage, 8000);
}


// ==================================================================================================================================
// ----------------------------------------------------------------------------------------------------------------------------------
// CHANGEMENT DE L'IMAGE AU SURVOL SUR LA CARTE DE FIDÉLITÉ


const fidelitySource = document.querySelector('.fidelity-img source');
const fidelityImg = document.querySelector('.fidelity-img img');


fidelityImg.addEventListener('mouseover', () => {
    fidelitySource.srcset = './public/assets/img/illustrations/others/carte-xl.webp';
    fidelityImg.src = './public/assets/img/illustrations/others/carte.webp';
});

fidelityImg.addEventListener('mouseleave', () => {
    fidelitySource.srcset = './public/assets/img/illustrations/others/carte-xl-verso.webp';
    fidelityImg.src = './public/assets/img/illustrations/others/carte-verso.webp';
});