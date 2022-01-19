//var regexPrenom = /^([a-zA-Za-zàâçéèêëîïôûùüÿñæœ" "]+)$/;                 /*    /^([a-zA-Z ]+)$/   /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i   */
//var regexNom = /^([a-zA-Z ]+)$/;
var regex = /^([a-zA-Za-zàâçéèêëîïôûùüÿñæœ ]+)$/;
var prenom = document.getElementById("fname").value.toString().replace(" ", "");
prenom = upperCaseFirstLetter(prenom);
var nom = document.getElementById("name").value.toString().replace(" ", "");
var listParticipant = [];
var listParticipantSelectionne = [];
var listParticipantPourSupprimer = [];
let j = 0;

let userFirstName = "";
let userName = "";
var result;
var Nb_Groupe;
var T_groupe;
var nb = 1;

//récupération des participant du localStorage avec le chargement de la page;
var participantRecuprere = localStorage.getItem("listParticipant");
//retransformer en objet
if (participantRecuprere != "" && participantRecuprere != null) {
  participant = JSON.parse(participantRecuprere); //transformer le string du LS en liste d'objet
  for (var i = 0; i <= participant.length - 1; i++) {
    //récupération de chaque valeur de chaque participant
    var id = participant[i].id;
    var prenom = participant[i].prenom;
    var nom = participant[i].nom;
    var sexe = participant[i].sexe;
    //appel de la fonction pour réintégrer les participant dans la liste d'affichage
    //avec comme paramètre les valeur appartenant à l'objet correspondnant
    rajoutParticipantLocalStorage(id, nom, prenom, sexe);
  }
}

function upperCaseFirstLetter(prenom) {
  return prenom.charAt(0).toUpperCase() + prenom.slice(1);
}
/*########-------Animation BTN Supprimer-------#################*/

/*demmarage d'animation sur le hover du pointer de la sourie*/
function rotationBTNSupprimON() {
  var rotationOnHoverC = anime({
    targets: ".btnSupprim",
    easing: "linear",
    loop: true,
    rotate: [{ value: "2turn", duration: 2000 }],
  });

  var rotationOnHoverL = anime({
    targets: ".trashExtSupL",
    easing: "linear",
    loop: true,
    rotate: [{ value: "20turn", duration: 20000 }],
  });

  var rotationOnHoverR1 = anime({
    targets: ".trashExtInfR1",
    easing: "linear",
    loop: true,
    rotateY: [{ value: "-20turn", duration: 30000 }],
    rotateX: [{ value: "-20turn", duration: 30000 }],
    rotateZ: [{ value: "-20turn", duration: 30000 }],
  });
  var rotationOnHoverR2 = anime({
    targets: ".trashExtInfR2",
    easing: "linear",
    loop: true,
    rotateY: [{ value: "20turn", duration: 30000 }],
    rotateZ: [{ value: "20turn", duration: 30000 }],
  });
}

/*arret de l'animation sur l'enlèvement du pointer de la sourie*/
function rotationBTNSupprimOFF() {
  var rotationOnHoverC = anime({
    targets: ".btnSupprim",
    easing: "linear",
    loop: true,
    rotate: [{ value: "0turn", duration: 0 }],
  });

  var rotationOnHoverL = anime({
    targets: ".trashExtSupL",
    easing: "linear",
    loop: true,
    rotate: [{ value: "0turn", duration: 0 }],
  });

  var rotationOnHoverR = anime({
    targets: ".trashExtInfR1",
    easing: "linear",
    loop: true,
    rotate: [{ value: "0turn", duration: 0 }],
  });
  var rotationOnHoverR = anime({
    targets: ".trashExtInfR2",
    easing: "linear",
    loop: true,
    rotate: [{ value: "0turn", duration: 0 }],
  });
}

/*#######---animation BTN Retour Page---##########################################*/

const myAnimation = anime({
  targets: ".imgRetourPage",
  scale: 1.5,
  duration: 2000,
  easing: "linear",
  loop: true,
});

/*########-------controles des noms-------############################*/
function main() {
  var controlesPassed = controle();
  if (controlesPassed == true) {
    ajoutParticipant();
  }
}

