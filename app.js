// =====================================================================
// 2026 March Madness Bracket Builder — Wizard App
// =====================================================================

const SAVE_KEY = 'mm2026_wizard_v2';
const ROUND_NAMES = ['Round of 64', 'Round of 32', 'Sweet 16', 'Elite Eight'];
const ESPN_CDN = 'https://a.espncdn.com/i/teamlogos/ncaa/500/';

// ── State ─────────────────────────────────────────────────────────────
// wizard.phase:
//   'landing'  — choose tournament
//   'firstfour' — pick First Four games (if any)
//   'region'   — walk through each game in each region
//   'finalfour' — SF games
//   'championship' — title game
//   'score'    — score prediction
//   'review'   — show full bracket
//
// wizard.ffIndex     — index into tournament.firstFour
// wizard.regionIndex — index into tournament.regions
// wizard.roundIndex  — 0-3
// wizard.gameIndex   — 0..(gamesInRound-1)
// wizard.ffPhase     — 0=sf1, 1=sf2

let state = {
  tournament: null,   // 'men' | 'women'
  picks: {
    men:   makeEmptyPicks('men'),
    women: makeEmptyPicks('women'),
  },
  wizard: {
    phase: 'landing',
    ffIndex: 0,
    regionIndex: 0,
    roundIndex: 0,
    gameIndex: 0,
    ffPhase: 0,
  },
};

function makeEmptyPicks(key) {
  const t = TOURNAMENTS[key];
  return {
    firstFour: {},                      // { ffId: teamName }
    regions: t.regions.map(r => [
      new Array(8).fill(null),          // R64 winners
      new Array(4).fill(null),          // R32
      new Array(2).fill(null),          // S16
      new Array(1).fill(null),          // E8
    ]),
    finalFour: {
      sf: [null, null],                 // sf[0]=winner of pair[0], sf[1]=winner of pair[1]
      champion: null,
      winnerTeams: [[null,null],[null,null]], // actual finalist team names
    },
    score: { team1: '', team2: '' },
  };
}

// ── Persist ───────────────────────────────────────────────────────────
function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(_) {}
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge carefully so new fields aren't missing
      state = { ...state, ...parsed };
      if (!state.picks.men) state.picks.men = makeEmptyPicks('men');
      if (!state.picks.women) state.picks.women = makeEmptyPicks('women');
    }
  } catch(_) {}
}

// ── Helpers ───────────────────────────────────────────────────────────
function T()  { return TOURNAMENTS[state.tournament]; }
function P()  { return state.picks[state.tournament]; }
function W()  { return state.wizard; }

/** Resolve slot → actual team name (handling First Four TBDs) */
function resolveSlot(slot) {
  if (!slot.firstFourId) return slot.name;
  return P().firstFour[slot.firstFourId] || null;
}

/** Get the two team names for a game at [regionIndex, roundIndex, gameIndex] */
function getMatchupNames(regionIndex, roundIndex, gameIndex) {
  const region = T().regions[regionIndex];
  const picks  = P().regions[regionIndex];

  if (roundIndex === 0) {
    const sA = region.slots[gameIndex * 2];
    const sB = region.slots[gameIndex * 2 + 1];
    return [resolveSlot(sA), resolveSlot(sB)];
  }
  const prevRound = picks[roundIndex - 1];
  return [prevRound[gameIndex * 2] || null, prevRound[gameIndex * 2 + 1] || null];
}

/** Seed for a team name within a region */
function seedInRegion(regionIndex, name) {
  if (!name) return null;
  const region = T().regions[regionIndex];
  const slot = region.slots.find(s => (s.firstFourId ? P().firstFour[s.firstFourId] : s.name) === name || s.name === name);
  return slot ? slot.seed : null;
}

/** Seed for a team name across all regions */
function seedAnywhere(name) {
  for (let i = 0; i < T().regions.length; i++) {
    const s = seedInRegion(i, name);
    if (s !== null) return s;
  }
  return null;
}

