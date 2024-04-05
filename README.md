# PManager

Pour lancer l'application, voici les étapes à effectuer : 

Les pré-requis sur téléphone
- Télécharger l’application Expo ( Expo Go) sur son téléphone
- Avoir accès à internet

Les pré-requis sur ordinateur 
- Installer Node.js (lien : https://nodejs.org/en)
- Avoir un éditeur de code type Visual Studio Code
- Installer Expo CLI
    Pour cela, taper dans votre terminal ou invite de commande: 
    > npm install -g expo-cli		*


Ouvrir le dossier PManager dans l’éditeur de code (le télécharger au fichier Zip)


Installer les packages nécessaires au fonctionnement de l’application.
    Ouvrir le terminal et effectuer les commandes suivantes : 
    >npm install 
    > npm install -g expo-cli     (si pas déjà effectué avant)
    > npm install @expo/ngrok@2.4.3
    ou
    > npm i -g @expo/ngrok
    */ Si certaine commande nécessite une autorisation administrateur, ajouter “sudo” en début de commande

Lancer l’application
- Dans le terminal, effectuer la commande : 
    > npx expo start --tunnel
- Ouvrir l’application Expo sur son téléphone mobile
- Scanner le QR Code qui s’affiche dans le terminal.