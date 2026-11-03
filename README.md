# Report & métré

Outil web pour vérifier que les réservations (gaines, trémies, chutes, percements)
tombent au bon endroit d'un niveau à l'autre d'un bâtiment, et pour **métrer sur plan**
(surfaces, linéaires, comptages) avec un rapport de quantités.

Page HTML autonome : aucun serveur, aucune installation. Les plans, le calage et le
métré restent dans le navigateur (IndexedDB), rien n'est envoyé sur le réseau.

## Utilisation

En ligne : https://lamaximaj.github.io/report-reservations/

Ou ouvrir `index.html` dans un navigateur, ou le servir depuis un NAS.

L'écran : la **barre d'outils** en haut (outils, Annuler / Rétablir, panneaux, thème,
aide `?`, Exporter), à gauche les **niveaux** et les listes **Calques / Objets / Métré**,
au centre le plan (zoom, recadrage, trame et superposition en haut à droite), à droite
les **Propriétés** de ce qui est sélectionné. Sur téléphone, les panneaux deviennent des
onglets sous le plan.

### Projets

- Le bouton du projet (en haut à gauche, `Ctrl+O`) ouvre la liste des **projets** :
  nouveau projet, ouvrir, renommer, dupliquer, supprimer. Chaque projet garde ses plans,
  ses réservations et son métré ; l'enregistrement est automatique.
- **Enregistrer le fichier** (menu ⋯ d'un projet) télécharge tout le projet, plans compris,
  dans un fichier `.json` ; **Ouvrir un fichier projet** le recharge, par exemple sur un
  autre appareil. Les projets restent sinon dans le navigateur où ils ont été créés.
- Au premier lancement de cette version, l'ancien projet unique est repris tel quel.

### Calage des plans

1. **Importer** les plans d'étages (PDF, une page = un niveau, ou images), puis les
   ranger dans l'ordre. Un bouton indique le sens de la liste (bas → haut ou l'inverse) :
   c'est lui qui définit ce que veut dire « au-dessus ».
2. **Échelle** (`E`) : soit en traçant une cote connue sur le plan, soit en saisissant
   le rapport (1/50, 1/100…). Sur un PDF l'échelle réelle est déduite du format de page ;
   sur une image il faut préciser le format papier. Champ d'orientation pour un plan
   scanné de travers. « Appliquer à tous les niveaux » reporte la même échelle 1/N sur
   tous les plans, recalculée selon le format de chacun.
3. **Repère** (`P`, ou clic droit → « Poser le repère 0,0 ici ») : l'origine (0,0) du
   niveau. Prendre le même repère physique sur tous les plans (nu de voile, file de
   poteaux, angle de trémie). Le métré n'a besoin que de l'échelle ; les réservations
   ont besoin de l'échelle et du repère.

### Réservations

- **Dessiner** une réservation rectangulaire (`R`) ou ronde (`C`). Elle est stockée en
  mètres par rapport au repère et se reporte sur les autres niveaux : par défaut celui
  où elle est créée et tous ceux du dessus.
- **Contrôler** : « Superposer » affiche un autre niveau en transparence sous le plan
  courant. `Pg↑` / `Pg↓` passent au niveau du dessus / du dessous en gardant le même
  endroit à l'écran. L'outil Mesure (`M`) donne les distances réelles.
- **Anomalies** : pour chaque niveau, marquer une réservation conforme ou en anomalie
  (Propriétés ou clic droit), avec observation. « Déplacer vers la position réelle »
  permet de la faire glisser là où elle est réellement tombée : l'écart est calculé et
  coté. Ses poignées rouges reprennent ses dimensions réelles.
- **Calques** (couleur, visibilité, calque actif) et **Objets** (types GT, VH, VB… posés
  en série, numérotés à la suite) comme avant.
- **Report des corrections** : une anomalie pointée devient la position attendue des
  niveaux du dessus (marquée « ↳ R+1 »), sauf si l'on décoche « Reporter cette
  correction aux niveaux du dessus ».

### Métré

- Outils **Surface** (`S`, polygone), **Surface rectangulaire** (`Maj+S`), **Linéaire**
  (`L`) et **Comptage** (`N`). Le plan doit avoir son échelle.
