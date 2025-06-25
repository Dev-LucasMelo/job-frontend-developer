# Dolado: Teste prático para Frontend

## Introdução

Este é o teste que nós da Dolado usamos para avaliar os candidatos de vagas para Frontend. Do estagiário ao sênior, todos são avaliados pelo mesmo teste, mas por critérios distintos. Se você estiver participando de um processo seletivo para nossa equipe, certamente em algum momento receberá este link, mas caso você tenha chegado aqui "por acaso", sinta-se convidado a desenvolver nosso teste e enviar uma mensagem para nós no e-mail tech@dolado.com.br.

A ideia deste teste é ser acessível para todos, mas de acordo com a vaga olhamos com maior rigor para alguns pontos. De todo modo, esperamos que no decorrer deste desafio você tenha uma ótima experiência e esteja satisfeito com o resultado final antes de enviá-lo. Por este motivo, não colocamos um prazo para a realização do teste e esperamos que você dedique o tempo necessário até estar satisfeito com o resultado.

Nós fazemos isso esperando que as pessoas mais iniciantes entendam qual o modelo de profissional que temos por aqui e que buscamos para o nosso time. Portanto, se você estiver se candidatando a uma vaga mais iniciante, não se assuste e faça o melhor que você puder!

## Instruções

Você deverá criar um fork deste projeto e desenvolver todo o teste em cima dele. Esperamos encontrar no README principal do seu repositório uma descrição minuciosa sobre:

- Como foi a experiência no decorrer de todo o processo de desenvolvimento?
- Quais foram as principais decisões tomadas?
- Como foi organizado o projeto em termos de estrutura de pastas e arquivos?
- Instruções de como rodar o projeto.

Lembre-se que este é um teste técnico e não um concurso público, portanto, não existe apenas uma resposta correta. Mostre que você é bom e nos impressione, mas não esqueça do objetivo do projeto.

## O Desafio

Você acabou de ser contratado como desenvolvedor frontend na Dolado e seu primeiro projeto é crucial: nossa equipe de produto identificou que muitos empresários abandonam o processo de onboarding porque acham as etapas confusas e impessoais. 

O CEO te chamou e disse: *"Precisamos transformar essa experiência em algo que pareça uma conversa natural com um consultor especialista. Imagine que o empresário está conversando com alguém que realmente entende do negócio dele."*

Sua missão é criar uma interface de chatbot inteligente que faça o empresário se sentir compreendido e confiante de que a Dolado é a solução certa para transformar sua empresa em uma potência digital.

O chatbot deve conduzir uma conversa natural, coletando informações estratégicas sobre a empresa e culminando em um diagnóstico personalizado que mostre exatamente como a Dolado pode ajudar esse cliente específico a crescer nos marketplaces.

**O desafio real:** Fazer com que um empresário tradicional, que talvez nunca tenha vendido online, termine a conversa pensando "Nossa, esses caras realmente entendem do meu negócio!"

### O contexto da conversa:

Imagine que você está criando a experiência para Roberto, diretor comercial de uma indústria consolidada que fatura R$ 50 milhões por ano vendendo exclusivamente para distribuidores e grandes redes. A empresa tem 30 anos de mercado, produtos de qualidade reconhecida, mas zero presença digital. 

Roberto sabe que precisa "entrar no digital" porque vê concorrentes menores crescendo online, mas não sabe como uma empresa do porte dele pode competir nesses canais sem canibalizarizar os parceiros tradicionais.

Seu chatbot precisa:
- Demonstrar que entende a complexidade de grandes operações
- Mostrar como marketplaces podem ser um canal adicional, não concorrente  
- Abordar receios específicos de indústrias (pricing, distribuição, marca)
- Convencer que a Dolado tem experiência com empresas do porte dele

### Jornada conversacional sugerida:

1. **Boas-vindas** - Quebrar o gelo e explicar o valor da conversa
2. **Qualificação inicial** - Entender o negócio de forma natural  
3. **Análise de marketplace** - Descobrir ambições e receios sobre venda online
4. **Produtos** - Compreender o catálogo e potencial digital
5. **Diagnóstico** - Avaliar maturidade atual sem julgamentos
6. **Resultado** - Apresentar um plano específico e inspirador

*Nota: Você pode implementar todas essas etapas ou focar nas que considerar mais importantes para demonstrar suas habilidades.*

### Estrutura dos mocks fornecidos

Para facilitar o desenvolvimento, fornecemos abaixo exemplos de respostas que o chatbot pode usar em cada etapa. **Você pode usar exatamente esses dados ou criar os seus próprios seguindo a estrutura.**

