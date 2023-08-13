// GET REFERENCES TO THE INPUT FIELDS AND BUTTONS

// Registration page and spaceholders
const formPage = document.getElementById("formPage");
const spaceholder = document.querySelectorAll(".spaceholder");

// Login card elements
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");
const loginButton = document.querySelector(".card-front .submit-button");

// Registration card elements
const registerEmailInput = document.getElementById("registerEmail");
const registerPasswordInput = document.getElementById("registerPassword");
const registerButton = document.querySelector(".card-back .submit-button");

// Landing Page elements
const landingPage = document.getElementById("landingPage");
const spaceholder2 = document.querySelectorAll(".spaceholder2");
const logoElement = document.getElementById("logo");
const logoutButton = document.getElementById("logoutButton");
const clockElement = document.getElementById("clock");
const loggedInUserEmailElement = document.getElementById("loggedInUserEmail");

// Target price alerts
const targetPriceAlertsDiv = document.getElementById("targetPriceAlertsDiv");
const menu = document.getElementById("menu");
const activeAlertsContainer = document.getElementById("activeAlertsContainer");
const inactiveAlertsContainer = document.getElementById("inactiveAlertsContainer");
const activeAlertsHeading = document.getElementById("activeAlertsHeading");
const inactiveAlertsHeading = document.getElementById("inactiveAlertsHeading");
let isMenuOpen = false;

// Popup price alert creator
const popupContainer = document.getElementById("popupPriceAlertCreator");
const overlay = document.querySelector(".overlay");

// ALL IDS WITH "bid" OR "ask", the targets are live forex prices
const liveForexPrices = document.querySelectorAll("[id*='bid'], [id*='ask']");

const eurusdBidElement = document.getElementById("eurusdbid");
const bidAskSelectElement = document.getElementById("typeSelect");
const forexSelectElement = document.getElementById("forexSelect");
const priceInputElement = document.getElementById("priceInput");
const createAlert = document.getElementById("createAlert");
const discardAlert = document.getElementById("discardAlert");

// Notification bar
const notificationDiv = document.getElementById("notificationDiv");
const notificationBell = document.querySelector(".fa-bell");
const notificationText = document.getElementById("notificationText");

// Card flipping arrow
const arrow = document.getElementById("arrow");
const card = document.querySelector(".card");



// ACTIVE AND INACTIVE PRICE ALERTS
let activePriceAlerts = [];

let inactivePriceAlerts = [];



// DROPDOWN FUNCTION
const dropdown = (cursorPosition) => {

    // Find the parent ".alertBox" of the clicked icon
    const alertBox = cursorPosition.closest(".alertBox");

    // Toggle the "expanded" class for the parent ".alertBox"
    alertBox.classList.toggle("expanded");
};

// ACCQUIRE LOGGED IN USER EMAIL
const getLoggedInUserEmail = () => {

    // Get the innerHTML of the element
    const innerHTML = loggedInUserEmailElement.innerHTML;

    // Use regular expressions to extract the email
    const emailRegex = /<strong>(.*?)<\/strong>/;
    const match = innerHTML.match(emailRegex);

    // Check if a match is found
    if (match && match.length >= 2) {

        const email = match[1];
        return email;

    } else {

        console.log("Email not found");

    }

}

// GENERATE UNIQUE ID FOR EACH USER
const generateUniqueID = () => {

    // Generate a random 6-digit number
    const randomPart = Math.floor(100000 + Math.random() * 900000);

    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime();

    // Combine the random number and timestamp to create a 9-digit ID
    const uniqueID = randomPart.toString() + timestamp.toString().slice(-3);

    return uniqueID;

}

// RETRIEVE USERS FROM LOCAL STORAGE
const getUsersFromStorage = () => {

    // Retrieve the user data from local storage
    const userData = localStorage.getItem("users");

    // Parse the JSON data and return the users array
    const users = userData ? JSON.parse(userData) : [];

    return users;

}

