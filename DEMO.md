# Lar Doce Lar: passo a passo das demos

App de imobiliária fictícia para a live **Segurança no Front-end**. Tudo é falso: dados, CPFs e chave.

## Preparar

```bash
yarn install
ollama serve            # se o Ollama ainda não estiver rodando
ollama pull llama3.2    # modelo usado pelo Corretor IA
yarn build && yarn start
```

Abra http://localhost:3000 com o DevTools aberto (abas **Network** e **Console**).

> **Interruptor 🔓/🔒:** o botão flutuante no canto inferior direito troca entre o código vulnerável e o corrigido. O estado fica num cookie, então basta clicar e o mesmo ataque falha.

---

## Parada 1: 🪟 Janelas ("o que dá pra ver de fora?")

**Mecânica:** interruptor.

### Janela A: a API conta demais
1. Abra **Minha conta**. A tela mostra só "Olá, Ana Souza" e o e-mail.
2. **Network** → requisição `me` → **Response**: aparecem `passwordHash`, `cpf`, `tokenSessao` e `notasInternas` ("aceita pagar até 10% acima").
3. **Console**: o `[debug] usuário carregado:` mostra o mesmo objeto.
4. 🔒 Clique no interruptor e recarregue. A resposta passa a ter só `nome` e `email`.
5. **Código:** [src/app/api/me/route.ts](src/app/api/me/route.ts). Explique o DTO: *"a API devolve o que a tela usa, não o que o banco tem."*

### Janela B: o payload do Next (Server → Client Component)
1. Na **home**, abra o código-fonte da página (`Ctrl+U` / `Cmd+Option+U`) e procure `precoMinimoAceito`.
2. Aparecem o preço mínimo que o vendedor aceita e o **CPF do anunciante**, que a tela nunca mostra.
3. 🔒 Clique no interruptor, recarregue e procure de novo: nada.
4. **Código:** [src/app/page.tsx](src/app/page.tsx). *"Toda prop de um Client Component vai serializada para o navegador."*

**Frase:** "Tudo que chega no navegador, o usuário pode ver."

---

## Parada 2: 🔑 Chave debaixo do tapete (variáveis de ambiente)

**Mecânica:** live coding. Não tem interruptor, porque a chave é gravada no bundle **durante o build**.

### Ataque
1. Abra o **Corretor IA** e pergunte "Qual imóvel é o mais barato?".
2. **Network** → requisição para `localhost:11434` → **Headers**: `Authorization: Bearer sk-lardocelar-...`.
3. Mais convincente ainda, no bundle:
   - DevTools → **Sources** → `Cmd+Option+F` → busque `sk-lardocelar`
   - ou no terminal: `grep -rl "sk-lardocelar" .next/static`
4. **Código:** [src/app/corretor/Chat.tsx](src/app/corretor/Chat.tsx) e [.env.local](.env.local). Explique que `NEXT_PUBLIC_` significa "cole este valor no JavaScript público".

### Correção ao vivo
1. Mostre que a rota do servidor já existe: [src/app/api/corretor/route.ts](src/app/api/corretor/route.ts). Ela usa `IA_API_KEY`, **sem** o prefixo.
2. Em `Chat.tsx`, troque a função `perguntarAoCorretor` por:
   ```ts
   async function perguntarAoCorretor(mensagens: Mensagem[]): Promise<string> {
     const resposta = await fetch("/api/corretor", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ mensagens }),
     });
     const dados = await resposta.json();
     return dados.resposta;
   }
   ```
   e remova `PROMPT_DO_CORRETOR` do import.
3. Em `.env.local`, apague as três linhas `NEXT_PUBLIC_IA_*`.
4. `yarn build && yarn start`, depois `grep -rl "sk-lardocelar" .next/static`: **nada**. Na Network, a requisição vai para `/api/corretor`, sem chave.

**Gancho:** *"Guardem essa chave de IA, ela volta na parada 7: quem acha a chave usa a IA com o cartão de crédito de vocês."* (OWASP LLM10)

### Resetar para ensaiar de novo
```bash
git checkout -- src/app/corretor/Chat.tsx   # volta a versão vulnerável
# e recoloque as linhas NEXT_PUBLIC_IA_* no .env.local
```
(O `.env.local` não vai para o git. Guarde uma cópia, por exemplo `cp .env.local .env.live-backup`.)
