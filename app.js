// =====================================================================
// 2026 March Madness Bracket App
// =====================================================================
// State: picks[regionId][round][gameIndex] = teamName or null
// rounds: 0=R64, 1=R32, 2=S16, 3=E8 (per region)
// Final Four stored separately
// =====================================================================

const ROUNDS = ['Round of 64', 'Round of 32', 'Sweet 16', 'Elite Eight'];
const SAVE_KEY = 'mm2026_bracket';

// ── State ─────────────────────────────────────────────────────────────
let state = {
  firstFour: {},        // { ff1: 'Texas', ff2: 'Howard', ... }
  regions: {},          // { east: { rounds: [[game0winner,...], ...] }, ... }
  finalFour: {
    sf1: [null, null],  // [east finalist, south finalist]
    sf2: [null, null],  // [west finalist, midwest finalist]
    sfWinner1: null,
    sfWinner2: null,
    champion: null,
  },
};

// ── Helpers ───────────────────────────────────────────────────────────

function saveState() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (_) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch (_) {}
}

/** Return the actual team name for a slot (resolving First Four TBDs) */
function resolveTeam(slot) {
  if (slot.firstFourId) {
    const winner = state.firstFour[slot.firstFourId];
    if (winner) return winner;
    // Show both options while unresolved
    const ff = TOURNAMENT_DATA.firstFour.find(f => f.id === slot.firstFourId);
    return ff ? `${ff.team1} / ${ff.team2}` : 'TBD';
  }
  return slot.name;
}

/** Build initial per-region state structure */
function initRegionState(regionId) {
  if (!state.regions[regionId]) {
    state.regions[regionId] = {
      rounds: [
        new Array(8).fill(null),  // R64 winners (8 games)
        new Array(4).fill(null),  // R32 winners
        new Array(2).fill(null),  // S16 winners
        new Array(1).fill(null),  // E8 winner
      ],
    };
  }
}

/** Count total non-null picks across all rounds */
function countPicks() {
  let n = 0;
  Object.values(state.regions).forEach(r => {
    r.rounds.forEach(round => round.forEach(w => { if (w) n++; }));
  });
  if (state.finalFour.sfWinner1) n++;
  if (state.finalFour.sfWinner2) n++;
  if (state.finalFour.champion) n++;
  return n;
}

// ── First Four rendering ───────────────────────────────────────────────

function renderFirstFour() {
  const container = document.getElementById('first-four-games');
  container.innerHTML = '';

  TOURNAMENT_DATA.firstFour.forEach(ff => {
    const region = TOURNAMENT_DATA.regions.find(r =>
      r.slots.some(s => s.firstFourId === ff.id)
    );
    const div = document.createElement('div');
    div.className = 'ff-game';

    div.innerHTML = `
      <div class="ff-game-label">${ff.region} Region — Seed ${ff.seed}</div>
      ${[ff.team1, ff.team2].map(team => `
        <div class="ff-team ${state.firstFour[ff.id] === team ? 'picked' : ''}"
             data-ffid="${ff.id}" data-team="${team}">
          <span class="seed-badge">${ff.seed}</span>
          <span class="team-name">${team}</span>
        </div>
      `).join('')}
    `;

    div.querySelectorAll('.ff-team').forEach(el => {
      el.addEventListener('click', () => {
        const ffid = el.dataset.ffid;
        const team = el.dataset.team;
        const prev = state.firstFour[ffid];
        state.firstFour[ffid] = (prev === team) ? null : team;
        // If the First Four winner changed, cascade-clear downstream picks
        if (prev !== state.firstFour[ffid]) {
          cascadeFirstFour(ffid);
        }
        saveState();
        render();
      });
    });

    container.appendChild(div);
  });
}

/** When a First Four result changes, clear any picks in the affected region that referenced TBD */
function cascadeFirstFour(ffId) {
  // Find which region/slot uses this firstFourId
  const region = TOURNAMENT_DATA.regions.find(r =>
    r.slots.some(s => s.firstFourId === ffId)
  );
  if (!region) return;
  const slotIdx = region.slots.findIndex(s => s.firstFourId === ffId);
  if (slotIdx < 0) return;
  const rs = state.regions[region.id];
  if (!rs) return;

  // Game index in R64 that contains this slot
  const gameIdx = Math.floor(slotIdx / 2);
  // Clear R64 winner for this game and cascade upward
  cascadeFromGame(region.id, 0, gameIdx);
}