// SAVE USERS TO LOCAL STORAGE
const saveUsersToStorage = (users) => {

    // Convert the users array to JSON and save it to local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Log the updated users
    console.log("Updated Users:", users);

}

// CHANGE THE COLOR OF THE ELEMENT TO GREEN OR RED
const changeColors = (element, success, time = 3000) => {

    // Assign a boolean value of 'true' if the dashboard page is hidden, or 'false' if it is not
    const isHidden = landingPage.classList.contains("hidden");

    if (element.id === "notificationDiv") {

        if (success) {

            // Green
            element.style.backgroundColor = "#60aa3c";

            setTimeout(() => {
                isHidden ? element.style.backgroundColor = "#bebebe" : element.style.backgroundColor = "#353535"
            }, time);

            return;

        } else {

            // Red
            element.style.backgroundColor = "#c00";

            setTimeout(() => {
                isHidden ? element.style.backgroundColor = "#bebebe" : element.style.backgroundColor = "#353535"
            }, time);

            return;

        }

    }

    // Element background color goes green
    if (success) {
        element.style.backgroundColor = "#60aa3c";
        setTimeout(() => {
            element.style.backgroundColor = "";
        }, time);

        // Element background color goes red
    } else {
        element.style.border = "2.5px solid #c00";
        element.style.backgroundColor = "#ffdddd";
        setTimeout(() => {
            element.style.border = "";
            element.style.backgroundColor = "";
        }, time);
    }
}

// RETRIEVE PRICE ALERTS FROM LOCAL STORAGE
const getPriceAlerts = (key) => {

    const priceAlertsJSON = localStorage.getItem(key);
    return priceAlertsJSON ? JSON.parse(priceAlertsJSON) : [];

}

// SAVE PRICE ALERTS TO LOCAL STORAGE
const savePriceAlerts = () => {

    console.log("Saving price alerts...")
    // Convert the merged arrays to JSON strings
    const activePriceAlertsJSON = JSON.stringify(activePriceAlerts);
    const inactivePriceAlertsJSON = JSON.stringify(inactivePriceAlerts);

    // Save the merged arrays back to local storage
    localStorage.setItem("activePriceAlerts", activePriceAlertsJSON);
    localStorage.setItem("inactivePriceAlerts", inactivePriceAlertsJSON);

}

// CLEAR PRICE ALERTS
const clearElementContents = (element) => {

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

}

// NOTIFICATION
const notificationQueue = [];
let isNotificationShowing = false;

// Show a notification with a message, success status, and optional display time
const showNotification = (message, success, time = 3000) => {

    // Push the notification data to the queue
    notificationQueue.push({ message, success, time });

    // If no notification is currently showing, display the next one
    if (!isNotificationShowing) {
        showNextNotification();
    }

};

// Function to show the next notification in the queue
const showNextNotification = () => {

    // If there are notifications in the queue
    if (notificationQueue.length > 0) {

        // Get the details of the next notification
        const { message, success, time } = notificationQueue.shift();

        // Set the notification text and style
        notificationText.textContent = message;
        changeColors(notificationDiv, success, time);
        addRemoveClass(notificationDiv, "show", true);
        addRemoveClass(notificationBell, "fa-beat-fade", true);

        // Mark a notification as currently showing
        isNotificationShowing = true;

        // Set a timeout to hide the notification and show the next one
        setTimeout(() => {

            // Hide the notification
            addRemoveClass(notificationDiv, "show", false);
            addRemoveClass(notificationBell, "fa-beat-fade", false);

            // Clear the notification text
            notificationText.textContent = "";

            // Mark that no notification is currently showing
            isNotificationShowing = false;

            // Show the next notification in the queue
            showNextNotification();

        }, time);

    }

};