/** Total picks made in current tournament */
function countPicks() {
  const p = P();
  let n = Object.keys(p.firstFour).length;
  p.regions.forEach(r => r.forEach(round => round.forEach(w => { if (w) n++; })));
  if (p.finalFour.sf[0]) n++;
  if (p.finalFour.sf[1]) n++;
  if (p.finalFour.champion) n++;
  return n;
}

/** Total games that need picking (First Four + 63 bracket games) */
function totalGames() {
  const ffCount = T().firstFour.length;
  return ffCount + 63;
}

/** Progress for the wizard flow (number of wizard steps completed out of total) */
function wizardProgress() {
  const w = W();
  const ffTotal = T().firstFour.length;
  const ROUND_GAMES = [8, 4, 2, 1];
  let done = 0;

  if (w.phase === 'landing') return { done: 0, total: 1 };

  // First Four games done
  if (w.phase === 'firstfour') done = w.ffIndex;
  else done = ffTotal;

  // Region games done
  const allRegionGames = 4 * 15; // 15 games per region × 4 regions
  if (w.phase === 'region') {
    let regionDone = 0;
    for (let r = 0; r < w.regionIndex; r++) regionDone += 15;
    for (let rd = 0; rd < w.roundIndex; rd++) regionDone += ROUND_GAMES[rd];
    regionDone += w.gameIndex;
    done += regionDone;
  } else if (['finalfour','championship','score','review'].includes(w.phase)) {
    done += allRegionGames;
  }

  // Final Four / championship
  if (w.phase === 'finalfour')   done += w.ffPhase;
  else if (['championship','score','review'].includes(w.phase)) done += 2;
  if (w.phase === 'score' || w.phase === 'review') done += 1;

  const total = ffTotal + allRegionGames + 2 + 1 + 1;
  return { done: Math.min(done, total), total };
}

// ── School Info ───────────────────────────────────────────────────────
function getSchoolInfo(name) {
  if (!name) return null;
  // Strip " / " combos (First Four unresolved)
  return SCHOOLS[name] || null;
}

// ── Render Entry Point ────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  const w = W();

  if (w.phase === 'landing') {
    app.innerHTML = renderLanding();
    bindLanding();
    return;
  }

  app.innerHTML = renderWizardShell();
  const body = app.querySelector('.wizard-body');
  const { done, total } = wizardProgress();
  app.querySelector('.wizard-progress-fill').style.width = `${Math.round(done / total * 100)}%`;
  app.querySelector('.wizard-progress-text').textContent = `${done}/${total}`;

  switch (w.phase) {
    case 'firstfour':    body.innerHTML = renderFirstFour();    bindFirstFour();    break;
    case 'region':       body.innerHTML = renderRegionGame();   bindRegionGame();   break;
    case 'finalfour':    body.innerHTML = renderFinalFour();    bindFinalFour();    break;
    case 'championship': body.innerHTML = renderChampionship(); bindChampionship(); break;
    case 'score':        body.innerHTML = renderScore();        bindScore();        break;
    case 'review':       body.innerHTML = renderReview();       bindReview();       break;
  }

  // Back button
  app.querySelector('#wiz-back-btn').addEventListener('click', goBack);
}

// ── Landing ───────────────────────────────────────────────────────────
function renderLanding() {
  return `
  <div class="landing">
    <div class="landing-hero">
      <div class="landing-trophy">🏆</div>
      <div class="landing-title">2026 March Madness</div>
      <div class="landing-subtitle">
        Build your bracket game-by-game. Learn fun facts and alumni stories
        as you pick your way to a champion.
      </div>
    </div>
    <div class="tournament-cards">
      <div class="tournament-card" data-t="men">
        <div class="tournament-card-icon">🏀</div>
        <div class="tournament-card-name">Men's Tournament</div>
        <div class="tournament-card-desc">64-team field · 63 games<br/>Build the men's bracket</div>
      </div>
      <div class="tournament-card" data-t="women">
        <div class="tournament-card-icon">🏀</div>
        <div class="tournament-card-name">Women's Tournament</div>
        <div class="tournament-card-desc">64-team field · 63 games<br/>Build the women's bracket</div>
      </div>
    </div>
  </div>`;
}

