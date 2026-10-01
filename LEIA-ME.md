# D'BUCO · site oficial

Site da D'BUCO, marca de streetwear pernambucano. Tem duas partes:

- **Loja**: vitrine das camisetas. O cliente escolhe camiseta e tamanho, monta uma lista e envia o pedido pronto pelo WhatsApp.
- **Folha**: o jornal da marca. Qualquer pessoa lê; quem entra com a conta Google escreve sobre camisetas, coleções, processo, ideias ou o que quiser, escolhendo o formato da página (Manchete, Texto ou Citação) e podendo colocar foto.

Tudo roda de graça: o site fica no **GitHub Pages** (ou Netlify) e as publicações da Folha ficam no **Firebase** (banco Firestore + login Google), no plano gratuito Spark, sem cartão de crédito.

## Estrutura dos arquivos

```
index.html            página (loja + Folha)
css/style.css         visual
js/config.js          ← ÚNICO arquivo que vocês editam
js/backend.js         conexão com o Firebase (ou modo teste)
js/app.js             funcionamento da loja e da Folha
img/                  imagens
firestore.rules       regras de segurança do banco
```

## 1. Testar no computador (2 minutos)

Abra o `index.html` no navegador. Sem o Firebase configurado, a Folha roda em **modo teste**: dá pra escrever, editar e apagar, mas as publicações ficam salvas só naquele navegador. Serve para conferir tudo antes de configurar.

## 2. Criar o banco no Firebase (10 minutos)

1. Entre em **console.firebase.google.com** com uma conta Google da marca e clique em **Criar projeto**. Nome sugerido: `dbuco`. Pode desativar o Google Analytics.
2. Na página inicial do projeto, clique no ícone **`</>`** (Web) para adicionar um app. Dê um apelido (ex.: `site`) e **não** marque Firebase Hosting. Ele mostra um bloco `firebaseConfig = { apiKey: ..., ... }`.
3. Copie esses valores para o bloco `firebase` em **`js/config.js`**.
4. No menu à esquerda: **Criação > Firestore Database > Criar banco de dados**. Escolha o local **southamerica-east1 (São Paulo)** e o **modo de produção**.
5. Ainda no Firestore, abra a aba **Regras**, apague o que estiver lá, cole todo o conteúdo do arquivo **`firestore.rules`**, troque `seuemail@gmail.com` pelo e-mail do administrador e clique em **Publicar**.
6. No menu: **Criação > Authentication > Vamos começar > Google**. Ative, escolha o e-mail de suporte e salve.
7. Em `js/config.js`, coloque também o número do WhatsApp e o mesmo e-mail de administrador em `admins`.

A chave `apiKey` do Firebase aparece no código do site, e isso é normal: quem protege os dados são as regras do passo 5.

## 3. Colocar o site no ar

**Opção A: GitHub Pages** (recomendado para o TCC, porque guarda o histórico de versões)

1. Crie uma conta em github.com e um repositório público chamado `dbuco`.
2. Clique em **Add file > Upload files** e arraste **o conteúdo** da pasta (index.html, css, js, img…), não a pasta em si. Clique em **Commit changes**.
3. Vá em **Settings > Pages**, em *Branch* escolha `main` e `/ (root)` e salve.
4. Em 1 ou 2 minutos o site fica em `https://SEU-USUARIO.github.io/dbuco/`.

**Opção B: Netlify** (mais rápida)

Entre em **app.netlify.com/drop** e arraste a pasta inteira. Ele gera um endereço como `https://nome-aleatorio.netlify.app` (dá pra renomear em *Site configuration*).

## 4. Liberar o login no endereço do site

No Firebase: **Authentication > Configurações > Domínios autorizados > Adicionar domínio**, e coloque o endereço do site sem `https://` e sem barra (ex.: `seu-usuario.github.io` ou `dbuco.netlify.app`). Sem isso, o botão "Entrar com Google" mostra erro.

## Como atualizar depois

- **Trocar camisetas, preços e descrições**: em `js/app.js`, na lista `PRODUCTS`.
- **Trocar número do WhatsApp ou administradores**: em `js/config.js`.
- **Subir a nova versão**: no GitHub, faça upload do arquivo alterado de novo (ou arraste a pasta de novo no Netlify).

## Quem pode fazer o quê na Folha

| Ação | Quem pode |
|---|---|
| Ler | Qualquer visitante |
| Publicar | Quem entra com conta Google |
| Editar | Só o autor da publicação |
| Apagar | O autor ou um administrador |

## Limites do plano gratuito

O Firestore gratuito permite 1 GB guardado, 50 mil leituras e 20 mil gravações por dia, muito acima do que o site precisa. As fotos são reduzidas automaticamente no navegador antes de serem salvas (cada uma fica com menos de 200 KB).

## Domínio próprio (opcional)

Um `dbuco.com.br` custa cerca de R$ 40 por ano no registro.br e pode ser ligado ao GitHub Pages ou ao Netlify nas configurações de domínio de cada um.