- Surface et linéaire : un clic par point ; double-clic, `Entrée` ou clic droit pour
  terminer (clic sur le premier point pour fermer une surface). `Retour arrière` enlève
  le dernier point, `Maj` force les angles droits / 45°, `Échap` abandonne. Les points
  **s'aimantent** aux sommets existants (carré jaune). La quantité s'affiche sous le
  pointeur pendant le tracé. Comptage : un clic par élément, numérotés sur le plan.
- Chaque mesure est rangée dans un **poste** (onglet **Métré**, `+` pour en créer :
  « Dalle BA ép. 20 », « Voiles h. 2,60 », « Prises »…). Un poste porte une couleur,
  une référence de prix (DPGF) facultative, un **prix unitaire** facultatif et :
  - pour une surface, une **épaisseur** → volume en m³ ;
  - pour un linéaire, une **hauteur** → surface en m².
  La liste donne le total de chaque poste, le détail par niveau, et le total HT des
  postes chiffrés.
- Modifier : sélectionner la mesure, tirer ses carrés (sommets) ou ses ronds (ajouter un
  sommet au milieu d'un côté) ; clic droit sur un sommet pour le supprimer. Une surface
  peut être marquée **déduction** (trémie, vide) : hachurée, elle est retirée du total.
  Une grande surface se sélectionne d'un premier clic, puis se déplace.

### Exporter (`Ctrl+E`)

- **Plans de tous les niveaux** : un PDF, une page par niveau, au format d'origine
  (impression à 100 %) ou sur A0 à A4. Le plan d'origine reste **vectoriel**, avec les
  réservations, les écarts annotés et, si la case est cochée, **le métré** (surfaces,
  linéaires, comptages) et sa légende dans le cartouche.
- **Réservation par réservation** : une page par réservation, tous ses niveaux zoomés
  côte à côte à la même échelle ronde, seule cette réservation affichée.
- **Rapport de métré (PDF A4)** : récapitulatif par poste (quantités par niveau, prix,
  total HT), puis le détail de chaque mesure.
- **Métré pour Excel (CSV)** et **Liste des réservations pour Excel (CSV)** :
  séparateur « ; » et virgule décimale, à ouvrir directement dans Excel.

## Clic droit et raccourcis

Clic droit sur le plan (appui long au doigt) : menu d'actions selon ce qui est dessous —
réservation (conforme / anomalie, position réelle, dupliquer, copier, calque, supprimer),
métré (déduction, poste, sommet, dupliquer, supprimer) ou plan vide (coller, outils,
repère, trame, superposer, niveau du dessus / dessous, exporter). Clic droit aussi dans
les listes.

| Outils | | Édition | |
|---|---|---|---|
| `V` sélection | `H` / `Espace` main | `Ctrl+Z` annuler | `Ctrl+Maj+Z` / `Ctrl+Y` rétablir |
| `R` rectangle | `C` ronde | `Ctrl+C` / `Ctrl+V` copier / coller sous le pointeur | `Ctrl+X` couper |
| `S` surface | `Maj+S` surface rect. | `Ctrl+D` dupliquer | `Suppr` supprimer |
| `L` linéaire | `N` comptage | flèches : 1 cm (`Maj` : 10 cm) | `Échap` désélectionner |
| `M` mesure | `E` échelle, `P` repère | `F` recadrer, `+` / `−` zoom | `G` trame, `Pg↑` / `Pg↓` niveaux |

`Ctrl+O` projets · `Ctrl+I` importer des plans · `Ctrl+E` exporter · `?` aide (sur Mac,
`⌘` à la place de `Ctrl`).

## Technique

- Un seul fichier, sans build. pdf.js pour la lecture et la re-rastérisation des PDF au
  zoom, pdf-lib pour les exports PDF vectoriels (chargés depuis cdnjs).
- Chaque niveau porte son propre calage (origine, rotation, échelle) ; les réservations
  sont en coordonnées monde (mètres), les mesures de métré en pixels du plan (elles
  restent collées au plan si l'on reprend le repère ; seule l'échelle compte pour les
  quantités).
- IndexedDB : `projects` (liste), `cur` (projet ouvert), `p:<id>` (contenu d'un projet).
  Annuler / Rétablir garde 150 étapes en mémoire pendant la session.
- Préférences de l'appareil (panneaux, thème, réglages d'export) dans `localStorage`.
