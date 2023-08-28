var personList = [];

function changeScreen(targetFrom, targetTo, revert) {
  if (revert == 0) {
    document.getElementById(targetFrom).style.animation = '0.8s ease-in fadeOutLeft';
  } else {
    document.getElementById(targetFrom).style.animation = '0.8s ease-in fadeOutRight';
  }

  setTimeout(() => {
    document.getElementById(targetFrom).hidden = 1;
    document.getElementById(targetTo).hidden = 0;
    if (revert == 0) {
      document.getElementById(targetTo).style.animation = '0.8s ease-out fadeInRight';
    } else {
      document.getElementById(targetTo).style.animation = '0.8s ease-out fadeInLeft';
    }
  }, 800);
}

function constructPerson(personID, animate) {
  var personContainer = document.createElement('div');
  personContainer.setAttribute('id', 'person' + personID);
  personContainer.setAttribute('class', 'personItemContainer');

  var personImage = document.createElement('img');
  personImage.setAttribute('src', 'image/person.svg');
  personImage.setAttribute('class', 'personImage');

  var personTitle = document.createElement('div');
  personTitle.setAttribute('class', 'personItemTitle');

  var personControl = document.createElement('div');
  personControl.setAttribute('class', 'personItemControl');

  var personName = document.createElement('h3');
  personName.textContent = personList[personID].name;

  var personTotal = document.createElement('span');
  personTotal.textContent = '$' + personList[personID].total.toFixed(1);

  var personSelect = document.createElement('input');
  personSelect.setAttribute('type', 'button');
  personSelect.setAttribute('id', 'person' + personID + '_select');
  personSelect.setAttribute('class', 'primaryButton');
  personSelect.setAttribute('value', 'Select');

  var personRemove = document.createElement('button');
  personRemove.setAttribute('id', 'person' + personID + '_remove');
  personRemove.setAttribute('class', 'iconButton');
  personRemove.setAttribute('value', 'Delete');

  var personRemoveIcon = document.createElement('img');
  personRemoveIcon.setAttribute('src', 'image/delete.svg');

  personRemove.appendChild(personRemoveIcon);

  personTitle.appendChild(personName);
  personTitle.appendChild(personTotal);

  personControl.appendChild(personSelect);
  personControl.appendChild(personRemove);

  personContainer.appendChild(personImage);
  personContainer.appendChild(personTitle);
  personContainer.appendChild(personControl);

  if (animate == 1) {
    personContainer.style.animation = '0.6s ease-out fadeInRight';
  }
  document.getElementById('personListContainer').appendChild(personContainer);

  if (animate == 1) {
    setTimeout(() => {
      personContainer.style.animation = '';
    }, 600);
  }

  personSelect.addEventListener('click', () => {
    changeScreen('overviewScreen', 'personScreen', 0);
    initializePerson(personID);
  });

  personRemove.addEventListener('click', () => {
    personList.splice(personID, 1);
    document.getElementById('person' + personID).style.animation = '0.6s ease-in fadeOutRight';
    setTimeout(() => {
      document.getElementById('person' + personID).remove();
      constructPersonList();
    }, 600);
  });
}

function constructPersonList() {
  var total = 0;
  document.getElementById('personListContainer').innerHTML = '';

  for (let i = 0; i < personList.length; i++) {
    total += personList[i].total;
    constructPerson(i);
  }

  document.getElementById('totalValue').textContent = '$' + total.toFixed(1);
}