/** Clear a game winner and all downstream picks that depended on it */
function cascadeFromGame(regionId, roundIdx, gameIdx) {
  const rs = state.regions[regionId];
  if (!rs) return;
  const prevWinner = rs.rounds[roundIdx][gameIdx];
  if (!prevWinner) return; // nothing to cascade

  rs.rounds[roundIdx][gameIdx] = null;

  // Next round: this game feeds into Math.floor(gameIdx/2) of roundIdx+1
  if (roundIdx + 1 < rs.rounds.length) {
    const nextGame = Math.floor(gameIdx / 2);
    const nextWinner = rs.rounds[roundIdx + 1][nextGame];
    // If the next-round winner was the team we just cleared, cascade further
    if (nextWinner === prevWinner) {
      cascadeFromGame(regionId, roundIdx + 1, nextGame);
    }
  } else {
    // This was the E8 winner — clear Final Four slot
    cascadeFinalFour(regionId, prevWinner);
  }
}

function cascadeFinalFour(regionId, removedTeam) {
  const ff = state.finalFour;
  // Which SF slot?
  if (regionId === 'east' || regionId === 'south') {
    const idx = regionId === 'east' ? 0 : 1;
    if (ff.sf1[idx] === removedTeam) {
      ff.sf1[idx] = null;
      if (ff.sfWinner1 === removedTeam) {
        ff.sfWinner1 = null;
        if (ff.champion === removedTeam) ff.champion = null;
      }
    }
  } else {
    const idx = regionId === 'west' ? 0 : 1;
    if (ff.sf2[idx] === removedTeam) {
      ff.sf2[idx] = null;
      if (ff.sfWinner2 === removedTeam) {
        ff.sfWinner2 = null;
        if (ff.champion === removedTeam) ff.champion = null;
      }
    }
  }
}

// ── Region bracket rendering ───────────────────────────────────────────

function renderRegion(region, side) {
  initRegionState(region.id);
  const container = document.getElementById(`region-${region.id}`);
  container.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.className = 'region-header';
  header.innerHTML = `
    <div class="region-dot" style="background:${region.color}"></div>
    <span class="region-name" style="color:${region.color}">${region.name}</span>
    <span class="region-seed1">#1: ${region.slots[0].name}</span>
  `;
  container.appendChild(header);

  const rs = state.regions[region.id];

  // Build the rounds wrapper
  const roundsDiv = document.createElement('div');
  roundsDiv.className = 'bracket-rounds';

  // We need 4 round columns + connectors between them
  // Columns in visual order: R64 → R32 → S16 → E8
  // For left side: R64 on far left, E8 near center
  // For right side: reversed (E8 near center, R64 on far right)

  const cols = [];

  for (let r = 0; r < 4; r++) {
    const gamesInRound = rs.rounds[r].length; // 8,4,2,1
    const col = document.createElement('div');
    col.className = 'round-col';

    // Label
    const lbl = document.createElement('div');
    lbl.className = 'round-label';
    lbl.textContent = ROUNDS[r];
    col.appendChild(lbl);

    for (let g = 0; g < gamesInRound; g++) {
      const gameEl = buildGameElement(region, r, g, rs, side);
      col.appendChild(gameEl);
    }
    cols.push(col);
  }

  // Add columns (and spacers) in the right visual order
  if (side === 'right') cols.reverse();

  cols.forEach((col, i) => {
    roundsDiv.appendChild(col);
    if (i < cols.length - 1) {
      const spacer = document.createElement('div');
      spacer.style.width = '6px';
      roundsDiv.appendChild(spacer);
    }
  });

  container.appendChild(roundsDiv);
}

