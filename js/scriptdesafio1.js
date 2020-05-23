window.addEventListener('load', start);

var gNames = ['Um', 'Dois', 'Tres', 'Quatro'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
	inputName = document.querySelector('#inputName');

	preventFormSubmit();
	activateInput();
	render();
}

function preventFormSubmit() {
	function handleFormSubmit(event) {
		event.preventDefault();
	}

	var form = document.querySelector('form');
	form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
	function insertName(newName) {
		gNames.push(newName);
		console.log(newName);
	}

	function updateName(newName) {
		gNames[currentIndex] = newName;
	}

	function handleTyping(event) {
		var hasText = !!event.target.value && event.target.value.trim() !== '';

		if (!hasText) {
			clearInput();
			return;
		}
		if (event.key === 'Enter') {
			if (isEditing) {
				updateName(event.target.value);
				console.log('isUpdating');
			} else {
				insertName(event.target.value);
				console.log('isEditing');
			}
			isEditing = false;
			render();
			clearInput();
		}
	}
	inputName.addEventListener('keyup', handleTyping);
	inputName.focus();
}

function render() {

	function createDeleteButton(index) {

		function deleteName() {
			gNames.splice(index, 1);
			render();
		}
		var button = document.createElement('button');
		button.classList.add('.deleteButton');
		button.textContent = 'x';

		button.addEventListener('click', deleteName);

		return button;
	}

	function createSpan(name, index) {
		function editItem() {
			inputName.value = name;
			inputName.focus();
			isEditing = true;
			currentIndex = index;
		}

		var span = document.createElement('span');
		span.classList.add('clickable');
		span.textContent = name;
		span.addEventListener('click', editItem);

		return span;
	}

	var divNames = document.querySelector('#names');
	divNames.innerHTML = '';
	// Criar ul
	// Fazer n li's, conforme tamanho de gNames
	var ul = document.createElement('ul');

	for(var i = 0; i < gNames.length; i ++) {
		var currentName = gNames[i];

		var li = document.createElement('li');
		var button = createDeleteButton(i);
		var span = createSpan(currentName, i);

		li.appendChild(button);
		li.appendChild(span);

		ul.appendChild(li);
	}

	divNames.appendChild(ul);
	clearInput();
}

function clearInput() {
	inputName.value = '';
	inputName.focus();
}