// REGISTRATION
const register = (event) => {

    event.preventDefault();

    // Get the input values
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    // Get existing user data from local storage
    const users = getUsersFromStorage();

    console.log("Checking information...");
    // Check if the email already exists
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {

        // Display an error message if the email is already registered
        changeColors(registerEmailInput, false);
        showNotification("Email already registered!", false);
        console.log("Email already registered!");
        return;

    }

    // Validate that the fields are not empty
    if (!email || !password) {

        // Set border and background color to red for invalid email
        !email
            ? (changeColors(registerEmailInput, false), console.log("Missing email"))
            : null;

        // Set border and background color to red for invalid password
        !password
            ? (changeColors(registerPasswordInput, false),
                console.log("Missing password"))
            : null;

        console.log("Registartion failed");

        return;

    }

    if (email.includes("@")) {

        // Email contains the "@" symbol
        console.log("Email is valid");

    } else {

        // Email does not contain the "@" symbol
        changeColors(registerEmailInput, false);
        showNotification('Must include "@"', false);
        console.log("Invalid email");
        return;

    }

    console.log("User created...");
    // Create the new user object
    const newUser = {
        id: generateUniqueID(),
        email: email,
        password: password,

    };

    console.log(newUser.id); // Output: A unique 9-digit ID

    // Add the new user to the array
    users.push(newUser);

    // Save the updated user data to local storage
    saveUsersToStorage(users);

    // Display success
    changeColors(registerButton, true);
    showNotification("Registration successful!", true);
    console.log("Registration successful!");
    registerEmailInput.value = "";
    registerPasswordInput.value = "";
    card.classList.toggle("card-flipped");

}

// REMOVES & ADDS A CLASS TO A ELEMENT
const addRemoveClass = (element, className, add) => {

    if (add) {

        element.classList.add(className);

    } else {

        element.classList.remove(className);

    }

};

// LOGOUT
const logout = () => {

    // Show the login form
    console.log("Displaying login page...");
    spaceholder.forEach((spaceholder) => {
        addRemoveClass(spaceholder, "hidden", false);
    });
    addRemoveClass(formPage, "hidden", false);

    // Hide the landing page
    console.log("Hiding dashboard...");
    addRemoveClass(landingPage, "hidden", true);
    spaceholder2.forEach((spaceholder2) => {
        addRemoveClass(spaceholder2, "hidden", true);
    });

    console.log("SUCCESSFULLY LOGGED OUT");
    showNotification("Successfully logged out", true);

}

// CLOCK
const updateClock = () => {

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const timeString = `<span class="time-element">${hours}</span><span class="time-element">${minutes}</span><span class="time-element">${seconds}</span>`;
    clockElement.innerHTML = timeString;

}
// Update clock every second
setInterval(updateClock, 1000);

// CHANGES LOGO & NOTIFICATIONDIV ACCORDINGLY TO SCREEN'S WIDTH
const updateLogoAndNotification = () => {

    //Logo
    const windowWidth = window.innerWidth;
    const logoContent = windowWidth <= 768 ? "PW" : "PRICEWATCH";
    logoElement.textContent = logoContent;

    // Notification
    if (window.innerWidth <= 500) {

        notificationDiv.style.bottom = "14%";
        notificationDiv.style.top = "auto"; // Reset the top property

    } else {

        notificationDiv.style.top = "12.4%";
        notificationDiv.style.bottom = "auto"; // Reset the bottom property

    }

    console.log("Windows resized: adjusting logo & notification bar");

}

// MENU TOGGLE
const toggleMenu = () => {

    if (isMenuOpen) {

        // If the menu is open, close it
        targetPriceAlertsDiv.style.left = "-320px";
        menu.style.left = "-3px";
        menu.style.transform = "scale(1)";
        menu.style.backgroundColor = "#353535";

    } else {

        // If the menu is closed, open it
        targetPriceAlertsDiv.style.left = "0";
        menu.style.left = "131px";
        menu.style.transform = "scale(0.7)";
        menu.style.backgroundColor = "#121212";

    }

    // Toggle the state
    isMenuOpen = !isMenuOpen;

}

