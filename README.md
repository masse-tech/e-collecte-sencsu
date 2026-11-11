# E-Collecte SEN-CSU

Application web installable (PWA) d'enrôlement des bénéficiaires, hors ligne, pour Android, iPhone/iPad, Windows et Mac.
Ouvrez **GUIDE_INSTALLATION.html** pour la procédure complète.

- `index.html`, `css/`, `js/` : l'application
- `forms/` : formulaires XLSForm (Kobo) + `index.json`
- `backend/Code.gs` : réception des fiches dans Google Sheets / Drive (Apps Script)
- `outils/publier.py` : à lancer après toute modification

Test local : `python3 -m http.server 8000` puis http://localhost:8000