function bindLanding() {
  document.querySelectorAll('.tournament-card').forEach(el => {
    el.addEventListener('click', () => {
      state.tournament = el.dataset.t;
      const hasExisting = countPicks() > 0;
      if (hasExisting && !confirm('You have existing picks for this bracket. Start over?')) return;
      state.picks[state.tournament] = makeEmptyPicks(state.tournament);
      const w = W();
      if (T().firstFour.length > 0) {
        w.phase = 'firstfour';
        w.ffIndex = 0;
      } else {
        w.phase = 'region';
        w.regionIndex = 0; w.roundIndex = 0; w.gameIndex = 0;
      }
      save(); render();
    });
  });
}

// ── Wizard Shell ──────────────────────────────────────────────────────
function renderWizardShell() {
  const t = T();
  const label = t ? t.shortName + ' Bracket' : 'Bracket';
  return `
  <div class="wizard">
    <div class="wizard-header">
      <button class="wizard-back-btn" id="wiz-back-btn">← Back</button>
      <div class="wizard-title">${label}</div>
      <div class="wizard-progress-wrap">
        <div class="wizard-progress-bar">
          <div class="wizard-progress-fill" style="width:0%"></div>
        </div>
        <div class="wizard-progress-text">0/1</div>
      </div>
    </div>
    <div class="wizard-body" style="flex:1;display:flex;flex-direction:column;"></div>
  </div>`;
}

// ── First Four ────────────────────────────────────────────────────────
function renderFirstFour() {
  const ff = T().firstFour[W().ffIndex];
  const picked = P().firstFour[ff.id];
  const teams  = [ff.team1, ff.team2];

  return `
  <div class="round-banner">
    <div class="round-banner-label">First Four · Dayton, OH</div>
    <div class="round-banner-title">${ff.region} Region — Seed ${ff.seed}</div>
    <div class="round-banner-subtitle">Game ${W().ffIndex + 1} of ${T().firstFour.length}</div>
  </div>
  <div class="game-stage">
    <div class="first-four-note">Pick the winner to advance to the main bracket</div>
    <div class="matchup-row">
      ${teams.map(name => renderTeamCard(name, ff.seed, null, picked === name)).join(`
        <div class="vs-divider">VS</div>
      `)}
    </div>
    <div class="wizard-nav">
      <button class="wizard-nav-btn secondary" id="skip-ff-btn">Skip (decide later)</button>
      <button class="wizard-nav-btn primary" id="next-ff-btn" ${picked ? '' : 'disabled'}>Next →</button>
    </div>
  </div>`;
}

function bindFirstFour() {
  const ff = T().firstFour[W().ffIndex];
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      P().firstFour[ff.id] = (P().firstFour[ff.id] === name) ? null : name;
      // Cascade-clear downstream picks that relied on this First Four result
      cascadeFirstFour(ff.id);
      save(); render();
    });
  });
  document.getElementById('skip-ff-btn').addEventListener('click', () => {
    P().firstFour[ff.id] = null;
    advanceFirstFour();
  });
  document.getElementById('next-ff-btn').addEventListener('click', advanceFirstFour);
}

function advanceFirstFour() {
  const w = W();
  if (w.ffIndex + 1 < T().firstFour.length) {
    w.ffIndex++;
  } else {
    w.phase = 'region';
    w.regionIndex = 0; w.roundIndex = 0; w.gameIndex = 0;
  }
  save(); render();
}

