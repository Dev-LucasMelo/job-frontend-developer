## Visão geral

- O projeto tem como objetivo apresentar os serviços que a empresa oferece, destacando de forma simples, elegante e objetiva informações relevantes para possíveis clientes. </br></br>
Além da página institucional, a aplicação conta com um chatbot interativo, acessado por um botão flutuante, que proporciona uma experiência de consultoria automatizada. O fluxo de conversa é bem definido, com foco em oferecer estratégias digitais personalizadas para alavancar o crescimento do cliente. </br></br>
Este projeto foi desenvolvido utilizando <Strong>Next.js, React, TypeScript e Redux Toolkit</Strong>

## Experiência de desenvolvimento

- De forma geral, o desenvolvimento foi tranquilo, principalmente por já possuir experiências profissionais com as tecnologias utilizadas no projeto. </br></br>
A parte mais desafiadora foi o tratamento das instruções fornecidas para simular o comportamento do chatbot. Para garantir que tudo funcionasse como o esperado, foi necessário mapear cuidadosamente as interações entre o usuário e o bot, tipar os dados de forma consistente e integrar essa estrutura à lógica de estado global da aplicação. Também foram considerados cenários de erro e possíveis adaptações futuras para integração com uma IA. </br></br>
Outro ponto que exigiu atenção foram os testes automatizados dessa lógica de mapeamento, que envolviam cenários mais avançados e demandaram um cuidado maior na escrita dos casos de teste.
Fora isso, a componentização da interface e o desenvolvimento geral seguiram de forma fluida, com foco na organização, reuso e clareza do código.

## Principais Decisões Tomadas

- Uso do <Strong>Redux Toolkit</Strong> para facilitar o gerenciamento de estado da aplicação
de forma simples e organizada, pois lida com o gerenciamento de estado de forma centralizada, o que contribui com uma arquitetura escalável.

- A arquitetura escolhida foi baseada em <Strong>feature/Page</Strong>, organizando os diretorios pelo nome da página ou funcionalidade, o que favorece a manutenção, reutilização dos componentes e testabilidade, além de isolar as camadas de negócio, gerenciamento de estado, testes e interface do usuário. de forma mais eficiente. 

- <Strong>Tipagem forte</Strong> com TypeScript para facilitar a manipulação dos dados e garantir a integridade, especialmente em fluxos dinâmicos e complexos.

- Desenvolvimento de componentes com responsabilidade única e bem definida para favorecer a reutilização e manutenção. 

- Testes automatizados com Testing Library e Jest, organizados em duas camadas:

  - <Strong>UI:</Strong> testes focados em componentes e interfaces gráficas.

  - <Strong>Logic:</Strong> testes da camada de negócio, como o comportamento do chatbot.

## Instruções para rodar o projeto

1. **Clone o repositório**
  
```bash
git clone https://github.com/Dev-LucasMelo/job-frontend-developer.git
```

2. **Acesse a pasta do projeto**

```bash
cd dashboard_dolado
```

3. **Instale as dependências**

```bash
npm install
```
4. **Execute os testes**

```bash
npm run test
```
5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

6. **Acessar no navegador**

```bash
http://localhost:3000/
```