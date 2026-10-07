# Contexto atual do front-end Poiesis

Atualizado em 2026-10-06. Este arquivo registra o estado implementado para orientar futuras conversas com agentes. Em caso de divergencia, confirme o codigo antes de alterar.

## Stack e estrutura

- Expo SDK 57, React Native 0.86, React 19, TypeScript e Expo Router.
- As rotas ficam em `app/`, nao em `src/app/`.
- Rotas principais: `app/(auth)/login.tsx`, `app/(tabs)/index.tsx` (catalogo), `app/(tabs)/customizacoes.tsx` e `app/(tabs)/pedidos.tsx`.
- Contexto de autenticacao: `src/contexts/AuthContext.tsx`.
- Cliente HTTP: `src/services/api.ts`. `src/aoi.ts` e mantido como reexport de compatibilidade.

## O que ja esta feito

- O login e a tela inicial para quem nao tem sessao valida. `app/_layout.tsx` redireciona entre login e abas com base no contexto de autenticacao.
- O login ainda e uma demonstracao: aceita qualquer e-mail e senha nao vazios e nao chama o backend.
- O login mock nao persiste sessao. Tokens antigos com prefixo `token-falso-` sao removidos; uma sessao real pode ser restaurada quando usuario e token estiverem armazenados.
- O catalogo mostra um card por modelo de camiseta, com seletores expansivos de tamanho e cor. Os tamanhos mockados sao P, M, G e GG; cada modelo define sua propria lista de cores.
- Tamanho e cor ficam no estado local de cada card. O botao de personalizacao apenas mostra uma confirmacao local; ainda nao cria nem persiste uma customizacao.
- A tela de customizacoes usa dois registros mockados tipados e mostra modelo, cor, tamanho, texto e posicao da arte. Editar e pedir ainda sao demonstracoes locais.
- A tela de pedidos usa tres registros mockados tipados, apresenta status e progresso da producao, e permite confirmar cancelamento apenas no estado local.
- O cliente Axios envia `Authorization: Bearer <token>` quando ha token nao mock. `EXPO_PUBLIC_API_URL` configura o gateway; o padrao e `http://10.0.2.2:8080/api` no Android e `http://localhost:8080/api` nas demais plataformas.
- O lint foi configurado com `eslint.config.js`, `eslint` e `eslint-config-expo`.

## Integracao pendente

- Nenhuma das telas atuais esta carregando ou gravando dados no backend. Os dados de catalogo, customizacoes e pedidos permanecem mockados.
- Integrar login com `POST /api/autenticacao/entrar`, adaptar a resposta real do token e persistir usuario/token nas chaves ja usadas pelo contexto.
- Carregar modelos com `GET /api/catalogo/camisetas`. Mapear as cores e tamanhos retornados pelo catalogo sem duplicar o mesmo modelo em varios cards.
- Ao avancar com uma peca, enviar `camisetaId`, `cor` e `tamanho` para o fluxo de customizacao. Completar com texto, imagem e posicao da arte quando esses controles existirem.
- Integrar customizacoes e pedidos aos endpoints correspondentes do gateway e substituir os alerts/mock locais por estados de carregamento, erro e sucesso.
- A arquitetura prevista tem API Gateway, autenticacao, catalogo, customizacao, pedidos, producao e relatorios, com JWT e RabbitMQ. Nao implementar estoque: o catalogo descreve opcoes, nao saldos ou reservas.
- Nao confiar em `usuarioId` ou perfil enviados pelo cliente quando esses dados devem vir do JWT/backend.
- Para Android fisico, configurar `EXPO_PUBLIC_API_URL` com um endereco acessivel pela rede do dispositivo. Variaveis `EXPO_PUBLIC_*` ficam visiveis no bundle e nao podem conter segredos.

## Estado de validacao

- `npx tsc --noEmit`: passou na ultima validacao.
- `npx expo lint`: passou na ultima validacao global.
- Repita typecheck e lint apos mudancas; o estado de validacao pode mudar.

## Comandos do projeto

```bash
npm install
npx expo start
npx expo start --web
npx expo lint
npx tsc --noEmit
```

Consulte `AGENTS.md` antes de alterar APIs Expo/React Native. A versao instalada do Expo determina qual documentacao deve ser usada. As pastas nativas `ios/` e `android/` sao geradas pelo CNG e nao devem ser editadas manualmente.