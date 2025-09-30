import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); // Essential for handling POST request bodies

// --- SIMULATED IN-MEMORY DATABASE ---
let nextUserId = 1;
const users = []; // Stores { id, username, password, savedCart: [] }
// ------------------------------------

// Movies dataset with ALL item data structures updated
const movies = [
  {
    id: 1,
    title: 'La La Land',
    year: 2016,
    posterUrl: '/images/land.jpg',
    scenes: [
      {
        sceneId: 1,
        title: 'Opening Street Dance',
        thumbnail: '/images/dance.jpg',
        items: [
          { 
            itemThumbnail:'/images/Yellow.jpg', // Path updated and key corrected
            name: 'Mia’s Dress', 
            type: 'clothing', 
            buyLink: 'https://example.com/dress', 
            description: "A vibrant yellow vintage-style dress.", 
            timestamp: "00:03:15"
          },
          { 
            itemThumbnail: '/images/lamp.jpg', 
            name: 'Street Lamp', 
            type: 'furniture', 
            mapLink: 'https://maps.google.com',
            description: "An iconic, LA city street lamp.", 
            timestamp: "00:03:40"
          },
          { 
            itemThumbnail: '/images/street.jpg',
            name: 'Los Angeles Street', 
            type: 'places', 
            mapLink: 'https://maps.google.com',
            description: "The stunning location of the opening freeway dance.", 
            timestamp: "00:01:00" 
          }
        ]
      },
      {
        sceneId: 2,
        title: 'Planetarium Dance',
        thumbnail: '/images/planet.jpg',
        items: [
          { 
            itemThumbnail: '/images/jacket.jpg',
            name: 'Sebastian’s Jacket', 
            type: 'clothing', 
            buyLink: 'https://example.com/jacket',
            description: "A light brown blazer, perfect for jazz clubs.", 
            timestamp: "01:05:22"
          }
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
          { 
            itemThumbnail: '/images/suit.jpg',
            name: 'Cobb’s Suit', 
            type: 'clothing', 
            buyLink: 'https://example.com/suit',
            description: "A tailored, dark black business suit.", 
            timestamp: "00:15:00"
          },
          { 
            itemThumbnail: '/images/paris.jpg',
            name: 'Paris Street', 
            type: 'places', 
            mapLink: 'https://maps.google.com',
            description: "The street where the city folds.", 
            timestamp: "00:40:00" 
          }
        ]
      },
      {
        sceneId: 2,
        title: 'Rotating Hall',
        thumbnail: '/images/inception_Scene1.jpg',
        items: [
          { 
            itemThumbnail: '/images/table.jpg',
            name: 'Furniture Set', 
            type: 'furniture', 
            buyLink: 'https://example.com/furniture',
            description: "A set of gravity-defying hotel room furniture.", 
            timestamp: "01:25:30"
          }
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
          { 
            itemThumbnail: '/images/neo.jpg',
            name: 'Neo’s Jacket', 
            type: 'clothing', 
            buyLink: 'https://example.com/neo-jacket',
            description: "Neo's iconic black trench coat.", 
            timestamp: "00:30:10"
          },
          { 
            itemThumbnail: '/images/office.jpg',
            name: 'Morpheus Office', 
            type: 'places', 
            mapLink: 'https://maps.google.com',
            description: "The location of the critical choice.", 
            timestamp: "00:30:00"
          }
        ]
      },
      {
        sceneId: 2,
        title: 'Lobby Shootout',
        thumbnail: '/images/lobby.jpg',
        items: [
          { 
            itemThumbnail: '/images/prop.jpg',
            name: 'Gun Props', 
            type: 'furniture', 
            buyLink: 'https://example.com/gun-props',
            description: "A replica prop used in the famous shootout.", 
            timestamp: "01:45:00"
          }
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
          { 
            itemThumbnail: '/images/gump.jpg',
            name: 'Forrest’s Jacket', 
            type: 'clothing', 
            buyLink: 'https://example.com/forrest-jacket',
            description: "Forrest’s simple, plaid shirt and jacket ensemble.", 
            timestamp: "00:05:00"
          },
          { 
            itemThumbnail: '/images/sit.jpg',
            name: 'Park Bench', 
            type: 'furniture', 
            mapLink: 'https://maps.google.com',
            description: "A historical park bench model.", 
            timestamp: "00:04:30"
          },
          { 
            itemThumbnail: '/images/park.jpg',
            name: 'Green Park', 
            type: 'places', 
            mapLink: 'https://maps.google.com',
            description: "The general location where Forrest tells his story.", 
            timestamp: "00:01:00"
          }
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
          { 
            itemThumbnail: '/images/pink.jpg',
            name: 'Rose’s Dress', 
            type: 'clothing', 
            buyLink: 'https://example.com/rose-dress',
            description: "Rose's elegant pink and white dinner dress.", 
            timestamp: "01:10:00"
          },
          { 
            itemThumbnail: '/images/rail.jpg',
            name: 'Ship Deck Railing', 
            type: 'furniture', 
            mapLink: 'https://maps.google.com',
            description: "The replica deck railing for the ship.", 
            timestamp: "01:15:30"
          },
          { 
            itemThumbnail: '/images/ocean.jpg',
            name: 'Atlantic Ocean', 
            type: 'places', 
            mapLink: 'https://maps.google.com',
            description: "The vast North Atlantic.", 
            timestamp: "01:16:00"
          }
        ]
      }
    ]
  }
];

// --- USER AUTH ROUTES ---

// POST /api/signup - Create a new user (simulated)
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = { id: nextUserId++, username, password, savedCart: [] };
  users.push(newUser);
  // In a real app, you would generate a JWT token here
  res.json({ message: 'User created successfully', user: { id: newUser.id, username: newUser.username, savedCart: newUser.savedCart } });
});

// POST /api/signin - Log in a user (simulated)
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  // In a real app, you would generate a JWT token here
  res.json({ message: 'Login successful', user: { id: user.id, username: user.username, savedCart: user.savedCart } });
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

// --- MOVIE/SCENE ROUTES (keep your existing routes) ---
app.get('/api/movies', (req, res) => res.json(movies));

app.get('/api/movies/:id/scenes/:sceneId', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  const scene = movie.scenes.find(s => s.sceneId === parseInt(req.params.sceneId));
  if (!scene) return res.status(404).json({ error: 'Scene not found' });
  res.json(scene);
});

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
