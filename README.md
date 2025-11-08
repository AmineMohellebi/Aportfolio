# Portfolio Web Moderne

Un portfolio professionnel moderne et responsive avec 4 pages principales, développé avec HTML5, CSS3, et JavaScript vanilla.

## 🌟 Fonctionnalités

### Pages
- **À Propos (index.html)** - Page d'accueil avec hero section, compétences et statistiques
- **Projets (projects.html)** - Galerie de projets avec système de filtrage
- **CV (cv.html)** - Timeline d'expérience professionnelle et formation avec barres de compétences animées
- **Contact (contact.html)** - Formulaire de contact avec validation et FAQ

### Caractéristiques

#### Design & UI/UX
✨ Design moderne avec dégradés et animations fluides
✨ Mode sombre/clair avec basculement automatique
✨ Interface entièrement responsive (mobile, tablette, desktop)
✨ Typographie optimisée avec clamp() pour responsive
✨ Système de couleurs CSS variables personnalisable

#### Interactivité
🚀 Animations au scroll (scroll reveal)
🚀 Effet de typing dans le hero
🚀 Barres de progression animées pour les compétences
🚀 Filtrage de projets en temps réel
🚀 Navigation mobile avec menu hamburger
🚀 Bouton scroll-to-top
🚀 Effets de tilt sur les cartes (desktop)
🚀 Barre de progression de lecture
🚀 Curseur personnalisé (desktop)

#### Performance
⚡ CSS optimisé avec variables
⚡ JavaScript vanilla (pas de dépendances)
⚡ Images lazy loading
⚡ Transitions GPU-accelerated
⚡ Code sémantique et accessible

## 📁 Structure du Projet

```
Aportfolio/
├── index.html              # Page À Propos
├── projects.html           # Page Projets
├── cv.html                 # Page CV
├── contact.html            # Page Contact
├── css/
│   └── styles.css          # Styles principaux
├── js/
│   ├── main.js             # Fonctionnalités principales
│   └── animations.js       # Animations avancées
└── assets/
    └── images/             # Images et médias
```

## 🚀 Installation et Utilisation

### Option 1: Ouvrir directement
1. Téléchargez ou clonez le projet
2. Ouvrez `index.html` dans votre navigateur

### Option 2: Serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis visitez: `http://localhost:8000`

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `css/styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Couleur principale */
    --secondary-color: #8b5cf6;    /* Couleur secondaire */
    --accent-color: #ec4899;       /* Couleur d'accent */
    /* ... */
}
```

### Contenu
1. **Informations personnelles**: Modifiez directement dans les fichiers HTML
2. **Projets**: Ajoutez/modifiez dans `projects.html`
3. **Expérience**: Modifiez la timeline dans `cv.html`
4. **Contact**: Mettez à jour email/téléphone dans `contact.html`

### Typographie
Changez les polices dans `css/styles.css`:

```css
:root {
    --font-primary: 'Votre Police', sans-serif;
    --font-heading: 'Votre Police Titre', sans-serif;
}
```

## 📱 Compatibilité

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Mobile (iOS Safari, Chrome Android)

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styling moderne (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+** - Interactivité et animations
- **Intersection Observer API** - Animations au scroll
- **CSS Animations** - Transitions fluides

## 📝 À Faire (Améliorations futures)

- [ ] Intégrer un vrai service d'envoi d'email (EmailJS, FormSpree)
- [ ] Ajouter Google Maps API pour la carte
- [ ] Optimiser les images avec WebP
- [ ] Ajouter un blog avec articles
- [ ] Implémenter i18n (multilingue FR/EN)
- [ ] Ajouter des tests automatisés
- [ ] PWA (Progressive Web App)
- [ ] Analytics (Google Analytics ou alternative)

## 🤝 Contribution

Ce portfolio est un template personnel. N'hésitez pas à:
1. Fork le projet
2. Personnaliser selon vos besoins
3. Partager vos améliorations

## 📄 Licence

Ce projet est libre d'utilisation pour vos portfolios personnels.

## 📧 Contact

Pour toute question concernant ce portfolio:
- Email: votre.email@example.com
- LinkedIn: [Votre Profil]
- GitHub: [Votre GitHub]

---

**Développé avec ❤️ et beaucoup de ☕**
