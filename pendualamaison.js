const narutoCharacters = [
    "Naruto", "Sasuke", "Sakura", "Kakashi", "Itachi", "Gaara", "Hinata", "Neji", "RockLee", "Tsunade", "Jiraiya", "Orochimaru",
    "Shikamaru", "Ino", "Choji", "Kiba", "Shino", "Kurenai", "Asuma", "KillerBee", "Minato", "Kushina", "Madara", "Obito", "Nagato",
    "Konan", "Pain", "Zabuza", "Haku", "Kabuto", "Temari", "Kankuro", "MightGuy", "Hiruzen", "Yamato", "Anko", "Sai", "Deidara", 
    "Kisame", "Sasori", "Tobi", "Hashirama", "Tobirama", "Danzo", "Hanzo", "Mei", "Raikage", "Ohnoki", "Rin", "Boruto", "Sarada", 
    "Mitsuki", "Shisui", "Kaguya", "Toneri", "Hagoromo", "Hamura", "Karin", "Suigetsu", "Guren", "Kakuzu", "Hidan", "Jugo"
];

// Sélection des éléments du DOM
const PENDU = document.getElementById('pendu');
const MOT_DEVINE = document.getElementById('mot-devine');
const MAUVAISES_LETTRES = document.getElementById('wrong-letters');
const SCORE = document.getElementById('score-total');
const SCORE_PERDU = document.getElementById('score-perdu');
const TENTATIVES_RESTANTES = document.getElementById('tentatives-restantes');
const REJOUER_BTN = document.getElementById('replay');
const EFFACER_SCORE_BTN = document.getElementById('clear-score');
const IMAGE_CONTAINER = document.getElementById('image-container');
const buttons = document.querySelectorAll('.btns button');

// Initialisation des variables globales
let motChoisi = "";
let motDevine = [];
let mauvaisesLettres = [];
let tentatives = 10;
let scoreTotal = 0;
let manchesPerdues = 0;

SCORE.textContent = localStorage.getItem('score-total') ?? "0";
SCORE_PERDU.textContent = localStorage.getItem('score-perdu') ?? "0";

// Chemins des images
const correctImage = "./niceguy.gif";  
const incorrectImage = "./sakurahitnaruto.gif"; 
const loseImage = "./defaitenaruto.jpg"; 

// Fonction pour choisir un mot aléatoire
function choisirMotAleatoire() {
    const indexAleatoire = Math.floor(Math.random() * narutoCharacters.length);
    const motAleatoire = narutoCharacters[indexAleatoire].toUpperCase();
    console.log("Mot choisi aléatoirement : ", motAleatoire);  // Affiche le mot choisi dans la console
    return motAleatoire;
}

// Fonction pour initialiser le mot deviné
function initialiserMotDevine(mot) {
    let motDevine = [];
    for (let i = 0; i < mot.length; i++) {
        motDevine.push('_');
    }
    return motDevine;
}

// Fonction pour gérer les clics sur les boutons
function handleButtonClick(event) {
    const lettre = event.target.innerText;
    event.target.disabled = true;

    if (motChoisi.includes(lettre)) {
        for (let i = 0; i < motChoisi.length; i++) {
            if (motChoisi[i] === lettre) {
                motDevine[i] = lettre;
            }
        }
        MOT_DEVINE.innerHTML = `${motDevine.join(' ')}`;
        afficherImage(correctImage);
    } else {
        tentatives--;
        mauvaisesLettres.push(lettre);
        MAUVAISES_LETTRES.innerHTML = `Lettres erronees: ${mauvaisesLettres.join(', ')}`;
        TENTATIVES_RESTANTES.textContent = tentatives;
        afficherImage(incorrectImage);
    }

    verifierFinJeu();
}

// Fonction pour afficher une image
function afficherImage(imageSrc) {
    console.log("Chemin de l'image à afficher : ", imageSrc);  // Affiche le chemin de l'image dans la console
    IMAGE_CONTAINER.innerHTML = '';
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Naruto';
    IMAGE_CONTAINER.appendChild(img);
}

