const clubs = [
  { name: "AEK Athens", image: "./jerseys/aek-athens-2026-27-home-kit.jpg" },
  { name: "Arsenal", image: "./jerseys/arsenal-fc-2026-27-home-kit.jpg" },
  { name: "Aston Villa", image: "./jerseys/aston-villa-2026-27-home-kit.jpg" },
  { name: "Atlanta", image: "./jerseys/atlanta-cf-2026-27-home-kit.jpg" },
  { name: "Atlético Madrid", image: "./jerseys/atletico-madrid-2026-27-home-kit.jpg" },
  { name: "Bayern München", image: "./jerseys/bayern-munchen-2026-27-home-kit.jpg" },
  { name: "Benfica", image: "./jerseys/benefica-cf-2026-27-home-kit.jpg" },
  { name: "Bologna", image: "./jerseys/bologna-cf-2026-27-home-kit.jpg" },
  { name: "Borussia Dortmund", image: "./jerseys/borussia-dortmund-2026-27-home-kit.jpg" },
  { name: "Celtic", image: "./jerseys/celtic-cf-2026-27-home-kit.jpg" },
  { name: "Club Brugge", image: "./jerseys/club-brugge-2026-27-home-kit.jpg" },
  { name: "Como 1907", image: "./jerseys/como-1907-2026-27-home-kit.jpg" },
  { name: "Barcelona", image: "./jerseys/fc-barcelona-2026-27-home-kit.jpg" },
  { name: "Feyenoord", image: "./jerseys/feyenoord-2026-27-home-kit.jpg" },
  { name: "Galatasaray", image: "./jerseys/galatasaray-2026-27-home-kit.jpg" },
  { name: "Girona", image: "./jerseys/girona-cf-2026-27-home-kit.jpg" },
  { name: "Inter Milan", image: "./jerseys/inter-milan-2026-27-home-kit.jpg" },
  { name: "Juventus", image: "./jerseys/juventus-cf-2026-27-home-kit.jpg" },
  { name: "Lille OSC", image: "./jerseys/lille-losc-2026-27-home-kit.jpg" },
  { name: "Liverpool", image: "./jerseys/liverpool-fc-2026-27-home-kit.jpg" },
  { name: "Manchester City", image: "./jerseys/manchester-city-2026-27-home-kit.jpg" },
  { name: "Manchester United", image: "./jerseys/manchester-united-2026-27-home-kit.jpg" },
  { name: "Monaco", image: "./jerseys/monaco-cf-2026-27-home-kit.jpg" },
  { name: "Paris Saint-Germain", image: "./jerseys/paris-saint-germain-2026-27-home-kit.jpg" },
  { name: "PSV Eindhoven", image: "./jerseys/psv-2026-27-home-kit.jpg" },
  { name: "RB Leipzig", image: "./jerseys/rb-leipzig-2026-27-home-kit.jpg" },
  { name: "RC Lens", image: "./jerseys/rc-lens-2026-27-home-kit.jpg" },
  { name: "Real Betis", image: "./jerseys/real-betis-2026-27-home-kit.jpg" },
  { name: "Real Madrid", image: "./jerseys/real-madrid-2026-27-home-kit.jpg" },
  { name: "Shakhtar Donetsk", image: "./jerseys/shakhtar-donetsk-2026-27-home-kit.jpg" },
  { name: "Slavia Praha", image: "./jerseys/slavia-praha-2026-27-home-kit.jpg" },
  { name: "Sporting CP", image: "./jerseys/sporting-cp-2026-27-home-kit.jpg" },
  { name: "SSC Napoli", image: "./jerseys/ssc-napoli-2026-27-home-kit.jpg" },
  { name: "VfB Stuttgart", image: "./jerseys/vfb-stuttgart-2026-27-home-kit.jpg" },
  { name: "Villarreal", image: "./jerseys/villarreal-cf-2026-27-home-kit.jpg" }
];

const TOTAL_ROUNDS = clubs.length;
const MIN_SCORE_FOR_LEADERBOARD = 30;
const LEADERBOARD_KEY = "cl-kit-quiz-leaderboard";

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const livesStatEl = document.getElementById("livesStat");
const progressEl = document.getElementById("progress");
const kitPreview = document.getElementById("kitPreview");
const answerOptions = document.getElementById("answerOptions");
const messageEl = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreEl = document.getElementById("finalScore");
const leaderboardList = document.getElementById("leaderboardList");
const saveScoreForm = document.getElementById("saveScoreForm");
const playerNameInput = document.getElementById("playerName");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let lives = 3;
let roundIndex = 0;
let usedIndexes = [];
let currentTeam = null;
let answered = false;
let gameOverState = false;

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getDefaultLeaderboard() {
  return [
    { name: "Karel", score: 80 },
    { name: "Tonda", score: 70 },
    { name: "Vojta", score: 60 },
    { name: "Marek", score: 55 },
    { name: "Jirka", score: 55 },
    { name: "Lucka", score: 50 },
    { name: "Pepek", score: 50 },
    { name: "Eva", score: 45 },
    { name: "Lukáš", score: 45 },
    { name: "Tom", score: 40 },
    { name: "Nela", score: 40 },
    { name: "Pavel", score: 35 },
    { name: "Míša", score: 35 },
    { name: "Ruda", score: 30 },
    { name: "Hanka", score: 30 }
  ];
}

