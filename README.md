# Poiesis Front-end

Aplicativo mobile-first para personalização de camisetas, desenvolvido com Expo, React Native, TypeScript e Expo Router. O projeto está sendo preparado para integrar com o backend Spring Boot da Poiesis.

## Requisitos

- Node.js 22.13 ou superior.
- npm.
- Para executar em dispositivo ou simulador, Expo Go ou um development build compatível.

## Instalar e executar

```bash
npm install
npx expo start
```

Para abrir diretamente no navegador:

```bash
npx expo start --web
```

O terminal do Expo também permite abrir o aplicativo em um emulador Android, simulador iOS ou dispositivo com Expo Go.

## Estrutura

```text
app/
   _layout.tsx              # Sessao e navegacao raiz
   (auth)/login.tsx          # Entrada
   (tabs)/_layout.tsx        # Navegacao por abas
   (tabs)/index.tsx          # Catálogo e seleção de cor/tamanho
   (tabs)/customizacoes.tsx  # Customizações salvas (mock)
   (tabs)/pedidos.tsx        # Pedidos (mock)
src/
   contexts/AuthContext.tsx  # Estado de autenticacao
   services/api.ts           # Cliente HTTP Axios
   aoi.ts                    # Reexport legado do cliente HTTP
```

As telas ficam em `app/`; código compartilhado fica em `src/`.

## Estado atual

O front-end ainda usa dados de demonstração. O login aceita qualquer e-mail e senha não vazios, sem validar credenciais no servidor, e não persiste uma sessão mock. O catálogo mostra um card por modelo, com seletores locais de cor e tamanho. A confirmação da seleção é apenas visual; ela ainda não inicia nem grava uma customização no backend. Customizações e pedidos também permanecem mockados.

### Acesso de demonstração

Use estes valores para testar o login:

```text
E-mail: teste@poiesis.dev
Senha: demo123
```

Como o login é mockado, esses valores não são validados; qualquer e-mail e senha não vazios também funcionam.

O cliente HTTP já está preparado para usar `EXPO_PUBLIC_API_URL` e anexar um Bearer Token real quando ele estiver armazenado. O fluxo de login, catálogo, customização e pedidos ainda precisa ser conectado aos endpoints do backend. Para detalhes e próximos passos, consulte [FRONTEND_HANDOFF.md](FRONTEND_HANDOFF.md) e a especificação arquitetural do backend, se ela estiver disponível no repositório.

## URL do backend

Sem configuração, o cliente usa `http://10.0.2.2:8080/api` no emulador Android e `http://localhost:8080/api` nas demais plataformas. Para apontar para outro servidor, defina a variável antes de iniciar o Expo. No PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://localhost:8080/api"
npx expo start
```

Em um dispositivo físico, use o endereço IP do computador na rede local, por exemplo `http://192.168.0.10:8080/api`. Variáveis com prefixo `EXPO_PUBLIC_` são incorporadas ao aplicativo; nunca coloque senhas, tokens ou outras credenciais nelas.

## Validacoes

```bash
npx expo lint
npx tsc --noEmit
```

Na última validação, `npx expo lint` e `npx tsc --noEmit` passaram. Execute-os novamente após alterações, pois novos problemas podem surgir.

## Expo e codigo nativo

Antes de alterar APIs do Expo ou React Native, consulte `AGENTS.md` e a documentação correspondente à versão instalada do Expo. As pastas `ios/` e `android/` são geradas pelo Continuous Native Generation e não devem ser editadas manualmente.