// DIV CREATOR WITH ATTRIBUTES
const createElementWithAttributes = (elementName, attributes = {}) => {

    const element = document.createElement(elementName);

    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });

    return element;

}

// BUILDS PRICE ALERTS
const buildPriceAlertDisplay = (priceAlert, forWhat = "standard") => {

    const { alertID, type, pair, targetPrice } = priceAlert;

    // AlertBox div generation
    const alertBox = createElementWithAttributes("div", { class: "alertBox", id: alertID });

    // Dropdown content div generation
    const dropdownContainer = createElementWithAttributes("div", { class: "dropdown" });

    // Alert heading div generation
    const shortenedAlert = createElementWithAttributes("div", {
        class: "shortenedAlert",
    });

    // Alert heading generation
    const h6 = document.createElement("h6");
    if (forWhat === "newAlert") {

        // Generation for a new alert heading
        h6.textContent = "EDIT ALERT"

        // Add class expanded for open dropdown
        addRemoveClass(alertBox, "expanded", true);

    } else {

        // Standard generation of alert heading for display
        h6.textContent = `${type} ${pair} ${targetPrice}`;

    }

    // Gear icon generation
    const dropdownIcon = createElementWithAttributes("i", {
        class: "fa-solid fa-gears",
        onclick: "dropdown(this)",
    });

    // "BID" and "ASK" select elements generation
    const bidAskSelect = document.createElement("select");
    bidAskSelect.innerHTML = `
      <option value="BID" ${type === 'BID' ? 'selected' : ''}>BID</option>
      <option value="ASK" ${type === 'ASK' ? 'selected' : ''}>ASK</option>
    `;
    bidAskSelect.addEventListener("change", (event) => handleSelectChange(event, false));

    // Forex select element generation
    const forexSelect = document.createElement("select");
    const currencyPairs = ["EURUSD", "DE40", "XAUUSD", "GBPUSD", "USDJPY", "AUDUSD"];
    forexSelect.innerHTML = currencyPairs
        .map(currencyPair => `<option value="${currencyPair}" ${pair === currencyPair ? 'selected' : ''}>${currencyPair}</option>`)
        .join('');
    forexSelect.addEventListener("change", (event) => handleSelectChange(event, false));


    // Price input element generation
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.step = "0.0001";
    priceInput.value = targetPrice;

    // Trash can and save icon generation
    const actionBox = document.createElement("div");
    const discardIcon = createElementWithAttributes("i", {
        class: "fa-solid fa-trash-can saveAction",
        onclick: "removeAlert(this)",
        style: "margin: 5px",
    });

    const saveIcon = createElementWithAttributes("i", {
        class: "fa-solid fa-circle-check saveAction",
        onclick: "saveAlert(this)",
        style: "margin: 5px",
    });

    // Alert display generation
    dropdownContainer.appendChild(bidAskSelect);
    dropdownContainer.appendChild(forexSelect);
    dropdownContainer.appendChild(priceInput);
    actionBox.appendChild(discardIcon);
    actionBox.appendChild(saveIcon);
    dropdownContainer.appendChild(actionBox);
    shortenedAlert.appendChild(h6);
    shortenedAlert.appendChild(dropdownIcon);
    alertBox.appendChild(shortenedAlert);
    alertBox.appendChild(dropdownContainer)

    return alertBox;

}