function readLeaderboard() {
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(getDefaultLeaderboard()));
    return getDefaultLeaderboard();
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : getDefaultLeaderboard();
  } catch (error) {
    return getDefaultLeaderboard();
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

function renderLeaderboard() {
  const entries = readLeaderboard()
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  leaderboardList.innerHTML = entries
    .map(
      (entry, index) => `
        <li>
          <span class="rank">${index + 1}</span>
          <span class="player">${entry.name}</span>
          <span class="score">${entry.score}</span>
        </li>
      `
    )
    .join("");
}

function setKitImage(team) {
  // Clear the old content
  kitPreview.innerHTML = '';
  
  // Create image element for the jersey
  const img = document.createElement('img');
  img.src = team.image;
  img.alt = `${team.name} jersey`;
  img.className = 'jersey-image';
  kitPreview.appendChild(img);
}

function chooseRandomTeam() {
  const availableIndexes = clubs
    .map((_, index) => index)
    .filter((index) => !usedIndexes.includes(index));

  if (!availableIndexes.length) {
    return null;
  }

  const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  usedIndexes.push(randomIndex);
  return clubs[randomIndex];
}

function updateLivesDisplay() {
  livesEl.innerHTML = '';

  if (gameOverState || lives <= 0) {
    const card = document.createElement('div');
    card.className = 'referee-card';
    card.title = 'Red card';
    card.setAttribute('aria-label', 'Red card');
    livesEl.appendChild(card);
    return;
  }

  for (let i = 0; i < lives; i++) {
    const img = document.createElement('img');
    img.src = './jerseys/ball.png';
    img.alt = 'Soccer ball';
    img.className = 'soccer-ball';
    livesEl.appendChild(img);
  }
}

function updateHud() {
  scoreEl.textContent = score;
  updateLivesDisplay();
  progressEl.textContent = `${Math.min(roundIndex, TOTAL_ROUNDS)} / ${TOTAL_ROUNDS}`;
}

function buildOptions() {
  const options = [currentTeam.name];

  while (options.length < 3) {
    const randomClub = clubs[Math.floor(Math.random() * clubs.length)];
    if (!options.includes(randomClub.name) && randomClub.name !== currentTeam.name) {
      options.push(randomClub.name);
    }
  }

  return options.sort(() => Math.random() - 0.5);
}

function renderAnswerOptions() {
  const options = buildOptions();
  answerOptions.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (answered) return;
      answerOptions.querySelectorAll("button").forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");

      if (option === currentTeam.name) {
        handleCorrectGuess();
      } else {
        handleWrongGuess();
      }
    });
    answerOptions.appendChild(button);
  });
}

function startRound() {
  answered = false;
  const nextTeam = chooseRandomTeam();

  if (!nextTeam) {
    endGame();
    return;
  }

  currentTeam = nextTeam;
  roundIndex += 1;
  nextBtn.classList.add("hidden");
  messageEl.textContent = "Uhodni klub podle dresu.";
  messageEl.style.color = "#9fb8d0";
  setKitImage(currentTeam);
  renderAnswerOptions();
  updateHud();
}

function handleCorrectGuess() {
  score += 10;
  guessedCorrect(true);
}

function handleWrongGuess() {
  lives -= 1;
  messageEl.textContent = `Špatně. Správná odpověď byla ${currentTeam.name}.`;
  messageEl.style.color = "#ffb4c8";
  guessedCorrect(false);
}

function guessedCorrect(isCorrect) {
  answered = true;
  answerOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentTeam.name) {
      button.classList.add("selected");
    }
  });

  if (isCorrect) {
    messageEl.textContent = `Správně! ${currentTeam.name} byl ten pravý klub.`;
    messageEl.style.color = "#9ef0da";

    if (lives <= 0 || roundIndex >= TOTAL_ROUNDS) {
      setTimeout(() => endGame(), 700);
      return;
    }

    nextBtn.classList.add("hidden");
    setTimeout(() => {
      startRound();
    }, 700);
    return;
  }

  if (lives <= 0 || roundIndex >= TOTAL_ROUNDS) {
    nextBtn.textContent = "Konec hry";
  } else {
    nextBtn.textContent = "Další kolo";
  }

  nextBtn.classList.remove("hidden");

  if (lives <= 0 || roundIndex >= TOTAL_ROUNDS) {
    setTimeout(() => endGame(), 700);
  }
}

function endGame() {
  gameOverState = true;
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  livesStatEl.classList.remove("hidden");
  updateLivesDisplay();
  finalScoreEl.textContent = score;
  renderLeaderboard();

  if (score >= MIN_SCORE_FOR_LEADERBOARD) {
    saveScoreForm.classList.remove("hidden");
  } else {
    saveScoreForm.classList.add("hidden");
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  roundIndex = 0;
  usedIndexes = [];
  currentTeam = null;
  answered = false;
  gameOverState = false;
  gameOverScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  livesStatEl.classList.remove("hidden");
  nextBtn.textContent = "Další kolo";
  saveScoreForm.classList.add("hidden");
  playerNameInput.value = "";
  answerOptions.innerHTML = "";
  updateLivesDisplay();
  startRound();
}

nextBtn.addEventListener("click", () => {
  if (lives <= 0 || roundIndex >= TOTAL_ROUNDS) {
    endGame();
    return;
  }

  startRound();
});

saveScoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = playerNameInput.value.trim();

  if (!name) {
    messageEl.textContent = "Zadej jméno, abys mohl uložit výsledek.";
    messageEl.style.color = "#ffcf5a";
    return;
  }

  const existing = readLeaderboard();
  existing.push({ name, score });
  const sorted = existing
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  saveLeaderboard(sorted);
  renderLeaderboard();
  saveScoreForm.classList.add("hidden");
  messageEl.textContent = `Výsledek uložen! ${name} má ${score} bodů.`;
  messageEl.style.color = "#9ef0da";
});

restartBtn.addEventListener("click", resetGame);

renderLeaderboard();
resetGame();
