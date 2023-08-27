var personList = [];

function changeScreen(targetFrom, targetTo, revert) {
  if (revert == 0) {
    document.getElementById(targetFrom).style.animation = '0.5s fadeOutLeft';
  } else {
    document.getElementById(targetFrom).style.animation = '0.5s fadeOutRight';
  }

  setTimeout(() => {
    document.getElementById(targetFrom).hidden = 1;
    document.getElementById(targetTo).hidden = 0;
    if (revert == 0) {
      document.getElementById(targetTo).style.animation = '0.5s ease-out fadeInRight';
    } else {
      document.getElementById(targetTo).style.animation = '0.5s ease-out fadeInLeft';
    }
  }, 500);
}

function constructPerson(personID) {
  var personContainer = document.createElement('div');
  personContainer.setAttribute('id', 'person' + personID);
  
  var personTitle = document.createElement('h3');
  personTitle.textContent = 'Person ' + (personID + 1);

  var personTotal = document.createElement('span');
  personTotal.textContent = '$' + personList[personID].total.toFixed(1);
  
  var personSelect = document.createElement('input');
  personSelect.setAttribute('type', 'button');
  personSelect.setAttribute('id', 'person' + personID + '_select');
  personSelect.setAttribute('value', 'Select');

  var personRemove = document.createElement('input');
  personRemove.setAttribute('type', 'button');
  personRemove.setAttribute('id', 'person' + personID + '_remove');
  personRemove.setAttribute('value', 'Remove');

  personContainer.appendChild(personTitle);
  personContainer.appendChild(personTotal);
  personContainer.appendChild(personSelect);
  personContainer.appendChild(personRemove);
  document.getElementById('personListContainer').appendChild(personContainer);

  document.getElementById('person' + personID + '_select').addEventListener('click', () => {
    changeScreen('overviewScreen', 'personScreen', 0);
    initializePerson(personID);
  });

  document.getElementById('person' + personID + '_remove').addEventListener('click', () => {
    personList.splice(personID, 1);
    constructPersonList();
  })
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

    person.total = ((person.red * 12 + person.silver * 17 + person.gold * 22 + person.black * 27) * 1.1);
    
    document.getElementById(type + 'Sum').textContent = '$' + (person[type] * multiplier).toString();
    document.getElementById('totalSum').textContent = '$' + person.total.toFixed(2);
  }

  function handleRed() {
    handleDishInput('red');
  }

  function handleSilver() {
    handleDishInput('silver');
  }

  function handleGold() {
    handleDishInput('gold');
  }

  function handleBlack() {
    handleDishInput('black');
  }

  function storePerson() {
    personList.splice(personID, 1, person);
    
    changeScreen('personScreen', 'overviewScreen', 1);
    constructPersonList();

    document.getElementById('red').value = '';
    document.getElementById('silver').value = '';
    document.getElementById('gold').value = '';
    document.getElementById('black').value = '';
    
    document.getElementById('redSum').textContent = '';
    document.getElementById('silverSum').textContent = '';
    document.getElementById('goldSum').textContent = '';
    document.getElementById('blackSum').textContent = '';
    document.getElementById('totalSum').textContent = '';

    document.getElementById('red').removeEventListener('input', handleRed);
  
    document.getElementById('silver').removeEventListener('input', handleSilver);
  
    document.getElementById('gold').removeEventListener('input', handleGold);
  
    document.getElementById('black').removeEventListener('input', handleBlack);

    document.getElementById('savePerson').removeEventListener('click', storePerson);
  }
  
  var person = personList[personID];
  
  document.getElementById('red').value = person.red;
  document.getElementById('silver').value = person.silver;
  document.getElementById('gold').value = person.gold;
  document.getElementById('black').value = person.black;
  
  document.getElementById('redSum').textContent = '$' + (person.red * 12).toString();
  document.getElementById('silverSum').textContent = '$' + (person.silver * 17).toString();
  document.getElementById('goldSum').textContent = '$' + (person.gold * 22).toString();
  document.getElementById('blackSum').textContent = '$' + (person.black * 27).toString();
  document.getElementById('totalSum').textContent = '$' + person.total.toFixed(1);
  document.getElementById('personId').textContent = 'Person ' + (personID + 1).toString();
  
  document.getElementById('red').addEventListener('input', handleRed);

  document.getElementById('silver').addEventListener('input', handleSilver);

  document.getElementById('gold').addEventListener('input', handleGold);

  document.getElementById('black').addEventListener('input', handleBlack);
  
  document.getElementById('savePerson').addEventListener('click', storePerson);
}

document.getElementById('welcomeStart').addEventListener('click', () => {
  changeScreen('mainScreen', 'overviewScreen', 0);
  constructPersonList();
});

document.getElementById('addPerson').addEventListener('click', () => {
  var person = {
    red: 0, silver: 0, gold: 0, black: 0, other: [], total: 0
  }
  personList.push(person);
  constructPerson(personList.length - 1);
});