// DISPLAY ALERTS
const updatePriceAlertsDisplay = (userID) => {

    console.log("Clearing previous content...");
    // Clear the contents of the HTML active and inactive containers
    clearElementContents(activeAlertsContainer);
    clearElementContents(inactiveAlertsContainer);

    console.log("Updating price alerts...")
    // Retrieve active and inactive price alerts for the user from the arrays
    const userActivePriceAlerts = activePriceAlerts.filter(
        (priceAlert) => priceAlert.userID === userID
    );

    const userInactivePriceAlerts = inactivePriceAlerts.filter(
        (priceAlert) => priceAlert.userID === userID
    );

    // Loop through active price alerts and display them
    userActivePriceAlerts.forEach((priceAlert) => {
        const alertBox = buildPriceAlertDisplay(priceAlert);
        activeAlertsContainer.appendChild(alertBox);
    });

    // Loop through inactive price alerts and display them
    userInactivePriceAlerts.forEach((priceAlert) => {
        const alertBox = buildPriceAlertDisplay(priceAlert);
        inactiveAlertsContainer.appendChild(alertBox);
    });

    // Update the number of alerts displayed in the headings
    activeAlertsHeading.textContent = `Active alerts (${userActivePriceAlerts.length})`;
    inactiveAlertsHeading.textContent = `Inactive alerts (${userInactivePriceAlerts.length})`;

};

// CHANGES PRICE WHEN TYPE OR FOREX IS CHANGED
const handleSelectChange = (event, fromPopup) => {

    if (fromPopup) {

        // HANDLE CHANGES FROM #popupPriceAlertCreator

        // Construct the key (with typeof string) from forex value & type value
        const key = `${forexSelectElement.value.toLowerCase()}${bidAskSelectElement.value.toLowerCase()}`;

        // Find the corresponding td element in liveForexPrices based on the key
        const currentValue = parseFloat(Object.values(liveForexPrices).find((element) => element.id === key).textContent);

        // Assign the current value
        priceInput.value = currentValue;

    } else {

        // HANDLE CHANGES FROM #targetPriceAlertsDiv

        // Find the corresponding alertBox
        const alertBox = event.target.closest(".alertBox");

        // Construct the key (with typeof string) from forex value & type value
        const key = `${alertBox.querySelector("select:nth-child(2)").value.toLowerCase()}${alertBox.querySelector("select:first-child").value.toLowerCase()}`;

        // Find the corresponding td element in liveForexPrices based on the key
        const currentValue = parseFloat(Object.values(liveForexPrices).find((element) => element.id === key).textContent);

        // Assign the current value
        alertBox.querySelector("input[type='number']").value = currentValue;

    }

};

// SEND EMAIL FOR THE CORRECT USER
const sendEmail = async (targetEmail, subject, text) => {

    try {

        const response = await fetch('http://localhost:5501/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetEmail, subject, text }),
        });

        if (response.ok) {

            console.log('EMAIL SENT SUCCESSFULLY');

        } else {

            console.error('FAILED TO SEND EMAIL');

        }
    } catch (error) {

        console.error('Error:', error);

    }

};