function controle() {
  var prenom = document.getElementById("fname").value.toString().replace(" ", "");
  prenom = upperCaseFirstLetter(prenom);
  var nom = document.getElementById("name").value.toString().toUpperCase().replace(" ", "");
  var femme = document.getElementById("inputsSexeFemme").checked;
  var homme = document.getElementById("inputsSexeHomme").checked;
  //console.log(femme);
  //console.log(homme);

  /*###---Champs renseignés---#############################*/

  if (prenom == "" && nom == "" && femme == false && homme == false) {
    alert("Veuillez renseigner les champs, s'il vous plait");
    document.getElementById("fname").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    document.getElementById("name").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    document.getElementById("inputsSexeFemme").style.background = "red";
    document.getElementById("inputsSexeHomme").style.background = "red";
    return false;
  } else {
    document.getElementById("fname").style.boxShadow = "0rem 0rem 0rem";
    document.getElementById("name").style.boxShadow = "0rem 0rem 0rem";
    document.getElementById("inputsSexeFemme").style.background = "";
    document.getElementById("inputsSexeHomme").style.background = "";
  }

  if (prenom == "" && nom == "" && (femme == false || homme == false)) {
    alert("Veuillez renseigner le nom et le prenom, s'il vous plait");
    document.getElementById("fname").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    document.getElementById("name").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    return false;
  } else {
    document.getElementById("inputsSexeFemme").style.background = "";
    document.getElementById("inputsSexeHomme").style.background = "";
  }

  if (prenom == "" && nom != "") {
    alert("Il faut un prenom");
    document.getElementById("fname").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    return false;
  } else {
    document.getElementById("fname").style.boxShadow = "0rem 0rem 0rem";
  }

  if (nom == "" && prenom != "") {
    alert("Il faut un nom");
    document.getElementById("name").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    return false;
  } else {
    document.getElementById("name").style.boxShadow = "0rem 0rem 0rem";
  }

  if (femme == false && homme == false) {
    alert("Veuillez indiquer votre sexe, s'il vous plait");
    document.getElementById("inputsSexeFemme").style.background = "red";
    document.getElementById("inputsSexeHomme").style.background = "red";
    return false;
  } else {
    document.getElementById("inputsSexeFemme").style.background = "";
    document.getElementById("inputsSexeHomme").style.background = "";
  }

  /*###---contenace de chiffre et signaux speciaux--###################*/

  if (!prenom.match(regex) && !nom.match(regex)) {
    alert(
      "Veuillez indiquez seulement des lettres et des lettres sans accent dans le nom, s'il vous plait"
    );
    document.getElementById("fname").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    document.getElementById("name").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    return false;
  } else {
    document.getElementById("fname").style.boxShadow = "0rem 0rem 0rem";
    document.getElementById("name").style.boxShadow = "0rem 0rem 0rem";
  }

  if (!prenom.match(regex)) {
    alert("Dans votre prenom se trouve au moins un charactere qui n'est pas une lettre");
    document.getElementById("fname").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    return false;
  } else {
    document.getElementById("fname").style.boxShadow = "0rem 0rem 0rem";
  }

  if (!nom.match(regex)) {
    alert("Dans votre nom se trouve au moins un accent ou un charactere qui n'est pas une lettre");
    document.getElementById("name").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
    return false;
  } else {
    document.getElementById("name").style.boxShadow = "0rem 0rem 0rem";
  }

  //  console.log("prenom à chercher: "+prenom);
  //  console.log(("nom à chercher: "+nom));
  //vérification si le participant existe déja
  if (listParticipant.length > 0) {
    //    console.log("dans le if du control");
    for (let i = 0; i <= listParticipant.length - 1; i++) {
      //      console.log("dans le for du control");
      //      console.log("vérifie le prenom: "+listParticipant[i].prenom)
      if (prenom == listParticipant[i].prenom) {
        //       console.log("prenom trouvé");
        //       console.log("vérifie le nom: "+listParticipant[i].nom);
        if (nom == listParticipant[i].nom) {
          //          console.log("nom trouvé, participant éxistant!");
          alert("Le participant est déja existant");
          document.getElementById("name").style.boxShadow = "0rem 0rem 1.5rem 1.1rem red";
          return false;
        } else {
          document.getElementById("name").style.boxShadow = "0rem 0rem 0rem";
        }
      }
    }
  }
  return true;
}