function buildGameElement(region, roundIdx, gameIdx, rs, side) {
  const gameDiv = document.createElement('div');
  gameDiv.className = 'game';
  gameDiv.style.margin = '3px 0';

  const [top, bot] = getTeamsForGame(region, roundIdx, gameIdx, rs);
  const winner = rs.rounds[roundIdx][gameIdx];

  [top, bot].forEach((teamInfo, pos) => {
    const slot = document.createElement('div');
    slot.className = 'team-slot';

    const hasTeam = teamInfo && teamInfo.name;
    const isPicked = winner && winner === teamInfo?.name;
    const isEliminated = winner && !isPicked && hasTeam;
    const isClickable = hasTeam && teamInfo.name !== 'TBD' && !teamInfo.name.includes(' / ');

    if (isPicked) slot.classList.add('picked');
    if (isEliminated) slot.classList.add('eliminated');
    if (!hasTeam) slot.classList.add('empty');
    if (isClickable) slot.classList.add('clickable');

    slot.innerHTML = `
      ${hasTeam && teamInfo.seed ? `<span class="seed-badge">${teamInfo.seed}</span>` : ''}
      <span class="team-name">${teamInfo?.name || '—'}</span>
    `;

    if (isClickable) {
      slot.addEventListener('click', () => {
        pickWinner(region.id, roundIdx, gameIdx, teamInfo.name);
      });
    }

    gameDiv.appendChild(slot);
  });

  return gameDiv;
}

/** Get the two team objects {name, seed} for a game in a round */
function getTeamsForGame(region, roundIdx, gameIdx, rs) {
  if (roundIdx === 0) {
    // R64: pull directly from slots[]
    const slotA = region.slots[gameIdx * 2];
    const slotB = region.slots[gameIdx * 2 + 1];
    return [
      { seed: slotA.seed, name: resolveTeam(slotA) },
      { seed: slotB.seed, name: resolveTeam(slotB) },
    ];
  }

  // Later rounds: winners from previous round
  const prevRound = rs.rounds[roundIdx - 1];
  const nameA = prevRound[gameIdx * 2] || null;
  const nameB = prevRound[gameIdx * 2 + 1] || null;

  // Try to find seed from original slots
  const findSeed = (name) => {
    if (!name) return null;
    const slot = region.slots.find(s => resolveTeam(s) === name || s.name === name);
    return slot ? slot.seed : null;
  };

  return [
    nameA ? { name: nameA, seed: findSeed(nameA) } : { name: null, seed: null },
    nameB ? { name: nameB, seed: findSeed(nameB) } : { name: null, seed: null },
  ];
}

/** Handle clicking a team to pick them as the game winner */
function pickWinner(regionId, roundIdx, gameIdx, teamName) {
  const rs = state.regions[regionId];
  const prev = rs.rounds[roundIdx][gameIdx];

  if (prev === teamName) {
    // Toggle off: clear this and downstream
    cascadeFromGame(regionId, roundIdx, gameIdx);
  } else {
    // If switching from a different team, cascade-clear downstream first
    if (prev) cascadeFromGame(regionId, roundIdx, gameIdx);
    rs.rounds[roundIdx][gameIdx] = teamName;
  }

  // If this was the E8 (last region round), update Final Four
  if (roundIdx === 3) {
    updateFinalFourSlot(regionId, rs.rounds[3][0]);
  }

  saveState();
  render();
}

// ── Final Four ─────────────────────────────────────────────────────────

function updateFinalFourSlot(regionId, teamName) {
  const ff = state.finalFour;
  if (regionId === 'east')    { ff.sf1[0] = teamName; }
  else if (regionId === 'south')   { ff.sf1[1] = teamName; }
  else if (regionId === 'west')    { ff.sf2[0] = teamName; }
  else if (regionId === 'midwest') { ff.sf2[1] = teamName; }
}

function getFinalistSeed(regionId, name) {
  if (!name) return null;
  const region = TOURNAMENT_DATA.regions.find(r => r.id === regionId);
  if (!region) return null;
  const slot = region.slots.find(s => resolveTeam(s) === name || s.name === name);
  return slot ? slot.seed : null;
}