#### Campos dos mocks:
- **message**: Texto principal que o bot fala
- **type**: Identificador da etapa (para controle de fluxo)
- **options**: Array de opções de resposta para o usuário  
- **followUp**: Próxima pergunta na mesma etapa (opcional)
- **tone/personality/insight**: Comentários para guiar o tom da conversa (podem ser ignorados no código)

*Sinta-se livre para simplificar esses mocks ou criar sua própria estrutura de dados.*

#### 1. Boas-vindas
```json
{
  "message": "Oi! Eu sou Sofia, consultora digital da Dolado. 😊 Sei que falar sobre vendas online pode parecer complicado, mas prometo que vamos tornar isso bem simples. Em 5 minutos, vou te mostrar exatamente como sua empresa pode crescer nos marketplaces. Pode ser?",
  "type": "welcome",
  "options": ["Claro, vamos lá!", "Primeiro quero entender melhor"],
  "personality": "Consultiva, acolhedora, confiante mas não pressiona"
}
```

#### 2. Qualificação inicial
```json
{
  "message": "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm? Quero entender a complexidade do negócio para dar as orientações mais assertivas.",
  "type": "qualification", 
  "options": ["Somos indústria/fabricantes", "Distribuidores atacadistas", "Operação mista (fabricamos e distribuímos)", "Grupo empresarial"],
  "followUp": {
    "message": "Que legal! E em termos de estrutura, vocês são uma operação de que porte?",
    "options": ["Média empresa (R$ 10-50mi/ano)", "Grande empresa (R$ 50-200mi/ano)", "Corporação (R$ 200mi+/ano)", "Grupo/Holding"],
    "tone": "Entende que está falando com tomadores de decisão sérios, com operações complexas"
  }
}
```

#### 3. Análise de marketplace  
```json
{
  "message": "Entendi perfeitamente o perfil! Agora, uma pergunta estratégica: como vocês enxergam os marketplaces? Sei que muitas indústrias têm receios sobre canibalizarização dos canais tradicionais.",
  "type": "marketplace",
  "options": ["Vemos como oportunidade adicional", "Temos receio de conflito com distribuidores", "Ainda estamos avaliando", "Concorrentes já estão lá, precisamos reagir"],
  "followUp": {
    "message": "Faz sentido! E se fossem testar, qual canal seria mais estratégico para o porte de vocês?",
    "options": ["Mercado Livre (maior alcance)", "Amazon (perfil mais premium)", "Shopee (crescimento rápido)", "B2B marketplaces", "Marketplace próprio"],
    "insight": "Mostra que entende estratégias de canal para grandes empresas"
  }
}
```

#### 4. Produtos
```json
{
  "message": "Perfeito! Agora vamos falar do portfólio. Com o volume que vocês devem ter, imagino que seja um catálogo robusto. Quantas SKUs vocês gerenciam?",
  "type": "products",
  "options": ["Catálogo focado (até 500 SKUs)", "Portfólio amplo (500-2000 SKUs)", "Mega catálogo (2000+ SKUs)", "Multiple categorias/divisões"],
  "followUp": {
    "message": "E me conta, qual segmento representa o core do negócio de vocês?",
    "options": ["Bens de consumo duráveis", "Componentes/Insumos industriais", "Produtos de marca própria", "Linha completa multi-categoria", "B2B especializado"],
    "tone": "Reconhece a complexidade de grandes operações e múltiplas linhas"
  }
}
```

#### 5. Diagnóstico
```json
{
  "message": "Seus produtos têm potencial gigantesco online! Agora, para entender melhor a maturidade operacional: como vocês gerenciam a operação hoje? ERP, WMS, integração?",
  "type": "diagnosis",
  "options": ["ERP robusto (SAP, Oracle, etc)", "Sistema próprio bem estruturado", "Mix de sistemas integrados", "Operação ainda manual em partes"],
  "followUp": {
    "message": "E em termos de marketing/branding digital, como vocês se posicionam no mercado?",
    "options": ["Marca consolidada offline, zero digital", "Presença básica (site institucional)", "Marketing B2B estruturado", "Estratégia digital em desenvolvimento", "Focamos só no relacionamento direto"],
    "tone": "Entende que grandes empresas têm operações complexas e decisões estruturadas"
  }
}
```