// CHECK IF TARGET PRICE IS REACHED FOR ANY OF THE ALERTS
const checkTargetPrice = () => {

    const email = getLoggedInUserEmail();
    const users = getUsersFromStorage();

    const user = users.find((user) => user.email === email);

    liveForexPrices.forEach((priceElement) => {

        // For comparison adjust the element types

        // Extract currency pair
        const currencyPair = priceElement.id.replace("bid", "").replace("ask", "").toUpperCase();

        // Extract "BID" or "ASK"
        const bidAsk = priceElement.id.includes("bid") ? "BID" : "ASK";

        // Extract the live price
        const livePrice = parseFloat(priceElement.textContent);

        // Loop through active price alerts
        for (let i = 0; i < activePriceAlerts.length; i++) {
            const alert = activePriceAlerts[i];

            // Comparison of the values
            if (

                // Check for the same currnecy pair
                alert.pair === currencyPair &&

                // Check for the same "BID" and "ASK" type & compare the prices
                alert.type === bidAsk && ((bidAsk === "BID" && alert.targetPrice >= livePrice) || (bidAsk === "ASK" && alert.targetPrice <= livePrice))

            ) {

                // Target price reached, move alert to inactivePriceAlerts
                inactivePriceAlerts.push(alert);
                activePriceAlerts.splice(i, 1);

                // Decrement the index since we removed an item
                i--;

                // Find the user with the matching user ID
                const targetUser = users.find((user) => user.id === alert.userID);

                // Find user with the price alert
                const targetEmail = targetUser.email;

                // Extract users name
                const targetFirstName = targetEmail.split('@')[0];

                // Capitalize the first character
                const capitalizedFirstName = targetFirstName.charAt(0).toUpperCase() + targetFirstName.slice(1);

                console.log('Target Email:', targetEmail);

                const subject = `${alert.type} ${alert.pair} ${alert.targetPrice} reached!`;

                const text = `

                <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; margin: 0;">
                Hello <strong>${capitalizedFirstName}</strong>,
            </p>
            
            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; margin: 10px 0;">
                We're excited to inform you that the target price you set for the currency pair <strong>${alert.pair}</strong> has been reached!
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; margin: 10px 0;">
                Here are the details of the price alert:
            </p>
            <ul style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; margin: 10px 0; padding-left: 20px;">
                <li>Currency Pair: <strong>${alert.pair}</strong></li>
                <li>Price Type: <strong>${alert.type}</strong></li>
                <li>Target Price: <strong>${alert.targetPrice}</strong></li>
            </ul>
            <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.6; margin: 10px 0;">
                Price Alert System by <strong>Karl Kaarel Taniel Seppel</strong>
            </p>
                
            `;

                console.log(alert.type + " " + alert.pair + " " + alert.targetPrice + " has reached the target price!")

                // Display notification when logged in user has same email as price alert's user
                if (email === targetEmail) {
                    showNotification(alert.type + " " + alert.pair + " " + alert.targetPrice + " has reached the target price!", true, 6000)
                }

                // Send email using the sendEmail function
                sendEmail(targetEmail, subject, text);

                // Save & update the display
                savePriceAlerts();
                updatePriceAlertsDisplay(user.id);

            }

        }

    });

};
// Periodically check the target price every 1 second
setInterval(checkTargetPrice, 1000);

// CHECK ALERT'S PARENT CONTAINER
const isAlertInActiveContainer = (alertBox) => {

    return alertBox.parentNode === activeAlertsContainer ? true : false;

};

// ADD DEFAULT ALERT FOR AN EDIT
const addAlert = () => {

    console.log("Creating an alert for edit...")
    const email = getLoggedInUserEmail();
    const users = getUsersFromStorage();

    // Find the user with the matching email
    const user = users.find((user) => user.email === email);
    const eurusdValue = parseFloat(eurusdBidElement.textContent);

    const priceAlert = {
        alertID: generateUniqueID(),
        userID: user.id,
        type: "BID",
        pair: "EURUSD",
        targetPrice: eurusdValue
    }

    const alertBox = buildPriceAlertDisplay(priceAlert, forWhat = "newAlert")
    activeAlertsContainer.appendChild(alertBox);

}

// UPDATE ALERT IN HTML AND LOCALSTORAGE
const saveAlert = (checkIcon) => {

    console.log("Saving alert...");
    const alertBox = checkIcon.closest(".alertBox");
    const alertID = alertBox.id;
    const email = getLoggedInUserEmail();
    const users = getUsersFromStorage();
    const user = users.find((user) => user.email === email);
    const type = alertBox.querySelector("select:first-child").value;
    const pair = alertBox.querySelector("select:nth-child(2)").value;
    const targetPrice = parseFloat(alertBox.querySelector("input").value);

    // Access the h6 element
    const h6 = alertBox.querySelector("h6");

    if (h6.textContent === "EDIT ALERT") {

        // Update the h6 content with new values
        h6.textContent = `${type} ${pair} ${targetPrice}`;

    }

    // Determine the container based on isAlertInActiveContainer function
    const priceAlertsContainer = isAlertInActiveContainer(alertBox) ? activePriceAlerts : inactivePriceAlerts;

    const priceAlert = {
        alertID: alertID,
        userID: user.id,
        type: type,
        pair: pair,
        targetPrice: targetPrice
    };

    // Check if an alert with the same ID exists in the container
    const existingAlertIndex = priceAlertsContainer.findIndex((alert) => alert.alertID === alertID);

    if (existingAlertIndex !== -1) {
        // Update the existing alert in the container
        priceAlertsContainer[existingAlertIndex] = priceAlert;

        if (priceAlertsContainer === inactivePriceAlerts) {

            // If the alert was in inactivePriceAlerts, remove it from there
            inactivePriceAlerts.splice(existingAlertIndex, 1);

            // Add the updated alert to activePriceAlerts
            activePriceAlerts.push(priceAlert);

        }

    }

    else {

        // Otherwise, add the new alert to the container
        activePriceAlerts.push(priceAlert);

    }

    // Save the updated price alerts to local storage
    savePriceAlerts();

    // Update the alerts display
    updatePriceAlertsDisplay(user.id);

};

