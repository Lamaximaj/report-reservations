# Superplan

Outil web pour vérifier que les réservations (gaines, trémies, chutes, percements)
tombent au bon endroit d'un niveau à l'autre d'un bâtiment, et pour **métrer sur plan**
(surfaces, linéaires, comptages) avec un rapport de quantités.

Page HTML autonome : aucun serveur, aucune installation. Les plans, le calage et le
métré restent dans le navigateur (IndexedDB), rien n'est envoyé sur le réseau.

## Utilisation

En ligne : https://lamaximaj.github.io/report-reservations/

Ou ouvrir `index.html` dans un navigateur, ou le servir depuis un NAS.

L'écran : la **barre d'outils** en haut, rangée par groupes (Vue, Réservations avec l'**objet
actif**, Métré, Plan, Export) ; à gauche les **niveaux** (avec leur altitude) et les onglets
**Réservations** (calques › objets › réservations) et **Métré** ; au centre les **vues**, avec
au-dessus la barre de disposition (1 à 4 vues, tous les niveaux), le zoom, la trame et la
superposition ; à droite les **Propriétés** de ce qui est sélectionné, en sections.
Sur téléphone, les panneaux deviennent des onglets sous le plan.

### Installer l'appli sur l'ordinateur (sans droits administrateur)

