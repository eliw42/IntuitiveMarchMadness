// School info database — keyed by exact team name used in data.js
// espnId: used for logo CDN; null = use emoji fallback
// color1/color2: primary/secondary hex colors for card theming

const SCHOOLS = {
  'Akron': {
    espnId: 2006, mascot: 'Zips', emoji: '🦘',
    color1: '#041E42', color2: '#B3A369',
    city: 'Akron, OH',
    facts: [
      'Named "Zips" after a type of rubber overshoe once made in Akron',
      'Akron was once known as the "Rubber Capital of the World"',
      'James A. Rhodes Arena opened in 1983 and seats over 5,500'
    ],
    alumni: ['Chrissie Hynde — founder of The Pretenders', 'Bob Golic — NFL All-Pro & TV personality', 'Marc Dann — Ohio Attorney General']
  },
  'Alabama': {
    espnId: 333, mascot: 'Crimson Tide', emoji: '🐘',
    color1: '#9E1B32', color2: '#FFFFFF',
    city: 'Tuscaloosa, AL',
    facts: [
      'Coleman Coliseum has hosted basketball since 1968',
      'The elephant mascot "Big Al" has been around since the 1930s',
      'Alabama has won 18 national championships across all sports'
    ],
    alumni: ['Harper Lee — author of To Kill a Mockingbird', 'Sela Ward — Emmy-winning actress', 'Joe Namath — Super Bowl III MVP quarterback']
  },
  'Arizona': {
    espnId: 12, mascot: 'Wildcats', emoji: '🐱',
    color1: '#CC0033', color2: '#003366',
    city: 'Tucson, AZ',
    facts: [
      'McKale Center, opened 1973, is one of the toughest home-court advantages in the country',
      'Arizona has made the Final Four six times',
      'The "Bear Down" rally cry dates to a 1926 football captain\'s dying words'
    ],
    alumni: ['Gabrielle Giffords — U.S. Congresswoman & gun-safety advocate', 'Linda Ronstadt — Rock & Country Music Hall of Fame inductee', 'Lynda Carter — actress, original Wonder Woman']
  },
  'Arizona State': {
    espnId: 9, mascot: 'Sun Devils', emoji: '😈',
    color1: '#8C1D40', color2: '#FFC627',
    city: 'Tempe, AZ',
    facts: [
      'Desert Financial Arena holds 14,198 fans and opened in 1974',
      'The Sun Devil mascot "Sparky" was designed by Bert Anthony in 1946',
      'ASU joined the Pac-12 in 1978'
    ],
    alumni: ['Phil Mickelson — Masters champion golfer', 'David Spade — comedian & Saturday Night Live alumnus', 'Pat Tillman — Army Ranger who gave up an NFL career']
  },
  'Arkansas': {
    espnId: 8, mascot: 'Razorbacks', emoji: '🐗',
    color1: '#9D2235', color2: '#FFFFFF',
    city: 'Fayetteville, AR',
    facts: [
      'Bud Walton Arena is one of the loudest venues in college basketball',
      'Nolan Richardson\'s 40-Minutes of Hell defense won the 1994 national championship',
      'The famous "Woo Pig Sooie" cheer dates back to the 1920s'
    ],
    alumni: ['Jerry Jones — Dallas Cowboys owner & GM', 'Billy Bob Thornton — Academy Award-winning actor/director', 'John L. McClellan — longtime U.S. Senator']
  },
  'Baylor': {
    espnId: 239, mascot: 'Bears', emoji: '🐻',
    color1: '#154734', color2: '#FFB81C',
    city: 'Waco, TX',
    facts: [
      'Baylor won its first men\'s basketball national championship in 2021',
      'Foster Pavilion opened in 2024 as one of the most modern arenas in the country',
      'Baylor is the largest Baptist university in the world'
    ],
    alumni: ['Robert Griffin III — Heisman Trophy winner & NFL quarterback', 'Chip Gaines — HGTV Fixer Upper star & entrepreneur', 'Drayton McLane — Houston Astros owner']
  },
  'BYU': {
    espnId: 252, mascot: 'Cougars', emoji: '🦁',
    color1: '#002E5D', color2: '#FFFFFF',
    city: 'Provo, UT',
    facts: [
      'The Marriott Center holds 19,000 and is one of the largest on-campus arenas',
      'BYU athletes must adhere to the university\'s Honor Code',
      'The Cougars joined the Big 12 Conference in 2023'
    ],
    alumni: ['Steve Young — Hall of Fame NFL quarterback & Super Bowl MVP', 'Ty Detmer — 1990 Heisman Trophy winner', 'Danny Ainge — NBA player and Boston Celtics executive']
  },
  'Cal Baptist': {
    espnId: 2856, mascot: 'Lancers', emoji: '⚔️',
    color1: '#00245D', color2: '#C8A951',
    city: 'Riverside, CA',
    facts: [
      'Cal Baptist moved from NCAA Division II to Division I in 2019',
      'The Lancers\' arena, the CBU Events Center, opened in 2018',
      'CBU is one of the fastest-growing Christian universities in the U.S.'
    ],
    alumni: ['Bryan Stevenson — CBU has notable faith-community ties', 'Rob Eyman — civic leader', 'Part of the Western Athletic Conference']
  },
  'Charleston': {
    espnId: 2081, mascot: 'Cougars', emoji: '🐆',
    color1: '#532D8E', color2: '#FFFFFF',
    city: 'Charleston, SC',
    facts: [
      'College of Charleston is the oldest municipal college in the U.S., founded 1770',
      'The TD Arena was renovated in 2008 and seats 5,100',
      'CofC became a national story after its 2023 NCAA Tournament run'
    ],
    alumni: ['Stephen Colbert — comedian & late-night host (attended 1 year)', 'DuBose Heyward — author of Porgy & Bess', 'Joseph Riley Jr. — longtime Charleston mayor']
  },
  'Clemson': {
    espnId: 228, mascot: 'Tigers', emoji: '🐯',
    color1: '#F56600', color2: '#522D80',
    city: 'Clemson, SC',
    facts: [
      'Littlejohn Coliseum holds nearly 10,000 fans and opened in 1968',
      'Clemson has an agricultural history — it was founded as an agricultural college in 1889',
      'The "Death Valley" football stadium is the most famous thing on campus, but the basketball program has grown dramatically'
    ],
    alumni: ['Trevor Lawrence — NFL quarterback drafted #1 overall', 'DeAndre Hopkins — All-Pro NFL wide receiver', 'C.J. Spiller — NFL running back']
  },
  'Colorado': {
    espnId: 38, mascot: 'Buffaloes', emoji: '🦬',
    color1: '#CFB87C', color2: '#000000',
    city: 'Boulder, CO',
    facts: [
      'CU Boulder sits at 5,430 feet elevation, giving home teams an altitude advantage',
      'The "Buffs" nickname dates to 1934',
      'CU Boulder has produced more than 50 Rhodes Scholars'
    ],
    alumni: ['Chauncey Billups — NBA champion & executive', 'Glenn Miller — jazz bandleader (briefly attended)', 'Byron White — NFL star & U.S. Supreme Court Justice']
  },
  'Colorado State': {
    espnId: 36, mascot: 'Rams', emoji: '🐏',
    color1: '#1E4D2B', color2: '#C8C372',
    city: 'Fort Collins, CO',
    facts: [
      'Moby Arena was once called "the House that Lew built" for coach Lew Aston',
      'CSU was founded in 1870 as Colorado Agricultural College',
      'Fort Collins is consistently ranked one of the best places to live in the U.S.'
    ],
    alumni: ['Temple Grandin — animal scientist & autism advocate (grad school)', 'Dave Logan — Denver Broncos wide receiver & sportscaster', 'Jesse Eisenberg — no, not CSU. Temple Grandin is the most famous.']
  },
  'Duke': {
    espnId: 150, mascot: 'Blue Devils', emoji: '😈',
    color1: '#003087', color2: '#FFFFFF',
    city: 'Durham, NC',
    facts: [
      'Cameron Indoor Stadium (capacity 9,314) is famous for the "Cameron Crazies" student section',
      'Duke has won 5 national championships (1991, 1992, 2001, 2010, 2015)',
      'Coach Mike Krzyzewski won 1,202 games, the most in Division I history'
    ],
    alumni: ['Tim Cook — Apple CEO', 'Melinda French Gates — philanthropist & tech executive', 'Elizabeth Dole — U.S. Senator & Cabinet secretary']
  },
  'Fairfield': {
    espnId: 2210, mascot: 'Stags', emoji: '🦌',
    color1: '#8B0000', color2: '#FFFFFF',
    city: 'Fairfield, CT',
    facts: [
      'Fairfield University is a Jesuit school founded in 1942',
      'The Webster Bank Arena in Bridgeport hosts Fairfield home games',
      'Fairfield won the MAAC Championship in 2024 for a Cinderella Tournament run'
    ],
    alumni: ['Brian P. Kelly — sports executive', 'Pat Ewing Jr. — basketball coach (son of Patrick Ewing)', 'Part of the Metro Atlantic Athletic Conference']
  },
  'Fairleigh Dickinson': {
    espnId: 2216, mascot: 'Knights', emoji: '⚔️',
    color1: '#002868', color2: '#BF0A30',
    city: 'Hackensack, NJ',
    facts: [
      'FDU shocked Purdue as a 16-seed in the 2023 tournament — one of the biggest upsets ever',
      'Fairleigh Dickinson was founded in 1942 by Peter Sammartino',
      'FDU\'s mascot is a knight, reflecting its motto of academic excellence and strength'
    ],
    alumni: ['Peter Sammartino — educator and founder', 'Frank Catania — New Jersey Assembly member', 'Known for producing business and education leaders']
  },
  'Florida': {
    espnId: 57, mascot: 'Gators', emoji: '🐊',
    color1: '#0021A5', color2: '#FA4616',
    city: 'Gainesville, FL',
    facts: [
      'Florida won back-to-back national championships in 2006 and 2007',
      'The O\'Connell Center holds 12,000 fans',
      'Florida is the only school to hold both the football and basketball national championships simultaneously (2006-07)'
    ],
    alumni: ['Emmitt Smith — NFL all-time rushing leader', 'Bob Graham — Florida Governor & U.S. Senator', 'Faye Dunaway — Academy Award-winning actress']
  },
  'Furman': {
    espnId: 231, mascot: 'Paladins', emoji: '⚔️',
    color1: '#582C83', color2: '#FFFFFF',
    city: 'Greenville, SC',
    facts: [
      'Furman is a private liberal arts university founded in 1826',
      'The Paladins famously upset Virginia in the 2023 NCAA Tournament',
      '"Paladin" refers to a legendary knight or champion — perfect for tournament upsets'
    ],
    alumni: ['Charles Townes — Nobel Prize winner in Physics (invented the laser!)', 'Ron Carter — legendary jazz bassist', 'James B. Edwards — U.S. Secretary of Energy']
  },
  'Georgia': {
    espnId: 61, mascot: 'Bulldogs', emoji: '🐶',
    color1: '#BA0C2F', color2: '#000000',
    city: 'Athens, GA',
    facts: [
      'Stegeman Coliseum seats 10,523 and opened in 1964',
      'UGA is the oldest state-chartered university in the U.S. (1785)',
      'The "Sanford Stadium between the hedges" is for football; basketball has its own passionate following'
    ],
    alumni: ['Herschel Walker — Heisman Trophy winner & NFL star', 'Kim Basinger — Academy Award-winning actress', 'Michael Stipe — R.E.M. lead singer']
  },
  'Gonzaga': {
    espnId: 2250, mascot: 'Bulldogs', emoji: '🐶',
    color1: '#002469', color2: '#CC0000',
    city: 'Spokane, WA',
    facts: [
      'The McCarthey Athletic Center seats 6,000 and is one of the most intimidating small arenas in the country',
      'Gonzaga has made the NCAA Tournament every year since 1999',
      'The Zags have produced nine NBA first-round draft picks since 2016'
    ],
    alumni: ['Bing Crosby — legendary singer & actor (attended law school)', 'John Stockton — NBA Hall of Fame point guard', 'Kelly Olynyk — NBA center']
  },
  'Green Bay': {
    espnId: 2699, mascot: 'Phoenix', emoji: '🦅',
    color1: '#006341', color2: '#003865',
    city: 'Green Bay, WI',
    facts: [
      'UW-Green Bay was founded in 1965 as a young public university',
      'The Kress Events Center seats 5,100 fans',
      'Green Bay is nicknamed "Titletown" thanks to its famous NFL team'
    ],
    alumni: ['Brian Burke — NHL executive', 'Todd Stottlemyre — MLB pitcher', 'Known for strong education and public service graduates']
  },
  'Hawaii': {
    espnId: 62, mascot: 'Rainbow Warriors', emoji: '🌈',
    color1: '#024694', color2: '#FFFFFF',
    city: 'Honolulu, HI',
    facts: [
      'The Stan Sheriff Center seats 10,300 and overlooks Manoa Valley',
      'Hawaii is the only Division I school located in the Pacific islands',
      'The team travels farther to away games than any other D-I program'
    ],
    alumni: ['Don Ho — legendary Hawaiian entertainer', 'Carrie Ann Inaba — Dancing with the Stars judge', 'Michelle Wie West — LPGA golf champion']
  },
  'High Point': {
    espnId: 2497, mascot: 'Panthers', emoji: '🐾',
    color1: '#4B0082', color2: '#FFFFFF',
    city: 'High Point, NC',
    facts: [
      'High Point University has undergone a dramatic transformation under President Nido Qubein',
      'The Qubein Arena opened in 2021 as one of the most state-of-the-art mid-major venues',
      'High Point is known as the "Furniture Capital of the World"'
    ],
    alumni: ['Nido Qubein — motivational speaker & university president', 'Ralph Lauren has partnerships with HPU\'s design programs', 'Growing program in the Big South Conference']
  },
  'Hofstra': {
    espnId: 2199, mascot: 'Pride', emoji: '🦁',
    color1: '#00589C', color2: '#FFC72C',
    city: 'Hempstead, NY',
    facts: [
      'Hofstra is located on Long Island, just 25 miles from New York City',
      'The Pride men\'s basketball team has won multiple Colonial Athletic Association titles',
      'Hofstra hosted the famous 2008 Presidential Debate between Obama and McCain'
    ],
    alumni: ['Phil Spector — legendary and controversial record producer', 'Madeline Kahn — actress & comedian', 'Ed McMahon — Tonight Show announcer (attended briefly)']
  },
  'Holy Cross': {
    espnId: 2142, mascot: 'Crusaders', emoji: '⚔️',
    color1: '#602D89', color2: '#FFFFFF',
    city: 'Worcester, MA',
    facts: [
      'Holy Cross is one of the oldest Jesuit colleges in New England, founded 1843',
      'Hart Center holds 3,600 fans for an intimate atmosphere',
      'Bob Cousy played for Holy Cross before the NBA — helping put the school on the map'
    ],
    alumni: ['Clarence Thomas — U.S. Supreme Court Justice', 'Bob Cousy — NBA Hall of Famer & "Houdini of the Hardwood"', 'Chris Matthews — political commentator']
  },
  'Houston': {
    espnId: 248, mascot: 'Cougars', emoji: '🐱',
    color1: '#C8102E', color2: '#FFFFFF',
    city: 'Houston, TX',
    facts: [
      'Fertitta Center opened in 2018 and holds 7,100 fans',
      'Kelvin Sampson has built Houston into a consistent top-10 program',
      'Houston\'s "Phi Slama Jama" teams of the 1980s with Hakeem Olajuwon are basketball royalty'
    ],
    alumni: ['Carl Lewis — nine Olympic gold medals in track & field', 'Dennis Quaid — Hollywood actor', 'Bun B — pioneering Houston rapper']
  },
  'Howard': {
    espnId: 47, mascot: 'Bison', emoji: '🦬',
    color1: '#003A63', color2: '#E51937',
    city: 'Washington, D.C.',
    facts: [
      'Howard University is one of America\'s most prestigious HBCUs, founded in 1867',
      'Burr Gymnasium seats 2,700 and has an electric atmosphere',
      'Howard\'s campus is located in the LeDroit Park neighborhood of D.C.'
    ],
    alumni: ['Thurgood Marshall — first African American U.S. Supreme Court Justice', 'Kamala Harris — 49th Vice President of the United States', 'Chadwick Boseman — actor, Black Panther']
  },
  'Idaho': {
    espnId: 70, mascot: 'Vandals', emoji: '⚔️',
    color1: '#B3A369', color2: '#000000',
    city: 'Moscow, ID',
    facts: [
      'The ICCU Arena holds 4,479 fans in a classic college-town setting',
      'Idaho is known for potato farming — they produce a third of U.S. potatoes',
      'The Vandals play in the Big Sky Conference'
    ],
    alumni: ['Frank Church — influential U.S. Senator & champion of civil liberties', 'Lana Turner — actress (grew up in Idaho)', 'Sarah Palin attended briefly (transferred elsewhere)']
  },
  'Illinois': {
    espnId: 356, mascot: 'Fighting Illini', emoji: '🏹',
    color1: '#E84A27', color2: '#13294B',
    city: 'Champaign, IL',
    facts: [
      'State Farm Center holds 15,544 and is one of the largest on-campus arenas',
      'Illinois reached the 2005 national championship game with a 37-2 record',
      'The Illini won 16 Big Ten Championships in basketball'
    ],
    alumni: ['Hugh Hefner — founder of Playboy magazine', 'Roger Ebert — Pulitzer Prize-winning film critic', 'Nick Offerman — actor, Parks and Recreation']
  },
  'Iowa': {
    espnId: 2294, mascot: 'Hawkeyes', emoji: '🦅',
    color1: '#FFCD00', color2: '#000000',
    city: 'Iowa City, IA',
    facts: [
      'Carver-Hawkeye Arena seats 15,500 and opened in 1983',
      'Caitlin Clark set the all-time NCAA scoring record at Iowa in 2024',
      'The Iowa Writers\' Workshop is the most prestigious creative writing program in the U.S.'
    ],
    alumni: ['Ashton Kutcher — actor & tech investor (briefly attended)', 'Gene Wilder — beloved actor & comedian (MFA graduate)', 'Tom Brokaw — NBC News anchor (attended briefly)']
  },
  'Iowa State': {
    espnId: 66, mascot: 'Cyclones', emoji: '🌪️',
    color1: '#C8102E', color2: '#F1BE48',
    city: 'Ames, IA',
    facts: [
      'Hilton Coliseum is nicknamed "Hilton Magic" for its legendary home-court atmosphere',
      'Iowa State is one of America\'s first land-grant universities (1858)',
      'Fred Hoiberg ("The Mayor") played and coached at Iowa State'
    ],
    alumni: ['George Washington Carver — pioneering agricultural scientist (studied here)', 'Carrie Chapman Catt — women\'s suffrage leader', 'Wallace Carothers — chemist who invented nylon']
  },
  'Jacksonville': {
    espnId: 2317, mascot: 'Dolphins', emoji: '🐬',
    color1: '#006341', color2: '#FFFFFF',
    city: 'Jacksonville, FL',
    facts: [
      'Jacksonville University hosted the 1970 NBA Finals',
      'The Dolphins play in the Atlantic Sun Conference',
      'JU sits on the St. Johns River in Jacksonville'
    ],
    alumni: ['Artis Gilmore — NBA Hall of Fame center who played at JU', 'Rex Morgan — comic strip character named after the school', 'Graduates known for careers in healthcare and business']
  },
  'James Madison': {
    espnId: 256, mascot: 'Dukes', emoji: '👑',
    color1: '#450084', color2: '#CBB677',
    city: 'Harrisonburg, VA',
    facts: [
      'JMU is named after the 4th U.S. President, who hailed from Virginia',
      'The Convocation Center seats 7,156 in the Shenandoah Valley',
      'JMU joined the Sun Belt Conference in 2023'
    ],
    alumni: ['Laura Ingraham — political commentator & TV host', 'Wayne McLaughlin — entrepreneur', 'Evan Feinberg — political leader']
  },
  'Kansas': {
    espnId: 2305, mascot: 'Jayhawks', emoji: '🦅',
    color1: '#0051A5', color2: '#E8000D',
    city: 'Lawrence, KS',
    facts: [
      'Allen Fieldhouse (1955) holds 16,300 and is considered the greatest basketball venue in college sports',
      'Kansas has won 3 national championships: 1952, 1988, and 2022',
      'The "Rock Chalk Jayhawk" chant is one of college sports\' most iconic traditions'
    ],
    alumni: ['Wilt Chamberlain — NBA legend who once scored 100 points in a game', 'Paul Pierce — NBA champion & Hall of Famer', 'Langston Hughes — celebrated poet (briefly attended)']
  },
  'Kennesaw State': {
    espnId: 2927, mascot: 'Owls', emoji: '🦉',
    color1: '#FDBB30', color2: '#000000',
    city: 'Kennesaw, GA',
    facts: [
      'KSU only moved to Division I in 2005 — one of the newest D-I programs',
      'The Owls play in the Atlantic Sun Conference',
      'Kennesaw State is one of the fastest-growing universities in Georgia'
    ],
    alumni: ['Jennifer Carroll Foy — Virginia politician', 'Graduates are primarily known for careers in business and technology', 'The university has grown from 1,000 students (1966) to over 45,000']
  },
  'Kentucky': {
    espnId: 96, mascot: 'Wildcats', emoji: '🐱',
    color1: '#0033A0', color2: '#FFFFFF',
    city: 'Lexington, KY',
    facts: [
      'Rupp Arena held 23,500 — the largest on-campus arena in the country until 2023',
      'Kentucky has won 8 national championships, the most in SEC history',
      'Coach Adolph Rupp won 876 games and 4 titles'
    ],
    alumni: ['Ashley Judd — actress & activist', 'Tim Couch — #1 overall NFL Draft pick', 'Dan Issel — NBA Hall of Famer']
  },
  'Lehigh': {
    espnId: 2350, mascot: 'Mountain Hawks', emoji: '🦅',
    color1: '#653819', color2: '#FFFFFF',
    city: 'Bethlehem, PA',
    facts: [
      'Lehigh famously upset #2 seed Duke in the 2012 NCAA Tournament as a 15-seed',
      'Stabler Arena opened in 1979 and seats 5,600 fans',
      'Lehigh was founded in 1865 by Asa Packer, a railroad magnate'
    ],
    alumni: ['Lee Iacocca — Chrysler CEO who saved the company from bankruptcy', 'Dan Cortese — MTV host & actor', 'Bethlehem Steel was once the world\'s second-largest steel producer, near Lehigh\'s campus']
  },
  'LIU': {
    espnId: 305, mascot: 'Sharks', emoji: '🦈',
    color1: '#003DA5', color2: '#FFFFFF',
    city: 'Brookville, NY',
    facts: [
      'LIU merged its Brooklyn and Post campuses athletic programs in 2019',
      'The Sharks play in the Northeast Conference',
      'LIU won NIT titles in 1939 and 1941 — among the early basketball powerhouses'
    ],
    alumni: ['Graduates prominent in the New York business community', 'Phil Jackson? No — but LIU is close to his NBA stomping grounds', 'LIU Brooklyn alumni include many prominent NY community leaders']
  },
  'Louisville': {
    espnId: 97, mascot: 'Cardinals', emoji: '🐦',
    color1: '#AD0000', color2: '#000000',
    city: 'Louisville, KY',
    facts: [
      'KFC Yum! Center (capacity 22,090) opened in 2010 and is one of the largest arenas in college basketball',
      'Louisville won national championships in 1980, 1986, and 2013',
      'The Cardinals are a member of the Atlantic Coast Conference'
    ],
    alumni: ['Diane Sawyer — ABC News anchor & journalist', 'Hunter S. Thompson — gonzo journalist (briefly attended)', 'Darrell Griffith — NBA All-Star nicknamed "Dr. Dunkenstein"']
  },
  'LSU': {
    espnId: 99, mascot: 'Tigers', emoji: '🐯',
    color1: '#461D7C', color2: '#FDD023',
    city: 'Baton Rouge, LA',
    facts: [
      'The Pete Maravich Assembly Center holds 13,972 fans',
      'Pete "Pistol Pete" Maravich averaged 44.2 points per game — the all-time NCAA record',
      'LSU women\'s basketball won the 2023 national championship under Kim Mulkey'
    ],
    alumni: ['Shaquille O\'Neal — NBA champion & Hall of Famer', 'Odell Beckham Jr. — NFL wide receiver', 'Huey Long — Louisiana Governor & U.S. Senator']
  },
  'Maryland': {
    espnId: 120, mascot: 'Terrapins', emoji: '🐢',
    color1: '#E03A3E', color2: '#FFD520',
    city: 'College Park, MD',
    facts: [
      'Xfinity Center holds 17,950 and opened in 2002',
      'Maryland won the national championship in 2002 led by Juan Dixon',
      'Maryland\'s red, white, black & gold colors come from the Maryland state flag'
    ],
    alumni: ['Jim Henson — creator of The Muppets', 'Wale — Grammy-winning rapper', 'Kevin Durant attended briefly before going to Texas']
  },
  'McNeese': {
    espnId: 2393, mascot: 'Cowboys', emoji: '🤠',
    color1: '#00539B', color2: '#FFC72C',
    city: 'Lake Charles, LA',
    facts: [
      'McNeese State is in the Southland Conference',
      'The Legacy Center holds 8,000 fans for Cowboys home games',
      'McNeese made the NCAA Tournament in 2024 and 2025 as a low-seed Cinderella'
    ],
    alumni: ['Drew Brees? No — but he\'s from Louisiana', 'Chris Fonoti — NFL offensive lineman', 'Graduates known for careers in energy and petroleum industries in southwest Louisiana']
  },
  'Miami (FL)': {
    espnId: 2390, mascot: 'Hurricanes', emoji: '🌀',
    color1: '#005030', color2: '#F47321',
    city: 'Coral Gables, FL',
    facts: [
      'The Watsco Center holds 7,972 and sits on the beautiful Coral Gables campus',
      'Jim Larrañaga rebuilt Miami basketball into a national contender',
      'Miami reached the Final Four in 2023 — their deepest tournament run ever'
    ],
    alumni: ['Dwayne "The Rock" Johnson — actor & entrepreneur (attended on football scholarship)', 'Gloria Estefan — Grammy-winning singer', 'Jon Secada — Grammy-winning singer']
  },
  'Miami (OH)': {
    espnId: 193, mascot: 'RedHawks', emoji: '🦅',
    color1: '#B61E2E', color2: '#FFFFFF',
    city: 'Oxford, OH',
    facts: [
      'Miami is known as the "Cradle of Coaches" — Woody Hayes, Bo Schembechler, and many others coached there',
      'Millett Hall holds 9,560 fans in the Mid-American Conference',
      'Miami was founded in 1809, making it one of the oldest universities in Ohio'
    ],
    alumni: ['Benjamin Harrison — 23rd U.S. President', 'Paul Ryan — U.S. Speaker of the House', 'Nick Lachey — singer & reality TV personality']
  },
  'Michigan': {
    espnId: 130, mascot: 'Wolverines', emoji: '🦡',
    color1: '#00274C', color2: '#FFCB05',
    city: 'Ann Arbor, MI',
    facts: [
      'Crisler Center holds 12,707 and has hosted Michigan basketball since 1967',
      'Michigan won the national championship in 1989 with the "Fab Five" era later dominating the early 1990s',
      'Ann Arbor is consistently rated one of the best college towns in America'
    ],
    alumni: ['Gerald Ford — 38th U.S. President', 'Larry Page — co-founder of Google', 'Madonna — pop music icon (briefly attended)']
  },
  'Michigan State': {
    espnId: 127, mascot: 'Spartans', emoji: '⚔️',
    color1: '#18453B', color2: '#FFFFFF',
    city: 'East Lansing, MI',
    facts: [
      'The Breslin Center holds 15,025 and opened in 1989',
      'Tom Izzo has led Michigan State to eight Final Fours — one of the greatest coaching runs in history',
      'Michigan State and Michigan play for the "Paul Bunyan Trophy" in football'
    ],
    alumni: ['Magic Johnson — NBA champion & Hall of Famer (attended 2 years)', 'James Caan — Godfather actor (briefly attended)', 'Earvin "Magic" Johnson is the most famous Spartan ever']
  },
  'Minnesota': {
    espnId: 135, mascot: 'Golden Gophers', emoji: '🦔',
    color1: '#7A0019', color2: '#FFB71B',
    city: 'Minneapolis, MN',
    facts: [
      '3M Arena at Mariucci holds 10,000 for Minnesota hockey; Williams Arena for basketball seats 14,321',
      'Williams Arena has a raised floor — the "Barn" is one of the quirkiest venues in college basketball',
      'Minnesota won the 1919 and 1937 national championships'
    ],
    alumni: ['Bob Dylan — Nobel Prize-winning singer-songwriter (briefly attended)', 'Jessica Lange — Academy Award-winning actress', 'Seymour Cray — father of the supercomputer']
  },
  'Missouri': {
    espnId: 142, mascot: 'Tigers', emoji: '🐯',
    color1: '#F1B82D', color2: '#000000',
    city: 'Columbia, MO',
    facts: [
      'Mizzou Arena holds 15,061 and opened in 2004',
      'Missouri was in the Big 12 before joining the SEC in 2012',
      'The Tiger Walk is a beloved tradition before home games'
    ],
    alumni: ['Brad Pitt — Oscar-winning actor (attended but didn\'t graduate)', 'Jon Hamm — actor, Mad Men (attended)', 'Sam Walton — Walmart founder (attended U of Missouri)']
  },
  'Missouri State': {
    espnId: 2623, mascot: 'Bears', emoji: '🐻',
    color1: '#4F0E27', color2: '#FFFFFF',
    city: 'Springfield, MO',
    facts: [
      'JQH Arena holds 11,000 — one of the best facilities in the Missouri Valley Conference',
      'Missouri State has a rich basketball history in the Missouri Valley',
      'Springfield is the 3rd-largest city in Missouri'
    ],
    alumni: ['Johnny Morris — founder of Bass Pro Shops', 'Darren McFadden? No — he went to Arkansas', 'Known for producing business leaders and educators in the Midwest']
  },
  'Murray State': {
    espnId: 2377, mascot: 'Racers', emoji: '🏇',
    color1: '#002144', color2: '#8AAAC8',
    city: 'Murray, KY',
    facts: [
      'CFSB Center holds 8,600 fans in western Kentucky',
      'Ja Morant played at Murray State before becoming an NBA All-Star',
      'The Racers play in the Missouri Valley Conference'
    ],
    alumni: ['Ja Morant — NBA All-Star & scoring champion (attended)', 'Isaiah Canaan — NBA guard', 'Popeye Jones — NBA veteran']
  },
  'NC State': {
    espnId: 152, mascot: 'Wolfpack', emoji: '🐺',
    color1: '#CC0000', color2: '#000000',
    city: 'Raleigh, NC',
    facts: [
      'PNC Arena holds 19,722 and is a state-of-the-art NBA/NCAA venue',
      'NC State\'s 1983 "Cardiac Pack" won the national championship in one of sports\' greatest Cinderella stories',
      'Coach Jim Valvano\'s "Don\'t Give Up, Don\'t Ever Give Up" ESPY speech is legendary'
    ],
    alumni: ['Jim Valvano — inspirational coach & sportscaster', 'Roman Gabriel — NFL MVP quarterback', 'Niklaus Wirth — computer scientist (graduate studies)']
  },
  'Nebraska': {
    espnId: 158, mascot: 'Cornhuskers', emoji: '🌽',
    color1: '#E41C38', color2: '#FEFDFA',
    city: 'Lincoln, NE',
    facts: [
      'Pinnacle Bank Arena seats 15,500 and opened in 2013',
      'Nebraska football is famous for "Memorial Stadium becoming Nebraska\'s 3rd-largest city" on game day',
      'Nebraska is the only state in the U.S. with a unicameral (one-house) legislature'
    ],
    alumni: ['Johnny Carson — The Tonight Show host (attended)', 'Tom Osborne — legendary football coach & U.S. Congressman', 'Gabrielle Union — actress & activist']
  },
  'North Carolina': {
    espnId: 153, mascot: 'Tar Heels', emoji: '🐏',
    color1: '#4B9CD3', color2: '#FFFFFF',
    city: 'Chapel Hill, NC',
    facts: [
      'The Dean Smith Center holds 21,750 — one of the largest arenas in college basketball',
      'UNC has won 6 national championships: 1957, 1982, 1993, 2005, 2009, 2017',
      'Dean Smith\'s coaching tree includes Larry Brown, Bill Guthridge, and Roy Williams'
    ],
    alumni: ['Michael Jordan — greatest basketball player of all time (attended)', 'James K. Polk — 11th U.S. President', 'Andy Griffith — beloved actor & comedian']
  },
  'North Dakota State': {
    espnId: 2449, mascot: 'Bison', emoji: '🦬',
    color1: '#005643', color2: '#FFC82E',
    city: 'Fargo, ND',
    facts: [
      'The Scheels Center holds 6,550 fans for Bison basketball',
      'NDSU football has won 9 FCS national championships — the most dominant dynasty in FCS history',
      'Fargo inspired a Coen Brothers movie but is actually a friendly, mid-sized city'
    ],
    alumni: ['Phil Jackson — 11-time NBA champion coach (attended)', 'Roger Maris — baseball legend who broke Babe Ruth\'s home run record (attended briefly)', 'Kurtwood Smith — actor, That \'70s Show']
  },
  'Northern Iowa': {
    espnId: 2534, mascot: 'Panthers', emoji: '🐾',
    color1: '#4B116F', color2: '#FFCC00',
    city: 'Cedar Falls, IA',
    facts: [
      'The McLeod Center holds 7,052 fans for Panthers games',
      'Northern Iowa pulled off one of the biggest upsets in NCAA history, beating #1 Kansas in 2010',
      'UNI has won 30 Missouri Valley Conference titles'
    ],
    alumni: ['Ron Dotzler — civic leader', 'Randy Shekiro — business executive', 'UNI is known for its education and business programs']
  },
  'Notre Dame': {
    espnId: 87, mascot: 'Fighting Irish', emoji: '☘️',
    color1: '#0C2340', color2: '#AE9142',
    city: 'Notre Dame, IN',
    facts: [
      'Purcell Pavilion holds 9,149 and has an electric atmosphere under the famous Golden Dome',
      'Notre Dame is one of America\'s most iconic universities, founded by French priests in 1842',
      'The "Play Like a Champion Today" sign in the football locker room is legendary'
    ],
    alumni: ['Joe Montana — four-time Super Bowl champion quarterback', 'Jerome Bettis — NFL Hall of Fame running back', 'Regis Philbin — beloved TV personality']
  },
  'Ohio State': {
    espnId: 194, mascot: 'Buckeyes', emoji: '🌰',
    color1: '#BB0000', color2: '#666666',
    city: 'Columbus, OH',
    facts: [
      'Value City Arena / Schottenstein Center holds 19,049 and is one of the Big Ten\'s premier venues',
      'Ohio State has won one national championship (1960) and appeared in the Final Four six times',
      'The Buckeye nut is considered a good luck charm in Ohio'
    ],
    alumni: ['Jesse Owens — won four Olympic gold medals at the 1936 Berlin Olympics', 'Jack Nicklaus — greatest golfer of all time (18 major championships)', 'John Glenn — first American to orbit Earth']
  },
  'Oklahoma': {
    espnId: 201, mascot: 'Sooners', emoji: '🏃',
    color1: '#841617', color2: '#FDF9D8',
    city: 'Norman, OK',
    facts: [
      'Lloyd Noble Center seats 11,100 fans for Sooners basketball',
      'Oklahoma won the national championship in 2024 in softball — part of an athletic powerhouse',
      'The "Sooner Schooner" wagon rides onto the football field after every touchdown'
    ],
    alumni: ['Sam Bradford — Heisman Trophy winner & #1 NFL Draft pick', 'Blake Griffin — NBA All-Star & Slam Dunk champion', 'James Garner — acclaimed actor']
  },
  'Oklahoma State': {
    espnId: 197, mascot: 'Cowboys', emoji: '🤠',
    color1: '#FF6600', color2: '#000000',
    city: 'Stillwater, OK',
    facts: [
      'Gallagher-Iba Arena opened in 1938 and is one of the most historic basketball arenas in America',
      'Eddie Sutton coached at Oklahoma State from 1990-2006, building a powerhouse',
      'Oklahoma State has 34 Big 12 wrestling championships — most of any school'
    ],
    alumni: ['Garth Brooks — best-selling solo artist in U.S. history (attended)', 'T. Boone Pickens — energy billionaire & philanthropist', 'Phil Simms? — No, Phil went to Morehead State; but many great Cowboys come from OSU']
  },
  'Ole Miss': {
    espnId: 145, mascot: 'Rebels', emoji: '⚔️',
    color1: '#CE1126', color2: '#14213D',
    city: 'Oxford, MS',
    facts: [
      'The Sandy and John Black Pavilion opened in 2016 and holds 9,500 fans',
      'Oxford, MS was named one of the most charming college towns in America',
      'Ole Miss has been at the center of major civil rights history on its campus'
    ],
    alumni: ['William Faulkner — Nobel Prize-winning novelist (briefly attended)', 'John Grisham — bestselling legal thriller author (law school)', 'Eli Manning — Super Bowl MVP quarterback']
  },
  'Oregon': {
    espnId: 2483, mascot: 'Ducks', emoji: '🦆',
    color1: '#007030', color2: '#FFCE00',
    city: 'Eugene, OR',
    facts: [
      'Matthew Knight Arena holds 12,364 and opened in 2011, funded by Nike\'s Phil Knight',
      'Oregon hosted the 2022 NCAA Track & Field Championships at Hayward Field',
      'Eugene is known as "Track Town USA"'
    ],
    alumni: ['Phil Knight — Nike co-founder & billionaire philanthropist (attended)', 'Dan Fouts — NFL Hall of Fame quarterback', 'Ahmad Rashad — NFL star & TV sports personality']
  },
  'Penn': {
    espnId: 219, mascot: 'Quakers', emoji: '🎓',
    color1: '#011F5B', color2: '#990000',
    city: 'Philadelphia, PA',
    facts: [
      'The Palestra (1927) holds 8,722 — considered the "Cathedral of College Basketball"',
      'Penn was founded by Benjamin Franklin in 1740 — one of America\'s original universities',
      'Penn is the only Ivy League school to have won an NCAA Tournament game in recent years'
    ],
    alumni: ['Elon Musk — Tesla & SpaceX CEO (attended Wharton)', 'Warren Buffett — investor (attended Wharton briefly)', 'Noam Chomsky — world-renowned linguist & philosopher']
  },
  'Prairie View A&M': {
    espnId: 2530, mascot: 'Panthers', emoji: '🐾',
    color1: '#5C0026', color2: '#FFBA00',
    city: 'Prairie View, TX',
    facts: [
      'Prairie View A&M is one of America\'s oldest HBCUs, founded in 1876',
      'The Baby Dome holds 6,600 fans for Panthers basketball',
      'Prairie View\'s "Marching Storm" band is one of the most celebrated HBCU bands'
    ],
    alumni: ['Bill Pickard — entrepreneur & GM executive', 'Alvin Ailey? — went to UCLA/USC. But PV alumni are prominent in education and public service', 'Charles Brackins — pioneering NFL quarterback']
  },
  'Princeton': {
    espnId: 163, mascot: 'Tigers', emoji: '🐯',
    color1: '#FF6600', color2: '#000000',
    city: 'Princeton, NJ',
    facts: [
      'Jadwin Gymnasium holds 6,854 and the Tigers play a famously cerebral brand of basketball',
      'Princeton\'s "Princeton Offense" is one of the most studied systems in basketball',
      'Princeton has won 27 Ivy League championships — the most of any program'
    ],
    alumni: ['Jeff Bezos — Amazon founder & billionaire', 'Michelle Obama — former First Lady of the United States', 'Woodrow Wilson — 28th U.S. President (also served as Princeton president)']
  },
  'Purdue': {
    espnId: 2509, mascot: 'Boilermakers', emoji: '🚂',
    color1: '#CEB888', color2: '#000000',
    city: 'West Lafayette, IN',
    facts: [
      'Mackey Arena holds 14,876 and is nicknamed "the Jungle" for its atmosphere',
      'Purdue has produced more astronauts than any other university — including Neil Armstrong',
      'Purdue won its first national championship in 2024'
    ],
    alumni: ['Neil Armstrong — first human to walk on the Moon', 'Drew Brees — Super Bowl MVP quarterback (attended)', 'Amelia Earhart — pioneering aviator (was a student & instructor)']
  },
  'Queens': {
    espnId: null, mascot: 'Royals', emoji: '👑',
    color1: '#C8A951', color2: '#002147',
    city: 'Charlotte, NC',
    facts: [
      'Queens University of Charlotte is a private Presbyterian school founded in 1857',
      'The Royals compete in the Big South Conference',
      'Queens is one of the newer programs in Division I basketball'
    ],
    alumni: ['Graduates known for careers in banking and finance in Charlotte', 'Charlotte is America\'s 2nd-largest banking center', 'Queens emphasizes leadership and civic engagement']
  },
  'Rhode Island': {
    espnId: 227, mascot: 'Rams', emoji: '🐏',
    color1: '#002147', color2: '#75B2DD',
    city: 'Kingston, RI',
    facts: [
      'The Ryan Center holds 7,657 fans for Rams basketball',
      'URI\'s Frank Keaney invented the fast-break style of basketball in the 1930s',
      'Rhode Island is the smallest state but has a passionate basketball following'
    ],
    alumni: ['Ryan Fitzpatrick — NFL quarterback (briefly attended)', 'Peter Pan? — Actually URI alumni include many New England leaders', 'Jim Harrick — national championship-winning coach']
  },
  'Richmond': {
    espnId: 257, mascot: 'Spiders', emoji: '🕷️',
    color1: '#990000', color2: '#000080',
    city: 'Richmond, VA',
    facts: [
      'The Robins Center holds 9,071 fans for Spiders basketball',
      'Richmond is a private liberal arts university founded in 1830',
      'The Spiders famously upset #3 seed Syracuse in the 2011 NCAA Tournament'
    ],
    alumni: ['Doug Wilder — first African American elected Governor in U.S. history since Reconstruction', 'Jerry West? No — Jerry went to WVU. Doug Wilder is the most famous.', 'Graduates are prominent in Virginia law and politics']
  },
  'Saint Louis': {
    espnId: 139, mascot: 'Billikens', emoji: '🧿',
    color1: '#003DA5', color2: '#FFFFFF',
    city: 'St. Louis, MO',
    facts: [
      'The "Billiken" mascot is a good luck charm figure — one of the most unique in college sports',
      'Chaifetz Arena holds 10,600 fans and is one of the A-10\'s best venues',
      'Saint Louis University is a Jesuit institution founded in 1818'
    ],
    alumni: ['Bob Costas — legendary sports broadcaster', 'Gary Gillam — NFL executive', 'SLU grads are known for careers in healthcare and law']
  },
  "Saint Mary's": {
    espnId: 2608, mascot: 'Gaels', emoji: '☘️',
    color1: '#BA0C2F', color2: '#13294B',
    city: 'Moraga, CA',
    facts: [
      'McKeon Pavilion holds just 3,500 fans — but Saint Mary\'s regularly competes with the nation\'s best',
      'The Gaels defeated #1 seed Michigan State in the 2010 NCAA Tournament',
      'Saint Mary\'s is a Christian Brothers university founded in 1863'
    ],
    alumni: ['Steve Nash — two-time NBA MVP (attended)', 'Bill Cartwright — NBA champion with the Chicago Bulls', 'Patty Mills — NBA champion & Australian Olympian']
  },
  'Samford': {
    espnId: 2546, mascot: 'Bulldogs', emoji: '🐶',
    color1: '#002D62', color2: '#D7A22A',
    city: 'Birmingham, AL',
    facts: [
      'Samford is a private Christian university founded in 1841 (as Howard College)',
      'Pete Hanna Center holds 4,000 fans for Bulldogs basketball',
      'Samford is located in the Birmingham suburb of Homewood'
    ],
    alumni: ['Bobby Bowden — legendary Florida State football coach (attended Howard College/Samford)', 'Pat Sullivan — Heisman Trophy winner', 'Graduates known for careers in healthcare and ministry']
  },
  'Santa Clara': {
    espnId: 2479, mascot: 'Broncos', emoji: '🐎',
    color1: '#862633', color2: '#B49759',
    city: 'Santa Clara, CA',
    facts: [
      'Leavey Center holds 4,882 fans in the heart of Silicon Valley',
      'Santa Clara is a Jesuit university founded in 1851 — the oldest university in California',
      'Silicon Valley surrounds the Santa Clara campus'
    ],
    alumni: ['Steve Nash — NBA MVP (attended!)', 'Brandi Chastain — soccer World Cup champion (attended)', 'Leon Panetta — CIA Director & Secretary of Defense']
  },
  'Siena': {
    espnId: 2550, mascot: 'Saints', emoji: '⛪',
    color1: '#006A4E', color2: '#FFFFFF',
    city: 'Loudonville, NY',
    facts: [
      'Times Union Center in Albany hosts Siena basketball, giving the Saints a big-city arena',
      'Siena is a Franciscan college founded in 1937',
      'The Saints famously upset Ohio State in the 2009 NCAA Tournament'
    ],
    alumni: ['Byron Irvin — NBA player', 'Doremus Hoover — basketball coach', 'Graduates are prominent in the Albany/Capital District business community']
  },
  'SMU': {
    espnId: 2567, mascot: 'Mustangs', emoji: '🐎',
    color1: '#354CA1', color2: '#CC0035',
    city: 'Dallas, TX',
    facts: [
      'Moody Coliseum holds 8,998 fans and has hosted SMU basketball since 1956',
      'SMU was once penalized with the "death penalty" in football — the most severe NCAA punishment ever',
      'The SMU campus is one of the most beautiful in the Southwest'
    ],
    alumni: ['Laura Bush — former First Lady of the United States (attended)', 'Doak Walker — 1948 Heisman Trophy winner at SMU', 'Aaron Spelling — legendary TV producer']
  },
  'South Carolina': {
    espnId: 2579, mascot: 'Gamecocks', emoji: '🐓',
    color1: '#73000A', color2: '#000000',
    city: 'Columbia, SC',
    facts: [
      'Colonial Life Arena holds 18,000 fans — the largest arena in South Carolina',
      'Dawn Staley has built the women\'s program into a dynasty, winning titles in 2017, 2022, and 2024',
      'A "gamecock" is a fighting rooster — South Carolina\'s fighting spirit'
    ],
    alumni: ['Hootie & the Blowfish — iconic rock band (formed at USC)', 'Darius Rucker — Grammy-winning country artist', 'Nikki Haley — former South Carolina Governor & UN Ambassador']
  },
  'South Dakota State': {
    espnId: 2571, mascot: 'Jackrabbits', emoji: '🐰',
    color1: '#0033A0', color2: '#FFB71B',
    city: 'Brookings, SD',
    facts: [
      'Frost Arena holds 6,500 fans for Jackrabbits basketball',
      'SDSU football is an FCS powerhouse with multiple national championships',
      'South Dakota is famous for Mount Rushmore, the Badlands, and stunning plains'
    ],
    alumni: ['Adam Vinatieri — most accurate kicker in NFL history (attended)', 'Sheryl Crow? — No, she went to Mizzou. Vinatieri is the most famous.', 'Graduates known for agriculture, engineering, and healthcare']
  },
  'South Florida': {
    espnId: 58, mascot: 'Bulls', emoji: '🐂',
    color1: '#006747', color2: '#CFC493',
    city: 'Tampa, FL',
    facts: [
      'Yuengling Center holds 10,411 and is USF\'s main events venue',
      'USF was founded in 1956 and is one of the newer major state universities',
      'Tampa Bay is home to the Buccaneers, Lightning, Rays, and Rowdies'
    ],
    alumni: ['Peter Scardino — leading urologic oncologist', 'Janet Reno — first female U.S. Attorney General (attended Miami law school, not USF)', 'Graduates prominent in Tampa Bay\'s booming business community']
  },
  'Southern': {
    espnId: null, mascot: 'Jaguars', emoji: '🐆',
    color1: '#003087', color2: '#FFD700',
    city: 'Baton Rouge, LA',
    facts: [
      'Southern University is one of America\'s most prominent HBCUs, founded in 1880',
      'F.G. Clark Activity Center holds 7,500 fans',
      'Southern\'s Human Jukebox marching band is legendary in HBCU culture'
    ],
    alumni: ['Avery Johnson — NBA champion player & coach (attended)', 'Valerie Thomas — NASA physicist & inventor', 'Graduates are prominent in Louisiana politics and public service']
  },
  'Stephen F. Austin': {
    espnId: 2620, mascot: 'Lumberjacks', emoji: '🪓',
    color1: '#472B7A', color2: '#FFFFFF',
    city: 'Nacogdoches, TX',
    facts: [
      'Johnson Coliseum holds 7,203 fans in East Texas',
      'SFA is named after Stephen F. Austin — the "Father of Texas"',
      'The Lumberjacks play in the Southland Conference'
    ],
    alumni: ['Chris Carter? — (different Chris Carter). SFA alums are known for careers in education and East Texas industry', 'Graduates prominent in Texas education and forestry', 'Nacogdoches claims to be the oldest town in Texas']
  },
  'St. John\'s': {
    espnId: 2599, mascot: 'Red Storm', emoji: '🌩️',
    color1: '#CC0000', color2: '#FFFFFF',
    city: 'Queens, NY',
    facts: [
      'Carnesecca Arena holds 5,602 and is named after legendary coach Lou Carnesecca',
      'St. John\'s reached the Final Four in 1952, 1985, and is a New York basketball institution',
      'The Red Storm play in Madison Square Garden for marquee games'
    ],
    alumni: ['Chris Mullin — NBA Hall of Famer & Olympic Dream Teamer', 'Mark Jackson — NBA player, broadcaster & coach', 'Lou Carnesecca — Hall of Fame coach known for his legendary sweater']
  },
  'Syracuse': {
    espnId: 183, mascot: 'Orange', emoji: '🍊',
    color1: '#F76900', color2: '#FFFFFF',
    city: 'Syracuse, NY',
    facts: [
      'JMA Wireless Dome (formerly the Carrier Dome) holds 35,000 — the largest on-campus arena in the country',
      'Syracuse won the 2003 national championship led by Carmelo Anthony',
      'Jim Boeheim coached the Orange for 47 years, winning 1,015 games'
    ],
    alumni: ['Carmelo Anthony — NBA scoring leader & Olympic gold medalist', 'Joe Biden — 46th U.S. President (attended SU Law)', 'Bob Costas — legendary sportscaster']
  },
  'TCU': {
    espnId: 2628, mascot: 'Horned Frogs', emoji: '🦎',
    color1: '#4D1979', color2: '#FFFFFF',
    city: 'Fort Worth, TX',
    facts: [
      'Schollmaier Arena holds 6,800 fans and opened in 1961',
      'TCU is a private university in the Fort Worth-Dallas metroplex',
      'The Horned Frog mascot is actually a lizard, not a frog — it can squirt blood from its eyes'
    ],
    alumni: ['LaDainian Tomlinson — NFL Hall of Fame running back & career rushing leader', 'Bob Schieffer — legendary CBS News journalist', 'Sammy Baugh — football pioneer, Hall of Famer']
  },
  'Tennessee': {
    espnId: 2633, mascot: 'Volunteers', emoji: '🔶',
    color1: '#FF8200', color2: '#FFFFFF',
    city: 'Knoxville, TN',
    facts: [
      'Thompson-Boling Arena holds 21,678 — one of the largest venues in college basketball',
      'Pat Summitt won 1,098 games coaching the Lady Vols — the most wins in Division I history',
      'The "Vol Walk" is one of college sports\' great traditions'
    ],
    alumni: ['Peyton Manning — two-time Super Bowl MVP quarterback', 'Pat Summitt — greatest coach in women\'s basketball history', 'James Comey — FBI Director (attended law school)']
  },
  'Tennessee State': {
    espnId: 2634, mascot: 'Tigers', emoji: '🐯',
    color1: '#003594', color2: '#FFFFFF',
    city: 'Nashville, TN',
    facts: [
      'Gentry Center holds 10,500 fans for Tigers basketball',
      'TSU is one of America\'s most historic HBCUs, founded in 1912',
      'Nashville\'s music scene and Tennessee State University are both part of the city\'s vibrant culture'
    ],
    alumni: ['Oprah Winfrey — media mogul & philanthropist (graduated from TSU!)', 'Wilma Rudolph — first American woman to win three Olympic gold medals in track', 'Wyomia Tyus — Olympic gold medalist, first to win consecutive 100m titles']
  },
  'Texas': {
    espnId: 251, mascot: 'Longhorns', emoji: '🤘',
    color1: '#BF5700', color2: '#FFFFFF',
    city: 'Austin, TX',
    facts: [
      'Moody Center opened in 2022 and holds 15,000 — replacing the Frank Erwin Center',
      'Texas is the wealthiest athletic department in the country',
      'The "Hook \'em Horns" hand sign is one of sports\' most iconic gestures'
    ],
    alumni: ['Matthew McConaughey — Oscar-winning actor (attended)', 'Michael Dell — Dell Technologies founder (briefly attended)', 'Janis Joplin — rock music legend (briefly attended)']
  },
  'Texas A&M': {
    espnId: 245, mascot: 'Aggies', emoji: '🐶',
    color1: '#500000', color2: '#FFFFFF',
    city: 'College Station, TX',
    facts: [
      'Reed Arena holds 12,989 and opened in 1998',
      'The Aggie "12th Man" tradition — all students stand throughout games, ready to play',
      'A&M\'s "Reveille" is the highest-ranking member of the Corps of Cadets (a collie dog)'
    ],
    alumni: ['Lyle Lovett — Grammy-winning country/folk musician', 'Rick Perry — Texas Governor & U.S. Energy Secretary', 'Rip Torn — acclaimed character actor']
  },
  'Texas Tech': {
    espnId: 2641, mascot: 'Red Raiders', emoji: '⚔️',
    color1: '#CC0000', color2: '#000000',
    city: 'Lubbock, TX',
    facts: [
      'United Supermarkets Arena holds 15,020 fans in West Texas',
      'Texas Tech reached its first national championship game in 2019',
      'Buddy Holly was born in Lubbock — the Rock & Roll Hall of Famer grew up in Tech\'s backyard'
    ],
    alumni: ['Pat Mahomes — two-time Super Bowl MVP quarterback (attended 2 years)', 'Sheryl Swoopes — WNBA pioneer & three-time Olympic gold medalist', 'Kliff Kingsbury — NFL/college football coach']
  },
  'Troy': {
    espnId: 2653, mascot: 'Trojans', emoji: '⚔️',
    color1: '#8B2332', color2: '#000000',
    city: 'Troy, AL',
    facts: [
      'Trojan Arena holds 5,000 fans for Trojans basketball',
      'Troy competes in the Sun Belt Conference',
      'Troy University was founded in 1887 as a teacher training school'
    ],
    alumni: ['Graduates prominent in Alabama education and public service', 'Troy has a large military-affiliated student population', 'The Trojans have made several NCAA Tournament appearances']
  },
  'UC San Diego': {
    espnId: null, mascot: 'Tritons', emoji: '🔱',
    color1: '#182B49', color2: '#00629B',
    city: 'La Jolla, CA',
    facts: [
      'UCSD moved to Division I in 2021 — one of the newest D-I programs',
      'UCSD is ranked among the top 10 public universities in the world',
      'The RIMAC Arena holds 5,000 fans'
    ],
    alumni: ['Craig Venter — genomics pioneer who helped sequence the human genome', 'Jennifer Siebel Newsom — filmmaker & California First Partner', 'UCSD has won more Nobel Prizes than any D-I school relative to its age']
  },
  'UCF': {
    espnId: 2116, mascot: 'Knights', emoji: '⚔️',
    color1: '#FFC904', color2: '#000000',
    city: 'Orlando, FL',
    facts: [
      'Addition Financial Arena holds 10,000 fans for Knights basketball',
      'UCF is one of the largest universities in the U.S. with over 70,000 students',
      'UCF\'s football team went 25 games unbeaten (2017-18) and claimed a national championship'
    ],
    alumni: ['Shaquille O\'Neal — received his doctorate from UCF (Ed.D.)', 'Blake Shelton? — No, but many entertainers have connections to Orlando', 'Graduates are prominent in the space, defense, and entertainment industries']
  },
  'UCLA': {
    espnId: 26, mascot: 'Bruins', emoji: '🐻',
    color1: '#2D68C4', color2: '#F2A900',
    city: 'Los Angeles, CA',
    facts: [
      'Pauley Pavilion holds 13,800 fans and opened in 1965, built for John Wooden\'s dynasty',
      'UCLA has won 11 national championships — the most of any program',
      'John Wooden won 10 titles including 7 in a row (1967-1973) — never equaled'
    ],
    alumni: ['Kareem Abdul-Jabbar — NBA all-time scoring leader (attended)', 'Jackie Robinson — broke MLB\'s color barrier (attended)', 'Jim Morrison — The Doors frontman (attended film school)']
  },
  'UConn': {
    espnId: 41, mascot: 'Huskies', emoji: '🐕',
    color1: '#002868', color2: '#FFFFFF',
    city: 'Storrs, CT',
    facts: [
      'Gampel Pavilion and the XL Center host UConn\'s 10,000+ fans',
      'UConn has won 6 men\'s national championships (1999, 2004, 2011, 2014, 2023, 2024)',
      'The women\'s program under Geno Auriemma has won 11 national titles'
    ],
    alumni: ['Diana Taurasi — greatest women\'s basketball player ever (attended)', 'Ray Allen — NBA all-time 3-point record holder (attended)', 'Kevin Ollie — NBA player & UConn national champion coach']
  },
  'UMBC': {
    espnId: 2378, mascot: 'Retrievers', emoji: '🐕',
    color1: '#000000', color2: '#F9A11F',
    city: 'Baltimore, MD',
    facts: [
      'UMBC\'s Retriever Activities Center holds 4,300 fans',
      'UMBC made history in 2018 as the FIRST #16 seed to ever beat a #1 seed (Virginia)',
      'The Retrievers\' upset of Virginia is one of sports\' greatest shocks ever'
    ],
    alumni: ['Freeman Hrabowski — nationally recognized educator & UMBC president', 'Graduates prominent in the Baltimore/DC STEM corridor', 'UMBC is known for its strong STEM programs']
  },
  'USC': {
    espnId: 30, mascot: 'Trojans', emoji: '⚔️',
    color1: '#990000', color2: '#FFC72C',
    city: 'Los Angeles, CA',
    facts: [
      'Galen Center holds 10,258 fans for Trojans basketball',
      'USC is one of Hollywood\'s closest universities — relationships with entertainment run deep',
      'USC has produced more NFL first-round draft picks than any other school'
    ],
    alumni: ['George Lucas — Star Wars creator (USC film school)', 'John Wayne — actor (attended on football scholarship)', 'OJ Simpson — Heisman Trophy winner']
  },
  'Utah State': {
    espnId: 328, mascot: 'Aggies', emoji: '🐴',
    color1: '#00263A', color2: '#8A8D8F',
    city: 'Logan, UT',
    facts: [
      'Dee Glen Smith Spectrum holds 10,270 fans in the Cache Valley',
      'Utah State is in the Mountain West Conference and regularly competes for top seeds',
      'Logan, UT sits in Cache Valley — one of the most scenic settings in college sports'
    ],
    alumni: ['Merlin Olsen — NFL Hall of Famer & beloved actor', 'Danny White — Dallas Cowboys quarterback', 'Bill Marcroft — broadcasting pioneer']
  },
  'UTSA': {
    espnId: 2636, mascot: 'Roadrunners', emoji: '🐦',
    color1: '#002A5C', color2: '#F15A22',
    city: 'San Antonio, TX',
    facts: [
      'The Convocation Center holds 8,500 fans for Roadrunners basketball',
      'UTSA was only founded in 1969 — one of the newer Division I programs in Texas',
      'San Antonio is known for its famous River Walk and rich Hispanic cultural heritage'
    ],
    alumni: ['Graduates prominent in San Antonio\'s healthcare and military industries', 'UTSA joined the American Athletic Conference in 2023', 'The Roadrunner mascot reflects South Texas wildlife']
  },
  'VCU': {
    espnId: 2670, mascot: 'Rams', emoji: '🐏',
    color1: '#FFB300', color2: '#000000',
    city: 'Richmond, VA',
    facts: [
      'Stuart C. Siegel Center holds 7,617 fans in downtown Richmond',
      'Shaka Smart\'s "Havoc" defense took VCU to the 2011 Final Four as an 11-seed',
      'VCU is an urban research university in Virginia\'s capital city'
    ],
    alumni: ['Nell Carter — Tony and Emmy Award-winning actress', 'Tim Reid — actor & producer', 'Reva Siegel — constitutional law scholar']
  },
  'Vanderbilt': {
    espnId: 238, mascot: 'Commodores', emoji: '⚓',
    color1: '#866D4B', color2: '#000000',
    city: 'Nashville, TN',
    facts: [
      'Memorial Gymnasium is famous for having benches behind the baskets — completely unique in college basketball',
      'Vanderbilt is the only major research university in the SEC',
      'Vanderbilt\'s graduation rate for athletes consistently ranks #1 in the SEC'
    ],
    alumni: ['Al Gore — 45th U.S. Vice President (attended law school)', 'Amy Grant — Grammy-winning contemporary Christian and pop artist', 'Lamar Alexander — U.S. Senator & Education Secretary']
  },
  'Vermont': {
    espnId: 261, mascot: 'Catamounts', emoji: '🐱',
    color1: '#007A33', color2: '#FFFFFF',
    city: 'Burlington, VT',
    facts: [
      'Patrick Gymnasium holds 3,228 fans — intimate and loud for home games',
      'Vermont plays in the America East Conference',
      'Burlington, VT is one of America\'s most beloved small cities'
    ],
    alumni: ['Grace Potter — rock singer-songwriter (attended)', 'Howard Dean — Vermont Governor (attended Yale, not UVM, for law)', 'Bernie Sanders — U.S. Senator (attended Brooklyn College & University of Chicago)']
  },
  'Villanova': {
    espnId: 222, mascot: 'Wildcats', emoji: '🐱',
    color1: '#003EA5', color2: '#FFFFFF',
    city: 'Villanova, PA',
    facts: [
      'Finneran Pavilion holds 6,500 fans in this Philadelphia suburb',
      'Villanova has won 3 national championships (1985, 2016, 2018)',
      'Kris Jenkins\' buzzer-beater to beat North Carolina in 2016 is one of sports\' most iconic moments'
    ],
    alumni: ['Kris Jenkins — hit the most famous buzzer-beater in title game history', 'Kerry Kittles — NBA player', 'Ed Pinckney — NBA player & Villanova All-Time great']
  },
  'Virginia': {
    espnId: 258, mascot: 'Cavaliers', emoji: '⚔️',
    color1: '#232D4B', color2: '#F84C1E',
    city: 'Charlottesville, VA',
    facts: [
      'John Paul Jones Arena holds 14,593 fans and opened in 2006',
      'Virginia\'s Pack-Line defense under Tony Bennett is one of basketball\'s most studied systems',
      'UVA won the 2019 national championship — one year after the historic UMBC loss'
    ],
    alumni: ['Edgar Allan Poe — master of horror and mystery (attended 1 year)', 'Katie Couric — TV journalist & author', 'Woodrow Wilson — 28th U.S. President (attended law school)']
  },
  'Virginia Tech': {
    espnId: 259, mascot: 'Hokies', emoji: '🦃',
    color1: '#630031', color2: '#CF4420',
    city: 'Blacksburg, VA',
    facts: [
      'Cassell Coliseum holds 10,052 fans in the Blue Ridge Mountain town of Blacksburg',
      'A "Hokie" is a made-up word from a Virginia Tech spirit song from 1896',
      'Virginia Tech is one of the nation\'s top engineering schools'
    ],
    alumni: ['Michael Vick — NFL quarterback who revolutionized the position', 'Bruce Smith — NFL Hall of Fame defensive end', 'Frank Beamer — Hall of Fame football coach']
  },
  'Washington': {
    espnId: 264, mascot: 'Huskies', emoji: '🐕',
    color1: '#4B2E83', color2: '#B7A57A',
    city: 'Seattle, WA',
    facts: [
      'Alaska Airlines Arena holds 10,000 fans on the beautiful UW campus',
      'Washington sits on the shores of Lake Washington with a view of Mount Rainier',
      'UW has the largest medical school class in the United States'
    ],
    alumni: ['Paul Allen — Microsoft co-founder & Seattle Seahawks/Trail Blazers owner', 'Kenny Easley — NFL Hall of Fame safety', 'Apolo Ohno — most decorated U.S. Winter Olympian (grew up in Seattle)']
  },
  'West Virginia': {
    espnId: 277, mascot: 'Mountaineers', emoji: '⛰️',
    color1: '#002855', color2: '#EAAA00',
    city: 'Morgantown, WV',
    facts: [
      'WVU Coliseum holds 14,000 and is one of college basketball\'s loudest venues',
      'West Virginia is the only state entirely within the Appalachian Mountains',
      '"Country Roads" by John Denver is essentially WVU\'s second fight song'
    ],
    alumni: ['Jerry West — "The Logo" of the NBA, Hall of Fame player', 'Don Knotts — beloved actor, Barney Fife on The Andy Griffith Show', 'Brad Paisley — Grammy-winning country music superstar']
  },
  'Western Illinois': {
    espnId: 2710, mascot: 'Leathernecks', emoji: '⚓',
    color1: '#663399', color2: '#FFCC33',
    city: 'Macomb, IL',
    facts: [
      'Western Hall holds 5,139 fans for Leathernecks basketball',
      'The "Leathernecks" nickname honors U.S. Marines — reflecting military heritage',
      'WIU is in the Summit League Conference'
    ],
    alumni: ['Graduates known for careers in education and public service in the Midwest', 'The Macomb, IL campus is situated in the Illinois prairie', 'WIU\'s athletic programs have won multiple Summit League championships']
  },
  'Wisconsin': {
    espnId: 275, mascot: 'Badgers', emoji: '🦡',
    color1: '#C5050C', color2: '#FFFFFF',
    city: 'Madison, WI',
    facts: [
      'Kohl Center holds 17,230 fans and is nicknamed "The Kohl" for its electric atmosphere',
      'Wisconsin reached back-to-back Final Fours in 2014 and 2015 with Bo Ryan',
      'Madison is consistently ranked one of the best college cities in America'
    ],
    alumni: ['Frank Lloyd Wright — iconic architect (briefly attended)', 'Chris Farley — beloved comedian & SNL star (attended)', 'John Muir — father of national parks (attended)']
  },
  'Wright State': {
    espnId: 2691, mascot: 'Raiders', emoji: '✈️',
    color1: '#006400', color2: '#866300',
    city: 'Dayton, OH',
    facts: [
      'Nutter Center holds 10,632 fans and is one of the larger mid-major venues',
      'Wright State is named after aviation pioneers Orville and Wilbur Wright, who were from Dayton',
      'The Raiders play in the Horizon League'
    ],
    alumni: ['Graduates prominent in Dayton\'s aerospace and defense industries', 'Wright-Patterson Air Force Base is nearby — many alumni serve in aerospace', 'The National Museum of the U.S. Air Force is minutes from campus']
  },
};
