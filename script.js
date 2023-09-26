//import { calculateDays,calculateWeeks } from './dataCalculator.js';

document.addEventListener('DOMContentLoaded', function () {
  const defaultTabLink = document.querySelector('.tabLinks[data-tab="dateCalculator"]');
  openTab({ currentTarget: defaultTabLink }, 'dateCalculator');

  
  const today = new Date();
  const todayFormatted = today.toISOString().slice(0, 10);

  const date1Input = document.getElementById('date1');
  const date2Input = document.getElementById('date2');

   
  date1Input.value = ''; 

  
  const activeTab = localStorage.getItem('activeTab');
  if (activeTab === 'dateCalculator') {
    const selectedDate = new Date(today);
    selectedDate.setDate(selectedDate.getDate() + 7); 
    date2Input.value = selectedDate.toISOString().slice(0, 10);
    date2Input.value = '';
  }
  displayResults();

  
});

  function enableDate2() {
    var date1Input = document.getElementById("date1");
    var date2Input = document.getElementById("date2");

    if (date1Input.value === "") {
      // If Date 1 input is empty, set it to the current date
      var today = new Date();
      var todayFormatted = today.toISOString().slice(0, 10);
      date1Input.value = todayFormatted;
    }

    if (date1Input.value !== "") {
      date2Input.min = date1Input.value;
      date2Input.disabled = false;
    } else {
      date2Input.value = ""; 
      date2Input.disabled = true;
    }
    date1Input.max = date2Input.value !== "" ? date2Input.value : "";
    //Це гарантує, що останньою датою, яку можна вибрати в «Дата 1», 
    //є дата, вибрана в «Дата 2».
  }
  function enableDate1() {
    var date1Input = document.getElementById("date1");
    var date2Input = document.getElementById("date2");
  
    if (date2Input.value !== "") {
      date1Input.max = date2Input.value;
      date1Input.disabled = false; 
    } else {
      date1Input.value = ""; 
      date1Input.disabled = true;
    }
    date2Input.max = date1Input.value !== "" ? date1Input.value : "";
  }
  
function calculateDays(){
    var date1 = new Date(document.getElementById("date1").value);
    var date2 = new Date(document.getElementById("date2").value);

    if(isNaN(date1) || isNaN(date2)){
      var resultElement = document.getElementById("result");
      resultElement.textContent = 'Please, select correct dates';
    }
    else{
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      var resultElement = document.getElementById("result");
      resultElement.textContent = "Time difference: " + days + " days " ;
      updateLocalStorage(date1, date2, days + " days");
      displayResults();
    }  
}
function calculateWeeks(){
    var date1 = new Date(document.getElementById("date1").value);
    var date2 = new Date(document.getElementById("date2").value);

    if(isNaN(date1) || isNaN(date2)){
      var resultElement = document.getElementById("result");
      resultElement.textContent = 'Please, select correct dates';
    }
    else{
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      var resultElement = document.getElementById("result");
      resultElement.textContent = "Time difference: " + Math.floor(days/7) + " weeks " ;    
      updateLocalStorage(date1, date2, Math.floor(days/7) + " weeks");
      displayResults();
    }   
}
function setDateRangeWeek() {
  var date1Input = document.getElementById("date1");
  var date2Input = document.getElementById("date2");

  var today = new Date();
  var nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7); 

  date1Input.value = today.toISOString().slice(0, 10);
  date2Input.value = nextWeek.toISOString().slice(0, 10);

  enableDate2(); 
}
function calculateHours(){
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  if(isNaN(date1) || isNaN(date2)){
    var resultElement = document.getElementById("result");
    resultElement.textContent = 'Please, select correct dates';
  }
  else{
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    var hours = Math.floor(timeDiff / (1000 * 60 *60));
    //знаменник це кількість мілісекунд в годині
    var resultElement = document.getElementById("result");
    resultElement.textContent = "Time difference: " + hours + " hours " ; 
    updateLocalStorage(date1, date2, hours + " hours");
    displayResults();
  }

  
}
function calculateMinutes(){
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  if(isNaN(date1) || isNaN(date2)){
    var resultElement = document.getElementById("result");
    resultElement.textContent = 'Please, select correct dates';
  }
  else{
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var minutes = Math.floor(timeDiff / (1000 * 60));
    var resultElement = document.getElementById("result");
    resultElement.textContent = "Time difference: " + minutes + " minutes " ;   
    updateLocalStorage(date1, date2, minutes + " minutes");
    displayResults(); 
  }
}
function calculateSeconds(){
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  if(isNaN(date1) || isNaN(date2)){
    var resultElement = document.getElementById("result");
    resultElement.textContent = 'Please, select correct dates';
  }
  else{
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var seconds = Math.floor(timeDiff / 1000);
    var resultElement = document.getElementById("result");
    resultElement.textContent = "Time difference: " + seconds + " seconds " ;   
    updateLocalStorage(date1, date2, seconds + " seconds");
    displayResults();
  }
}