function renderFinalFour() {
  const ff = state.finalFour;

  // Semifinal 1: East vs South
  renderSemifinal('semifinal1', 'sf1-slot1', 'sf1-slot2',
    'east', 'south', ff.sf1[0], ff.sf1[1], ff.sfWinner1,
    (winner) => {
      if (ff.sfWinner1 === winner) {
        ff.sfWinner1 = null;
        if (ff.champion === winner) ff.champion = null;
      } else {
        ff.sfWinner1 = winner;
      }
      saveState();
      render();
    }
  );

  // Semifinal 2: West vs Midwest
  renderSemifinal('semifinal2', 'sf2-slot1', 'sf2-slot2',
    'west', 'midwest', ff.sf2[0], ff.sf2[1], ff.sfWinner2,
    (winner) => {
      if (ff.sfWinner2 === winner) {
        ff.sfWinner2 = null;
        if (ff.champion === winner) ff.champion = null;
      } else {
        ff.sfWinner2 = winner;
      }
      saveState();
      render();
    }
  );

  // Championship
  renderChampionship(ff.sfWinner1, ff.sfWinner2, ff.champion, (winner) => {
    ff.champion = (ff.champion === winner) ? null : winner;
    saveState();
    render();
  });
}

function renderSemifinal(sfId, slotId1, slotId2, regA, regB, teamA, teamB, sfWinner, onPick) {
  const sfEl = document.getElementById(sfId);
  sfEl.innerHTML = '';

  [[teamA, regA, slotId1], [teamB, regB, slotId2]].forEach(([team, regionId, slotId]) => {
    const slot = document.createElement('div');
    slot.className = 'sf-slot';
    slot.id = slotId;

    const seed = getFinalistSeed(regionId, team);
    const isEmpty = !team;
    const isPicked = sfWinner && sfWinner === team;

    if (isEmpty) slot.classList.add('empty');
    else slot.classList.add('has-team');
    if (isPicked) slot.classList.add('picked');

    slot.innerHTML = isEmpty
      ? `<span class="team-name">Awaiting ${TOURNAMENT_DATA.regions.find(r=>r.id===regionId)?.name} winner</span>`
      : `${seed ? `<span class="seed-badge">${seed}</span>` : ''}<span class="team-name">${team}</span>`;

    if (!isEmpty) {
      slot.addEventListener('click', () => onPick(team));
    }

    sfEl.appendChild(slot);
  });
}

function renderChampionship(teamA, teamB, champion, onPick) {
  const slot1 = document.getElementById('champ-slot1');
  const slot2 = document.getElementById('champ-slot2');
  const champName = document.getElementById('champion-name');

  [slot1, slot2].forEach((el, i) => {
    const team = i === 0 ? teamA : teamB;
    el.innerHTML = '';
    el.className = 'champ-slot';

    if (!team) {
      el.classList.add('empty');
      el.innerHTML = `<span class="team-name">TBD</span>`;
    } else {
      el.classList.add('has-team');
      if (champion === team) el.classList.add('picked');
      const seed = getFinalistSeedAny(team);
      el.innerHTML = `${seed ? `<span class="seed-badge">${seed}</span>` : ''}<span class="team-name">${team}</span>`;
      el.addEventListener('click', () => onPick(team));
    }
  });

  champName.textContent = champion || '—';
}

function getFinalistSeedAny(name) {
  for (const region of TOURNAMENT_DATA.regions) {
    const slot = region.slots.find(s => resolveTeam(s) === name || s.name === name);
    if (slot) return slot.seed;
  }
  return null;
}

// ── Main Render ────────────────────────────────────────────────────────

function render() {
  renderFirstFour();

  TOURNAMENT_DATA.regions.forEach(region => {
    const side = (region.id === 'east' || region.id === 'midwest') ? 'left' : 'right';
    renderRegion(region, side);
  });

  renderFinalFour();

  // Sync Final Four slots from region E8 winners (in case of region re-render)
  TOURNAMENT_DATA.regions.forEach(region => {
    const rs = state.regions[region.id];
    if (rs) {
      updateFinalFourSlot(region.id, rs.rounds[3][0]);
    }
  });

  // Update pick counter
  document.getElementById('pick-counter').textContent = `${countPicks()} / 63 picks made`;
}

// ── Reset ──────────────────────────────────────────────────────────────

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset your entire bracket? This cannot be undone.')) {
    state = {
      firstFour: {},
      regions: {},
      finalFour: { sf1: [null, null], sf2: [null, null], sfWinner1: null, sfWinner2: null, champion: null },
    };
    saveState();
    render();
  }
});

// ── Boot ───────────────────────────────────────────────────────────────

loadState();
// Ensure all region states are initialized
TOURNAMENT_DATA.regions.forEach(r => initRegionState(r.id));
render();
