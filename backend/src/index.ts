import { createServer } from './server';

const PORT = process.env.PORT || 3001;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Azul Online server running on port ${PORT}`);
});
