
document.addEventListener("DOMContentLoaded", () => {
    fetch("colorWorld.json")
    .then(response => {
        console.log("Response received:", response);
        return response.json();
    })
    .then(data => {
        console.log("Color data loaded:", data);
        displayColorGroups(data);
    })
    .catch(error => console.error("Error loading color data:", error));
});

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
            colorDiv.innerHTML = `<p>${color.name}</p>`;
            
            // When clicked, change background to selected color
            colorDiv.addEventListener("click", () => {
                document.body.style.backgroundColor = color.hex;
            });

            groupDiv.appendChild(colorDiv);
        });

        container.appendChild(groupDiv);
    }
}