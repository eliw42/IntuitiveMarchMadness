// 2026 NCAA Tournament Bracket Data
// 68 teams across 4 regions (East, West, Midwest, South)
// First Four play-in games resolve to 64-team bracket

const TOURNAMENT_DATA = {
  year: 2026,
  firstFour: [
    { id: 'ff1', region: 'West',    seed: 11, team1: 'Texas',          team2: 'NC State',         winner: null },
    { id: 'ff2', region: 'Midwest', seed: 16, team1: 'UMBC',           team2: 'Howard',           winner: null },
    { id: 'ff3', region: 'Midwest', seed: 11, team1: 'Miami (OH)',     team2: 'SMU',              winner: null },
    { id: 'ff4', region: 'South',  seed: 16, team1: 'Prairie View A&M', team2: 'Lehigh',         winner: null },
  ],
  regions: [
    {
      id: 'east',
      name: 'East',
      color: '#1e3a8a',
      finalist: null,
      // teams in bracket order: 1,16,8,9 | 5,12,4,13 | 6,11,3,14 | 7,10,2,15
      slots: [
        { seed: 1,  name: 'Duke',               firstFourId: null },
        { seed: 16, name: 'Siena',              firstFourId: null },
        { seed: 8,  name: 'Ohio State',         firstFourId: null },
        { seed: 9,  name: 'TCU',                firstFourId: null },
        { seed: 5,  name: "St. John's",         firstFourId: null },
        { seed: 12, name: 'Northern Iowa',      firstFourId: null },
        { seed: 4,  name: 'Kansas',             firstFourId: null },
        { seed: 13, name: 'Cal Baptist',        firstFourId: null },
        { seed: 6,  name: 'Louisville',         firstFourId: null },
        { seed: 11, name: 'South Florida',      firstFourId: null },
        { seed: 3,  name: 'Michigan State',     firstFourId: null },
        { seed: 14, name: 'North Dakota State', firstFourId: null },
        { seed: 7,  name: 'UCLA',               firstFourId: null },
        { seed: 10, name: 'UCF',                firstFourId: null },
        { seed: 2,  name: 'UConn',              firstFourId: null },
        { seed: 15, name: 'Furman',             firstFourId: null },
      ],
    },
    {
      id: 'west',
      name: 'West',
      color: '#7c3aed',
      finalist: null,
      slots: [
        { seed: 1,  name: 'Arizona',        firstFourId: null },
        { seed: 16, name: 'LIU',            firstFourId: null },
        { seed: 8,  name: 'Villanova',      firstFourId: null },
        { seed: 9,  name: 'Utah State',     firstFourId: null },
        { seed: 5,  name: 'Wisconsin',      firstFourId: null },
        { seed: 12, name: 'High Point',     firstFourId: null },
        { seed: 4,  name: 'Arkansas',       firstFourId: null },
        { seed: 13, name: 'Hawaii',         firstFourId: null },
        { seed: 6,  name: 'BYU',            firstFourId: null },
        { seed: 11, name: 'TBD',            firstFourId: 'ff1' }, // Texas vs NC State
        { seed: 3,  name: 'Gonzaga',        firstFourId: null },
        { seed: 14, name: 'Kennesaw State', firstFourId: null },
        { seed: 7,  name: 'Miami (FL)',     firstFourId: null },
        { seed: 10, name: 'Missouri',       firstFourId: null },
        { seed: 2,  name: 'Purdue',         firstFourId: null },
        { seed: 15, name: 'Queens',         firstFourId: null },
      ],
    },
    {
      id: 'midwest',
      name: 'Midwest',
      color: '#b45309',
      finalist: null,
      slots: [
        { seed: 1,  name: 'Michigan',        firstFourId: null },
        { seed: 16, name: 'TBD',             firstFourId: 'ff2' }, // UMBC vs Howard
        { seed: 8,  name: 'Georgia',         firstFourId: null },
        { seed: 9,  name: 'Saint Louis',     firstFourId: null },
        { seed: 5,  name: 'Texas Tech',      firstFourId: null },
        { seed: 12, name: 'Akron',           firstFourId: null },
        { seed: 4,  name: 'Alabama',         firstFourId: null },
        { seed: 13, name: 'Hofstra',         firstFourId: null },
        { seed: 6,  name: 'Tennessee',       firstFourId: null },
        { seed: 11, name: 'TBD',             firstFourId: 'ff3' }, // Miami (OH) vs SMU
        { seed: 3,  name: 'Virginia',        firstFourId: null },
        { seed: 14, name: 'Wright State',    firstFourId: null },
        { seed: 7,  name: 'Kentucky',        firstFourId: null },
        { seed: 10, name: 'Santa Clara',     firstFourId: null },
        { seed: 2,  name: 'Iowa State',      firstFourId: null },
        { seed: 15, name: 'Tennessee State', firstFourId: null },
      ],
    },
    {
      id: 'south',
      name: 'South',
      color: '#065f46',
      finalist: null,
      slots: [
        { seed: 1,  name: 'Florida',     firstFourId: null },
        { seed: 16, name: 'TBD',         firstFourId: 'ff4' }, // Prairie View A&M vs Lehigh
        { seed: 8,  name: 'Clemson',     firstFourId: null },
        { seed: 9,  name: 'Iowa',        firstFourId: null },
        { seed: 5,  name: 'Vanderbilt',  firstFourId: null },
        { seed: 12, name: 'McNeese',     firstFourId: null },
        { seed: 4,  name: 'Nebraska',    firstFourId: null },
        { seed: 13, name: 'Troy',        firstFourId: null },
        { seed: 6,  name: 'North Carolina', firstFourId: null },
        { seed: 11, name: 'VCU',         firstFourId: null },
        { seed: 3,  name: 'Illinois',    firstFourId: null },
        { seed: 14, name: 'Penn',        firstFourId: null },
        { seed: 7,  name: "Saint Mary's", firstFourId: null },
        { seed: 10, name: 'Texas A&M',   firstFourId: null },
        { seed: 2,  name: 'Houston',     firstFourId: null },
        { seed: 15, name: 'Idaho',       firstFourId: null },
      ],
    },
  ],
  // Final Four pairings: East vs South, West vs Midwest
  finalFour: {
    semifinal1: { regions: ['east', 'south'], winner: null },
    semifinal2: { regions: ['west', 'midwest'], winner: null },
    championship: { winner: null },
  },
};