// REMOVE ALERT FROM HTML AND LOCALSTORAGE
const removeAlert = (trashCanIcon) => {

    console.log("Removing alert...");
    const alertBox = trashCanIcon.closest(".alertBox");
    const alertID = alertBox.id;
    const email = getLoggedInUserEmail();
    const users = getUsersFromStorage();
    const user = users.find((user) => user.email === email);

    // Determine the container based on isAlertInActiveContainer function
    const priceAlertsContainer = isAlertInActiveContainer(alertBox) ? activePriceAlerts : inactivePriceAlerts;

    for (let i = 0; i < priceAlertsContainer.length; i++) {

        if (priceAlertsContainer[i].alertID === alertID) {

            priceAlertsContainer.splice(i, 1);
            i--;

        }

    }

    // Check if the text in the h6 element is "EDIT ALERT"
    const h6Text = alertBox.querySelector(".shortenedAlert h6").textContent;
    if (h6Text === "EDIT ALERT") {

        alertBox.remove();
        return;

    }

    // Save the updated price alerts to local storage
    savePriceAlerts();

    // Update the alerts display
    updatePriceAlertsDisplay(user.id);

    // Remove the alertBox element from the HTML
    alertBox.remove();

};

// LOGIN
const login = (event) => {

    event.preventDefault();

    // Get the input values
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // Get existing user data from local storage
    const users = getUsersFromStorage();

    console.log("Checking information...");
    // Find the user with the matching email and password
    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    // Check if the user was found
    if (user) {

        // Display success
        changeColors(loginButton, true);
        console.log("LOGIN SUCCESSFUL");
        console.log("Resetting field values...");

        // Reset values
        loginEmailInput.value = "";
        loginPasswordInput.value = "";

        console.log("Retrieving user's alerts...");
        activePriceAlerts = getPriceAlerts("activePriceAlerts");
        inactivePriceAlerts = getPriceAlerts("inactivePriceAlerts");
        updatePriceAlertsDisplay(user.id)

        console.log("Displaying dashboard...");

        // Make landing page visible
        landingPage.classList.remove("hidden");
        addRemoveClass(landingPage, "hidden", false);
        spaceholder2.forEach((spaceholder2) => {
            addRemoveClass(spaceholder2, "hidden", false);
        });

        console.log("Hiding login page...");

        // Hide login page
        addRemoveClass(formPage, "hidden", true);
        spaceholder.forEach((spaceholder) => {
            addRemoveClass(spaceholder, "hidden", true);
        });

        // Shows, which user is logged in
        document.getElementById("loggedInUserEmail").innerHTML =
            "Logged in as <strong>" + email + "</strong>";
        showNotification("Login successful", true);

        // Display an error
    } else {

        // Email field empty or such email not registered
        if (!email || !users.some((user) => user.email === email)) {

            changeColors(loginEmailInput, false);
            showNotification("Invalid email", false);
            console.log("Invalid email");
            console.log("LOGIN FAILED");
            return;

        }

        if (!password || !users.some((user) => user.password === password)) {

            changeColors(loginPasswordInput, false);
            console.log("Invalid password");
            console.log("LOGIN FAILED");

        }

    }

}

