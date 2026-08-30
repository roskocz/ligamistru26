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
const SUPABASE_URL = "https://wlupiolmqtuotnfoeanj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_SbambzuzeMD5cnAxeaGZBA_EPhA5Ji2";
const USE_SUPABASE = SUPABASE_URL && SUPABASE_URL !== "https://YOUR_PROJECT_REF.supabase.co" && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY";
const translations = {
  cs: {
    gameTitle: "Fotbalový kvíz", score: "Skóre", lives: "Životy", round: "Kolo", guessPrompt: "Uhodni klub podle dresu.", nextRound: "Další kolo", endGame: "Konec hry", yourScore: "Tvoje skóre", enterName: "Zadej jméno", yourName: "Tvoje jméno", save: "Uložit", playAgain: "Hrát znovu", closeLeaderboard: "Zavřít leaderboard", closeSurprise: "Zavřít překvapení", showLeaderboard: "Zobrazit leaderboard", leaderboard: "Leaderboard", czechLanguage: "Čeština", englishLanguage: "Angličtina", secretFind: "Tajný úlovek", vikingMessage: "Haaland je připraven na další kolo.", wrongAnswer: "Špatně. Správná odpověď byla {team}.", correctAnswer: "Správně! {team} byl ten pravý klub.", enterNameToSave: "Zadej jméno, abys mohl uložit výsledek.", scoreSaved: "Výsledek uložen! {name} má {score} bodů.", kitPreview: "Náhled dresu", jersey: "dres", soccerBall: "Fotbalový míč", redCard: "Červená karta"
  },
  en: {
    gameTitle: "Football quiz", score: "Score", lives: "Lives", round: "Round", guessPrompt: "Guess the club from its kit.", nextRound: "Next round", endGame: "Game over", yourScore: "Your score", enterName: "Enter your name", yourName: "Your name", save: "Save", playAgain: "Play again", closeLeaderboard: "Close leaderboard", closeSurprise: "Close surprise", showLeaderboard: "Show leaderboard", leaderboard: "Leaderboard", czechLanguage: "Czech", englishLanguage: "English", secretFind: "Secret found", vikingMessage: "Haaland is ready for the next round.", wrongAnswer: "Wrong. The correct answer was {team}.", correctAnswer: "Correct! {team} was the right club.", enterNameToSave: "Enter your name to save your score.", scoreSaved: "Score saved! {name} has {score} points.", kitPreview: "Kit preview", jersey: "kit", soccerBall: "Soccer ball", redCard: "Red card"
  }
};

const scoreEl = document.getElementById("score");
const vikingBonusEl = document.getElementById("vikingBonus");
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
const showLeaderboardBtn = document.getElementById("showLeaderboardBtn");
const leaderboardModal = document.getElementById("leaderboardModal");
const modalLeaderboardList = document.getElementById("modalLeaderboardList");
const closeLeaderboardBtn = document.getElementById("closeLeaderboardBtn");
const easterEggTrigger = document.getElementById("easterEggTrigger");
const easterEggModal = document.getElementById("easterEggModal");
const closeEasterEggBtn = document.getElementById("closeEasterEggBtn");
const languageButtons = document.querySelectorAll("[data-language]");

let score = 0;
let lives = 3;
let roundIndex = 0;
let usedIndexes = [];
let currentTeam = null;
let answered = false;
let gameOverState = false;
let scoreSaved = false;
let vikingBonusActive = false;
let language = "cs";

function t(key, values = {}) {
  return translations[language][key].replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = t("gameTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  if (!answered && !gameOverState) {
    messageEl.textContent = t("guessPrompt");
  }
  if (!nextBtn.classList.contains("hidden")) {
    nextBtn.textContent = lives <= 0 || roundIndex >= TOTAL_ROUNDS ? t("endGame") : t("nextRound");
  }
  if (currentTeam) {
    setKitImage(currentTeam);
  }
  updateLivesDisplay();
}

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

