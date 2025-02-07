
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded.");
    
    fetch("colorWorldNew.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            displayColorGroups(data);
        })
        .catch(error => console.error("❌ Error loading color data:", error));
});

function displayColorGroups(colors) {
    const container = document.getElementById("color-container");

    for (let colorGroup in colors) {
        let groupDiv = document.createElement("div");
        groupDiv.className = "color-group";

        let title = document.createElement("h2");
        title.textContent = colorGroup;
        title.style.color = colors[colorGroup][0].hex;
        groupDiv.appendChild(title);

        colors[colorGroup].forEach(color => {
            let colorDiv = document.createElement("div");
            colorDiv.className = "sub-color";
            colorDiv.style.backgroundColor = color.hex;
            colorDiv.setAttribute("data-name", color.name);

            colorDiv.addEventListener("click", () => {
                document.body.style.backgroundColor = color.hex;
                togglePalette(); // Hide palette
                showColorDetails(color.name, color.hex);
            });

            groupDiv.appendChild(colorDiv);
        });

        container.appendChild(groupDiv);
    }
}

// Function to toggle the palette
function togglePalette() {
    let container = document.getElementById("color-container");
    let isMinimized = container.classList.contains("minimized");

    if (isMinimized) {
        container.classList.remove("minimized");
    } else {
        container.classList.add("minimized");
    }
}

// Function to show clicked color details
function showColorDetails(name, hex) {
    let details = document.getElementById("color-details");

    if (!details) {
        details = document.createElement("div");
        details.id = "color-details";
        details.classList.add("color-details");
        document.body.appendChild(details);
    }

    details.style.backgroundColor = hex;
    let textColor = getContrastColor(hex);
    details.classList.remove("dark-text", "light-text");
    details.classList.add(textColor === "#000" ? "dark-text" : "light-text");

    details.innerHTML = `
        <strong>${name}</strong>
        <p style="font-size: 0.6rem;">${hex}</p>
        <button onclick="togglePalette()">Restore Palette</button>
    `;

    details.style.opacity = "1";
}

// Function to determine text contrast
function getContrastColor(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000" : "#fff";
}