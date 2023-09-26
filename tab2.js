

const apiKey = '45P4U8IDKlh799KsZ4ZRQvxLB2HhhqV9';

const countryDropdown = document.querySelector("#countryDropdown");
const yearDropdown = document.querySelector("#yearDropdown");

async function fetchHolidays(countryCode, selectedYear) {
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${countryCode}&year=${selectedYear}`);
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  
  const currentYear = new Date().getFullYear();
  yearDropdown.innerHTML = `<option value="${currentYear}" selected>${currentYear}</option>`;
  yearDropdown.disabled = true;

  const response = await fetch(`https://calendarific.com/api/v2/countries?api_key=${apiKey}`);
  const data = await response.json();

  if (!data || !data.response || !data.response.countries) {
    console.error("Data is undefined or does not contain countries");
    return;
  }

  const countries = data.response.countries;
  countryDropdown.innerHTML = `<option value="" selected></option>`; 
  countryDropdown.innerHTML = countries.map(country => `<option value="${country['iso-3166']}">${country.country_name}</option>`).join("");

  
  countryDropdown.addEventListener("change", (e) => {
    const selectedCountryId = e.target.value;
    console.log("Selected country:", selectedCountryId);
    
    if (selectedCountryId) {
      yearDropdown.disabled = false;
    } else {
      yearDropdown.disabled = true;
      yearDropdown.innerHTML = '';
    }
  });


const years = Array.from({ length: 2049 - 2000 }, (_, index) => 2001 + index);
yearDropdown.innerHTML += years.map(year => `<option value="${year}">${year}</option>`).join("");

document.addEventListener("submit", async(e) => {
  e.preventDefault();
  console.log("Form submitted");
  const selectedCountryId = countryDropdown.value;
  const selectedYear = yearDropdown.value;

  debugger
  
  if (selectedCountryId && selectedYear) {

    const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${selectedCountryId}&year=${selectedYear}`;

    try {
      const response = await fetch(apiUrl);
      console.log("Response Status:", response.status);

      if (response.ok) {
        const holidaysData = await response.json();
        console.log("API Response:", holidaysData);
        displayHolidays(holidaysData);
      } else {
        displayError("Error fetching data from the API.");
      }
    } catch (error) {
      displayError("An error occurred.");
    }
  } 
  else {
    displayError("Please select both a country and a year.");
  }
});
// function displayHolidays(data) {
//   const holidayResult = document.getElementById("holidayResult");
  
//   holidayResult.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
// }

function displayHolidays(data) {
  const holidayResult = document.getElementById("holidayResult");
  const holidays = data.response.holidays;

  if (holidays && holidays.length > 0) {
    
    const table = document.createElement("table");

    
    const headerRow = document.createElement("tr");
    const dateHeader = document.createElement("th");
    dateHeader.textContent = "Date";
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Holiday";

    
    const sortButton = document.createElement("span");
    sortButton.className = "sort-button";
    sortButton.textContent = "▼";
    sortButton.addEventListener("click", sortTable);
    dateHeader.appendChild(sortButton);

    headerRow.appendChild(dateHeader);
    headerRow.appendChild(nameHeader);
    table.appendChild(headerRow);

    
    holidays.forEach((holiday) => {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      dateCell.textContent = holiday.date.iso;
      const nameCell = document.createElement("td");
      nameCell.textContent = holiday.name;
      row.appendChild(dateCell);
      row.appendChild(nameCell);
      table.appendChild(row);
    });
   
    holidayResult.innerHTML = "";
    holidayResult.appendChild(table);

    
    let ascending = true;

    function sortTable() {
      const rows = Array.from(table.querySelectorAll("tr:not(:first-child)"));

      rows.sort((a, b) => {
        const dateA = new Date(a.cells[0].textContent);
        const dateB = new Date(b.cells[0].textContent);

        return ascending ? dateA - dateB : dateB - dateA;
      });

      
      sortButton.textContent = ascending ? "▲" : "▼";

      
      rows.forEach((row) => table.appendChild(row));

      
      ascending = !ascending;
    }
  } else {
    displayError("No holidays found for the selected criteria.");
  }
}

function displayError(errorMessage) {
  const holidayResult = document.getElementById("holidayResult");
  holidayResult.innerHTML = errorMessage;
}
})

