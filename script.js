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
        groupDiv.innerHTML = `<h2>${colorGroup}</h2>`;

        colors[colorGroup].forEach(color => {
            let colorDiv = document.createElement("div");
            colorDiv.className = "color-box";
            colorDiv.style.backgroundColor = color.hex;
            colorDiv.setAttribute("data-name", color.name); // Set name for hover effect

            // Click event: Show color preview & details
            colorDiv.addEventListener("click", () => {
                document.body.style.backgroundColor = color.hex;
                showColorDetails(color.name, color.hex);
            });

            groupDiv.appendChild(colorDiv);
        });

        container.appendChild(groupDiv);
    }
}


function showColorDetails(name, hex) {
    let details = document.getElementById("color-details");

    if (!details) {
        details = document.createElement("div");
        details.id = "color-details";
        details.style.position = "fixed";
        details.style.top = "50%";
        details.style.left = "50%";
        details.style.transform = "translate(-50%, -50%)";
        details.style.background = "white";
        details.style.padding = "20px";
        details.style.borderRadius = "10px";
        details.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.3)";
        details.style.textAlign = "center";
        details.style.transition = "opacity 0.3s ease";
        document.body.appendChild(details);
    }

    details.innerHTML = `
        <h2 style="color: ${hex};">${name}</h2>
        <p>HEX Code: <strong>${hex}</strong></p>
        <button onclick="closeColorDetails()">Close</button>
    `;
    details.style.opacity = "1";
}

// Close popup function (removed duplicate)
function closeColorDetails() {
    let details = document.getElementById("color-details");
    if (details) {
        details.style.opacity = "0";
        setTimeout(() => details.remove(), 300);
    }
}