import { Movie, Theater, ShowTime } from './types';

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    banner: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    rating: 'PG-13',
    genre: ['Sci-Fi', 'Adventure'],
    duration: '2h 46m',
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.",
    releaseDate: 'March 1, 2024',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    popularity: 99
  },
  {
    id: 'm2',
    title: 'Gladiator II',
    poster: 'https://image.tmdb.org/t/p/original/2cxhvsyzoMUPjVxOpJpUpx.jpg',
    banner: 'https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg',
    rating: 'R',
    genre: ['Action', 'Drama'],
    duration: '2h 28m',
    description: "Years after witnessing the death of the revered hero Maximus, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors.",
    releaseDate: 'November 22, 2024',
    director: 'Ridley Scott',
    cast: ['Paul Mescal', 'Pedro Pascal', 'Denzel Washington'],
    popularity: 94
  },
  {
    id: 'm3',
    title: 'Wicked',
    poster: 'https://image.tmdb.org/t/p/original/c5Tqxeo1UpBvnAc3csUm7j3y8qT.jpg',
    banner: 'https://image.tmdb.org/t/p/original/uX08S9H1vR8vS37vE6G6G6G6G6.jpg', // Keeping existing banner as fallack or finding new one if broken
    rating: 'PG',
    genre: ['Fantasy', 'Musical'],
    duration: '2h 40m',
    description: "After two decades as a beloved musical, Wicked makes its journey to the big screen as a spectacular, generation-defining cinematic event.",
    releaseDate: 'November 22, 2024',
    director: 'Jon M. Chu',
    cast: ['Cynthia Erivo', 'Ariana Grande', 'Jeff Goldblum'],
    popularity: 96
  },
  {
    id: 'm4',
    title: 'Deadpool & Wolverine',
    poster: 'https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    banner: 'https://image.tmdb.org/t/p/original/9l1eZiJHm54wdveE25xXl0r2uXp.jpg',
    rating: 'R',
    genre: ['Action', 'Comedy'],
    duration: '2h 8m',
    description: "Wade Wilson's days as Deadpool are behind him until his homeworld faces an existential threat, forcing him to suit up with a very reluctant Wolverine.",
    releaseDate: 'July 26, 2024',
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman'],
    popularity: 98
  },
  {
    id: 'm5',
    title: 'The Room Next Door',
    poster: 'https://image.tmdb.org/t/p/original/r5eQ0sYhT5H5f5T5T5T5T5T5T5.jpg', // Placeholder - will use a generic high quality one if exact match fails
    banner: 'https://image.tmdb.org/t/p/original/p6O8NETsO2HnaUe3vI6C0ARvmo.jpg',
    rating: 'R',
    genre: ['Drama'],
    duration: '1h 47m',
    description: "Ingrid and Martha were close friends in their youth. Life separated them, but circumstances bring them back together in this poignant drama.",
    releaseDate: 'October 18, 2024',
    director: 'Pedro Almodóvar',
    cast: ['Julianne Moore', 'Tilda Swinton'],
    popularity: 82
  },
  {
    id: 'm6',
    title: 'Joker: Folie à Deux',
    poster: 'https://image.tmdb.org/t/p/original/aciP8KmS3vS1qS79InoNfSTSU4u.jpg',
    banner: 'https://image.tmdb.org/t/p/original/uS1S1O1S1O1S1O1S1O1S1O1S1O.jpg', // Placeholder
    rating: 'R',
    genre: ['Drama', 'Crime', 'Musical'],
    duration: '2h 18m',
    description: "Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital. Upon his release, the two of them embark on a doomed romantic misadventure.",
    releaseDate: 'October 4, 2024',
    director: 'Todd Phillips',
    cast: ['Joaquin Phoenix', 'Lady Gaga', 'Brendan Gleeson'],
    popularity: 88
  },
  {
    id: 'm7',
    title: 'Beetlejuice Beetlejuice',
    poster: 'https://image.tmdb.org/t/p/original/kKgQzkUCnSfsfgIjgfgJuRy4mRqi.jpg',
    banner: 'https://image.tmdb.org/t/p/original/9B1S1O1S1O1S1O1S1O1S1O1S1O.jpg', // Placeholder
    rating: 'PG-13',
    genre: ['Comedy', 'Fantasy'],
    duration: '1h 44m',
    description: "After an unexpected family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Beetlejuice, Lydia's life is turned upside down when her rebellious teenage daughter, Astrid, discovers the mysterious model of the town in the attic.",
    releaseDate: 'September 6, 2024',
    director: 'Tim Burton',
    cast: ['Michael Keaton', 'Winona Ryder', 'Jenna Ortega'],
    popularity: 92
  },
  {
    id: 'm8',
    title: 'Moana 2',
    poster: 'https://image.tmdb.org/t/p/original/4YZpssx684mK2M4l0v5T5T5T5T5.jpg', // Placeholder
    banner: 'https://image.tmdb.org/t/p/original/tE1S1O1S1O1S1O1S1O1S1O1S1O.jpg', // Placeholder
    rating: 'PG',
    genre: ['Animation', 'Adventure', 'Family'],
    duration: '1h 40m',
    description: "After receiving an unexpected call from her wayfinding ancestors, Moana must journey to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she’ve ever faced.",
    releaseDate: 'November 27, 2024',
    director: 'David G. Derrick Jr.',
    cast: ['Auliʻi Cravalho', 'Dwayne Johnson'],
    popularity: 97
  },
  {
    id: 'm9',
    title: 'Sonic the Hedgehog 3',
    poster: 'https://image.tmdb.org/t/p/original/d8RSTun7Hpk97fm6TryM00pXPvC.jpg',
    banner: 'https://image.tmdb.org/t/p/original/zOpe1S1O1S1O1S1O1S1O1S1O1S1O.jpg',
    rating: 'PG',
    genre: ['Action', 'Adventure', 'Family'],
    duration: '1h 50m',
    description: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance.",
    releaseDate: 'December 20, 2024',
    director: 'Jeff Fowler',
    cast: ['Ben Schwartz', 'Jim Carrey', 'Keanu Reeves'],
    popularity: 95
  },
  {
    id: 'm10',
    title: 'Nosferatu',
    poster: 'https://image.tmdb.org/t/p/original/56S1O1S1O1S1O1S1O1S1O1S1O1S.jpg', // Placeholder
    banner: 'https://image.tmdb.org/t/p/original/n5S1O1S1O1S1O1S1O1S1O1S1O1S.jpg',
    rating: 'R',
    genre: ['Horror', 'Fantasy'],
    duration: '2h 12m',
    description: "A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake.",
    releaseDate: 'December 25, 2024',
    director: 'Robert Eggers',
    cast: ['Bill Skarsgård', 'Nicholas Hoult', 'Lily-Rose Depp'],
    popularity: 90
  },
  {
    id: 'm11',
    title: 'A Real Pain',
    poster: 'https://image.tmdb.org/t/p/original/j0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg', // Placeholder
    banner: 'https://image.tmdb.org/t/p/original/p0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg',
    rating: 'R',
    genre: ['Comedy', 'Drama'],
    duration: '1h 30m',
    description: "Mismatched cousins David and Benji reunite for a tour through Poland to honor their beloved grandmother. The adventure takes a turn when the pair's old tensions resurface against the backdrop of their family history.",
    releaseDate: 'November 1, 2024',
    director: 'Jesse Eisenberg',
    cast: ['Jesse Eisenberg', 'Kieran Culkin'],
    popularity: 85
  },
  {
    id: 'm12',
    title: 'Conclave',
    poster: 'https://image.tmdb.org/t/p/original/c0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg', // Placeholder
    banner: 'https://image.tmdb.org/t/p/original/r0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg',
    rating: 'PG',
    genre: ['Thriller'],
    duration: '2h 0m',
    description: "Cardinal Lawrence is tasked with leading one of the world's most secretive and ancient events, selecting a new Pope, where he finds himself at the center of a conspiracy that could shake the very foundation of the Church.",
    releaseDate: 'October 25, 2024',
    director: 'Edward Berger',
    cast: ['Ralph Fiennes', 'Stanley Tucci', 'John Lithgow'],
    popularity: 84
  },
  {
    id: 'm13',
    title: 'Anora',
    poster: 'https://image.tmdb.org/t/p/original/p0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg', // Placeholder
    banner: 'https://image.tmdb.org/t/p/original/a0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg',
    rating: 'R',
    genre: ['Comedy', 'Drama', 'Romance'],
    duration: '2h 19m',
    description: "Anora, a young sex worker from Brooklyn, gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch. Once the news reaches Russia, her fairytale is threatened.",
    releaseDate: 'October 18, 2024',
    director: 'Sean Baker',
    cast: ['Mikey Madison', 'Mark Eydelshteyn', 'Yura Borisov'],
    popularity: 89
  },
  {
    id: 'm14',
    title: 'A Complete Unknown',
    poster: 'https://image.tmdb.org/t/p/original/t0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg', // Placeholder
    banner: 'https://image.tmdb.org/t/p/original/d0S1O1S1O1S1O1S1O1S1O1S1O1S.jpg',
    rating: 'PG-13',
    genre: ['Drama', 'Music'],
    duration: '2h 20m',
    description: "At the Newport Folk Festival in 1965, a young Bob Dylan shakes up the font music scene by going electric, defining a generation and changing music forever.",
    releaseDate: 'December 25, 2024',
    director: 'James Mangold',
    cast: ['Timothée Chalamet', 'Edward Norton', 'Elle Fanning'],
    popularity: 91
  }
];

