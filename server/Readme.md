# Criação do back-end

Link do repositório do projeto [ecoleta](https://github.com/nribeiro-octoit/ecoleta-nlw01).

**Comando para criar um projeto note**

```bash
npm init -y 
```

⇒ O -y server para criar um projeto com todas as opções no padrão.

**Comando para instalar o Express**

```bash
npm install express 
```

⇒ É um micro framework para lidar com rotas.

Criar Pasta SRC

Criar arquivo server.ts ⇒ .ts pois será utilizado typescrip.

**Comando para instalar definição de tipos do Express**

```bash
npm install @types/express -D
```

No arquivo server.ts importar o express e criar variável app;

```tsx
// Arquivo server.ts
import express from 'express';

const app = express();

app.listen(3333);
```

**Comando para instalar ts-node**

⇒ Comando necessário para que o node execute o typescrip.

```bash
npm install ts-node -D 
```

**Comando para instalar o typescript**

```bash
npm install typescript -D 
```

**Comando para criar arquivo de configuração do typescript**

```bash
npx tsc —init
```

**Comando para instalar o ts-node-dev**

⇒ Utilizado para que não seja necessário ficar reexecutando o comando o ts-node sempre que houver uma atualização no projeto.

```bash
npm install ts-node-dev -D 
```

**Criar script no arquivo package.json**

```json
	"scripts": {
    "dev": "ts-node-dev --ignore-watch node_modules src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

⇒ Após isto para executar o comando podemos usar o npm run dev

⇒ Observação: --ignore-watch node_modules não é necessário mas pode ser utilizado para que o ts-node-dev reexecute mais rápido a aplicação ao detectar modificação, já que --ignore faz com que o ts-node-dev não fique verificando neste caso as modificações ocorridas na pasta node_modules.

**Tipos de rotas principais de APIs.**

⇒ **GET** → Buscar uma ou mais informações do back-end.

⇒ **POST** → Criar uma nova informação no back-end.

⇒ **PUT** → Atualizar uma informação do back-end.

⇒ **DELETE** → Excluir uma informação do back-end.

**Tipos de Parâmetros**

⇒ **Request params** → Parâmetros que vem na própria rota que identificam um recurso.

⇒ **Query params** → Parâmetros que vem na própria rota e são opcionais.

⇒ **Request Body** → Parâmetros para criação/atualização de informações.

**Knex.js** 

```bash
npm install knex
```

⇒ Biblioteca que permite executar queries sql escritas em javascript.

```sql
SELECT * FROM users WHERE name = 'Nadson'
```

```jsx
knex('users').where('name': 'Nadson').select('*')
```

⇒ Motivo do uso: Permite utilizar qualquer banco sql relacional escrevendo as queries em javascript, o que facilita a troca do banco de dados caso necessário.

**Express.json()**

⇒ Por padrão o express não sabe que está sendo criado uma API Rest então ele não entende que podemos passar um json como parâmetro dentro do body da requisição, para resolver isto podemos utilizar o express.json().

```tsx
// Arquivo server.ts
**import express from 'express';

const app = express();

app.use(express.json());

app.get('/users', () => {
  console.log('teste');
});

app.listen(3333);**
```

**Criar arquivo de rotas routes.ts**

⇒ Arquivo onde ficará as rotas do server

```tsx
// Arquivo routes.ts
**import expres from 'express';

const routes = expres.Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default routes;**
```

**Criar pasta database com arquivo connection.ts**

⇒ Arquivo onde ficará a conexão com o banco de dados.

⇒ [Link da documentação do knex](http://knexjs.org/)

Neste caso foi utilizado o banco de dados sqlite

```bash
npm install sqlite3
```

⇒ Utilizando a biblioteca path para unir os caminhos sem precisar fazer explicitamente uma concatenação de string de forma que qualquer S.O possa reconhecer o caminho criado.

```tsx
path.resolve(__dirname, 'database.sqlite')
```

⇒ __dirname é uma variável global que retorna o caminho do diretório de onde a variável está sendo chamada.

```tsx
// Configuração do arquivo connection.ts
// Arquivo de referencia ao projeto ecoleta.
**import knex from 'knex';
import path from 'path'

const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },**
	useNullAsDefault: true,
**});

export default connection;**
```

**Migrations**

⇒ Basicamente é um histórico do banco de dados.

⇒ Criar arquivos com o que precisa ser executado quando uma nova versão software for executado.

```tsx
// Arquivo 00_create_points.ts
import Knex from 'knex';

export async function up(knex : Knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();    
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable()
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('point');
}
```

**Criação do knexfile.ts**

⇒ Configurações que o arquivo de banco de dados não tem.

```tsx
// Arquivo knexfile.ts
import path from 'path';

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
	useNullAsDefault: true,
};
```

**Execução da migration**

```bash
npx knex --knexfile knexfile.ts migrate:latest
```

**Utilizar o migrations para gerar informações nas tabelas.**

⇒ Os seeds servem para popular a base de dados.

```tsx
// Arquivo database/seeds/create_items.ts
import Knex frpm 'knex';

export async function seed(knex: Knex) {
  await	knex('items').inser([
		{ title: 'Lâmpadas', image: 'lampadas.svg' }
	]);
}
```

**Execução da seed**

```bash
npx knex --knexfile knexfile.ts seed:run
```

**Configurar rota estática para acesso de arquivos do backend**

```tsx
// Arquivo server.ts

app.use('uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
```

**Uso de transaction com o knex**

```tsx
// Arqvuivo pointsController
const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }
  
    const insertedIds = await trx('points').insert(point); 
  
    const point_id = insertedIds[0];
  
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          items_id: item_id,
          point_id: point_id,
        }
    })
  
    await trx('point_items').insert(pointItems);

    await trx.commit();
```

⇒ O uso de transaction durante a execução de queries se faz necessário para evitar que o node execute as queries mesmo que alguma delas tenha retornado algum erro, assim as queries só vão ser "comitadas" após a linha que contém o .commit() da transaction criada.

→ Para meios de organização o arquivo de rotas pode ser desacoplado, assim podemos criar arquivos com sufixo Controller para cada rota.

Ex arquivo routes.ts após remover as funções de dentro do mesmo: 

```tsx

import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';
import { celebrate, Joi } from "celebrate";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// Rotas Items 
routes.get('/items', itemsController.index);

// Rotas Points
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }, { abortEarly: false }),  
  pointsController.create);

// index, show, create, update, delete

export default routes;
```

Ex arquivo itemsController com as funções que existiam dentro de route.ts:

```tsx
import { Request, Response } from "express";
import knex from '../database/connection';

class ItemsController {
  async index (request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    // MAP -> percorre todos os items de array.
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.1.71:3333/uploads/${item.image}`,
      }
    })
  
    return response.json(serializedItems)
  }
}

export default ItemsController;
```

→ Ao separar em arquivos as funções de cada rota deixamos o código mais organizado assim sendo mais fácil identificar onde está localizado os nossos métodos.

Adição do CORS  na aplicação

```bash
npm install cors
npm install @type/cors -D 
```

→ Uso do CORS no arquivo server.ts

```tsx
import express from 'express';
import cors from 'cors'
import routes from './routes';
import path from 'path';
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// Roteamento para arquivos estáticos.
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);
```

⇒ O CORS define quais urls web vão poder acessar a aplicação.