async function readLeaderboard() {
  if (USE_SUPABASE) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/leaderboard?select=name,score&order=score.desc&limit=15`,
        {
          method: "GET",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Supabase leaderboard request failed");
      }

      const data = await response.json();
      const entries = Array.isArray(data) ? data : [];

      if (entries.length) {
        return entries
          .map((entry) => ({ name: entry.name, score: Number(entry.score ?? 0) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 15);
      }
    } catch (error) {
      console.warn("Supabase leaderboard unavailable, using local fallback.", error);
    }
  }

  const raw = localStorage.getItem(LEADERBOARD_KEY);
  if (!raw) {
    const defaultEntries = getDefaultLeaderboard();
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(defaultEntries));
    return defaultEntries;
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

async function saveLeaderboardEntry(name, score) {
  if (USE_SUPABASE) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, score }),
      });

      if (!response.ok) {
        throw new Error("Supabase insert failed");
      }

      return;
    } catch (error) {
      console.warn("Supabase save failed, using local fallback.", error);
    }
  }

  const existing = readLeaderboard();
  const entries = Array.isArray(existing) ? existing : [];
  entries.push({ name, score });
  saveLeaderboard(entries.sort((a, b) => b.score - a.score).slice(0, 15));
}

async function savePendingScore() {
  const name = playerNameInput.value.trim();

  if (scoreSaved || !gameOverState || score < MIN_SCORE_FOR_LEADERBOARD || !name) {
    return false;
  }

  scoreSaved = true;
  await saveLeaderboardEntry(name, score);
  return true;
}

async function renderLeaderboard() {
  const entries = await readLeaderboard();
  const sorted = [...entries].sort((a, b) => b.score - a.score).slice(0, 15);

  const markup = sorted
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

  leaderboardList.innerHTML = markup;
  modalLeaderboardList.innerHTML = markup;
}

function setKitImage(team) {
  // Clear the old content
  kitPreview.innerHTML = '';
  
  // Create image element for the jersey
  const img = document.createElement('img');
  img.src = team.image;
  img.alt = `${team.name} ${t("jersey")}`;
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
    card.title = t("redCard");
    card.setAttribute('aria-label', t("redCard"));
    livesEl.appendChild(card);
    return;
  }

  for (let i = 0; i < lives; i++) {
    const img = document.createElement('img');
    img.src = './jerseys/ball.png';
    img.alt = t("soccerBall");
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
  messageEl.textContent = t("guessPrompt");
  messageEl.style.color = "#9fb8d0";
  setKitImage(currentTeam);
  renderAnswerOptions();
  updateHud();
}

function handleCorrectGuess() {
  score += vikingBonusActive ? 20 : 10;
  guessedCorrect(true);
}

function handleWrongGuess() {
  lives -= 1;
  messageEl.textContent = t("wrongAnswer", { team: currentTeam.name });
  messageEl.style.color = "#ffb4c8";
  guessedCorrect(false);
}

function guessedCorrect(isCorrect) {
  answered = true;
  answerOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentTeam.name) {
      button.classList.add("correct");
    } else if (!isCorrect && button.classList.contains("selected")) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    messageEl.textContent = t("correctAnswer", { team: currentTeam.name });
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
    nextBtn.textContent = t("endGame");
  } else {
    nextBtn.textContent = t("nextRound");
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
  scoreSaved = false;
  gameOverScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  livesStatEl.classList.remove("hidden");
  nextBtn.textContent = t("nextRound");
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

saveScoreForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = playerNameInput.value.trim();

  if (!name) {
    messageEl.textContent = t("enterNameToSave");
    messageEl.style.color = "#ffcf5a";
    return;
  }

  const saved = await savePendingScore();
  await renderLeaderboard();
  if (saved) {
    saveScoreForm.classList.add("hidden");
    messageEl.textContent = t("scoreSaved", { name, score });
    messageEl.style.color = "#9ef0da";
  }
});

restartBtn.addEventListener("click", async () => {
  await savePendingScore();
  resetGame();
});

showLeaderboardBtn.addEventListener("click", async () => {
  await savePendingScore();
  await renderLeaderboard();
  leaderboardModal.classList.remove("hidden");
  closeLeaderboardBtn.focus();
});

closeLeaderboardBtn.addEventListener("click", () => {
  leaderboardModal.classList.add("hidden");
});

leaderboardModal.addEventListener("click", (event) => {
  if (event.target === leaderboardModal) {
    leaderboardModal.classList.add("hidden");
  }
});

easterEggTrigger.addEventListener("click", () => {
  vikingBonusActive = true;
  vikingBonusEl.classList.remove("hidden");
  easterEggModal.classList.remove("hidden");
  closeEasterEggBtn.focus();
});

function closeEasterEgg() {
  easterEggModal.classList.add("hidden");
  easterEggTrigger.focus();
}

closeEasterEggBtn.addEventListener("click", closeEasterEgg);

easterEggModal.addEventListener("click", (event) => {
  if (event.target === easterEggModal) {
    closeEasterEgg();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !easterEggModal.classList.contains("hidden")) {
    closeEasterEgg();
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    language = button.dataset.language;
    applyLanguage();
  });
});

applyLanguage();
renderLeaderboard();
resetGame();
