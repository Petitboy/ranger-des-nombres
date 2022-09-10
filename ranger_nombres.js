/**************
 *  Variables *
 **************/

var numbas = 0;
var numhaut = 9;
var combienDeNombres = 5;
var nombres_places = [];
var base = [];
var nombres_a_placer = [];

const affichage_nombres = document.getElementById('affichage_nombres');
const input_bases = document.getElementById('input_bases');

/**************
 * Intervalle *
 * ************/

const intervalle_bas = document.querySelector('#intervalle_bas');
const submit_intervalle_bas = document.querySelector('#submit_intervalle_bas');
const affichage_intervalle_bas = document.querySelector('#affichage_intervalle_bas');
const intervalle_haut = document.querySelector('#intervalle_haut');
const submit_intervalle_haut = document.querySelector('#submit_intervalle_haut');
const affichage_intervalle_haut = document.querySelector('#affichage_intervalle_haut');
const combien_nombres_a_ranger = document.querySelector('#combien_nombres_a_ranger');
const submit_combien_nombres_a_ranger = document.querySelector('#submit_combien_nombres_a_ranger');
const affichage_combien_nombres_a_ranger = document.querySelector('#affichage_combien_nombres_a_ranger');
const radioButton1 = document.getElementById('radioButton1');
const radioButton2 = document.getElementById('radioButton2');

affichage_intervalle_bas.textContent = numbas;
affichage_intervalle_haut.textContent = numhaut;
affichage_combien_nombres_a_ranger.textContent = combienDeNombres;

submit_intervalle_bas.addEventListener('click', changeNumberBas);
submit_intervalle_haut.addEventListener('click', changeNumberHaut);
submit_combien_nombres_a_ranger.addEventListener('click', changeNumberARanger);

function changeNumberBas() {	
	numbas = Number(intervalle_bas.value);
	affichage_intervalle_bas.textContent = numbas;
	intervalle_bas.value = "";	
}

function changeNumberHaut() {
	numhaut = Number(intervalle_haut.value);
	affichage_intervalle_haut.textContent = numhaut;
	intervalle_haut.value = "";	
}

function changeNumberARanger() {
	combienDeNombres = Number(combien_nombres_a_ranger.value);
	affichage_combien_nombres_a_ranger.textContent = combienDeNombres;
	combien_nombres_a_ranger.value = "";	
}

/**************************
 * généreration aléatoire *
 * ************************/

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumbers(combienDeNombres) {
	mise_a_zero()
	if (numbas >= numhaut) {
		alert("Intervalle impossible");
		mise_a_zero();
		} else if (numhaut-numbas < combienDeNombres) {
			alert("Intervalle trop petit");}
		else {		
	for(i=0; i<combienDeNombres; i++) {
		var nombre = getRandomInt(numbas, numhaut+1);
		if (base.indexOf(nombre) !== -1) {i--} else {
		base.push(nombre);
		}
	}	
	input_bases.innerHTML = "";
	createNewInput();
	selectSons();}
}

function mise_a_zero() {
	base = [];
	nombres_a_placer = [];
	nombres_places = [];
	affichage_nombres.textContent = "";
	input_bases.innerHTML = "";
	}
	
getRandomNumbers(combienDeNombres);
	
/***********
 * Mélange *
 ***********/

function shuffle(array1, array2) {
	var currentIndex = array1.length;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		array2.push(array1[randomIndex]);
		const index = array1.indexOf(array1[randomIndex]);
		array1.splice(index, 1);
		}
		array1.push(...array2);
		return array2;
	}
	
/*****************
 * Creation html *
 *****************/
function createNewInput () {
	shuffle(base, nombres_a_placer);
	for (let i=0; i<nombres_a_placer.length; i++) {
		var newDivMot = document.createElement('div');
		//newDivMot.id = nombres_a_placer[i];
		var newInput = document.createElement('input');
		newInput.type = 'checkbox';
		newInput.id = nombres_a_placer[i];
		var newLabel = document.createElement('label');
		newLabel.htmlFor = nombres_a_placer[i];
		newLabel.appendChild(document.createTextNode(nombres_a_placer[i]));
		newDivMot.appendChild(newInput);
		newDivMot.appendChild(newLabel);
		var newDivBox = document.createElement('div');
		newDivBox.id = 'box';
		newDivBox.appendChild(newDivMot);
		input_bases.appendChild(newDivBox);		
	}
	nombres_a_placer.splice(0, nombres_a_placer.length);
}

/***************
 *  SÉLECTION  *
 ***************/
 
function selectSons() {
	for (let i=0; i<base.length; i++) {
		const x = document.getElementById(base[i]).addEventListener('change', ($event) => {
			if ($event.target.checked) {
				nombres_places.push(base[i]);
				afficher_les_nombres(nombres_places);
				controle();				
				} else {
					const index = nombres_places.indexOf(base[i]);
					nombres_places.splice(index, 1);				
					afficher_les_nombres(nombres_places);
					controle();
			}
		});
		
	}
}

var color_green = "green";
var color_red = "red";

function controle() {
	if (radioButton1.checked == true) {
		color_green = "green";
		color_red = "red";}
		else if (radioButton2.checked == true) {
			color_green = "red";
			color_red = "green";}
	for (i=0; i<nombres_places.length-1; i++) {
	if (nombres_places[i]<nombres_places[i+1]){affichage_nombres.style.color = color_green;}
	else {affichage_nombres.style.color = color_red;}
	}
}

function afficher_les_nombres(nombres_places) {		
	affichage_nombres.textContent = " ";
	for (compteur=0; compteur<nombres_places.length; compteur +=1) {
		affichage_nombres.textContent += nombres_places[compteur] + " ";}
	}
