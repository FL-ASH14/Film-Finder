import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); // Essential for handling POST request bodies

// --- SIMULATED IN-MEMORY DATABASE ---
let nextUserId = 1;
const users = []; // Stores { id, username, password, profileName, profileAvatar, savedCart: [] }
// ------------------------------------

// Define the YouTube link to be used for all item links
const youtubeLink = "https://www.youtube.com/watch?v=BBJa32lCaaY&t=1s";

// Movies dataset with ALL movies included and updated links
const movies = [
  {
    id: 1,
    title: 'La La Land',
    year: 2016,
    posterUrl: '/images/land.jpg',
    themeMusic: {
      title: "Mia and Sebastian's Theme",
      url: '/music/laland.mp3'
    },
    scenes: [
      {
        sceneId: 1,
        title: 'Opening Street Dance',
        thumbnail: '/images/dance.jpg',
        items: [
          { itemThumbnail:'/images/Yellow.jpg', name: 'Mia’s Dress', type: 'clothing', buyLink: youtubeLink, description: "A vibrant yellow vintage-style dress.", timestamp: "00:03:15" },
          { itemThumbnail: '/images/lamp.jpg', name: 'Street Lamp', type: 'furniture', mapLink: youtubeLink, description: "An iconic, LA city street lamp.", timestamp: "00:03:40" },
          { itemThumbnail: '/images/street.jpg', name: 'Los Angeles Street', type: 'places', mapLink: youtubeLink, description: "The stunning location of the opening freeway dance.", timestamp: "00:01:00" }
        ]
      },
      {
        sceneId: 2,
        title: 'Planetarium Dance',
        thumbnail: '/images/planet.jpg',
        items: [
          { itemThumbnail: '/images/jacket.jpg', name: 'Sebastian’s Jacket', type: 'clothing', buyLink: youtubeLink, description: "A light brown blazer, perfect for jazz clubs.", timestamp: "01:05:22" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    posterUrl:'/images/inception.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Dream Heist',
        thumbnail: '/images/DreamSequence.jpg',
        items: [
          { itemThumbnail: '/images/suit.jpg', name: 'Cobb’s Suit', type: 'clothing', buyLink: youtubeLink, description: "A tailored, dark black business suit.", timestamp: "00:15:00" },
          { itemThumbnail: '/images/paris.jpg', name: 'Paris Street', type: 'places', mapLink: youtubeLink, description: "The street where the city folds.", timestamp: "00:40:00" }
        ]
      },
      {
        sceneId: 2,
        title: 'Rotating Hall',
        thumbnail: '/images/inception_Scene1.jpg',
        items: [
          { itemThumbnail: '/images/table.jpg', name: 'Furniture Set', type: 'furniture', buyLink: youtubeLink, description: "A set of gravity-defying hotel room furniture.", timestamp: "01:25:30" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'The Matrix',
    year: 1999,
    posterUrl: '/images/Matrix.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Red Pill or Blue Pill',
        thumbnail: '/images/pill.jpeg',
        items: [
          { itemThumbnail: '/images/neo.jpg', name: 'Neo’s Jacket', type: 'clothing', buyLink: youtubeLink, description: "Neo's iconic black trench coat.", timestamp: "00:30:10" },
          { itemThumbnail: '/images/office.jpg', name: 'Morpheus Office', type: 'places', mapLink: youtubeLink, description: "The location of the critical choice.", timestamp: "00:30:00" }
        ]
      },
      {
        sceneId: 2,
        title: 'Lobby Shootout',
        thumbnail: '/images/lobby.jpg',
        items: [
          { itemThumbnail: '/images/prop.jpg', name: 'Gun Props', type: 'furniture', buyLink: youtubeLink, description: "A replica prop used in the famous shootout.", timestamp: "01:45:00" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Forrest Gump',
    year: 1994,
    posterUrl: '/images/forest.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Bench Talk',
        thumbnail: '/images/bench.jpg',
        items: [
          { itemThumbnail: '/images/gump.jpg', name: 'Forrest’s Jacket', type: 'clothing', buyLink: youtubeLink, description: "Forrest’s simple, plaid shirt and jacket ensemble.", timestamp: "00:05:00" },
          { itemThumbnail: '/images/sit.jpg', name: 'Park Bench', type: 'furniture', mapLink: youtubeLink, description: "A historical park bench model.", timestamp: "00:04:30" },
          { itemThumbnail: '/images/park.jpg', name: 'Green Park', type: 'places', mapLink: youtubeLink, description: "The general location where Forrest tells his story.", timestamp: "00:01:00" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Titanic',
    year: 1997,
    posterUrl: '/images/titanic.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Ship Deck',
        thumbnail: '/images/deck.jpg',
        items: [
          { itemThumbnail: '/images/pink.jpg', name: 'Rose’s Dress', type: 'clothing', buyLink: youtubeLink, description: "Rose's elegant pink and white dinner dress.", timestamp: "01:10:00" },
          { itemThumbnail: '/images/rail.jpg', name: 'Ship Deck Railing', type: 'furniture', mapLink: youtubeLink, description: "The replica deck railing for the ship.", timestamp: "01:15:30" },
          { itemThumbnail: '/images/ocean.jpg', name: 'Atlantic Ocean', type: 'places', mapLink: youtubeLink, description: "The vast North Atlantic.", timestamp: "01:16:00" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'John Wick',
    year: 2014,
    posterUrl: '/images/Wick.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Red Circle Club Shootout',
        thumbnail: '/images/club.jpg',
        items: [
          { itemThumbnail: '/images/tact.jpg', name: 'John\'s Black Suit', type: 'clothing', buyLink: youtubeLink, description: 'Wick\'s signature tactical three-piece suit.', timestamp: '01:05:30' },
          { itemThumbnail: '/images/nightclub.jpg', name: 'The Red Circle Nightclub', type: 'places', mapLink: youtubeLink, description: 'A multi-level nightclub known for its intense action sequence.', timestamp: '01:04:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'The Continental Hotel',
        thumbnail: '/images/continental2.jpg',
        items: [
          { itemThumbnail: '/images/goldcoin.jpg', name: 'Gold Coin Prop', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the gold coins used as currency in the assassin underworld.', timestamp: '00:35:50' },
          { itemThumbnail: '/images/lobbies.jpg', name: 'The Continental Lobby', type: 'places', mapLink: youtubeLink, description: 'The iconic hotel that serves as neutral ground.', timestamp: '00:35:00' }
        ]
      },
      {
        sceneId: 3,
        title: 'Home Invasion',
        thumbnail: '/images/entering.jpg',
        items: [
          { itemThumbnail: '/images/livingroom.jpg', name: 'Modern Living Room Set', type: 'furniture', buyLink: youtubeLink, description: 'Sleek, minimalist furniture from Wick\'s modern home.', timestamp: '00:20:15' }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'The Terminator',
    year: 1984,
    posterUrl: '/images/terminator_.jpg',
    scenes: [
      {
        sceneId: 1,
        title: '"I\'ll Be Back"',
        thumbnail: '/images/beback.jpg',
        items: [
          { itemThumbnail: '/images/leatherjacket.jpg', name: 'Terminator\'s Leather Jacket', type: 'clothing', buyLink: youtubeLink, description: 'The iconic black punk rock leather jacket.', timestamp: '01:02:10' },
          { itemThumbnail: '/images/eyes.jpg', name: 'Gargoyle Sunglasses', type: 'clothing', buyLink: youtubeLink, description: 'The sunglasses worn by the T-800.', timestamp: '01:02:15' },
          { itemThumbnail: '/images/policedesk.jpg', name: 'Police Station Desk', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the front desk at the police station.', timestamp: '01:02:05' }
        ]
      },
      {
        sceneId: 2,
        title: 'Tech Noir Club',
        thumbnail: '/images/monies.jpg',
        items: [
          { itemThumbnail: '/images/TechNoir.jpg', name: 'Tech Noir Nightclub', type: 'places', mapLink: youtubeLink, description: 'The neon-lit nightclub where the Terminator first finds Sarah Connor.', timestamp: '00:25:00' }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Jumanji',
    year: 1995,
    posterUrl: '/images/jumanji.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The family playing Jumanji',
        thumbnail: '/images/tablegame.jpg',
        items: [
          { itemThumbnail: '/images/begger.jpg', name: 'Alan\'s Outfit', type: 'clothing', buyLink: youtubeLink, description: 'Alan old outfit from the jungle', timestamp: '00:22:45' },
          { itemThumbnail: '/images/thehouse.jpg', name: 'The house they are inside playing the game', type: 'places', buyLink: youtubeLink, description: 'The family is back together at the house playing jumanji', timestamp: '00:23:00' },
          { itemThumbnail: '/images/game.jpg', name: 'Jumanji Board Game ', type: 'furniture', buyLink: youtubeLink, description: 'A retro 90s-style board game.', timestamp: '00:18:10' }
        ]
      },
      {
        sceneId: 2,
        title: 'Attack at the convenience store',
        thumbnail: '/images/stores.jpg',
        items: [
          { itemThumbnail: '/images/jungle.jpg', name: 'The hunter outfit', type: 'clothing', mapLink: youtubeLink, description: 'The outfit of the hunter; a trench coat.', timestamp: '00:31:00' }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Ready Player One',
    year: 2018,
    posterUrl: '/images/RP.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The First Race',
        thumbnail: '/images/Ready.jpg',
        items: [
          { itemThumbnail: '/images/DN.jpg', name: 'Parzival\'s DeLorean', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the DeLorean time machine used in the OASIS race.', timestamp: '00:15:20' },
          { itemThumbnail: '/images/girly.jpg', name: 'OASIS Virtual Race Track', type: 'places', mapLink: youtubeLink, description: 'The chaotic, hazard-filled digital race track in New York.', timestamp: '00:14:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'The Shining Experience',
        thumbnail: '/images/blood.jpg',
        items: [
          { itemThumbnail: '/images/overlook.jpg', name: 'Overlook Hotel', type: 'places', mapLink: youtubeLink, description: 'A virtual recreation of the haunted hotel from The Shining.', timestamp: '01:10:00' },
          { itemThumbnail: '/images/237.jpg', name: 'Room 237 Key', type: 'furniture', buyLink: youtubeLink, description: 'A prop replica of the infamous hotel room key.', timestamp: '01:12:30' }
        ]
      },
      {
        sceneId: 3,
        title: 'The Stacks',
        thumbnail: '/images/stacks.jpg',
        items: [
          { itemThumbnail: '/images/haptic.jpg', name: 'Parzival\'s Haptic Suit', type: 'clothing', buyLink: youtubeLink, description: 'A full-body suit that provides physical feedback from the OASIS.', timestamp: '00:05:10' }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Doctor Strange',
    year: 2016,
    posterUrl: '/images/DS.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Mirror Dimension',
        thumbnail: '/images/MD.jpg',
        items: [
          { itemThumbnail: '/images/levitation.jpg', name: 'The Cloak of Levitation', type: 'clothing', buyLink: youtubeLink, description: 'A sentient, magical cloak that allows its user to fly.', timestamp: '01:01:00' },
          { itemThumbnail: '/images/agamato.jpg', name: 'The Eye of Agamotto', type: 'furniture', buyLink: youtubeLink, description: 'A powerful amulet that can manipulate time.', timestamp: '01:01:15' },
          { itemThumbnail: '/images/NYC.jpg', name: 'Folding New York City', type: 'places', mapLink: youtubeLink, description: 'The mind-bending, M.C. Escher-like version of the city.', timestamp: '01:20:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Kamar-Taj',
        thumbnail: '/images/Taj.jpg',
        items: [
          { itemThumbnail: '/images/groundtrain.jpg', name: 'Kamar-Taj Training Ground', type: 'places', mapLink: youtubeLink, description: 'The ancient temple and training ground for the Masters of the Mystic Arts.', timestamp: '00:40:00' }
        ]
      }
    ]
  },
  {
    id: 11,
    title: 'Gladiator',
    year: 2000,
    posterUrl: '/images/aaah.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Battle of Germania',
        thumbnail: '/images/battle.jpg',
        items: [
          { itemThumbnail: '/images/armor.jpg', name: 'Maximus\'s Armor', type: 'clothing', buyLink: youtubeLink, description: 'The battle armor worn by General Maximus Decimus Meridius.', timestamp: '00:05:00' },
          { itemThumbnail: '/images/roman.jpg', name: 'Roman Legionary Helmet', type: 'clothing', buyLink: youtubeLink, description: 'A replica of a Roman soldier\'s helmet.', timestamp: '00:06:15' }
        ]
      },
      {
        sceneId: 2,
        title: 'The Colosseum',
        thumbnail: '/images/coli.jpg',
        items: [
          { itemThumbnail: '/images/biggest.jpg', name: 'The Roman Colosseum', type: 'places', mapLink: youtubeLink, description: 'The arena where Maximus fights for his freedom.', timestamp: '01:25:00' },
          { itemThumbnail: '/images/tiger.jpg', name: 'Gladiator\'s Tiger Helmet', type: 'clothing', buyLink: youtubeLink, description: 'The iconic helmet worn by Tigris of Gaul.', timestamp: '01:50:00' }
        ]
      }
    ]
  }, 
  {
    id: 12,
    title: 'Star Wars: The Empire Strikes Back',
    year: 1980,
    posterUrl: '/images/EMP.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Battle of Hoth',
        thumbnail: '/images/Hothplanet.jpg',
        items: [
          { itemThumbnail: '/images/STW.jpg', name: 'Rebel Snowspeeder Pilot Uniform', type: 'clothing', buyLink: youtubeLink, description: 'The orange flight suit worn by Rebel pilots on Hoth.', timestamp: '00:20:00' },
          { itemThumbnail: '/images/Hoth.jpg', name: 'AT-AT Walker Model', type: 'furniture', buyLink: youtubeLink, description: 'A scale model of the Imperial AT-AT walker.', timestamp: '00:25:00' },
          { itemThumbnail: '/images/anta.jpg', name: 'Hoth Ice Planet', type: 'places', mapLink: youtubeLink, description: 'The desolate, icy planet that housed Echo Base.', timestamp: '00:10:00' }
        ]
      },
      {
        sceneId: 2,
        title: '"I am your father"',
        thumbnail: '/images/DIE.jpg',
        items: [
          { itemThumbnail: '/images/crying.jpg', name: 'Luke Skywalker\'s Bespin Fatigues', type: 'clothing', buyLink: youtubeLink, description: 'Luke\'s tan uniform worn on Cloud City.', timestamp: '01:45:00' },
          { itemThumbnail: '/images/cloudcity.jpg', name: 'Cloud City Gantry', type: 'places', mapLink: youtubeLink, description: 'The location of the fateful duel between Luke and Vader.', timestamp: '01:50:00' }
        ]
      }
    ]
  },
  {
    id: 13,
    title: 'Knives Out',
    year: 2019,
    posterUrl: '/images/KO.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Interrogation',
        thumbnail: '/images/interrogation.jpg',
        items: [
          { itemThumbnail: '/images/knit.jpg', name: 'Ransom\'s Cable Knit Sweater', type: 'clothing', buyLink: youtubeLink, description: 'The now-famous chunky, off-white cable knit sweater.', timestamp: '00:30:00' },
          { itemThumbnail: '/images/library.jpg', name: 'Thrombey Mansion Library', type: 'places', mapLink: youtubeLink, description: 'The book-lined room where the family is interrogated.', timestamp: '00:10:00' },
          { itemThumbnail: '/images/throne.jpg', name: 'Circle of Knives Throne', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the dramatic art piece made of knives.', timestamp: '00:11:00' }
        ]
      }
    ]
  },
  {
    id: 14,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    posterUrl: '/images/LOTR.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Mines of Moria',
        thumbnail: '/images/mines.jpg',
        items: [
          { itemThumbnail: '/images/staf.jpg', name: 'Gandalf\'s Staff', type: 'furniture', buyLink: youtubeLink, description: 'A replica of Gandalf the Grey\'s staff with a crystal.', timestamp: '01:55:00' },
          { itemThumbnail: '/images/bridgess.jpg', name: 'The Bridge of Khazad-dûm', type: 'places', mapLink: youtubeLink, description: 'The narrow stone bridge where Gandalf confronts the Balrog.', timestamp: '02:05:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Rivendell',
        thumbnail: '/images/LotR2.jpg',
        items: [
          { itemThumbnail: '/images/arwen.jpg', name: 'Arwen\'s Evenstar Necklace', type: 'clothing', buyLink: youtubeLink, description: 'The elegant silver necklace given to Aragorn.', timestamp: '01:28:00' },
          { itemThumbnail: '/images/legos.jpg', name: 'Elven Architecture of Rivendell', type: 'places', mapLink: youtubeLink, description: 'The beautiful, ethereal home of the Elves.', timestamp: '01:25:00' }
        ]
      }
    ]
  },
  {
    id: 15,
    title: 'Kill Bill: Vol. 1',
    year: 2003,
    posterUrl: '/images/KB.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The House of Blue Leaves',
        thumbnail: '/images/blueleaves.jpg',
        items: [
          { itemThumbnail: '/images/jumpsuit.jpg', name: 'The Bride\'s Yellow Jumpsuit', type: 'clothing', buyLink: youtubeLink, description: 'The iconic yellow tracksuit worn by The Bride.', timestamp: '01:10:00' },
          { itemThumbnail: '/images/yellowkill.jpg', name: 'Hattori Hanzō Sword', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the legendary samurai sword.', timestamp: '01:12:00' },
          { itemThumbnail: '/images/eatingfood.jpg', name: 'House of Blue Leaves', type: 'places', mapLink: youtubeLink, description: 'The Tokyo restaurant and setting for the massive sword fight.', timestamp: '01:08:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Showdown with O-Ren Ishii',
        thumbnail: '/images/crossing.jpg',
        items: [
          { itemThumbnail: '/images/oren.jpg', name: 'O-Ren Ishii\'s White Kimono', type: 'clothing', buyLink: youtubeLink, description: 'The elegant white kimono worn during the final duel.', timestamp: '01:35:00' },
          { itemThumbnail: '/images/snowing.jpg', name: 'Snowy Japanese Garden', type: 'places', mapLink: youtubeLink, description: 'The beautiful, serene garden where the duel takes place.', timestamp: '01:34:00' }
        ]
      }
    ]
  },
  {
    id: 16,
    title: 'The Truman Show',
    year: 1998,
    posterUrl: '/images/truman.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Falling Studio Light',
        thumbnail: '/images/lookup.jpg',
        items: [
          { itemThumbnail: '/images/poloshirt.jpg', name: 'Truman\'s Striped Polo Shirt', type: 'clothing', buyLink: youtubeLink, description: 'The colorful polo shirt Truman often wears.', timestamp: '00:05:15' },
          { itemThumbnail: '/images/lights.jpg', name: 'Sirius Studio Light Prop', type: 'furniture', buyLink: youtubeLink, description: 'A prop replica of the studio light that falls from the "sky".', timestamp: '00:05:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Sailing to the Edge',
        thumbnail: '/images/edges.jpg',
        items: [
          { itemThumbnail: '/images/sailboat.jpg', name: 'Truman\'s Sailboat', type: 'furniture', buyLink: youtubeLink, description: 'The small sailboat named "Santa Maria" used to escape.', timestamp: '01:25:00' },
          { itemThumbnail: '/images/stairsto.jpg', name: 'The Sky Wall', type: 'places', mapLink: youtubeLink, description: 'The edge of the dome, painted to look like the sky.', timestamp: '01:28:00' }
        ]
      }
    ]
  },     
  {
    id: 17,
    title: 'Pirates of the Caribbean',
    year: 2003,
    posterUrl: '/images/JDP.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Captain Jack\'s Entrance',
        thumbnail: '/images/standing.jpg',
        items: [
          { itemThumbnail: '/images/enterto.jpg', name: 'Jack Sparrow\'s Tricorn Hat', type: 'clothing', buyLink: youtubeLink, description: 'The iconic leather tricorn hat worn by Captain Jack.', timestamp: '00:08:00' },
          { itemThumbnail: '/images/port.jpg', name: 'Port Royal Harbor', type: 'places', mapLink: youtubeLink, description: 'The British port town where Jack makes his grand entrance.', timestamp: '00:07:30' }
        ]
      },
      {
        sceneId: 2,
        title: 'Isla de Muerta',
        thumbnail: '/images/isla.jpg',
        items: [
          { itemThumbnail: '/images/death.jpg', name: 'Cursed Aztec Gold Coin', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the cursed Aztec treasure.', timestamp: '01:45:00' }
        ]
      }
    ]
  },
  
  {
    id: 18,
    title: 'Indiana Jones: Raiders of the Lost Ark',
    year: 1981,
    posterUrl: '/images/ARK.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Boulder Chase',
        thumbnail: '/images/runnn.jpg',
        items: [
          { itemThumbnail: '/images/crazzzy.jpg', name: 'Indiana Jones\'s Leather Jacket', type: 'clothing', buyLink: youtubeLink, description: 'The iconic, well-worn brown leather jacket.', timestamp: '00:08:00' },
          { itemThumbnail: '/images/fedora.jpg', name: 'Indiana Jones\'s Fedora', type: 'clothing', buyLink: youtubeLink, description: 'The famous fedora that never gets left behind.', timestamp: '00:08:10' },
          { itemThumbnail: '/images/IdolWatch.jpg', name: 'Golden Fertility Idol', type: 'furniture', buyLink: youtubeLink, description: 'The golden idol from the opening temple scene.', timestamp: '00:07:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'The Well of Souls',
        thumbnail: '/images/Souls.jpg',
        items: [
          { itemThumbnail: '/images/LostArk.jpg', name: 'The Ark of the Covenant', type: 'furniture', buyLink: youtubeLink, description: 'A replica of the biblical Ark of the Covenant.', timestamp: '01:20:00' },
          { itemThumbnail: '/images/Tanis.jpg', name: 'Tanis Dig Site', type: 'places', mapLink: youtubeLink, description: 'The vast archaeological dig site in Egypt.', timestamp: '01:10:00' }
        ]
      }
    ]
  },
  {
    id: 19,
    title: 'Harry Potter and the Sorcerer\'s Stone',
    year: 2001,
    posterUrl: '/images/HP.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Great Hall',
        thumbnail: '/images/halls.jpg',
        items: [
          { itemThumbnail: '/images/Daniel.jpg', name: 'Gryffindor House Robes', type: 'clothing', buyLink: youtubeLink, description: 'The black robes with the Gryffindor crest.', timestamp: '00:45:00' },
          { itemThumbnail: '/images/sorting.jpg', name: 'The Sorting Hat', type: 'furniture', buyLink: youtubeLink, description: 'A prop replica of the magical Sorting Hat.', timestamp: '00:46:00' },
          { itemThumbnail: '/images/hallsing.jpg', name: 'The Great Hall at Hogwarts', type: 'places', mapLink: youtubeLink, description: 'The main gathering area of Hogwarts with its enchanted ceiling.', timestamp: '00:44:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Diagon Alley',
        thumbnail: '/images/alley.jpg',
        items: [
          { itemThumbnail: '/images/wandss.jpg', name: 'Harry\'s Wand', type: 'furniture', buyLink: youtubeLink, description: 'A replica of Harry Potter\'s holly and phoenix feather wand.', timestamp: '00:30:00' },
          { itemThumbnail: '/images/shopings.jpg', name: 'Ollivanders Wand Shop', type: 'places', mapLink: youtubeLink, description: 'The famous wand shop in Diagon Alley.', timestamp: '00:29:00' }
        ]
      }
    ]
  },
  {
    id: 20,
    title: 'Interstellar',
    year: 2014,
    posterUrl: '/images/interstellar.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Miller\'s Planet',
        thumbnail: '/images/waterss.jpg',
        items: [
          { itemThumbnail: '/images/astronaut.jpg', name: 'Cooper\'s NASA Jacket', type: 'clothing', buyLink: youtubeLink, description: 'The rugged jacket worn by Cooper on the planets.', timestamp: '01:15:00' },
          { itemThumbnail: '/images/Capture.jpg', name: 'The Water Planet', type: 'places', mapLink: youtubeLink, description: 'The shallow water planet with giant tidal waves.', timestamp: '01:10:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'The Tesseract',
        thumbnail: '/images/Blackholes.jpg',
        items: [
          { itemThumbnail: '/images/bookshelf.jpg', name: 'Cooper\'s Bookshelf', type: 'furniture', buyLink: youtubeLink, description: 'The bookshelf from Murph\'s room, as seen from the Tesseract.', timestamp: '02:30:00' },
          { itemThumbnail: '/images/tesseract.jpg', name: 'The Tesseract', type: 'places', mapLink: 'https://www.mapquest.com/us/colorado/your-moms-house-375138762', description: 'The 5-dimensional space within the black hole.', timestamp: '02:28:00' }
        ]
      }
    ]
  },
  {
    id: 21,
    title: 'The Dark Knight',
    year: 2008,
    posterUrl: '/images/TDK.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Interrogation Room',
        thumbnail: '/images/haha.jpg',
        items: [
          { itemThumbnail: '/images/purples.jpg', name: 'The Joker\'s Purple Suit', type: 'clothing', buyLink: youtubeLink, description: 'The iconic purple suit and green vest.', timestamp: '01:25:00' },
          { itemThumbnail: '/images/rooming.jpg', name: 'GCPD Interrogation Room', type: 'places', mapLink: youtubeLink, description: 'The stark, mirrored room of the famous interrogation.', timestamp: '01:24:00' },
          { itemThumbnail: '/images/sitdownand.jpg', name: 'Metal Table and Chairs', type: 'furniture', buyLink: youtubeLink, description: 'The simple furniture from the interrogation scene.', timestamp: '01:24:30' }
        ]
      },
      {
        sceneId: 2,
        title: 'Bank Heist',
        thumbnail: '/images/joker.jpg',
        items: [
          { itemThumbnail: '/images/clown.jpg', name: 'The Joker\'s Clown Mask', type: 'clothing', buyLink: youtubeLink, description: 'The clown mask worn during the opening bank heist.', timestamp: '00:02:00' }
        ]
      }
    ]
  },
  {
    id: 22,
    title: 'The Hangover',
    year: 2009,
    posterUrl: '/images/hangover.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Wrecked Villa',
        thumbnail: '/images/Ceaser.jpg',
        items: [
          { itemThumbnail: '/images/human.jpg', name: 'Alan\'s "Human Tree" T-Shirt', type: 'clothing', buyLink: youtubeLink, description: 'The t-shirt with a graphic of a tree made of people.', timestamp: '00:15:00' },
          { itemThumbnail: '/images/bak.jpg', name: 'Caesars Palace Villa', type: 'places', mapLink: youtubeLink, description: 'The trashed luxury hotel suite in Las Vegas.', timestamp: '00:14:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Mr. Chow\'s Introduction',
        thumbnail: '/images/mrchow.jpg',
        items: [
          { itemThumbnail: '/images/LC.jpg', name: 'Lesile Chows Sunglasses', type: 'clothing', buyLink: youtubeLink, description: 'The famous stylic cool sunshades.', timestamp: '00:55:00' }
        ]
      }
    ]
  },
  {
    id: 23,
    title: '1917',
    year: 2019,
    posterUrl: '/images/1917.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'The Final Run',
        thumbnail: '/images/explosion.jpg',
        items: [
          { itemThumbnail: '/images/Final.jpg', name: 'Schofield\'s Lance Corporal Uniform', type: 'clothing', buyLink: youtubeLink, description: 'A WWI British Lance Corporal\'s uniform.', timestamp: '01:46:00' },
          { itemThumbnail: '/images/linear.jpg', name: 'British Front Line Trench', type: 'places', mapLink: youtubeLink, description: 'The trench Schofield runs along to stop the attack.', timestamp: '01:45:30' }
        ]
      },
      {
        sceneId: 2,
        title: 'Night in Écoust-Saint-Mein',
        thumbnail: '/images/FIRE.jpg',
        items: [
          { itemThumbnail: '/images/FIRES.jpg', name: 'Ruined French Town at Night', type: 'places', mapLink: youtubeLink, description: 'The eerily beautiful, flare-lit ruins of a French town.', timestamp: '01:20:00' }
        ]
      }
    ]
  },
  {
    id: 24,
    title: 'The Flash',
    year: 2023,
    posterUrl: '/images/FLASHY.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Hospital Rescue',
        thumbnail: '/images/RUNBARRY.jpg',
        items: [
          { itemThumbnail: '/images/SUITS.jpg', name: 'The Flash\'s New Suit', type: 'clothing', buyLink: youtubeLink, description: 'The advanced suit that deploys from his ring.', timestamp: '00:10:00' },
          { itemThumbnail: '/images/starlabs.jpg', name: 'Central City General Hospital', type: 'places', mapLink: youtubeLink, description: 'The collapsing hospital from the opening sequence.', timestamp: '00:08:00' }
        ]
      },
      {
        sceneId: 2,
        title: 'Keaton\'s Batcave',
        thumbnail: '/images/cavess.jpg',
        items: [
          { itemThumbnail: '/images/batsuit.jpg', name: '1989 Bat-suit', type: 'clothing', buyLink: youtubeLink, description: 'Michael Keaton\'s classic Batman suit.', timestamp: '01:05:00' },
          { itemThumbnail: '/images/1982.jpg', name: 'The Batwing Model', type: 'furniture', buyLink: youtubeLink, description: 'A model of the iconic Batwing vehicle.', timestamp: '01:06:15' }
        ]
      }
    ]
  },
  {
    id: 25,
    title: 'Once Upon a Time in Hollywood',
    year: 2019,
    posterUrl: '/images/OUAT.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Musso & Frank Grill',
        thumbnail: '/images/SHOPSSS.jpg',
        items: [
          { itemThumbnail: '/images/ouch.jpg', name: 'Rick Dalton\'s Leather Jacket', type: 'clothing', buyLink: youtubeLink, description: 'A classic brown leather jacket from the 60s.', timestamp: '00:15:00' },
          { itemThumbnail: '/images/reddeath.jpg', name: 'Musso & Frank Red Booth', type: 'furniture', buyLink: youtubeLink, description: 'The iconic red leather booths of the restaurant.', timestamp: '00:16:00' },
          { itemThumbnail: '/images/booth.jpg', name: 'Musso & Frank Grill', type: 'places', mapLink: youtubeLink, description: 'Hollywood\'s oldest and most famous restaurant.', timestamp: '00:14:30' }
        ]
      },
      {
        sceneId: 2,
        title: 'Spahn Ranch',
        thumbnail: '/images/girlys.jpg',
        items: [
          { itemThumbnail: '/images/HAW.jpg', name: 'Cliff Booth\'s Hawaiian Shirt', type: 'clothing', buyLink: youtubeLink, description: 'A yellow Hawaiian shirt worn by Cliff.', timestamp: '01:45:00' },
          { itemThumbnail: '/images/RANCH.jpg', name: 'Spahn Movie Ranch', type: 'places', mapLink: youtubeLink, description: 'The dilapidated former movie set.', timestamp: '01:44:00' }
        ]
      }
    ]
  }
];

// --- USER AUTH ROUTES ---

// POST /api/signup - UPDATED to include profile info
app.post('/api/signup', (req, res) => {
  // Now expecting profileName and profileAvatar in the request
  const { username, password, profileName, profileAvatar } = req.body;

  if (!username || !password || !profileName || !profileAvatar) {
    return res.status(400).json({ error: 'Missing required fields for signup.' });
  }

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Login Name already exists' });
  }

  const newUser = { 
    id: nextUserId++, 
    username, 
    password, 
    profileName, 
    profileAvatar, 
    savedCart: [] 
  };
  users.push(newUser);

  // Return the full user object, excluding the password
  const userToReturn = { ...newUser };
  delete userToReturn.password;

  res.json({ message: 'User created successfully', user: userToReturn });
});

// POST /api/signin - UPDATED to return profile info
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid Login Name or password' });
  }
  
  // Return the full user object, excluding the password
  const userToReturn = { ...user };
  delete userToReturn.password;
  
  res.json({ message: 'Login successful', user: userToReturn });
});

// --- CART PERSISTENCE ROUTES ---

// POST /api/cart/:userId - Save the user's current cart
app.post('/api/cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { cart } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.savedCart = cart; // Overwrite the saved cart
  res.json({ message: 'Cart saved successfully', savedCart: user.savedCart });
});

// GET /api/cart/:userId - Load the user's saved cart
app.get('/api/cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ savedCart: user.savedCart });
});

// --- MOVIE/SCENE ROUTES ---
app.get('/api/movies', (req, res) => res.json(movies));

app.get('/api/movies/:id/scenes/:sceneId', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  const scene = movie.scenes.find(s => s.sceneId === parseInt(req.params.sceneId));
  if (!scene) return res.status(404).json({ error: 'Scene not found' });
  res.json(scene);
});

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));