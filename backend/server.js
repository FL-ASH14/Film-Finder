import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

// Movies dataset with Imgur-hosted images
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
          { thumbnail:'/images/yellow.png',name: 'Mia’s Dress', type: 'clothing', buyLink: 'https://example.com/dress' },
          { name: 'Street Lamp', type: 'furniture', mapLink: 'https://maps.google.com' },
          { name: 'Los Angeles Street', type: 'place', mapLink: 'https://maps.google.com' }
        ]
      },
      {
        sceneId: 2,
        title: 'Planetarium Dance',
        thumbnail: '/images/planet.jpg',
        items: [
          { name: 'Sebastian’s Jacket', type: 'clothing', buyLink: 'https://example.com/jacket' }
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
          { name: 'Cobb’s Suit', type: 'clothing', buyLink: 'https://example.com/suit' },
          { name: 'Paris Street', type: 'place', mapLink: 'https://maps.google.com' }
        ]
      },
      {
        sceneId: 2,
        title: 'Rotating Hall',
        thumbnail: '/images/inception_Scene1.jpg',
        items: [
          { name: 'Furniture Set', type: 'furniture', buyLink: 'https://example.com/furniture' }
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
          { name: 'Neo’s Jacket', type: 'clothing', buyLink: 'https://example.com/neo-jacket' },
          { name: 'Morpheus Office', type: 'place', mapLink: 'https://maps.google.com' }
        ]
      },
      {
        sceneId: 2,
        title: 'Lobby Shootout',
        thumbnail: '/images/lobby.jpg',
        items: [
          { name: 'Gun Props', type: 'furniture', buyLink: 'https://example.com/gun-props' }
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
          { name: 'Forrest’s Jacket', type: 'clothing', buyLink: 'https://example.com/forrest-jacket' },
          { name: 'Park Bench', type: 'furniture', mapLink: 'https://maps.google.com' },
          { name: 'Green Park', type: 'place', mapLink: 'https://maps.google.com' }
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
          { name: 'Rose’s Dress', type: 'clothing', buyLink: 'https://example.com/rose-dress' },
          { name: 'Ship Deck', type: 'furniture', mapLink: 'https://maps.google.com' },
          { name: 'Atlantic Ocean', type: 'place', mapLink: 'https://maps.google.com' }
        ]
      }
    ]
  }
];

// Routes
app.get('/api/movies', (req, res) => res.json(movies));

app.get('/api/movies/:id/scenes/:sceneId', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  const scene = movie.scenes.find(s => s.sceneId === parseInt(req.params.sceneId));
  if (!scene) return res.status(404).json({ error: 'Scene not found' });
  res.json(scene);
});

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