function calculateMonths() {
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var months = Math.floor(days/30);

  var resultElement = document.getElementById("result");
  resultElement.textContent = "Time difference: " + months + " months";
  updateLocalStorage(date1, date2, months + " months");
  displayResults();
}
function setDateRangeMonth() {
  var date1Input = document.getElementById("date1");
  var date2Input = document.getElementById("date2");

  var today = new Date();
  var nextMonth = new Date(today);
  nextMonth.setDate(today.getDate() + 30); 

  date1Input.value = today.toISOString().slice(0, 10);
  date2Input.value = nextMonth.toISOString().slice(0, 10);

  enableDate2(); 
}


function isWeekday(date) {
  // Перевірка, чи день тижня є буднім (пн-пт)
  var dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}
function calculateWeekdays() {
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var weekdays = 0;

  for (var i = 0; i <= days; i++) {
    var currentDate = new Date(date1);
    currentDate.setDate(date1.getDate() + i);

    if (isWeekday(currentDate)) {
      weekdays++;
    }
  }
  var resultElement = document.getElementById("result");
  resultElement.textContent = "Time difference: " + weekdays + " weekdays " ;
  updateLocalStorage(date1, date2, weekdays + " weekdays ");
  displayResults();
}
function isWeekend(date) {
  var dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; 
}
function calculateWeekends() {
  var date1 = new Date(document.getElementById("date1").value);
  var date2 = new Date(document.getElementById("date2").value);

  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var weekends = 0;

  for (var i = 0; i <= days; i++) {
    var currentDate = new Date(date1);
    currentDate.setDate(date1.getDate() + i);

    if (isWeekend(currentDate)) {
      weekends++;
    }
  }
  var resultElement = document.getElementById("result");
  resultElement.textContent = "Time difference: " + weekends + " weekends " ;
  updateLocalStorage(date1, date2, weekends + " weekends ");
  displayResults();
  
}
function getHolidays() {
  const holidaysContent = document.getElementById('holidaysContent');
  
  const holidaysHTML = '<ul><li>Holiday 1</li><li>Holiday 2</li></ul>';

  holidaysContent.innerHTML = holidaysHTML;
}
function updateLocalStorage(date1, date2, resultText){
  const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
  savedResults.unshift({ date1: date1.toISOString(), date2: date2.toISOString(), result: resultText });

  localStorage.setItem('savedResults', JSON.stringify(savedResults));
}
function displayResults(){
  const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];//does not have any stored results - it returns null
  const bodyTable = document.getElementById('resultsTableBody');

  bodyTable.innerHTML = '';

  for(let result of savedResults){
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${formatDate(result.date1)}</td>
      <td>${formatDate(result.date2)}</td>
      <td>${result.result}</td>
    `;
    bodyTable.appendChild(newRow);
  }
}
function formatDate(dateString) {
  const options = { year: 'numeric',month: 'short', day: 'numeric'};
  return new Date(dateString).toLocaleDateString('en-US', options);
}
function ClearTable(){
  const bodyTable = document.getElementById('resultsTableBody');
  bodyTable.innerHTML = '';

  localStorage.removeItem('savedResults');
}

const clearTableButton = document.getElementById('clearTableButton');
clearTableButton.addEventListener('click',ClearTable);

document.addEventListener('DOMContentLoaded', function () {
  const defaultTabLink = document.querySelector('.tabLinks[data-tab="dateCalculator"]');
  openTab({ currentTarget: defaultTabLink }, 'dateCalculator'); 
});




function openTab(evt, tabName) {
  
  var tabcontents = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontents.length; i++) {
      tabcontents[i].style.display = "none";
  }

  
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
  }

  var defaultTabLink = document.querySelector('.tabLinks[data-tab="dateCalculator"]');
  if (defaultTabLink) {
    defaultTabLink.classList.add("active");
  }
  document.getElementById(tabName).style.display = "block";
  //evt.currentTarget.classList.add("active");
  const previousTabLink = document.querySelector('.tabLinks.active');
  previousTabLink?.classList.remove('active');
}