/**
 * Check if there is a Participant with the given 'id'
 *
 * @param {list of Participant} listParticipant
 * @param {string} id
 *
 * @returns true if a Participant in 'listParticipant' has the given 'id', else false
 */
function verificationId(listParticipant, id) {
  console.log("1 listParticipant.length - 1", listParticipant.length - 1);
  for (var i = 0; i < listParticipant.length; i++) {
    if (listParticipant[i].id == id) {
      console.log("in true");
      console.log("id matched");
      return true;
    }
  }
  return false;
}

function idParticipant() {
  // var id = 1;
  // var tListe = listParticipant.length;
  // listParticipant.sort();
  // console.log("taille de la liste: " + tListe);
  // for (var i = 0; i <= tListe - 1; i++) {
  //   console.log("id de la liste reconnu: " + listParticipant[i].id);
  //   id++;
  //   if (id == listParticipant[i].id) {
  //     id++;
  //   }
  //   console.log("listParticipant:", listParticipant);
  //   console.log("0 listParticipant.length - 1", listParticipant.length - 1);
  //   console.log("id:", id);
  //   console.log("verificationId(listParticipant, id)", verificationId(listParticipant, id));
  //   while (listParticipant.includes(id) == true) {
  //     console.log("id téjà trouvé");
  //     id++;
  //   }
  // }
  // console.log("id retourné: " + id);

  console.log("listParticipant:", listParticipant);
  let id = 1;
  while (verificationId(listParticipant, id)) {
    id++;
  }
  console.log("id", id);
  return id;
}

/*########-----récupération et affichage des participants--------##############*/
function rajoutParticipantLocalStorage(id, nom, prenom, sexe) {
  var sexe;
  var prenom;
  var nom;
  var id;
  var participant = new Participant(id, nom, prenom, sexe);

  function Participant(id, nom, prenom, sexe) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.sexe = sexe;
  }
  listParticipant.push(participant);
  //show
  button = document.createElement("button"); //creating element

  //adding class Name on the element
  if (sexe == "femme") {
    button.id = "participant";
    button.className = "participant nomPrenomFemme";
    button.type = "button";
    button.setAttribute("onclick", "selectionParticipant()");
  } else {
    button.id = "participant";
    button.className = "participant nomPrenomHomme";
    button.type = "button";
    button.setAttribute("onclick", "selectionParticipant()");
  }

  var affichageParticipants = document.getElementById("participants");

  for (j; j < listParticipant.length; j++) {
    button.textContent += listParticipant[j].prenom + " " + listParticipant[j].nom;
    affichageParticipants.appendChild(button);
    listParticipantPourSupprimer.push(button.textContent);
  }
}

function ajoutParticipant() {
  var sexe = genre();
  var prenom = document.getElementById("fname").value.toString().replace(" ", "");
  prenom = upperCaseFirstLetter(prenom);
  var nom = document.getElementById("name").value.toString().toUpperCase().replace(" ", "");
  var id = idParticipant();
  var j = 0;

  var participant = new Participant(id, nom, prenom, sexe);

  function Participant(id, nom, prenom, sexe) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.sexe = sexe;
  }

  listParticipant.push(participant);
  console.dir(listParticipant);
  //show
  button = document.createElement("button"); //creating element

  //adding class Name on the element
  if (sexe == "femme") {
    console.log("création de l'id class....");
    button.id = "participant";
    button.className = "participant nomPrenomFemme";
    button.type = "button";
    button.setAttribute("onclick", "selectionParticipant()");
  } else {
    button.id = "participant";
    console.log("création de l'id class....");
    button.className = "participant nomPrenomHomme";
    button.type = "button";
    button.setAttribute("onclick", "selectionParticipant()");
  }

  var affichageParticipants = document.getElementById("participants");

  for (j; j < listParticipant.length; j++) {
    button.textContent = listParticipant[j].prenom + " " + listParticipant[j].nom;
    affichageParticipants.appendChild(button);
    listParticipantPourSupprimer.push(button.textContent);
  }

  localStorage.setItem("listParticipant", JSON.stringify(listParticipant));

  /*#######----initialiser le formulaire---#####################################*/

  document.getElementById("fname").value = "";
  document.getElementById("name").value = "";

  var iniRadio = document.getElementById("inputsSexeFemme");
  if (iniRadio.checked == true) {
    iniRadio.checked = false;
  }
  var iniRadio = document.getElementById("inputsSexeHomme");
  if (iniRadio.checked == true) {
    iniRadio.checked = false;
  }
}

