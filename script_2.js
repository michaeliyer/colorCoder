document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded.");
    console.log("Trying to fetch colorWorld.json...");

    // Attempt to fetch color data
    fetch("colorWorld.json")
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Color data loaded successfully:", data);
            displayColorGroups(data); // Call function to display colors
        })
        .catch(error => console.error("❌ Error loading color data:", error));
});





// Function to display colors from JSON
function displayColorGroups(colors) {
    const container = document.getElementById("color-container");

    for (let colorGroup in colors) {
        let groupDiv = document.createElement("div");
        groupDiv.className = "color-group";

        // Get the first color in the group to set the text color
        let firstColorHex = colors[colorGroup][0].hex;

        // Create a title and apply the matching color
        let title = document.createElement("h2");
        title.textContent = colorGroup;
        title.style.color = firstColorHex; // Make text match the color
        groupDiv.appendChild(title);

        colors[colorGroup].forEach(color => {
            let colorDiv = document.createElement("div");
            colorDiv.className = "sub-color";
            colorDiv.style.backgroundColor = color.hex;
            colorDiv.setAttribute("data-name", color.name);

            // Click event: Show color preview & details
            colorDiv.addEventListener("click", () => {
                document.body.style.backgroundColor = color.hex;
                showColorDetails(color.name, color.hex, colorDiv);
            });

            groupDiv.appendChild(colorDiv);
        });

        container.appendChild(groupDiv);
    }
}



// function displayColorGroups(colors) {
//     const container = document.getElementById("color-container");

//     for (let colorGroup in colors) {
//         let groupDiv = document.createElement("div");
//         groupDiv.className = "color-group";
//         groupDiv.innerHTML = `<h2>${colorGroup}</h2>`;

//         colors[colorGroup].forEach(color => {
//             let colorDiv = document.createElement("div");
//             colorDiv.className = "sub-color"; // Make sure it matches CSS
//             colorDiv.style.backgroundColor = color.hex;
//             colorDiv.setAttribute("data-name", color.name); // Set name for hover effect

//             // Click event: Show color preview & details
//             colorDiv.addEventListener("click", () => {
//                 document.body.style.backgroundColor = color.hex;
//                 showColorDetails(color.name, color.hex, colorDiv); // Pass the clicked element
//             });

//             groupDiv.appendChild(colorDiv);
//         });

//         container.appendChild(groupDiv);
//     }
// }

// Function to show clicked color details inside the box
function showColorDetails(name, hex, colorBox) {
    let details = document.getElementById("color-details");

    if (!details) {
        details = document.createElement("div");
        details.id = "color-details";
        details.classList.add("color-details");
        document.body.appendChild(details);
    }

    // Set the background color of the details box
    details.style.backgroundColor = hex;

    // Adjust text color for contrast
    let textColor = getContrastColor(hex);
    details.classList.remove("dark-text", "light-text");
    details.classList.add(textColor === "#000" ? "dark-text" : "light-text");

    // Position the details box **inside** the selected color box
    let rect = colorBox.getBoundingClientRect();
    details.style.position = "absolute";
    details.style.width = `${rect.width}px`;
    details.style.height = `${rect.height}px`;
    details.style.left = `${rect.left + window.scrollX}px`;
    details.style.top = `${rect.top + window.scrollY}px`;

    details.innerHTML = `
        <strong>${name}</strong>
        <p style="font-size: 0.6rem;">${hex}</p>
        <button onclick="closeColorDetails()" style="background: white; color: black; border: none; padding: 4px 8px; cursor: pointer;">X</button>
    `;

    details.style.opacity = "1";
}

// Function to determine text color based on brightness
function getContrastColor(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000" : "#fff"; // Dark text for light colors, white text for dark colors
}

// Function to close color details
function closeColorDetails() {
    let details = document.getElementById("color-details");
    if (details) {
        details.style.opacity = "0";
        setTimeout(() => details.remove(), 300);
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM fully loaded.");
    
//     fetch("colorWorld.json")
//         .then(response => {
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             return response.json();
//         })
//         .then(data => {
//             displayColorGroups(data);
//         })
//         .catch(error => console.error("❌ Error loading color data:", error));
// });

// function displayColorGroups(colors) {
//     const container = document.getElementById("color-container");

//     for (let colorGroup in colors) {
//         let groupDiv = document.createElement("div");
//         groupDiv.className = "color-group";

//         let title = document.createElement("h2");
//         title.textContent = colorGroup;
//         title.style.color = colors[colorGroup][0].hex;
//         groupDiv.appendChild(title);

//         colors[colorGroup].forEach(color => {
//             let colorDiv = document.createElement("div");
//             colorDiv.className = "sub-color";
//             colorDiv.style.backgroundColor = color.hex;
//             colorDiv.setAttribute("data-name", color.name);

//             colorDiv.addEventListener("click", () => {
//                 document.body.style.backgroundColor = color.hex;
//                 togglePalette(); // Hide palette
//                 showColorDetails(color.name, color.hex);
//             });

//             groupDiv.appendChild(colorDiv);
//         });

//         container.appendChild(groupDiv);
//     }
// }

// // Function to toggle the palette
// function togglePalette() {
//     let container = document.getElementById("color-container");
//     let isMinimized = container.classList.contains("minimized");

//     if (isMinimized) {
//         container.classList.remove("minimized");
//     } else {
//         container.classList.add("minimized");
//     }
// }

// // Function to show clicked color details
// function showColorDetails(name, hex) {
//     let details = document.getElementById("color-details");

//     if (!details) {
//         details = document.createElement("div");
//         details.id = "color-details";
//         details.classList.add("color-details");
//         document.body.appendChild(details);
//     }

//     details.style.backgroundColor = hex;
//     let textColor = getContrastColor(hex);
//     details.classList.remove("dark-text", "light-text");
//     details.classList.add(textColor === "#000" ? "dark-text" : "light-text");

//     details.innerHTML = `
//         <strong>${name}</strong>
//         <p style="font-size: 0.6rem;">${hex}</p>
//         <button onclick="togglePalette()">Restore Palette</button>
//     `;

//     details.style.opacity = "1";
// }

// // Function to determine text contrast
// function getContrastColor(hex) {
//     let r = parseInt(hex.substring(1, 3), 16);
//     let g = parseInt(hex.substring(3, 5), 16);
//     let b = parseInt(hex.substring(5, 7), 16);
//     let brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 128 ? "#000" : "#fff";
// }