function initializePerson(personID) {
  function calculateTotal() {
    person.service = ((person.red * 12 + person.silver * 17 + person.gold * 22 + person.black * 27) * 0.1);
    person.total = ((person.red * 12 + person.silver * 17 + person.gold * 22 + person.black * 27) * 1.1);
    document.getElementById('serviceFee').textContent = '$' + person.service.toFixed(1);
    document.getElementById('totalSum').textContent = '$' + person.total.toFixed(1);
  }

  function handleDishInput(type) {
    userInput = document.getElementById(type).value;
    if (userInput === '') {
      person[type] = 0;
    } else {
      person[type] = parseInt(userInput);
    }

    if (type == 'red') {
      multiplier = 12;
    } else if (type == 'silver') {
      multiplier = 17;
    } else if (type == 'gold') {
      multiplier = 22;
    } else if (type == 'black') {
      multiplier = 27;
    }

    document.getElementById(type + 'Sum').textContent = '$' + (person[type] * multiplier).toString();
    calculateTotal();
  }

  function handleNameInput() {
    person.name = document.getElementById('personName').value;
  }

  function handleRed() {
    handleDishInput('red');
  }

  function handleRedAdd() {
    person.red++;

    document.getElementById('red').value = person.red;
    document.getElementById('redSum').textContent = '$' + (person.red * 12).toString();
    calculateTotal();
  }

  function handleRedMinus() {
    if (person.red > 0) {
      person.red--;

      document.getElementById('red').value = person.red;
      document.getElementById('redSum').textContent = '$' + (person.red * 12).toString();
      calculateTotal();
    }
  }

  function handleSilver() {
    handleDishInput('silver');
  }

  function handleSilverAdd() {
    person.silver++;

    document.getElementById('silver').value = person.silver;
    document.getElementById('silverSum').textContent = '$' + (person.silver * 17).toString();
    calculateTotal();
  }

  function handleSilverMinus() {
    if (person.silver > 0) {
      person.silver--;

      document.getElementById('silver').value = person.silver;
      document.getElementById('silverSum').textContent = '$' + (person.silver * 17).toString();
      calculateTotal();
    }
  }

  function handleGold() {
    handleDishInput('gold');
  }

  function handleGoldAdd() {
    person.gold++;

    document.getElementById('gold').value = person.gold;
    document.getElementById('goldSum').textContent = '$' + (person.gold * 22).toString();
    calculateTotal();
  }

  function handleGoldMinus() {
    if (person.gold > 0) {
      person.gold--;

      document.getElementById('gold').value = person.gold;
      document.getElementById('goldSum').textContent = '$' + (person.gold * 22).toString();
      calculateTotal();
    }
  }

  function handleBlack() {
    handleDishInput('black');
  }

  function handleBlackAdd() {
    person.black++;

    document.getElementById('black').value = person.black;
    document.getElementById('blackSum').textContent = '$' + (person.black * 27).toString();
    calculateTotal();
  }

  function handleBlackMinus() {
    if (person.black > 0) {
      person.black--;

      document.getElementById('black').value = person.black;
      document.getElementById('blackSum').textContent = '$' + (person.black * 27).toString();
      calculateTotal();
    }
  }

  function storePerson() {
    personList.splice(personID, 1, person);

    changeScreen('personScreen', 'overviewScreen', 1);
    constructPersonList();

    setTimeout(() => {
      document.getElementById('red').value = '';
      document.getElementById('silver').value = '';
      document.getElementById('gold').value = '';
      document.getElementById('black').value = '';

      document.getElementById('redSum').textContent = '';
      document.getElementById('silverSum').textContent = '';
      document.getElementById('goldSum').textContent = '';
      document.getElementById('blackSum').textContent = '';
      document.getElementById('serviceFee').textContent = '';
      document.getElementById('totalSum').textContent = '';
    }, 600);

    document.getElementById('personName').removeEventListener('input', handleNameInput);
    document.getElementById('savePerson').removeEventListener('click', storePerson);
    
    document.getElementById('red').removeEventListener('input', handleRed);
    document.getElementById('silver').removeEventListener('input', handleSilver);
    document.getElementById('gold').removeEventListener('input', handleGold);
    document.getElementById('black').removeEventListener('input', handleBlack);
    
    document.getElementById('redAdd').removeEventListener('click', handleRedAdd);
    document.getElementById('redMinus').removeEventListener('click', handleRedMinus);
    document.getElementById('silverAdd').removeEventListener('click', handleSilverAdd);
    document.getElementById('silverMinus').removeEventListener('click', handleSilverMinus);
    document.getElementById('goldAdd').removeEventListener('click', handleGoldAdd);
    document.getElementById('goldMinus').removeEventListener('click', handleGoldMinus);
    document.getElementById('blackAdd').removeEventListener('click', handleBlackAdd);
    document.getElementById('blackMinus').removeEventListener('click', handleBlackMinus);
  }

  var person = personList[personID];

  document.getElementById('personName').value = personList[personID].name;

  document.getElementById('red').value = person.red;
  document.getElementById('silver').value = person.silver;
  document.getElementById('gold').value = person.gold;
  document.getElementById('black').value = person.black;

  document.getElementById('redSum').textContent = '$' + (person.red * 12).toString();
  document.getElementById('silverSum').textContent = '$' + (person.silver * 17).toString();
  document.getElementById('goldSum').textContent = '$' + (person.gold * 22).toString();
  document.getElementById('blackSum').textContent = '$' + (person.black * 27).toString();
  document.getElementById('serviceFee').textContent = '$' + person.service.toFixed(1);
  document.getElementById('totalSum').textContent = '$' + person.total.toFixed(1);

  document.getElementById('personName').addEventListener('input', handleNameInput);
  document.getElementById('savePerson').addEventListener('click', storePerson);

  document.getElementById('red').addEventListener('input', handleRed);
  document.getElementById('silver').addEventListener('input', handleSilver);
  document.getElementById('gold').addEventListener('input', handleGold);
  document.getElementById('black').addEventListener('input', handleBlack);

  document.getElementById('redAdd').addEventListener('click', handleRedAdd);
  document.getElementById('redMinus').addEventListener('click', handleRedMinus);
  document.getElementById('silverAdd').addEventListener('click', handleSilverAdd);
  document.getElementById('silverMinus').addEventListener('click', handleSilverMinus);
  document.getElementById('goldAdd').addEventListener('click', handleGoldAdd);
  document.getElementById('goldMinus').addEventListener('click', handleGoldMinus);
  document.getElementById('blackAdd').addEventListener('click', handleBlackAdd);
  document.getElementById('blackMinus').addEventListener('click', handleBlackMinus);
}

document.getElementById('welcomeStart').addEventListener('click', () => {
  changeScreen('mainScreen', 'overviewScreen', 0);
  constructPersonList();

  setTimeout(() => {
    var person = {
      name: 'Person ' + (personList.length + 1).toString(), red: 0, silver: 0, gold: 0, black: 0, other: [], service: 0, total: 0
    }
    personList.push(person);
    constructPerson(personList.length - 1, 1);
  }, 1600);
});

document.getElementById('addPerson').addEventListener('click', () => {
  var person = {
    name: 'Person ' + (personList.length + 1).toString(), red: 0, silver: 0, gold: 0, black: 0, other: [], service: 0, total: 0
  }
  personList.push(person);
  constructPerson(personList.length - 1, 1);
});