// ── Region Games ──────────────────────────────────────────────────────
function renderRegionGame() {
  const w = W();
  const region = T().regions[w.regionIndex];
  const [nameA, nameB] = getMatchupNames(w.regionIndex, w.roundIndex, w.gameIndex);
  const picks = P().regions[w.regionIndex];
  const picked = picks[w.roundIndex][w.gameIndex];

  const seedA = w.roundIndex === 0 ? region.slots[w.gameIndex * 2].seed : seedInRegion(w.regionIndex, nameA);
  const seedB = w.roundIndex === 0 ? region.slots[w.gameIndex * 2 + 1].seed : seedInRegion(w.regionIndex, nameB);

  const ROUND_GAMES = [8, 4, 2, 1];
  const totalRegionGames = 15;
  let regionGamesDone = 0;
  for (let rd = 0; rd < w.roundIndex; rd++) regionGamesDone += ROUND_GAMES[rd];
  regionGamesDone += w.gameIndex + 1;

  const bothResolved = nameA && nameB;
  const hasTBD = !nameA || !nameB;

  // Render a placeholder for unresolved teams
  const renderTeamOrTBD = (name, seed) => {
    if (!name) {
      return `<div class="tbd-placeholder">
        <div class="tbd-placeholder-icon">❓</div>
        <div class="tbd-placeholder-text">TBD</div>
        <div class="tbd-placeholder-sub">Waiting for earlier results</div>
      </div>`;
    }
    return renderTeamCard(name, seed, w.regionIndex, picked === name);
  };

  return `
  <div class="round-banner" style="border-bottom-color:${region.color}">
    <div class="round-banner-label">${region.name} Region · ${regionGamesDone}/${totalRegionGames}</div>
    <div class="round-banner-title">${ROUND_NAMES[w.roundIndex]}</div>
    <div class="round-banner-subtitle">Game ${w.gameIndex + 1} of ${ROUND_GAMES[w.roundIndex]}</div>
  </div>
  <div class="game-stage">
    ${hasTBD ? '<div class="first-four-note">One team is still pending a previous result.</div>' : ''}
    <div class="matchup-row">
      ${renderTeamOrTBD(nameA, seedA)}
      <div class="vs-divider">VS</div>
      ${renderTeamOrTBD(nameB, seedB)}
    </div>
    <div class="wizard-nav">
      ${hasTBD
        ? `<button class="wizard-nav-btn primary" id="region-next-btn">Skip →</button>`
        : `<button class="wizard-nav-btn secondary" id="region-skip-btn">Skip (decide later)</button>
           <button class="wizard-nav-btn primary" id="region-next-btn" ${picked ? '' : 'disabled'}>Next →</button>`
      }
    </div>
  </div>`;
}

function bindRegionGame() {
  const w = W();
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const picks = P().regions[w.regionIndex];
      const prev  = picks[w.roundIndex][w.gameIndex];
      if (prev === name) {
        cascadeRegion(w.regionIndex, w.roundIndex, w.gameIndex);
      } else {
        if (prev) cascadeRegion(w.regionIndex, w.roundIndex, w.gameIndex);
        picks[w.roundIndex][w.gameIndex] = name;
        // Propagate E8 winner to Final Four tracking
        if (w.roundIndex === 3) syncFinalFour(w.regionIndex);
      }
      save(); render();
    });
  });

  const nextBtn = document.getElementById('region-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', advanceRegion);

  const skipBtn = document.getElementById('region-skip-btn');
  if (skipBtn) skipBtn.addEventListener('click', advanceRegion);
}

function advanceRegion() {
  const w = W();
  const ROUND_GAMES = [8, 4, 2, 1];
  const curGamesInRound = ROUND_GAMES[w.roundIndex];

  if (w.gameIndex + 1 < curGamesInRound) {
    w.gameIndex++;
  } else if (w.roundIndex + 1 < 4) {
    w.roundIndex++;
    w.gameIndex = 0;
  } else if (w.regionIndex + 1 < T().regions.length) {
    w.regionIndex++;
    w.roundIndex = 0;
    w.gameIndex  = 0;
  } else {
    // All regions done — sync Final Four and move on
    syncAllFinalFour();
    w.phase   = 'finalfour';
    w.ffPhase = 0;
  }
  save(); render();
}

