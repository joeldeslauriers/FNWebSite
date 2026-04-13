# Me Francis Renaud — Notaire · Mirabel

Site web professionnel pour Me Francis Renaud, notaire à Mirabel (Québec).

## Structure des fichiers

```
francis-renaud-notaire/
├── index.html          # Page principale (structure HTML complète)
├── css/
│   └── style.css       # Styles (variables, layout, composants, responsive)
├── js/
│   └── main.js         # Fonctionnalités JavaScript
├── images/
│   └── (dossier pour les photos)
└── README.md
```

## Ouvrir le site

Ouvrez simplement `index.html` dans un navigateur moderne (Chrome, Firefox, Edge, Safari). Aucun serveur requis.

---

## Personnalisation

### 1. Ajouter les photos

Placez vos photos dans le dossier `images/`, puis remplacez les blocs `photo-placeholder` dans `index.html` par des balises `<img>`.

**Section Héros** — remplacez le bloc entier :
```html
<div class="photo-placeholder">
  <div class="photo-initials">FR</div>
  <p class="photo-hint">Photo professionnelle</p>
</div>
```
Par :
```html
<img src="images/francis-renaud-portrait.jpg" alt="Me Francis Renaud, notaire à Mirabel" />
```

**Section À propos** — même opération sur le bloc `.about-photo-placeholder`.

### 2. Mettre à jour le courriel

Recherchez `info@francisrenaudnotaire.com` dans `index.html` et remplacez par l'adresse réelle.

### 3. Intégrer Google Maps

Remplacez le bloc `.map-placeholder` dans `index.html` par un `<iframe>` Google Maps :

```html
<div class="map-placeholder">
  <iframe
    src="https://www.google.com/maps/embed?pb=VOTRE_CLE_ICI"
    width="100%"
    height="220"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Carte — Me Francis Renaud, Notaire"
    aria-label="Carte Google Maps — 15155 Rue St-Joseph, Mirabel">
  </iframe>
</div>
```

### 4. Connecter le formulaire

Dans `js/main.js`, la fonction `initContactForm()` simule l'envoi. Pour un vrai envoi, remplacez le bloc `setTimeout` par un `fetch()` vers votre endpoint (Formspree, Netlify Forms, ou un backend personnalisé) :

```js
fetch('https://formspree.io/f/VOTRE_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { Accept: 'application/json' },
})
  .then(function (res) {
    if (res.ok) {
      showToast('✅ Votre demande a été envoyée! Nous vous répondrons sous 24h.');
      form.reset();
    }
  })
  .catch(function () {
    showToast('❌ Une erreur est survenue. Veuillez nous appeler directement.');
  })
  .finally(function () {
    submitBtn.textContent = 'Envoyer ma demande';
    submitBtn.disabled = false;
  });
```

### 5. Palette de couleurs

Toutes les couleurs sont définies en variables CSS dans `css/style.css` (bloc `:root`) :

| Variable        | Valeur     | Usage                        |
|-----------------|------------|------------------------------|
| `--navy`        | `#0d1f2d`  | Fond principal, texte titre  |
| `--gold`        | `#c9a96e`  | Accents, CTA, bordures deco  |
| `--cream`       | `#f7f3ec`  | Fond sections secondaires    |
| `--white`       | `#ffffff`  | Fond sections principales    |

### 6. Typographie

Le site utilise Google Fonts, chargées dans `<head>` :
- **Playfair Display** — titres et noms (serif élégant)
- **Jost** — corps de texte et interface (sans-serif moderne)

Aucune installation locale requise; les polices se chargent automatiquement.

---

## Fonctionnalités JavaScript

| Fonctionnalité                | Description                                                   |
|-------------------------------|---------------------------------------------------------------|
| Smooth scroll                 | Navigation fluide vers chaque section via les ancres          |
| Navbar shadow au scroll       | Ombre appliquée dès 40px de défilement                        |
| Hamburger menu                | Menu mobile avec animation et fermeture au clic extérieur     |
| Toast notification            | Message de confirmation au submit du formulaire               |
| Intersection Observer         | Animation `.visible` (fadeUp) au passage dans le viewport     |
| Année footer dynamique        | L'année du copyright se met à jour automatiquement            |

---

## Accessibilité

- Tous les liens et boutons ont un `aria-label` explicite
- Formulaire avec `<label>` associés et `aria-describedby`
- Focus visible stylisé en or sur tous les éléments interactifs
- Contraste WCAG AA respecté sur les combinaisons de couleurs utilisées
- Rôles ARIA (`role="banner"`, `role="navigation"`, `role="contentinfo"`, `role="list"`, `role="alert"`)

---

## Crédits

- **Polices** : [Google Fonts](https://fonts.google.com) — Playfair Display & Jost (licence OFL)
- **Design** : Inspiré de thibodeaunotaires.com et blanchardlupien.com
- **Développement** : Site statique HTML/CSS/JS, aucune dépendance externe

---

*Étude de Me Francis Renaud — 15155 Rue St-Joseph, Mirabel (Québec) J7N 1Y8 — 450-414-0995*
