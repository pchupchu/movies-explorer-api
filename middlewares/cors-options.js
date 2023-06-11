const corsOptions = {
  origin: [
    'http://movies-pchu.nomoredomains.rocks',
    'https://movies-pchu.nomoredomains.rocks',
    'http://api.movies-pchu.nomoredomains.rocks',
    'https://api.movies-pchu.nomoredomains.rocks',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

module.exports = corsOptions;
