const games = [
    { title: "Mount and Blade warband", tags: ["#Estrategia", "#Aventura #Medieval #Antiguos Pero Queridos"], seasonal: true, image: "MountBladeW.png" },
    { title: "kingdom new lands", tags: ["#Estrategia", "#Aventura #Reinado #Codicia "], seasonal: true, image: "kingdomnewlands.png" },
    // Agrega más juegos según sea necesario
];

document.addEventListener("DOMContentLoaded", function() {
    displaySeasonalGames();
});

function displaySeasonalGames() {
    const seasonalGamesDiv = document.getElementById("seasonalGames");
    seasonalGamesDiv.innerHTML = "";

    const seasonalGames = games.filter(game => game.seasonal);

    seasonalGames.forEach(game => {
        const gameDiv = createGameElement(game);
        seasonalGamesDiv.appendChild(gameDiv);
    });
}

function displayGames(gameArray, container) {
    if (!container) {
        console.error("Container is null. Aborting displayGames.");
        return;
    }

    container.innerHTML = "";

    gameArray.forEach(game => {
        const gameDiv = createGameElement(game);
        container.appendChild(gameDiv);
    });
}

function searchGames() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const searchResultsSection = document.getElementById("busqueda");
    const filteredGames = games.filter(game => {
        const lowercaseTags = game.tags.map(tag => tag.toLowerCase());
        return (
            game.title.toLowerCase().includes(searchTerm) ||
            lowercaseTags.some(tag => tag.includes(searchTerm))
        );
    });

    const searchResultsDiv = document.getElementById("searchResults");

    if (searchResultsSection) {
        searchResultsSection.style.display = filteredGames.length > 0 ? "block" : "none";
    }

    displayGames(filteredGames, searchResultsDiv);
}

function createGameElement(game) {
    const gameDiv = document.createElement("div");
    const gameImage = document.createElement("img");
    const gameLink = document.createElement("a");

    gameImage.src = game.image;
    gameImage.alt = game.title;
    gameImage.width = 60;
    gameImage.height = 60;

    // Genera una URL personalizada utilizando el título del juego
    const gameUrl = `${game.title.replace(/\s+/g, '-').toLowerCase()}.html`;

    gameLink.href = gameUrl;

    gameLink.appendChild(gameImage);
    gameLink.innerHTML += `<p>${game.title}</p>`;

    gameDiv.appendChild(gameLink);
    return gameDiv;
}
