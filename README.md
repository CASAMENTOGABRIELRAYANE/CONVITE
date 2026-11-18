# Convite de Casamento — Gabriel & Rayane

Site estático (HTML/CSS/JS) para publicar no **GitHub Pages**, com confirmação de presença e lista de presentes gravadas no **Firebase (Firestore)**, que é gratuito para esse uso.

## Arquivos
- `index.html` — convite (cada convidado usa o link com o próprio nome, ex.: `.../index.html#mateus-e-talita`)
- `painel.html` — painel dos noivos (senha definida em `config.js`)
- `config.js` — data, música, senha e chaves do Firebase
- `dados.js` — lista de convidados e de presentes
- `fotos/` — fotos do mural

## 1. Criar o banco (Firebase)
1. Acesse console.firebase.google.com e crie um projeto.
2. Em **Build > Firestore Database**, clique em **Criar banco de dados** (modo produção).
3. Aba **Regras**, cole e publique:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvp/{id}  { allow read, write: if true; }
    match /gifts/{id} { allow read, write: if true; }
  }
}
```
4. Em **Configurações do projeto > Geral**, crie um app Web e copie `projectId` e `apiKey`.
5. Cole os dois valores em `config.js` e troque `painelSenha`.

## 2. Publicar no GitHub
1. Crie um repositório e envie todos os arquivos desta pasta.
2. **Settings > Pages**: Source = branch `main`, pasta `/ (root)`.
3. O endereço será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
4. Abra `.../painel.html`, entre com a senha e use **Copiar link** para enviar o convite de cada família.

## Observações
- A música começa ao tocar em "Abrir" (navegadores exigem esse toque).
- A senha do painel fica no código do site, então ela só impede curiosos; não é segurança forte.
- Para mudar data, horário ou música: edite `config.js`. Para convidados e presentes: `dados.js`.
- Para a chave do Firebase, em Google Cloud > Credenciais, restrinja por referenciador HTTP ao seu endereço do GitHub Pages.