Dans Edge ou Chrome, ouvrir le site puis cliquer **Installer l'appli** en haut (ou menu ⋯ →
Applications → Installer ce site en tant qu'application). L'appli s'installe dans le
profil de l'utilisateur, sans droits administrateur : sa propre fenêtre, une icône dans le
menu Démarrer, et elle **fonctionne hors connexion** (l'appli et ses modules PDF sont gardés
en cache ; les mises à jour arrivent d'elles-mêmes à la prochaine ouverture en ligne). Les
projets restent dans le navigateur de cet ordinateur ; pour les sauvegarder ou les
déplacer, utiliser **Enregistrer**.

### Enregistrer, panneaux

- **Renommer le projet** : le crayon à côté du nom en haut, ou `F2`.

- **Enregistrer** (disquette en haut, `Ctrl+S`) : tout le projet, plans compris, dans un
  fichier `.json`. Dans Chrome ou Edge, on choisit le fichier une fois, puis `Ctrl+S`
  réenregistre dedans (`Ctrl+Maj+S` : enregistrer sous) ; ailleurs, le fichier part dans
  Téléchargements. Pour le rouvrir : Projets → Ouvrir un fichier projet. Le projet reste
  aussi enregistré automatiquement dans le navigateur.
- **Taille des panneaux** : tirer les bords entre les panneaux et le plan (largeur) ou
  entre Niveaux et Réservations (hauteur) ; double-clic pour revenir à la taille par défaut.

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

### Calques, objets, réservations

Une seule règle : **chaque réservation est un objet, et chaque objet est rangé dans un calque**.

- **Objet** : un type de réservation (EU, EV, GT, VH, TR…) avec sa forme, ses cotes et sa
  couleur. Les réservations d'un objet sont numérotées à la suite (« GT 1 », « GT 2 »…) et
  renommées si l'on change le code de l'objet.
- **Calque** : un rangement d'objets (Plomberie, CVC, Structure…), qui se masque d'un coup.
  Une réservation est toujours dans le calque de son objet.
- **Par défaut** : le « Calque par défaut » et l'objet **RÉS** (Réservation).
- L'onglet **Réservations** montre l'arbre calques › objets › réservations : œil pour masquer
  un calque, un objet ou une réservation ; `+ objet` sur un calque ; `⋯` pour les réglages
  d'un objet (forme, cotes, calque), le ranger ailleurs, sélectionner ses réservations, le
  supprimer (en gardant ou non ses réservations). `+` en haut : nouvel objet ou nouveau calque.
- **Couleur** : chaque nouvel objet reçoit automatiquement une couleur encore libre (le
  rouge reste réservé aux anomalies) ; cliquer la pastille pour la changer.
- **Objet actif** : le bouton à côté de Rectangle / Ronde dans la barre d'outils. Les
  réservations dessinées au rectangle ou au rond sont de cet objet (avec les cotes tracées) ;
  cliquer la ligne d'un objet dans l'arbre le rend actif et le **pose** (un clic sur le plan
  par réservation, aux cotes de l'objet ; `Échap` pour finir).
- **Changer d'objet** une réservation (ou une sélection) : Propriétés → Objet, ou clic droit.
  Elle change de calque avec lui, et « GT 3 » devient « VH n ».
- Les projets d'avant cette version sont repris : une réservation sans objet prend l'objet
  tiré de son nom (« EU 3 » → EU), sinon RÉS, dans son calque et à sa couleur.

### Plans liés (structure, techniques…)

Chaque niveau peut recevoir d'autres plans que le plan archi : structure, CVC, plomberie,
électricité… Menu `⋯` d'un niveau (ou clic droit sur le plan) → **Lier un plan à ce niveau**.

- Le plan lié a son propre **calage** : échelle, puis repère au même endroit physique que sur
  le plan archi (barre de calage en bas à droite ; « Même calage que l'archi » si les deux
  feuilles ont le même cadrage). Une fois calé, il se **superpose en transparence**, teinté
  dans sa couleur (bleu pour la structure…), sous les réservations : on y lit les poutres,
  les gaines, pour poser les réservations au bon endroit.
- Sous le niveau, dans la liste : œil, couleur, type, curseur de transparence, `⋯`
  (recaler, teinter ou non, retirer). Un plan lié n'est pas un niveau : il n'a ni
  réservations ni métré propres.
- Export : case « Dessiner aussi les plans liés » (plans, zone, réservation par réservation).

### Réservations

- **Accrochage aux objets** (`A`, aimant au-dessus du plan) : en dessinant, déplaçant,
  posant ou redimensionnant une réservation, le point s'aimante aux coins, centres et
  milieux des autres réservations, à leurs positions réelles, aux sommets du métré et au
  repère ; sinon il s'aligne dessus (guides pointillés). `Alt` enfoncé : sans accrochage
  le temps d'un geste. Le métré s'accroche aussi aux réservations.
- **Dessiner** une réservation rectangulaire (`R`) ou ronde (`C`), de l'objet actif. Elle est stockée en
  mètres par rapport au repère et se reporte sur les autres niveaux : par défaut celui
  où elle est créée et tous ceux du dessus. Sur un niveau où elle n'est pas, elle
  apparaît en **pointillé** et ne sort pas à l'export. Pour l'y reporter (une chute EU
  dessinée au RDC qui descend au R-1, par exemple) : clic droit dessus → « Reporter aussi
  sur R-1 » (aussi pour une sélection multiple), ou Propriétés → Niveaux concernés.
- **Contrôler** : « Superposer » affiche un autre niveau en transparence sous le plan
  courant. `Pg↑` / `Pg↓` passent au niveau du dessus / du dessous en gardant le même
  endroit à l'écran. L'outil Mesure (`M`) donne les distances réelles.
- **Anomalies** : pour chaque niveau, marquer une réservation conforme ou en anomalie
  (Propriétés ou clic droit), avec observation. « Déplacer vers la position réelle »
  permet de la faire glisser là où elle est réellement tombée : l'écart est calculé et
  coté. Ses poignées rouges reprennent ses dimensions réelles.
- **Report des corrections** : une anomalie pointée devient la position attendue des
  niveaux du dessus (marquée « ↳ R+1 »), sauf si l'on décoche « Reporter cette
  correction aux niveaux du dessus ».
- **Dévoiement d'un réseau** : quand le réseau passe à l'horizontale et change de place d'un
  niveau à l'autre, ce n'est pas une anomalie. Propriétés (ou clic droit) → « Dévoyer à partir
  de ce niveau », puis faire glisser la réservation à sa nouvelle position (`Maj` : dans l'axe) :
  elle devient la position prévue de ce niveau et de ceux du dessus, avec au besoin d'autres
  dimensions. Le **cheminement** depuis l'arrivée du dessous se choisit : **Équerre** (« Passer par
  l'autre angle » pour l'autre coude), **Droit**, ou **Libre** — « Tracer le cheminement » (un clic
  par coude, `Maj` : angle droit), ou tirer les coudes sur le plan (rond : ajouter un coude, clic
  droit : le supprimer). Une anomalie déjà pointée peut être requalifiée en « Dévoiement voulu,
  pas une anomalie ». Les exports montrent le cheminement fléché et sa longueur.
- **Sélection multiple** : `Ctrl+A` ou « Tout sélectionner », `Ctrl+clic` / `Maj+clic`
  sur le plan ou dans la liste. Propriétés propose alors Masquer, Afficher, changer
  d'objet, Niveaux concernés, Supprimer.
- **Masquer une réservation** : l'œil de sa ligne, le bouton Masquer de Propriétés ou le
  clic droit. Masquée, elle n'apparaît ni sur le plan ni dans les exports ; « Tout
  afficher » en haut de la liste les remet.
- **Couleurs** : la position attendue garde la couleur de son objet, même en anomalie ;
  le rouge est réservé à la position réelle (pointillé) et aux alertes.

### Vues simultanées

La barre au-dessus du plan choisit la **disposition** : 1 vue, 2 côte à côte, 2 l'une
sur l'autre, 3, 4, ou **Tous les niveaux** (`T`).

- Chaque vue a son en-tête : la liste choisit son **contenu** (un niveau, ou l'**élévation**),
  la **chaîne** la lie aux autres (même zoom, même position) ou la rend **libre** (zoom et
  position à part, par exemple un niveau entier à côté d'un détail du même niveau), `⤢` la
  recadre. Le contenu de chaque disposition est mémorisé.
- Cliquer dans une vue la rend **active** (cadre orange) : son niveau devient le niveau
  courant et tous les outils y fonctionnent. La molette zoome la vue sous le pointeur.
- Tirer le **séparateur** entre deux vues change leur taille ; double-clic : tailles égales.
- **Tous les niveaux** : chaque niveau dans sa tuile, côte à côte, liées. Le bouton
  **Niveaux n/N** choisit les niveaux affichés (mémorisé dans le projet).
- Pour travailler **par réservation** : un clic dans la liste, ou ◀ ▶ (`Pg↑` / `Pg↓` avec
  plusieurs vues), cadre la réservation dans toutes les vues de plan à la fois, avec ses
  positions réelles et les corrections reportées.

### Élévation schématique

Une coupe verticale schématique : les niveaux empilés à leur **altitude**, chaque
réservation qui traverse les dalles, reliée d'un niveau à l'autre par son réseau.

- **Hauteurs d'étage** : la distance d'un niveau au suivant, de dalle à dalle (2,80 m par
  défaut). Clic sur l'altitude d'un niveau dans la liste des niveaux, ou bouton `↕` de la
  vue Élévation : hauteur par défaut, hauteur de chaque étage, niveau de référence ±0,00
  (le RDC d'office).
- **Vue Élévation** (contenu « Élévation » d'une vue, par exemple 2 vues l'une sur l'autre :
  plan + élévation) : coupe selon **X** ou selon **Y**. Elle montre la sélection multiple,
  sinon les réservations de la zone tracée, sinon toutes les réservations visibles.
  Clic sur un réseau : sélectionne la réservation (les autres s'estompent).
- Lecture : trait de couleur = réseau prévu ; trait épais = **dévoiement** (en plafond du
  niveau du dessous, avec sa longueur) ; pointillé rouge = position réelle et décalage
  (anomalie, avec l'écart). Dalles (22 cm) et passages restent schématiques.

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
- **Zone tracée** : outil **Zone** (`Z`) dans la barre du haut, tirez un cadre sur le plan.
  Le même cadre est recadré sur chaque niveau de la vue côte à côte (choix des niveaux dans
  la fenêtre d'export) et posé sur une seule feuille A0 à A4, à la même échelle ronde.
  La zone est mémorisée dans le projet ; « Retracer la zone » pour la changer. Option :
  ajouter l'**élévation** des réservations de la zone (pages suivantes).
- **Élévation schématique** : une page par coupe (X, Y ou les deux), A0 à A4, à l'échelle
  ronde (1/50, 1/100…) la plus grande qui tient, avec les altitudes des niveaux. Réservations
  cochées, ou seulement celles de la zone tracée. En mode **réservation par réservation**,
  une option ajoute l'élévation X et Y de la réservation à droite de chaque page.
- **Réservations masquées** (œil, objet ou calque masqué) : elles ne sortent dans aucun export.
- **Rapport de métré (PDF A4)** : récapitulatif par poste (quantités par niveau, prix,
  total HT), puis le détail de chaque mesure.
- **Métré pour Excel (CSV)** et **Liste des réservations pour Excel (CSV)** :
  séparateur « ; » et virgule décimale, à ouvrir directement dans Excel.
- **Réservations à exporter** (plans, réservation par réservation, zone, élévation, liste CSV) :
  une liste à cocher par calque › objet, avec Toutes / Aucune / Anomalies seulement /
  Sélectionnée. Le choix est mémorisé dans le projet ; les nouvelles réservations sont
  cochées d'office.

## Clic droit et raccourcis

Clic droit sur le plan (appui long au doigt) : menu d'actions selon ce qui est dessous —
réservation (conforme / anomalie, position réelle, dupliquer, copier, objet, supprimer),
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
| `T` tous les niveaux / disposition précédente | | | |

`Ctrl+O` projets · `Ctrl+I` importer des plans · `Ctrl+E` exporter · `?` aide (sur Mac,
`⌘` à la place de `Ctrl`).

## Technique

- Un seul fichier, sans build. pdf.js pour la lecture et la re-rastérisation des PDF au
  zoom, pdf-lib pour les exports PDF vectoriels (chargés depuis cdnjs).
- Chaque niveau porte son propre calage (origine, rotation, échelle) et sa hauteur d'étage ;
  les réservations
  sont en coordonnées monde (mètres), les mesures de métré en pixels du plan (elles
  restent collées au plan si l'on reprend le repère ; seule l'échelle compte pour les
  quantités).
- IndexedDB : `projects` (liste), `cur` (projet ouvert), `p:<id>` (contenu d'un projet).
  Annuler / Rétablir garde 150 étapes en mémoire pendant la session.
- Préférences de l'appareil (panneaux, disposition des vues, thème, réglages d'export) dans
  `localStorage`.