// ── Final Four ────────────────────────────────────────────────────────
function syncFinalFour(regionIndex) {
  const pairIndex = T().finalFourPairs.findIndex(p => p.includes(regionIndex));
  if (pairIndex < 0) return;
  const pair = T().finalFourPairs[pairIndex];
  const ff   = P().finalFour;
  ff.winnerTeams[pairIndex] = pair.map(ri => P().regions[ri][3][0] || null);
  // If previous sf winner is no longer a finalist, clear it
  if (ff.sf[pairIndex] && !ff.winnerTeams[pairIndex].includes(ff.sf[pairIndex])) {
    ff.sf[pairIndex] = null;
    if (ff.champion && !P().finalFour.sf.includes(ff.champion)) ff.champion = null;
  }
}

function syncAllFinalFour() {
  T().finalFourPairs.forEach((_, i) => {
    const pair = T().finalFourPairs[i];
    const ff   = P().finalFour;
    ff.winnerTeams[i] = pair.map(ri => P().regions[ri][3][0] || null);
  });
}

function renderFinalFour() {
  syncAllFinalFour();
  const w  = W();
  const ff = P().finalFour;
  const pair = T().finalFourPairs[w.ffPhase];
  const [nameA, nameB] = ff.winnerTeams[w.ffPhase];
  const picked = ff.sf[w.ffPhase];
  const seedA  = seedAnywhere(nameA);
  const seedB  = seedAnywhere(nameB);

  const sfLabel = `Semifinal ${w.ffPhase + 1} of 2`;
  const regions  = pair.map(ri => T().regions[ri].name);

  const renderSlot = (name, seed) => {
    if (!name) return `<div class="tbd-placeholder">
      <div class="tbd-placeholder-icon">❓</div>
      <div class="tbd-placeholder-text">TBD</div>
      <div class="tbd-placeholder-sub">Elite Eight result pending</div>
    </div>`;
    return renderTeamCard(name, seed, null, picked === name);
  };

  return `
  <div class="round-banner">
    <div class="round-banner-label">Final Four · San Antonio, TX</div>
    <div class="round-banner-title">${sfLabel}</div>
    <div class="round-banner-subtitle">${regions[0]} Region vs ${regions[1]} Region</div>
  </div>
  <div class="ff-stage">
    <div class="matchup-row">
      ${renderSlot(nameA, seedA)}
      <div class="vs-divider">VS</div>
      ${renderSlot(nameB, seedB)}
    </div>
    <div class="wizard-nav">
      <button class="wizard-nav-btn secondary" id="ff-skip-btn">Skip (decide later)</button>
      <button class="wizard-nav-btn primary" id="ff-next-btn" ${picked ? '' : 'disabled'}>Next →</button>
    </div>
  </div>`;
}

function bindFinalFour() {
  const w = W();
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const ff   = P().finalFour;
      ff.sf[w.ffPhase] = (ff.sf[w.ffPhase] === name) ? null : name;
      if (ff.champion && !ff.sf.includes(ff.champion)) ff.champion = null;
      save(); render();
    });
  });
  document.getElementById('ff-skip-btn').addEventListener('click', advanceFinalFour);
  document.getElementById('ff-next-btn').addEventListener('click', advanceFinalFour);
}

function advanceFinalFour() {
  const w = W();
  if (w.ffPhase === 0) {
    w.ffPhase = 1;
  } else {
    w.phase = 'championship';
  }
  save(); render();
}

