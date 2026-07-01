# Platzi Fake Store Admin

Sistema em Angular para gestão visual dos dados da Platzi Fake Store API.

## Funcionalidades

- Login com JWT usando o endpoint de autenticação da API.
- Guard de autenticação protegendo as telas internas.
- Interceptor HTTP enviando o token JWT nas requisições.
- Listagem de produtos com filtros por nome, categoria e faixa de preço.
- Listagem de categorias com filtro por nome.
- Telas de simulação para inclusão, edição e exclusão de produtos e categorias.
- Guard `canDeactivate` nos formulários de inclusão e edição quando há alterações não salvas.
- Layout responsivo com sidebar, cards, filtros e tela de login estilizada.

## Credenciais de teste

```text
E-mail: admin@mail.com
Senha: admin123
```


## Build

```bash
npm run build
```

## API

Base utilizada: `https://api.escuelajs.co/api/v1`

Documentação: `https://fakeapi.platzi.com/`
