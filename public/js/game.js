console.log("Game script works");

let allCards = document.querySelectorAll(".game-card");
allCards = Array.from(allCards);
const createGameButton = document.querySelector("#create-game-button");
const createGameForm = document.querySelector("#create-game-form");

allCards.forEach( card => {
  card.addEventListener("click", (event) => {
    const card = event.target;
    console.log(card.dataset);
    if(card.dataset.state === "show"){
      card.dataset.state = "hide";
      card.textContent = "";
    }
    else{
      card.dataset.state = "show";
      card.textContent = card.dataset.num;
    }
  });
});

function doLocationFinding(){
  navigator.geolocation.getCurrentPosition( (location) => {
    console.log(location);
    document.querySelector("[ name=latitude ]").value = location.coords.latitude;
    document.querySelector("[ name=longitude ]").value = location.coords.longitude;
  });
}
doLocationFinding();

createGameForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const latitude = document.querySelector("[ name=latitude ]").value;
  const longitude = document.querySelector("[ name=longitude ]").value;

  const response = await fetch("/api/game", {
    method: "POST",
    body: JSON.stringify({
      latitude, longitude
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const result = await response.json();
  console.log(result);

  for(var i = 0; i < allCards.length; i++){
    allCards[i].dataset.num = result["card" + i];
  }
  document.querySelector(".game-box").style.display = "flex";
});
