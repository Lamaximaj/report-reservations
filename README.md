# Report de réservations

Outil web pour vérifier que les réservations (gaines, trémies, chutes, percements)
tombent au bon endroit d'un niveau à l'autre d'un bâtiment.

Page HTML autonome : aucun serveur, aucune installation. Les plans et le calage
restent dans le navigateur (IndexedDB), rien n'est envoyé sur le réseau.

## Utilisation

En ligne : https://lamaximaj.github.io/report-reservations/

Ou ouvrir `index.html` dans un navigateur, ou le servir depuis un NAS.

1. **Importer** les plans d'étages (PDF, une page = un niveau, ou images), puis les
   ranger dans l'ordre. Un bouton indique le sens de la liste (bas → haut ou l'inverse) :
   c'est lui qui définit ce que veut dire « au-dessus ».
2. **Échelle** (E) : soit en traçant une cote connue sur le plan, soit en saisissant
   le rapport (1/50, 1/100…). Sur un PDF l'échelle réelle est déduite du format de page ;
   sur une image il faut préciser le format papier. Champ d'orientation pour un plan
   scanné de travers. « Appliquer à tous les niveaux » reporte la même échelle 1/N sur
   tous les plans, recalculée selon le format de chacun (avec une cote tracée sur une
   image, c'est la valeur en px/m qui est recopiée). L'orientation et le repère restent
   propres à chaque plan.
3. **Repère** (P) : un clic pose l'origine (0,0) du niveau. Prendre le même repère
   physique sur tous les plans (nu de voile, file de poteaux, angle de trémie).
4. **Dessiner** une réservation rectangulaire (R) ou ronde (C). Elle est stockée en
   mètres par rapport au repère et se reporte à l'échelle sur les autres niveaux :
   par défaut celui où elle est créée et tous ceux du dessus.
5. **Contrôler** : le calque affiche un autre niveau en transparence sous le plan courant,
   recalé à son échelle. L'outil Mesure (M) donne les distances réelles.
6. **Anomalies** : pour chaque niveau, marquer une réservation conforme ou en anomalie,
   avec observation. « Déplacer vers la position réelle » permet de faire glisser la
   réservation là où elle est réellement tombée : l'écart est calculé et coté.
7. **Rapport PDF** : page de synthèse des anomalies, puis une page A4 paysage par niveau
   avec plan de repérage numéroté et tableau des cotes.

## Raccourcis

`V` sélection · `R` rectangle · `C` ronde · `M` mesure · `E` échelle · `P` repère ·
`H` main · flèches : décalage 1 cm (Maj : 10 cm) · `Ctrl+D` / `Cmd+D` dupliquer ·
`Suppr` supprimer · `Échap` annuler

**Dupliquer** fonctionne comme un tampon : un clic sur le bouton (ou `Ctrl+D`), puis
chaque clic gauche sur le plan pose une copie centrée sur le clic. `Échap` ou clic droit
pour terminer. Chaque copie reprend le nom de l'original suivi du numéro libre suivant
(« Gaine VMC » → « Gaine VMC 2 », « Gaine VMC 3 »…), avec ses dimensions et ses niveaux,
mais sans état ni observation.

## Technique

- Un seul fichier, sans build. pdf.js pour la lecture et la re-rastérisation des PDF
  au zoom, jsPDF pour le rapport (chargés depuis cdnjs).
- Chaque niveau porte son propre calage (origine, rotation, échelle) ; les réservations
  sont en coordonnées monde (mètres), ce qui permet de superposer des plans d'échelles
  et d'orientations différentes.
- Sauvegarde automatique dans IndexedDB. Le bouton ⇄ exporte/réimporte le calage et les
  réservations en JSON (sans les images).