/*###-----procédure pour supprimer les participants----#########################*/

function selectionParticipant() {
  var participant = document.getElementsByClassName("participant");

  for (i = 0; i < participant.length; i++) {
    participant[i].addEventListener("click", function () {
      this.className += " participantSelectionne";
      this.id = "participantSelectionne";
    });
    //il faut supprimer l'ancien "onclick" pour mettre un nouveau qui renvoit à la
    //fonction pour desélectionner le participant en question en rappuyant dessus
    participant[i].removeAttribute("onclick");
    participant[i].setAttribute("onclick", "deselectionParticipant()");
  }
}

function deselectionParticipant() {
  var participant = document.getElementsByClassName("participantSelectionne");

  for (i = 0; i < participant.length; i++) {
    participant[i].addEventListener("click", function () {
      this.className += " participant";
      this.id = "participant";
    });
    //il faut supprimer le nouveau "onclick" pour mettre l'ancien, ce qui permet
    //de reclicker dessus pour le deséléctionner et encore séléctionner....
    participant[i].removeAttribute("onclick");
    participant[i].setAttribute("onclick", "selectionParticipant()");
  }
}

function confirmationSupression(prenomSupprimer, nomSupprimer) {
  var prenomSupprimer = prenomSupprimer;
  var nomSupprimer = nomSupprimer;
  if (confirm("Voulez vous vraiment supprimer " + prenomSupprimer + " " + nomSupprimer + "?")) {
    if (confirm("Vraiment vraiement?")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function supprimer() {
  //fonction permettant de supprimer le btn de la liste des participant ainsi que l'objet participant séléctionné
  var participantSelectionne = document.getElementById("participantSelectionne");
  var participantNomSupprim = document.getElementById("participantSelectionne").textContent; //récupération du nom du participant

  //decortiquer la valeur textContent en deux valeur pour la comparaison avec les valeurs des objets et trouver celui à supprimer
  prenomSupprimer = participantNomSupprim.split(" ")[0];
  console.log("prenom à supprimer: " + ">" + prenomSupprimer + "<");
  nomSupprimer = participantNomSupprim.split(" ")[1];
  console.log("nom à supprimer: " + ">" + nomSupprimer + "<");

  supressionConfirmee = confirmationSupression(prenomSupprimer, nomSupprimer);
  if (supressionConfirmee == true) {
    //recherche de correspondance dans la liste des objets pui la récupération de l'id
    for (var i = 0; i <= listParticipant.length - 1; i++) {
      if (prenomSupprimer == listParticipant[i].prenom && nomSupprimer == listParticipant[i].nom) {
        console.log("participant à supprimer trouvé");
        var idaSupprimer = listParticipant[i].id;
        console.log("id récupéré: " + idaSupprimer);
      }
    }

    //supprimer l'objets avec l'id correspondant de la liste des objets
    console.log("id a supprimer: " + idaSupprimer);
    var removeParticipant = listParticipant
      .map(function (item) {
        return item.id;
      })
      .indexOf(idaSupprimer);

    listParticipant.splice(removeParticipant, 1);
    supessionLocalStorage(idaSupprimer);

    //supprimer le btn à la fin car nécessaire pour le traitement pour la suppression de l'objet
    participantSelectionne.remove();
  }
}

function supessionLocalStorage(idaSupprimer) {
  var id = idaSupprimer;
  var listParticipantLocalStorage = JSON.parse(localStorage.getItem("listParticipant")); // updated
  console.log("listParticipantLocalStorage: " + listParticipantLocalStorage);
  console.log("taille listParticipantLocalStorage: " + listParticipantLocalStorage.length);

  for (var i = 0; i < listParticipantLocalStorage.length; i++) {
    var participantASupprimer = listParticipantLocalStorage[i];
    console.log("participantASupprimer: " + participantASupprimer);
    if (participantASupprimer.id == id) {
      console.log("idLocalStorage correspond");
      listParticipantLocalStorage.splice(i, 1);
    }
  }
  listParticipant = JSON.stringify(listParticipantLocalStorage); //Restoring object left into items again

  localStorage.setItem("listParticipant", listParticipant);
}

/*#########################################################*/

function genre() {
  var femme = document.getElementById("inputsSexeFemme").checked;
  if (femme == true) {
    var sexe = "femme";
  } else {
    var sexe = "homme";
  }
  return sexe;
}

/*#########################################################*/

function getSelectValueTGroupe(tGroupe) {
  /**On récupère l'élement html <select>*/
  var selectElmt = document.getElementById(tGroupe);
  return selectElmt.options[selectElmt.selectedIndex].value;
}
function getSelectValueNbGroupe(nbGroupe) {
  /**On récupère l'élement html <select>*/
  var selectElmt = document.getElementById(nbGroupe);
  return selectElmt.options[selectElmt.selectedIndex].value;
}

//#####------Génerer les groupes-----##########################//*/
var valeur_taille_de_groupe;
var valeur_nombre_de_groupe;
valeur_taille_de_groupe = null;
valeur_taille_de_groupe = null;
document.getElementById("radioBTNTGroup").addEventListener("click", () => {
  // var selectElmt = document.getElementById("tGroupe");
  valeur_taille_de_groupe =
    document.getElementById("tGroupe").options[document.getElementById("tGroupe").selectedIndex]
      .value;
  return valeur_taille_de_groupe;
});
document.getElementById("radioBTNNbGroup").addEventListener("click", () => {
  // var selectElmt = document.getElementById("tGroupe");

  valeur_nombre_de_groupe =
    document.getElementById("nbGroupe").options[document.getElementById("nbGroupe").selectedIndex]
      .value;
  return valeur_nombre_de_groupe;
});

function gen() {
  var depassement = listParticipant.length % valeur_taille_de_groupe;
  // console.log(listParticipant.length);
  if (valeur_taille_de_groupe != null) {
    if (depassement == 0) {
      // si c'est pair

      for (i = 0; i <= listParticipant.length; i++) {
        var valeur;
        var element_crée;
        var supprimParticipantDouble;
        let liste = [];

        for (let k = 0; k <= valeur_taille_de_groupe - 1; k++) {
          valeur = Math.floor(Math.random() * listParticipant.length);
          liste.push(listParticipant[valeur]);
          // console.dir(liste.sexe);
          supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
          listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex
        }
        // console.log(liste);
        //show
        for (let i = 0; i < 1; i++) {
          element_crée = document.createElement("div");
          var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
          element_crée.className = "resultat"; //adding class Name on the element
          element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
          element_recuperer_dans_le_html.appendChild(element_crée);

          for (let j = 0; j < valeur_taille_de_groupe; j++) {
            var sexe = liste[j].sexe;
            //creation des element necesaire pour crée les div pour chaque nom
            var participant = document.createElement("div");
            var div_par_parsone = document.createTextNode(
              liste[j].nom + " " + liste[j].prenom + "\r\n"
            );
            //ajout defant et pointage  sur le premier enfant courant crée
            if (sexe == "femme") {
              participant.className = "participant nomPrenomFemme";
            } else {
              participant.className = "participant nomPrenomHomme";
            }
            // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
            participant.appendChild(div_par_parsone);
            var cible = element_crée;
            cible.appendChild(participant);
          }
        }
        nb++;
      }
    }
    if (listParticipant.length == 3) {
      console.log("alaouaqueba");
      for (i = 0; i <= listParticipant.length; i++) {
        var valeur;
        var element_crée;
        var supprimParticipantDouble;
        let liste = [];
        let res = 0;

        for (let k = 0; k <= valeur_taille_de_groupe - 1; k++) {
          valeur = Math.floor(Math.random() * listParticipant.length);
          liste.push(listParticipant[valeur]);

          supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
          listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex
          res++;
        }

        //show
        for (let i = 0; i < 1; i++) {
          element_crée = document.createElement("div");
          var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
          element_crée.className = "resultat"; //adding class Name on the element
          element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
          element_recuperer_dans_le_html.appendChild(element_crée);

          for (let j = 0; j < liste.length; j++) {
            if (liste[j] == undefined) {
              break;
            }
            var sexe = liste[j].sexe;
            //creation des element necesaire pour crée les div pour chaque nom
            var participant = document.createElement("div");
            var div_par_parsone = document.createTextNode(
              liste[j].nom + " " + liste[j].prenom + "\r\n"
            );
            //ajout defant et pointage  sur le premier enfant courant crée
            if (sexe == "femme") {
              participant.className = "participant nomPrenomFemme";
            } else {
              participant.className = "participant nomPrenomHomme";
            }
            // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
            participant.appendChild(div_par_parsone);
            var cible = element_crée;
            cible.appendChild(participant);
          }
          nb++;
        }
        T_groupe -= 1;
      }
    }
    if (listParticipant.length > 3) {
      //confirm("votre liste de persone est impair veuillez confirmez");

      if (listParticipant.length / T_groupe != 0) {
        for (i = 0; i <= listParticipant.length + 1; i++) {
          var valeur;
          var element_crée;
          var supprimParticipantDouble;
          let liste = [];
          var tour = listParticipant.length - 1;
          let res = 0;
          let k = 0;
          for (k; k <= valeur_taille_de_groupe - 1; k++) {
            valeur = Math.floor(Math.random() * listParticipant.length);
            liste.push(listParticipant[valeur]);

            supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
            listParticipant.splice(supprimParticipantDouble, 1);
            res++;
            if (res == tour) {
              valeur = Math.floor(Math.random() * listParticipant.length);
              liste.push(listParticipant[valeur]);

              supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
              listParticipant.splice(supprimParticipantDouble, 1);
            }
          }

          console.log(liste);
          //show

          for (let i = 0; i < 1; i++) {
            element_crée = document.createElement("div");
            var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
            element_crée.className = "resultat"; //adding class Name on the element
            element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
            element_recuperer_dans_le_html.appendChild(element_crée);

            for (let j = 0; j < valeur_taille_de_groupe + 1; j++) {
              if (liste[j] == undefined) {
                break;
              }
              var sexe = liste[j].sexe;
              //creation des element necesaire pour crée les div pour chaque nom
              var participant = document.createElement("div");
              var div_par_parsone = document.createTextNode(
                liste[j].nom + " " + liste[j].prenom + "\r\n"
              );
              //ajout defant et pointage  sur le premier enfant courant crée
              if (sexe == "femme") {
                participant.className = "participant nomPrenomFemme";
              } else {
                participant.className = "participant nomPrenomHomme";
              }
              // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
              participant.appendChild(div_par_parsone);
              var cible = element_crée;
              cible.appendChild(participant);
            }
            nb++;
          }
        }
      } else {
        for (i = 0; i <= listParticipant.length - 1; i++) {
          var valeur;
          var element_crée;
          var supprimParticipantDouble;
          let liste = [];
          let res = 0;

          for (let k = 0; k <= valeur_taille_de_groupe - 1; k++) {
            valeur = Math.floor(Math.random() * listParticipant.length);
            liste.push(listParticipant[valeur]);

            supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
            listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex
            res++;
          }

          //show

          for (let i = 0; i < 1; i++) {
            element_crée = document.createElement("div");
            var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
            element_crée.className = "resultat"; //adding class Name on the element
            element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
            element_recuperer_dans_le_html.appendChild(element_crée);

            for (let j = 0; j < liste.length; j++) {
              if (liste[j] == undefined) {
                break;
              }
              var sexe = liste[j].sexe;
              //creation des element necesaire pour crée les div pour chaque nom
              var participant = document.createElement("div");
              var div_par_parsone = document.createTextNode(
                liste[j].nom + " " + liste[j].prenom + "\r\n"
              );
              //ajout defant et pointage  sur le premier enfant courant crée
              if (sexe == "femme") {
                participant.className = "participant nomPrenomFemme";
              } else {
                participant.className = "participant nomPrenomHomme";
              }
              // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
              participant.appendChild(div_par_parsone);
              var cible = element_crée;
              cible.appendChild(participant);
            }
            nb++;
          }
        }
      }
    }
  }
  if (valeur_nombre_de_groupe != null) {


    if (listParticipant.length == 3) {
      console.log("alaouaqueba");
      for (i = 0; i <= valeur_nombre_de_groupe - 1; i++) {
        var valeur;
        var element_crée;
        var supprimParticipantDouble;
        let liste = [];
        let res = 0;

        for (let k = 0; k <= valeur_nombre_de_groupe - 1; k++) {
          valeur = Math.floor(Math.random() * listParticipant.length);
          liste.push(listParticipant[valeur]);

          supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
          listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex
          res++;
        }

        //show
        for (let i = 0; i < 1; i++) {
          element_crée = document.createElement("div");
          var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
          element_crée.className = "resultat"; //adding class Name on the element
          element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
          element_recuperer_dans_le_html.appendChild(element_crée);
          for (let j = 0; j < valeur_nombre_de_groupe; j++) {
            if (liste[j] == undefined) {
              break;
            }
            var sexe = liste[j].sexe;
            //creation des element necesaire pour crée les div pour chaque nom
            var participant = document.createElement("div");
            var div_par_parsone = document.createTextNode(
              liste[j].nom + " " + liste[j].prenom + "\r\n"
            );
            //ajout defant et pointage  sur le premier enfant courant crée
            if (sexe == "femme") {
              participant.className = "participant nomPrenomFemme";
            } else {
              participant.className = "participant nomPrenomHomme";
            }
            // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
            participant.appendChild(div_par_parsone);
            var cible = element_crée;
            cible.appendChild(participant);
          }
          nb++;
        }
        T_groupe -= 1;
      }
    }
    if (listParticipant.length > 3) {
      let tour = Math.floor(listParticipant.length / valeur_nombre_de_groupe);
      //confirm("votre liste de persone est impair veuillez confirmez");
      console.log("tata");
      if (listParticipant.length % valeur_nombre_de_groupe != 0) {
        console.log("taile");
        for (i = 0; i <= listParticipant.length + 1; i++) {
          var valeur;
          var element_crée;
          var supprimParticipantDouble;
          let liste = [];
          let res = 0;


          for (let k = 0; k <= tour-1; k++) {
            valeur = Math.floor(Math.random() * listParticipant.length);
            liste.push(listParticipant[valeur]);

            supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
            listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex

          }

          if (nb==valeur_nombre_de_groupe) {
            console.log("hehr");
            valeur = Math.floor(Math.random() * listParticipant.length);
            liste.push(listParticipant[valeur]);

            supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
            listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex
          }
          console.log(liste);
          //show

          for (let i = 0; i < 1; i++) {
            element_crée = document.createElement("div");
            var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
            element_crée.className = "resultat"; //adding class Name on the element
            element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
            element_recuperer_dans_le_html.appendChild(element_crée);


            for (let j = 0; j < tour+1; j++) {
              if (liste[j] == undefined) {
                break;
              }
              var sexe = liste[j].sexe;
              //creation des element necesaire pour crée les div pour chaque nom
              var participant = document.createElement("div");
              var div_par_parsone = document.createTextNode(
                liste[j].nom + " " + liste[j].prenom + "\r\n"
              );
              //ajout defant et pointage  sur le premier enfant courant crée
              if (sexe == "femme") {
                participant.className = "participant nomPrenomFemme";
              } else {
                participant.className = "participant nomPrenomHomme";
              }
              // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
              participant.appendChild(div_par_parsone);
              var cible = element_crée;
              cible.appendChild(participant);
            }
            nb++;

          }

        }
      } else {
        console.log("tete");
        let tour = Math.floor(listParticipant.length / valeur_nombre_de_groupe);
        for (i = 0; i <= tour - 1; i++) {
          var valeur;
          var element_crée;
          var supprimParticipantDouble;
          let liste = [];
          let res = 0;

          for (let k = 0; k <= valeur_nombre_de_groupe - 1; k++) {
            valeur = Math.floor(Math.random() * listParticipant.length);
            liste.push(listParticipant[valeur]);

            supprimParticipantDouble = listParticipant.indexOf(listParticipant[valeur]);
            listParticipant.splice(supprimParticipantDouble, 1); //add in myIndex
            res++;
          }
          console.log(liste);
          //show

          for (let i = 0; i < 1; i++) {
            element_crée = document.createElement("div");
            var element_recuperer_dans_le_html = document.getElementById("result"); //creating element
            element_crée.className = "resultat"; //adding class Name on the element
            element_crée.textContent += "GROUPE " + nb + "\r\n"; //add the content in the element
            element_recuperer_dans_le_html.appendChild(element_crée);

            for (let j = 0; j < tour; j++) {
              if (liste[j] == undefined) {
                break;
              }
              var sexe = liste[j].sexe;
              //creation des element necesaire pour crée les div pour chaque nom
              var participant = document.createElement("div");
              var div_par_parsone = document.createTextNode(
                liste[j].nom + " " + liste[j].prenom + "\r\n"
              );
              //ajout defant et pointage  sur le premier enfant courant crée
              if (sexe == "femme") {
                participant.className = "participant nomPrenomFemme";
              } else {
                participant.className = "participant nomPrenomHomme";
              }
              // vaut mieux ajouter la class du sexe dans la ligne vide participant.className=" nom de la class";
              participant.appendChild(div_par_parsone);
              var cible = element_crée;
              cible.appendChild(participant);
            }
            nb++;
          }
        }
      }
    }
  }
}

function choixGroup() {
  var radioBTNNbGroup = document.getElementById("radioBTNNbGroup").style.background;
  var radioBTNTGroup = document.getElementById("radioBTNTGroup").style.background;
  var choix = 0;
  if (radioBTNNbGroup == "") {
    alert("Veuillez choisir soit la taille de vos groupes soit le nombre des groupes!!");
    return false;
  }
  if (radioBTNNbGroup == "white") {
    choix = "nbGroupe";
    console.log("choix nbgroup");
  } else {
    choix = "tGroupe";
    console.log("choix tgroup");
  }
  return choix;
}

//#####------Griser champs non choisie Groups-----###########################################//*/

var btnCreer = document.getElementById("btnCreer");
var sourceNbGroupe = document.getElementById("nbGroupe");
var sourceTGroupe = document.getElementById("tGroupe");
sourceNbGroupe.disabled = true;
sourceTGroupe.disabled = true;
btnCreer.disabled = true;
/*
btnCreer.addEventListener("onclick", function () {
  if (btnCreer.disabled == true && listParticipant.length < 3) {
    alert(
      "Veuillez choisir la taille de vos groupes ou le nombre de groupes, s'il vous plait"
    );
  }
});
*/
function hideShowNbGroup() {
  var a = true;
  var btnNbGroup = document.getElementById("inputTGroupe");
  var btnTGroup = document.getElementById("inputNbGroupe");
  var colorOfBTNTGroup = document.getElementById("radioBTNTGroup");
  var colorOfBTNNbGroup = document.getElementById("radioBTNNbGroup");
  var valeur = document.getElementById("tGroupe");
  if (btnNbGroup.style.display != "none") {
    btnNbGroup.style.display = "none";
    btnTGroup.style.display = "block";
    colorOfBTNTGroup.style.background = "red";
    colorOfBTNNbGroup.style.background = "white";
    valeur.value = 2;
  }
  if (a == true) {
    sourceNbGroupe.disabled = false;
    sourceTGroupe.disabled = false;
    btnCreer.disabled = false;
  }
}

function hideShowTGroup() {
  var a = true;
  var btnTGroup = document.getElementById("inputNbGroupe");
  var btnNbGroup = document.getElementById("inputTGroupe");
  var colorOfBTNNbGroup = document.getElementById("radioBTNNbGroup");
  var colorOfBTNTGroup = document.getElementById("radioBTNTGroup");
  var valeur = document.getElementById("nbGroupe");

  if (btnTGroup.style.display != "none") {
    btnTGroup.style.display = "none";
    btnNbGroup.style.display = "block";
    colorOfBTNNbGroup.style.background = "red";
    colorOfBTNTGroup.style.background = "white";
    valeur.value = 2;
  }
  if (a == true) {
    sourceNbGroupe.disabled = false;
    sourceTGroupe.disabled = false;
    btnCreer.disabled = false;
  }
}
