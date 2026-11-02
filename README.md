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
5. **Contrôler** : « Superposer » affiche un autre niveau en transparence sous le plan
   courant, recalé à son échelle. L'outil Mesure (M) donne les distances réelles.
6. **Anomalies** : pour chaque niveau, marquer une réservation conforme ou en anomalie,
   avec observation. « Déplacer vers la position réelle » permet de faire glisser la
   réservation là où elle est réellement tombée : l'écart est calculé et coté. Elle passe
   en rouge ; ses poignées rouges (ou les champs « Largeur / Hauteur / Diamètre réels »
   des Propriétés) reprennent ses dimensions réelles, et cliquer-glisser dans le contour
   rouge la replace sans changer ses dimensions. Le rapport indique « prévu → réel ».
7. **Exporter** (panneau Calques) : un PDF des plans de tous les niveaux, une page par
   niveau. Chaque page reprend **le plan d'origine tel quel, en vectoriel** (net à tout
   zoom, à son format A1, A0…, rotation du PDF source gérée), avec par-dessus, en
   vectoriel aussi : positions attendues, positions réelles en pointillé rouge, flèches
   d'écart X / Y et une étiquette par anomalie (nom, écart, cotes réelles, observation),
   placées sans se chevaucher. Le cartouche est dans un bandeau ajouté au-dessus du plan,
   qui reste entièrement visible. Un plan importé en image est repris à sa résolution
   native. Les calques masqués et les niveaux non calés ne sont pas exportés.

## Panneaux et calques

- Trois panneaux : **Niveaux** et **Calques** à gauche, **Propriétés** (réservation
  sélectionnée) à droite. Les boutons Niveaux / Calques / Propriétés de la barre d'outils,
  ou le « – » de chaque panneau, les masquent et les réaffichent. Sur téléphone, ce sont
  des onglets sous le plan.
- Chaque réservation appartient à un **calque** (Gaines, Chutes, Trémies…) qui porte sa
  couleur. L'œil masque ou réaffiche le calque sur le plan ; un calque masqué n'est pas
  repris dans le rapport PDF. Cliquer un calque le rend **actif** : les nouvelles
  réservations y sont rangées. Le calque d'une réservation se change dans Propriétés.
  Supprimer un calque déplace ses réservations dans un autre calque.

## Objets (types de réservation)

- Onglet **Objets** à côté de Calques : un objet = un type de réservation (GT, VH, VB…)
  avec code, désignation, forme, cotes, couleur et calque. **+** en crée un.
- Cliquer un objet (ou « Poser »), puis cliquer sur le plan : chaque clic pose une
  réservation numérotée à la suite (GT 1, GT 2… ; en reprenant l'objet plus tard, on
  repart du plus grand numéro). `Échap` ou clic droit pour terminer.
- Changer le code d'un objet renomme ses réservations « GT n » → « GTH n » (les noms
  personnalisés ne changent pas). Les cotes modifiées valent pour les prochaines poses.
- Le ▶ d'un objet ouvre ses réglages et la liste de ses réservations.

## Report des corrections aux étages

Une anomalie pointée (position et dimensions réelles) sur un niveau devient la position
attendue des niveaux du dessus : la réservation y apparaît recalée, marquée « ↳ R+1 »,
avec le contour du projet en filigrane. Un nouvel écart sur ces niveaux se mesure par
rapport à cette position corrigée. Décocher « Reporter cette correction aux niveaux du
dessus » (Propriétés) leur fait reprendre la position du projet, par exemple pour une
réservation à recouper.

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
