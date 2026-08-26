# Installation — Système de Coins SouthCoins RP

Ce système utilise **Firebase** (gratuit) pour stocker les codes boutique et
les soldes en ligne, partagés entre tous les visiteurs de ton site GitHub Pages.

3 fichiers travaillent ensemble :
- `vip-shop.html` → la boutique (génère un code à 6 chiffres pour chaque visiteur, affiche son solde en temps réel)
- `admin.html` → **ta page privée** pour ajouter des Coins à un code (ne la mets pas en lien visible sur le site, seulement toi connais l'URL)
- `firebase-config.js` → tes clés Firebase (à remplir une seule fois)

---

## 1. Crée ton projet Firebase

1. Va sur https://console.firebase.google.com
2. **Ajouter un projet** → donne-lui un nom (ex: `n`) → crée-le
3. Une fois dans le projet, clique sur l'icône **`</>`** (Web) pour ajouter une "Web App"
4. Donne-lui un surnom, clique **Enregistrer et continuer**
5. Firebase t'affiche un bloc `firebaseConfig = {...}` → **copie ces valeurs**
6. Colle-les dans `firebase-config.js` à la place de `COLLE_TA_CLE_ICI` etc.

## 2. Active Firestore (la base de données)

1. Dans le menu de gauche : **Build → Firestore Database**
2. **Créer une base de données**
3. Choisis **Mode production**
4. Choisis une région proche (ex: `eur3 (europe-west)`)

## 3. Active l'authentification (pour toi, l'admin)

1. Menu de gauche : **Build → Authentication**
2. **Get started**
3. Onglet **Sign-in method** → active **Adresse e-mail/Mot de passe**
4. Onglet **Users** → **Add user** → entre ton email et un mot de passe fort
   (c'est ce compte que tu utiliseras pour te connecter sur `admin.html`)
5. Une fois créé, clique sur ce user et **copie son "User UID"** (tu en as besoin à l'étape suivante)

## 4. Configure les règles de sécurité Firestore

1. Retourne dans **Firestore Database → Règles**
2. Remplace tout le contenu par ceci (remplace `TON_UID_ICI` par l'UID copié à l'étape 3) :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shopCodes/{code} {
      allow read: if true;
      allow create: if request.resource.data.coins == 0
                    && request.resource.data.keys().hasOnly(['coins','createdAt']);
      allow update: if request.auth != null && request.auth.uid == "TON_UID_ICI";
      allow delete: if false;
    }
  }
}
```

3. **Publier**

Ces règles garantissent que :
- N'importe qui peut lire un solde (pour l'afficher sur la boutique)
- Un nouveau compte ne peut être créé qu'avec 0 Coins
- **Seul ton compte admin peut modifier un solde** (ajouter des Coins)

## 5. Mets en ligne sur GitHub Pages

Envoie ces fichiers dans ton repo GitHub (à la racine, ou dans le même dossier) :
- `vip-shop.html`
- `admin.html`
- `firebase-config.js`
- le dossier `images/`

Active GitHub Pages dans les paramètres du repo. Ton admin sera accessible à
une URL du type `https://tonpseudo.github.io/tonrepo/admin.html` — **ne partage
ce lien avec personne**.

---

## Comment ça marche pour un joueur

1. Il ouvre `vip-shop.html` → un code à 6 chiffres est généré automatiquement
   et sauvegardé dans son navigateur (`localStorage`) → son solde commence à **0**
2. Il te donne son code (en jeu, sur Discord, etc.)
3. Tu vas sur `admin.html`, tu te connectes avec ton compte admin
4. Tu entres son code → tu vérifies son solde actuel → tu ajoutes le montant
5. Son solde se met à jour **en temps réel** sur sa page boutique, sans qu'il ait besoin de recharger

## Notes importantes

- Si un joueur vide le cache de son navigateur ou change d'appareil, il perdra
  l'accès à son ancien code (il en recevra un nouveau à 0 Coins). Si tu veux
  un système de compte plus robuste (login/mot de passe pour les joueurs eux-mêmes),
  dis-le-moi et j'ajouterai ça.
- Le plan gratuit Firebase (Spark) permet largement assez de lectures/écritures
  pour un serveur RP classique.
