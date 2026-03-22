# Vapotheme — App de gestion d'équipe

## Mise en ligne sur Vercel

1. Crée un compte sur vercel.com
2. Clique "Add New Project" → "Import" → glisse le dossier vapothme
3. Clique "Deploy" — c'est tout !

## Ajouter les employés (Firebase Authentication)

1. Va sur console.firebase.google.com → ton projet Vapothme
2. Authentication → Users → Add User
3. Remplis email + mot de passe pour chaque employé
4. Dans Firestore → Collection "users" → Add document
   - Document ID = l'UID de l'utilisateur (visible dans Authentication)
   - Champs : name (string), role (string : "emp", "manager" ou "admin"), email (string)

## Rôles disponibles
- admin : accès complet (modifier planning, notes, congés, rôles)
- manager : modifier planning, approuver congés, publier annonces
- emp : lecture seule planning + annonces, voir ses congés

## Personnaliser les boutiques et l'équipe
Ouvre index.html et modifie les tableaux `boutiques` et `team` vers la ligne 200.

## Règles Firestore (à coller dans Firebase → Firestore → Rules)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      allow read: if request.auth != null;
    }
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```