// POPUP PRICE ALERT CREATOR

let priceAlert;

const priceAlertCreator = (event) => {

    console.log("Popup opened...");

    const email = getLoggedInUserEmail();
    const users = getUsersFromStorage();

    // Find the user with the matching email
    const user = users.find((user) => user.email === email);

    // Get elements id
    const elementId = event.target.id;

    // Extract the bid/ask information from the element's id
    const bidAskSelect = elementId.slice(-3).toUpperCase();
    bidAskSelectElement.value = bidAskSelect;

    // Extract the currency pair from the element's id
    const forexSelect = elementId.slice(0, -3).toUpperCase();
    forexSelectElement.value = forexSelect;

    // Assign the default value
    const priceInput = parseFloat(event.target.textContent);
    priceInputElement.value = priceInput;

    priceAlert = {
        alertID: generateUniqueID(),
        userID: user.id,
        type: bidAskSelect,
        pair: forexSelect,
        targetPrice: priceInput
    }

    // Transition for popup
    setTimeout(() => {
        popupContainer.classList.add("show");
        overlay.classList.add("show");
    }, 10);

}

// CLOSE THE POPUP
const closePriceAlertCreator = () => {

    popupContainer.classList.remove("show");
    overlay.classList.remove("show");
    console.log("Popup closed...");

};

// DISCARD THE ALERT
discardAlert.addEventListener("click", () => {

    console.log("Alert creation cancelled");
    closePriceAlertCreator();

});

// Create and push it
createAlert.addEventListener("click", () => {

    priceAlert.type = bidAskSelectElement.value
    priceAlert.pair = forexSelectElement.value
    priceAlert.targetPrice = priceInputElement.value

    const email = getLoggedInUserEmail();
    const users = getUsersFromStorage();

    // Find the user with the matching email
    const user = users.find((user) => user.email === email);

    if (user) {

        //Notification that alert has been created
        showNotification("Alert created", true, 3000);
        // The user was found, and you can access the user's ID
        console.log("Updating user's: " + user.email + " price alerts");

        // Add the price alert to the activePriceAlerts array
        activePriceAlerts.push(priceAlert);
        savePriceAlerts();

        // Update the alerts
        updatePriceAlertsDisplay(priceAlert.userID);

        console.log("Alert created: " + priceAlert.alertID + " " + priceAlert.type + " " + priceAlert.pair + " " + priceAlert.targetPrice);

    } else {

        // The user with the provided email was not found
        showNotification("ERROR: User not found", false);
        console.log("ERROR:User not found");
        closePriceAlertCreator();
        return;

    }

    closePriceAlertCreator();

});

// CLOSE THE POPUP WHEN CLICKING OUTSIDE OF IT
document.addEventListener("click", (event) => {

    if (popupContainer.classList.contains("show")) {

        if (!popupContainer.contains(event.target) && event.target !== popupContainer) {

            closePriceAlertCreator();

        }

    }

});




// ADD EVENT LISTENERS TO THE BUTTONS


// SELECT OPTIONS
bidAskSelectElement.addEventListener("change", (event) => handleSelectChange(event, true));
forexSelectElement.addEventListener("change", (event) => handleSelectChange(event, true));

// CARD FLIPPER
arrow.addEventListener("click", () => {

    card.classList.toggle("card-flipped");

});

window.addEventListener("DOMContentLoaded", updateLogoAndNotification);
window.addEventListener("resize", updateLogoAndNotification);

// QUICK ADD PRICE ALERT
liveForexPrices.forEach((element) => {

    element.addEventListener("click", priceAlertCreator);

});

// LOGIN AND REGISTER BUTTONS
logoutButton.addEventListener("click", logout);
registerButton.addEventListener("click", register);
loginButton.addEventListener("click", login);