// ── Championship ──────────────────────────────────────────────────────
function renderChampionship() {
  const ff = P().finalFour;
  const [nameA, nameB] = [ff.sf[0], ff.sf[1]];
  const picked = ff.champion;
  const seedA  = seedAnywhere(nameA);
  const seedB  = seedAnywhere(nameB);

  const renderSlot = (name, seed) => {
    if (!name) return `<div class="tbd-placeholder">
      <div class="tbd-placeholder-icon">❓</div>
      <div class="tbd-placeholder-text">TBD</div>
      <div class="tbd-placeholder-sub">Semifinal result pending</div>
    </div>`;
    return renderTeamCard(name, seed, null, picked === name);
  };

  return `
  <div class="round-banner">
    <div class="round-banner-label">Championship Game · San Antonio, TX</div>
    <div class="round-banner-title">National Championship</div>
    <div class="round-banner-subtitle">Pick your 2026 champion</div>
  </div>
  <div class="ff-stage">
    <div class="matchup-row">
      ${renderSlot(nameA, seedA)}
      <div class="vs-divider">VS</div>
      ${renderSlot(nameB, seedB)}
    </div>
    <div class="wizard-nav">
      <button class="wizard-nav-btn secondary" id="champ-skip-btn">Skip</button>
      <button class="wizard-nav-btn primary" id="champ-next-btn" ${picked ? '' : 'disabled'}>Next →</button>
    </div>
  </div>`;
}

function bindChampionship() {
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const ff   = P().finalFour;
      ff.champion = (ff.champion === name) ? null : name;
      save(); render();
    });
  });
  document.getElementById('champ-skip-btn').addEventListener('click', () => { W().phase = 'score'; save(); render(); });
  document.getElementById('champ-next-btn').addEventListener('click', () => { W().phase = 'score'; save(); render(); });
}

// ── Score Prediction ──────────────────────────────────────────────────
function renderScore() {
  const ff    = P().finalFour;
  const champ = ff.champion;
  const other = ff.sf.find(n => n && n !== champ) || null;
  const sc    = P().score;
  const champInfo = getSchoolInfo(champ);
  const emoji = champ ? (champInfo ? champInfo.emoji : '🏆') : '🏆';

  return `
  <div class="round-banner">
    <div class="round-banner-label">Tiebreaker</div>
    <div class="round-banner-title">Final Score Prediction</div>
    <div class="round-banner-subtitle">Used to break ties in your group</div>
  </div>
  <div class="score-stage">
    <div class="score-champion-display">
      <div class="score-trophy">${emoji}</div>
      <div class="score-champion-name">${champ || 'Your Champion'}</div>
    </div>
    <div class="score-desc">Predict the final score of the championship game. This is used as a tiebreaker — it won't affect your picks.</div>
    <div class="score-inputs">
      <div class="score-team-box">
        <div class="score-team-label">${champ || 'Team 1'}</div>
        <input class="score-input" id="score-t1" type="number" min="0" max="200" placeholder="—" value="${sc.team1}">
      </div>
      <div class="score-dash">–</div>
      <div class="score-team-box">
        <div class="score-team-label">${other || 'Team 2'}</div>
        <input class="score-input" id="score-t2" type="number" min="0" max="200" placeholder="—" value="${sc.team2}">
      </div>
    </div>
    <div class="wizard-nav" style="max-width:400px;width:100%">
      <button class="wizard-nav-btn secondary" id="score-skip-btn">Skip</button>
      <button class="wizard-nav-btn primary" id="score-done-btn">View My Bracket →</button>
    </div>
  </div>`;
}

function bindScore() {
  document.getElementById('score-t1').addEventListener('input', e => { P().score.team1 = e.target.value; save(); });
  document.getElementById('score-t2').addEventListener('input', e => { P().score.team2 = e.target.value; save(); });
  document.getElementById('score-skip-btn').addEventListener('click', () => { W().phase = 'review'; save(); render(); });
  document.getElementById('score-done-btn').addEventListener('click', () => { W().phase = 'review'; save(); render(); });
}

