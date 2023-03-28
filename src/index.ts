import 'reflect-metadata';

import app from './app';

import { prisma } from './database/prismaClient';

const PORT = 3000;
const HOST = '0.0.0.0';

prisma.$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor inicializado em http://${HOST}:${PORT} 🚀`);
    });

  }).catch(err => console.log(err, ': Erro ao conectar no Banco de Dados 📦'));





