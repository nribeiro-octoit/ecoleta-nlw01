import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
   { title: 'Lâmpadas', image: 'lampadas.svg' },
   { title: 'Pilhas e Baterias', image: 'baterias.svg' },
   { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
   { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
   { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
   { title: 'óleo de Cozinha', image: 'oleo.svg' },
  ])
}

// Seeds serve para popular o banco de dados com valores default.
// Arquivo que insere dados automaticamente a partir de comando no terminal.