// ── Review ────────────────────────────────────────────────────────────
function renderReview() {
  const p  = P();
  const t  = T();
  const ff = p.finalFour;
  const ROUND_LABELS = ['R64', 'R32', 'S16', 'E8'];

  const champInfo = ff.champion ? getSchoolInfo(ff.champion) : null;
  const champEmoji = champInfo ? champInfo.emoji : '🏆';
  const scoreText  = (p.score.team1 && p.score.team2)
    ? `Predicted score: ${ff.champion} ${p.score.team1} – ${p.score.team2}`
    : '';

  // Build region summaries
  const regionSections = t.regions.map((region, ri) => {
    const rounds = p.regions[ri];
    const rows   = rounds.map((winners, rdIdx) => {
      const vals = winners.filter(Boolean);
      if (!vals.length) return '';
      return `<div class="review-path-round">
        <div class="review-path-round-label">${ROUND_LABELS[rdIdx]}</div>
        <div class="review-path-winners">
          ${vals.map(w => `<div class="review-winner-tag">${w}</div>`).join('')}
        </div>
      </div>`;
    }).join('');
    if (!rows.trim()) return '';
    return `
    <div class="review-section">
      <div class="review-section-header">
        <div class="review-region-dot" style="background:${region.color}"></div>
        ${region.name} Region
      </div>
      <div class="review-path">${rows}</div>
    </div>`;
  }).join('');

  // Final Four summary
  const sfRows = t.finalFourPairs.map((pair, pi) => {
    const teams  = ff.winnerTeams[pi];
    const winner = ff.sf[pi];
    const loser  = teams.find(n => n && n !== winner);
    const regions = pair.map(ri => t.regions[ri].name);
    if (!winner && !teams.some(Boolean)) return '';
    return `<div class="review-ff-game">
      <div class="review-ff-label">Semifinal ${pi + 1}: ${regions[0]} vs ${regions[1]}</div>
      <div class="review-ff-result">
        ${winner ? `<span class="review-ff-winner">${winner}</span>` : '<span class="review-ff-loser">TBD</span>'}
        ${loser  ? ` def. <span class="review-ff-loser">${loser}</span>` : ''}
      </div>
    </div>`;
  }).join('');

  return `
  <div class="review-stage">
    <div class="review-title">${champEmoji} Your Bracket</div>
    <div class="review-subtitle">${t.name} — ${t.year}</div>

    ${ff.champion ? `
    <div class="review-champ-box">
      <div class="review-champ-label">🏆 2026 Champion</div>
      <div class="review-champ-name">${ff.champion}</div>
      ${scoreText ? `<div class="review-champ-score">${scoreText}</div>` : ''}
    </div>` : ''}

    ${(sfRows.trim()) ? `
    <div class="review-section">
      <div class="review-section-header">Final Four</div>
      <div class="review-final-four">${sfRows}</div>
    </div>` : ''}

    ${regionSections}

    <div class="review-actions">
      <button class="review-action-btn secondary" id="review-restart-btn">← Change Picks</button>
      <button class="review-action-btn secondary" id="review-other-btn">Switch Tournament</button>
    </div>
  </div>`;
}

function bindReview() {
  document.getElementById('review-restart-btn').addEventListener('click', () => {
    // Go back to just before the review
    W().phase = 'score';
    render();
  });
  document.getElementById('review-other-btn').addEventListener('click', () => {
    W().phase = 'landing';
    render();
  });
}

