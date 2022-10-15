// the autocomplete function takes two arguments,
// the text field element and an array of possible autocompleted values
let countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
PRESS_DOWN = 40;
PRESS_UP = 38;
PRESS_ENTER = 13;

function autocomplete(user_input) {

    // Element which is currently under focus
    let currentFocus = -1;

    // Execute a function when someone writes in the text field
    user_input.addEventListener("input", function (_) {
        let val = this.value;

        // close any already open lists of autocompleted values
        closeAllLists();
        if (!val) {
            return false;
        }

        currentFocus = -1;

        // create a DIV element that will contain the items (values)
        let drop_list = document.createElement("DIV");
        drop_list.setAttribute("id", this.id + "autocomplete-list");
        drop_list.setAttribute("class", "autocomplete-items");

        // append the DIV element as a child of the autocomplete container
        this.parentNode.appendChild(drop_list);

        // for each item in the array...
        for (let i = 0; i < countries.length; i++) {

            // check if the item starts with the same letters as the text field value
            if (countries[i].substring(0, val.length).toUpperCase() === val.toUpperCase()) {

                // create a DIV element for each matching element
                let match_item = document.createElement("DIV");

                // make the matching letters bold:
                match_item.innerHTML = "<strong>" + countries[i].substring(0, val.length) + "</strong>";
                match_item.innerHTML += countries[i].substring(val.length);

                // insert an input field that will hold the current array item's value
                match_item.innerHTML += "<input type='hidden' value='" + countries[i] + "'>";

                // execute a function when someone clicks on the item value (DIV element)
                match_item.addEventListener("click", function (_) {

                    // insert the value for the autocomplete text field:
                    user_input.value = this.getElementsByTagName("input")[0].value;

                    // close the list of autocompleted values,
                    // (or any other open lists of autocompleted values
                    closeAllLists();
                });
                drop_list.appendChild(match_item);
            }
        }
    });

    // Execute a function presses a key on the keyboard
    // for navigating autocomplete list with keyboard
    user_input.addEventListener("keydown",
        function (e) {
            let activeElement = document.getElementById(this.id + "autocomplete-list");

            if (activeElement) {
                activeElement = activeElement.getElementsByTagName("div");
            }

            if (e.keyCode === PRESS_DOWN) {
                currentFocus++;

                // and  make the current item more visible
                addActive(activeElement);
            }
            else if (e.keyCode === PRESS_UP) { //up
                currentFocus--;

                // and make the current item more visible
                addActive(activeElement);
            }
            else if (e.keyCode === PRESS_ENTER) {

                // If the ENTER key is pressed, prevent the form from being submitted
                e.preventDefault();

                // and simulate a click on the "active" item
                if (currentFocus > -1 && activeElement) {
                    activeElement[currentFocus].click();
                }
            }
        });

    // Function to classify items as "active"
    function addActive(items) {

        if (!items) {
            return false;
        }

        // start by removing the "active" class on all items
        removeActive(items);
        if (currentFocus >= items.length) {
            currentFocus = 0;
        }

        if (currentFocus < 0) {
            currentFocus = (items.length - 1);
        }

        // add class "autocomplete-active"
        items[currentFocus].classList.add("autocomplete-active");
    }

    // Function to remove the "active" class from all autocomplete items
    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("autocomplete-active");
        }
    }

    // Close all autocomplete lists in the document
    // except the one passed as an argument
    function closeAllLists(element) {
        let items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
            if (element !== items[i] && element !== user_input) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }

    // Execute a function when someone clicks in the document
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

