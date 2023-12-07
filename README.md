# Features

- [x] Configuração do Projeto
  - [X] Configurar Prettier, Eslint e EditorConfig
  - [X] Configurar TailwindCSS
  - [x] Configurar Banco de Dados Local (Sqlite e/ou TypeORM)

- [ ] Autenticação Local
  - [ ] Cadastrar um senha localmente na primeira inicialização do app

- [ ] Tela Inicial
  - [ ] Exibir lista de viagens cadastradas em ordem cronologica
    - [ ] Cada item da lista deve conter uma imagem, descrição da Viagem, Data e se o cadastro é rascunho ou já foi concluido.
    - [ ] Se o usuário não cadastrar nenhuma imagem, usar uma como padrão como capa
    - [ ] Adicionar icone de menu em cada item
      - [ ] Adicionar opção para alterar a viagem
      - [ ] Adicionar opção para excluir a viagem
      - [ ] Pedir confirmação por digital ou senha do dispositivo antes de excluir e alterar.
      - [ ] Caso o aparelho não tenha autenticação informar uma modal para que insira a senha master do app
  - [ ] Adicionar botão para cadastrar uma nova viagem
- [ ] Tela de cadastro de viagens

  - [ ] Permitir cadastrar e alterar os dados da viagem (Local, Data, Id)
    - [X] Criar componente datePicker
  - [ ] Exibir a lista de locais visitados
    - [ ] Listar locais em ordem cronologica
    - [ ] Cada item deve possuir o local visitado, data e um carrossel de imagens

- [ ] Tela de cadastro de entradas
  - [ ] Exibir detalhes da viagem
  - [ ] Permitir cadastrar uma entrada, (data, local, descricao, fotos)
  - [ ] Exibir um carrossel com as fotos inseridas.

---

## Requisitos

### Descrição geral do aplicativo

O aplicativo a ser desenvolvido nesta avaliação deve ser utilizado pelos seus utilizadores de forma a registrar diários de viagens, de forma a permitir uma fácil visualização destes dados ao utilizar o aplicativo.

### Requisitos Funcionais

Os requisitos funcionais descrevem o comportamento do aplicativo e estão listados aqui em ordem aleatória. Todo o comportamento descrito aqui é obrigatório e deve ser realizado. Incrementos podem ser feitos, a critério do(s) discente(s), desde que não alterem o comportamento dos requisitos.

#### RF01 - Tela inicial

A tela inicial do aplicativo deve exibir as viagens já cadastradas bem como as em processo de cadastro de forma diferenciada. A forma como a diferenciação será realizada ficará a cargo dos desenvolvedores. Também deve exibir uma opção para cadastro de nova viagem (ver RF02), bem como edição e exclusão de viagens já cadastradas (ver RF04 e RF05).

#### RF02 - Cadastro de nova viagem

Cada viagem deve conter dados referentes às datas e locais visitados. A forma como os dados serão coletados ficará a critério dos desenvolvedores. Cada diário de uma viagem deve contar com uma ou mais entradas (ver RF03).

#### RF03 - Entrada de diário

Para cada viagem, é possível informar diversas entradas em um diário, informando datas e locais visitados, bem como uma descrição da atividade realizada e arquivos de mídia referentes àquela entrada. A forma como os dados serão coletados ficará a critério dos desenvolvedores.

#### RF04 - Edição de viagem

Viagens já cadastradas podem ser alteradas em todos os seus dados. No entanto, para que possa ser feita a alteração dos dados, é obrigatório que o usuário realize, com sucesso, uma autenticação local, que ficará a critério dos desenvolvedores.

#### RF05 - Remoção de viagem

Viagens já cadastradas podem ser removidas. No entanto, para que essa operação possa ser feita, é obrigatório que o usuário realize, com sucesso, uma autenticação local, que ficará a critério dos desenvolvedores.

#### RF06 - Visualização de viagem

Viagens já cadastradas devem possuir uma opção para que o usuário possa visualizar as entradas em ordem cronológica.

### Requisitos Não Funcionais

Os requisitos não funcionais descrevem qualidades e características do aplicativo. Todas os requisitos não funcionais descritos aqui são obrigatórios e devem ser cumpridos no desenvolvimento do aplicativo.

#### RNF01 - Plataforma e uso esperado do sistema

O aplicativo deve ser desenvolvido em duas versões, uma utilizando o framework Flutter e outra utilizando o framework React Native. Todas as tecnologias utilizadas devem ser gratuitas, sendo ambos aplicativos capazes de serem executados em smartphones Android (a partir da versão 1) e iOS (a partir da versão 13).

#### RNF02 - Facilidade de uso

O aplicativo deve possuir interface com o usuário amigável e de fácil utilização. As decisões a serem tomadas para a construção da interface e a coleta dos dados devem sempre considerar a usabilidade do e a satisfação do usuário. Uma vez na tela inicial do aplicativo, espera-se que usuários não gastem mais que 2 toques para iniciar um cadastro, 5 toques para realizar uma remoção, 3 toques parar iniciar uma atualização e 2 toques para iniciar uma visualização.

## Referecias

- [Configurar Typescript Paths](https://reactnative.dev/docs/typescript)
- [Configurar TypeORM](https://dev.to/jgabriel1/expo-sqlite-typeorm-4mn8)
- [Configurar TypeORM](https://github.com/DeividFrancis/poc-expo-typeorm/)
- [Documentação TypeORM](https://typeorm.io/)
- [EsLint, Prettier](https://www.youtube.com/watch?v=e_nJ5DxZ900)
- [TailWindCSS React Native](https://www.nativewind.dev/)
- [Criar Logo](https://designs.ai/logomaker)
- [Relacionamentos Utilizando TypeORM](https://www.tabnews.com.br/HenriqueSchroeder/relacionamentos-no-typeorm)