// ── Team Card ─────────────────────────────────────────────────────────
function renderTeamCard(name, seed, regionIndex, isSelected) {
  const info = getSchoolInfo(name);
  const c1   = info ? info.color1 : '#1f2937';
  const c2   = info ? info.color2 : '#374151';
  const emoji = info ? info.emoji : '🏀';
  const mascot = info ? info.mascot : name;
  const city   = info ? info.city  : '';

  const espnId = info ? info.espnId : null;
  const imgHtml = espnId
    ? `<img class="team-card-mascot-img"
          src="${ESPN_CDN}${espnId}.png"
          onerror="this.style.display='none'"
          alt="${mascot} logo" />`
    : '';

  const factsHtml = info ? info.facts.map(f => `<div class="team-card-fact">${f}</div>`).join('') : '';
  const alumniHtml = info ? info.alumni.map(a => `<div class="team-card-alum">${a}</div>`).join('') : '';

  const selectedClass = isSelected ? 'selected' : '';

  return `
  <div class="team-card ${selectedClass}" data-name="${escHtml(name)}" style="cursor:pointer">
    <div class="team-card-banner" style="background:linear-gradient(160deg,${c1},${c2})">
      <div class="team-card-seed">${seed ?? '?'}</div>
      <div class="team-card-mascot-wrap" style="background:rgba(0,0,0,0.25)">
        ${imgHtml}
        <span style="position:relative;z-index:1">${emoji}</span>
      </div>
      <div class="team-card-name">${escHtml(name)}</div>
      <div class="team-card-mascot-name">${escHtml(mascot)}</div>
      ${city ? `<div class="team-card-city">📍 ${escHtml(city)}</div>` : ''}
    </div>
    <div class="team-card-body">
      ${factsHtml ? `
        <div>
          <div class="team-card-section-title">About</div>
          <div class="team-card-facts">${factsHtml}</div>
        </div>` : ''}
      ${alumniHtml ? `
        <div>
          <div class="team-card-section-title">Notable Alumni</div>
          <div class="team-card-alumni">${alumniHtml}</div>
        </div>` : ''}
    </div>
    <div class="team-card-pick-prompt">${isSelected ? '✓ Picked — click to deselect' : 'Click to pick this team'}</div>
  </div>`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Cascade (invalidate downstream picks) ─────────────────────────────
function cascadeFirstFour(ffId) {
  // Find which region/slot uses this FF id
  T().regions.forEach((region, ri) => {
    const slotIdx = region.slots.findIndex(s => s.firstFourId === ffId);
    if (slotIdx < 0) return;
    const gameIdx = Math.floor(slotIdx / 2);
    cascadeRegion(ri, 0, gameIdx);
  });
}

function cascadeRegion(regionIndex, roundIndex, gameIndex) {
  const picks = P().regions[regionIndex];
  const prev  = picks[roundIndex][gameIndex];
  if (!prev) return;
  picks[roundIndex][gameIndex] = null;

  if (roundIndex + 1 < 4) {
    const nextGame = Math.floor(gameIndex / 2);
    if (picks[roundIndex + 1][nextGame] === prev) {
      cascadeRegion(regionIndex, roundIndex + 1, nextGame);
    }
  } else {
    // Was E8 — clear FF slot
    syncFinalFour(regionIndex);
    const ff = P().finalFour;
    if (ff.champion && !ff.sf.includes(ff.champion)) ff.champion = null;
  }
}

// ── Back Navigation ───────────────────────────────────────────────────
function goBack() {
  const w = W();
  const ROUND_GAMES = [8, 4, 2, 1];

  switch (w.phase) {
    case 'firstfour':
      if (w.ffIndex > 0) { w.ffIndex--; }
      else { w.phase = 'landing'; state.tournament = null; }
      break;

    case 'region':
      if (w.gameIndex > 0) {
        w.gameIndex--;
      } else if (w.roundIndex > 0) {
        w.roundIndex--;
        w.gameIndex = ROUND_GAMES[w.roundIndex] - 1;
      } else if (w.regionIndex > 0) {
        w.regionIndex--;
        w.roundIndex = 3;
        w.gameIndex  = 0;
      } else if (T().firstFour.length > 0) {
        w.phase   = 'firstfour';
        w.ffIndex = T().firstFour.length - 1;
      } else {
        w.phase = 'landing';
        state.tournament = null;
      }
      break;

    case 'finalfour':
      if (w.ffPhase > 0) {
        w.ffPhase--;
      } else {
        // Back to last region game (E8)
        w.phase = 'region';
        w.regionIndex = T().regions.length - 1;
        w.roundIndex  = 3;
        w.gameIndex   = 0;
      }
      break;

    case 'championship':
      w.phase   = 'finalfour';
      w.ffPhase = 1;
      break;

    case 'score':
      w.phase = 'championship';
      break;

    case 'review':
      w.phase = 'score';
      break;

    default:
      w.phase = 'landing';
      state.tournament = null;
  }
  save(); render();
}

// ── Boot ──────────────────────────────────────────────────────────────
load();
render();