export const THEATERS: Theater[] = [
  {
    id: 't1',
    name: 'CineNYC Flagship - Times Square',
    address: '1501 Broadway, New York, NY 10036',
    distance: '0.2 miles',
    amenities: ['IMAX Laser', 'Dolby Atmos', 'Signature Recliners']
  },
  {
    id: 't3',
    name: 'CineNYC Boutique - Brooklyn Heights',
    address: '188 Montague St, Brooklyn, NY 11201',
    distance: '3.1 miles',
    amenities: ['Artisanal Bar', 'Vintage Decor', 'Reserved Seating']
  }
];

export const SHOWTIMES: ShowTime[] = [
  { id: 's1', theaterId: 't1', movieId: 'm1', time: '12:45 PM', format: 'IMAX', price: 12.00 },
  { id: 's2', theaterId: 't1', movieId: 'm1', time: '4:15 PM', format: 'IMAX', price: 12.00 },
  { id: 's3', theaterId: 't1', movieId: 'm1', time: '7:45 PM', format: 'IMAX', price: 12.00 },
  { id: 's4', theaterId: 't1', movieId: 'm2', time: '3:00 PM', format: 'Dolby Cinema', price: 12.00 },
  { id: 's5', theaterId: 't3', movieId: 'm2', time: '7:30 PM', format: '2D', price: 12.00 },
  { id: 's6', theaterId: 't3', movieId: 'm3', time: '6:30 PM', format: '2D', price: 12.00 },
  { id: 's7', theaterId: 't3', movieId: 'm4', time: '9:15 PM', format: '2D', price: 12.00 },
  { id: 's8', theaterId: 't1', movieId: 'm5', time: '8:30 PM', format: '2D', price: 12.00 },
  { id: 's9', theaterId: 't1', movieId: 'm6', time: '7:00 PM', format: 'IMAX', price: 12.00 },
  { id: 's10', theaterId: 't1', movieId: 'm7', time: '1:15 PM', format: '2D', price: 12.00 },
  { id: 's11', theaterId: 't3', movieId: 'm8', time: '12:00 PM', format: '2D', price: 12.00 },
  { id: 's12', theaterId: 't3', movieId: 'm9', time: '2:45 PM', format: '2D', price: 12.00 },
  { id: 's13', theaterId: 't1', movieId: 'm10', time: '10:30 PM', format: '2D', price: 12.00 },
  { id: 's14', theaterId: 't3', movieId: 'm11', time: '5:30 PM', format: '2D', price: 12.00 },
  { id: 's15', theaterId: 't1', movieId: 'm13', time: '5:00 PM', format: '2D', price: 12.00 },
  { id: 's16', theaterId: 't3', movieId: 'm13', time: '8:00 PM', format: '2D', price: 12.00 },
  { id: 's17', theaterId: 't1', movieId: 'm14', time: '2:30 PM', format: '2D', price: 12.00 },
  { id: 's18', theaterId: 't1', movieId: 'm12', time: '4:45 PM', format: '2D', price: 12.00 },
];