// Fonction pour vérifier si le jeu est terminé
function verifierFinJeu() {
    if (tentatives === 0) {
        MOT_DEVINE.innerHTML = `Game Over! Le personnage etait: ${motChoisi}`;
        manchesPerdues++;
        localStorage.setItem('score-perdu', manchesPerdues);
        SCORE_PERDU.textContent = manchesPerdues;
        afficherImage(loseImage);
        desactiverBoutons();
    } else if (motDevine.join('') === motChoisi) {
        MOT_DEVINE.innerHTML = `Bien joue bg 😎! c'est bien: ${motChoisi}`;
        scoreTotal++;
        localStorage.setItem('score-total', scoreTotal);
        SCORE.textContent = scoreTotal;
        afficherImagePersonnage(motChoisi);
        desactiverBoutons();
    }
}

// Fonction pour afficher l'image du personnage trouvé
function afficherImagePersonnage(mot) {
    IMAGE_CONTAINER.innerHTML = '';
    const img = document.createElement('img');
    let imgSrc = "";

    switch(mot.toLowerCase()) {
        case "naruto":
            imgSrc = "./images/naruto.webp";
            break;
        case "sasuke":
            imgSrc = "./images/sasuke.webp";
            break;
        case "sakura":
            imgSrc = "./images/sakura.jpg";
            break;
        case "kakashi":
            imgSrc = "./images/kakashi.webp";
            break;
        case "itachi":
            imgSrc = "./images/itachi.webp";
            break;
        case "gaara":
            imgSrc = "./images/gaara.webp";
            break;
        case "hinata":
            imgSrc = "./images/hinata.webp";
            break;
        case "neji":
            imgSrc = "./images/neji.webp";
            break;
        case "rocklee":
            imgSrc = "./images/rocklee.webp";
            break;
        case "tsunade":
            imgSrc = "./images/tsunade.webp";
            break;
        case "jiraiya":
            imgSrc = "./images/jiraiya.webp";
            break;
        case "orochimaru":
            imgSrc = "./images/orochimaru.jpg";
            break;
        case "shikamaru":
            imgSrc = "./images/shikamaru.webp";
            break;
        case "ino":
            imgSrc = "./images/ino.webp";
            break;
        case "choji":
            imgSrc = "./images/choji.webp";
            break;
        case "kiba":
            imgSrc = "./images/kiba.webp";
            break;
        case "shino":
            imgSrc = "./images/shino.webp";
            break;
        case "kurenai":
            imgSrc = "./images/kurenai.avif";
            break;
        case "asuma":
            imgSrc = "./images/asuma.webp";
            break;
        case "killerbee":
            imgSrc = "./images/killerbee.webp";
            break;
        case "minato":
            imgSrc = "./images/minato.webp";
            break;
        case "kushina":
            imgSrc = "./images/kushina.webp";
            break;
        case "madara":
            imgSrc = "./images/madara.webp";
            break;
        case "obito":
            imgSrc = "./images/obito.webp";
            break;
        case "nagato":
            imgSrc = "./images/nagato.webp";
            break;
        case "konan":
            imgSrc = "./images/konan.webp";
            break;
        case "pain":
            imgSrc = "./images/pain.jpg";
            break;
        case "zabuza":
            imgSrc = "./images/zabuza.webp";
            break;
        case "haku":
            imgSrc = "./images/haku.webp";
            break;
        case "kabuto":
            imgSrc = "./images/kabuto.webp";
            break;
        case "temari":
            imgSrc = "./images/temari.webp";
            break;
        case "kankuro":
            imgSrc = "./images/kankuro.webp";
            break;
        case "mightguy":
            imgSrc = "./images/mightguy.jpg";
            break;
        case "hiruzen":
            imgSrc = "./images/hiruzen.webp";
            break;
        case "yamato":
            imgSrc = "./images/yamato.webp";
            break;
        case "anko":
            imgSrc = "./images/anko.webp";
            break;
        case "sai":
            imgSrc = "./images/sai.webp";
            break;
        case "deidara":
            imgSrc = "./images/deidara.webp";
            break;
        case "kisame":
            imgSrc = "./images/kisame.avif";
            break;
        case "sasori":
            imgSrc = "./images/sasori.webp";
            break;
        case "tobi":
            imgSrc = "./images/tobi.webp";
            break;
        case "hashirama":
            imgSrc = "./images/hashirama.jpg";
            break;
        case "tobirama":
            imgSrc = "./images/tobirama.webp";
            break;
        case "danzo":
            imgSrc = "./images/danzo.avif";
            break;
        case "hanzo":
            imgSrc = "./images/hanzo.webp";
            break;
        case "mei":
            imgSrc = "./images/mei.webp";
            break;
        case "raikage":
            imgSrc = "./images/raikage.webp";
            break;
        case "ohnoki":
            imgSrc = "./images/ohnoki.webp";
            break;
        case "rin":
            imgSrc = "./images/rin.webp";
            break;
        case "boruto":
            imgSrc = "./images/boruto.jpg";
            break;
        case "sarada":
            imgSrc = "./images/sarada.webp";
            break;
        case "mitsuki":
            imgSrc = "./images/mitsuki.webp";
            break;
        case "shisui":
            imgSrc = "./images/shisui.webp";
            break;
        case "kaguya":
            imgSrc = "./images/kaguya.webp";
            break;
        case "toneri":
            imgSrc = "./images/toneri.webp";
            break;
        case "hagoromo":
            imgSrc = "./images/hagoromo.jpg";
            break;
        case "hamura":
            imgSrc = "./images/hamura.webp";
            break;
        case "karin":
            imgSrc = "./images/karin.webp";
            break;
        case "suigetsu":
            imgSrc = "./images/suigetsu.webp";
            break;
        case "guren":
            imgSrc = "./images/guren.jpg";
            break;
        case "kakuzu":
            imgSrc = "./images/kakuzu.webp";
            break;
        case "hidan":
            imgSrc = "./images/hidan.webp";
            break;
        case "jugo":
            imgSrc = "./images/jugo.webp";
            break;
        default:
            imgSrc = './defaitenaruto.jpg'; // Utiliser une image par défaut
            break;
    }
    
    console.log("Image source pour " + mot + ": " + imgSrc); // Debugging log
    img.src = imgSrc;
    img.alt = mot;
    IMAGE_CONTAINER.appendChild(img);
}

// Fonction pour désactiver tous les boutons
function desactiverBoutons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    motChoisi = choisirMotAleatoire();
   
    motDevine = initialiserMotDevine(motChoisi);
    mauvaisesLettres = [];
    tentatives = 10;

    MOT_DEVINE.innerHTML = `${motDevine.join(' ')}`;
    TENTATIVES_RESTANTES.textContent = tentatives;
    MAUVAISES_LETTRES.innerHTML = "Lettres erronees:";
    IMAGE_CONTAINER.innerHTML = ''; // Vider le conteneur d'images
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Fonction pour effacer le score
function effacerScore() {
    scoreTotal = 0;
    manchesPerdues = 0;
    localStorage.removeItem('score-total');
    localStorage.removeItem('score-perdu');
    SCORE.textContent = scoreTotal;
    SCORE_PERDU.textContent = manchesPerdues;
}

// Ajouter des écouteurs d'événements aux boutons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Ajouter un écouteur d'événement au bouton rejouer
REJOUER_BTN.addEventListener('click', resetGame);

// Ajouter un écouteur d'événement au bouton effacer score
EFFACER_SCORE_BTN.addEventListener('click', effacerScore);

// Initialisation du jeu au chargement
resetGame();