#### 6. Resultado
```json
{
  "message": "Roberto, conversando com você fica claro uma coisa: vocês estão numa posição PRIVILEGIADA. Têm produto consolidado, operação estruturada, marca respeitada - só falta usar isso no digital. Empresas do porte de vocês que entraram nos marketplaces cresceram 40-60% sem canibalizarizar os canais tradicionais.",
  "type": "result",
  "diagnosis": {
    "stage": "Gigante Adormecido Digital",
    "potential": "Potencial de R$ 10-30mi adicionais em 18 meses via marketplaces",
    "specificInsights": "Indústrias com faturamento similar à de vocês criaram novos canais de receita representando 15-25% do faturamento total",
    "recommendations": [
      "Estratégia de canal complementar (não concorrente)",
      "Pricing diferenciado para não conflitar com distribuidores", 
      "Teste controlado em marketplace premium primeiro",
      "Estrutura dedicada para e-commerce (não impacta operação atual)"
    ]
  },
  "nextSteps": {
    "message": "Que tal uma conversa estratégica com nosso especialista em grandes contas? Ele já ajudou indústrias similares a criar canais digitais de R$ 20-50mi sem nenhum conflito. Posso agendar?",
    "options": ["Sim, quero conversa estratégica", "Manda um case similar primeiro"],
    "urgency": "Seus concorrentes já estão se movimentando - quem sair na frente vai dominar o digital no seu segmento"
  }
}
```

## Requisitos obrigatórios

- **Framework React** com componentes funcionais
- **Next.js** como framework principal
- **TypeScript** para tipagem
- **Layout responsivo** e mobile-first
- Interface de chat funcional
- Utilização dos mocks fornecidos (ou similares)
- **Gerenciamento de estado** (Context API, Redux, Zustand, etc.) - *obrigatório para candidatos pleno/sênior*

## O que nós ficaríamos felizes de ver em seu teste

- **Tailwind CSS** para estilização (fortemente recomendado)
- Componentização bem estruturada e reutilizável
- **Testes unitários** (recomendado especialmente para vagas pleno/sênior)
- Animações e transições suaves
- Estados de loading e feedback visual
- Tratamento de diferentes fluxos de conversa
- Design system consistente

## O que nos impressionaria

- **Integração com IA real** usando Hugging Face (veja seção abaixo)
- Testes de integração/e2e
- Micro-interações e UX polida
- Performance otimizada (lazy loading, memoização)
- Deploy funcional (Vercel, Netlify, etc.)
- Acessibilidade (a11y) implementada
- Funcionalidades extras como histórico de conversas, exportação de diagnóstico

## Extra: Integração com IA real (Opcional)

Para candidatos que queiram se destacar, especialmente em vagas de senioridade mais alta, oferecemos a possibilidade de integrar com modelos de IA reais usando APIs gratuitas.

### Opções recomendadas:
- **Hugging Face** - Possui diversos modelos gratuitos para chat
  - Documentação: https://huggingface.co/docs/inference-providers/index
  - Modelos: https://huggingface.co/models
- **Ollama** - Para rodar modelos localmente
- **OpenAI API** - Tem tier gratuito limitado

*Nota: Esta integração é totalmente opcional e não será critério de desqualificação se não implementada. Recomendamos focar primeiro na interface e experiência do usuário.*

## Tipos de resposta sugeridos

Para a interface do chat, recomendamos implementar pelo menos:
- **Mensagens de texto** simples
- **Botões de opção** para respostas rápidas
- **Estados de digitação** ("Bot está digitando...")

### Extras que podem impressionar:
- Cards com informações visuais
- Formulários inline para coleta de dados
- Gráficos simples de diagnóstico
- Upload de arquivos/imagens
- Respostas com rich media

## O que nós não gostaríamos

- Descobrir que não foi você quem fez seu teste
- Ver commits grandes, sem muita explicação nas mensagens em seu repositório
- Encontrar um commit com as dependências do NPM
- Interface não responsiva ou com problemas de usabilidade
- Código desorganizado ou sem padrão

## O que avaliaremos de seu teste

- **Histórico de commits** do git
- **Instruções** de como rodar o projeto
- **Organização, semântica, estrutura, legibilidade, manutenibilidade** do seu código
- **Alcance dos objetivos** propostos
- **Adaptação mobile** (layout responsivo)
- **Componentização e extensibilidade** dos componentes React
- **Experiência do usuário** na interface do chat
- **Qualidade das interações** e fluxo conversacional

---

**Lembre-se:** Este teste deve representar seu melhor trabalho. Não se preocupe se não conseguir implementar todos os extras - preferimos um código bem estruturado e funcional do que muitas funcionalidades mal implementadas.

Boa sorte! 🚀