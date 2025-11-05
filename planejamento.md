📁 Estrutura do módulo feed

📄 /src/components/feed/
Arquivo	                    Status	         Função
FeedList.tsx	            ✅ já           criado Renderiza a lista de posts e controla o modal de mídia
PostMediaModal.tsx	        ✅ já criado	Exibe imagens/vídeos em tela cheia com swipe
index.ts	                🔸 faltando	Reexporta os componentes principais do feed para facilitar importações
hooks/useFeed.ts	        🔸 faltando	Hook para buscar posts do backend (fetch + paginação + cache opcional)
hooks/useCreatePost.ts	    🔸 faltando	Hook para enviar novos posts via Composer (com mídia)
hooks/usePostActions.ts	    🔸 faltando	Hook com lógica de like, repost, reply, bookmark etc.


📁 /src/components/feed/PostCard/

Arquivo	                    Status	          Função
PostCard.tsx	            ✅ já criado	    Exibe o conteúdo principal do post
PostMedia.tsx	            ✅ já criado	Exibe imagens/vídeos dentro do card (miniatura clicável)
PostHeader.tsx	            🔸 faltando	Exibe nome, handle, avatar e menu de opções do post
PostActions.tsx	            🔸 faltando	Ícones de curtida, repost, comentário, etc. com contadores
PostFooter.tsx	            🔸 faltando	Informações adicionais como data, visualizações e tags


📁 /src/components/feed/composer/

Arquivo	                    Status	          Função
CreatePostForm.tsx	        ✅ já criado	    Formulário para criar novos posts
ComposerButton.tsx	        🔸 faltando	Botão flutuante ou fixo que abre o composer (estilo tweetar)
ComposerSheet.tsx	        🔸 faltando	Modal ou drawer que contém o CreatePostForm
ComposerMediaPreview.tsx	🔸 faltando	Mostra preview das imagens/vídeos antes de publicar
ComposerToolbar.tsx	        🔸 faltando	Ícones de upload, emojis, etc. abaixo do campo de texto


📁 /src/types/apps/

Arquivo	                    Status	          Função
feedType.ts	                ✅ já existente  Define os tipos Post, PostCardProps, Media, etc.
🔗 Fluxo de interação

FeedList → busca posts (useFeed) e renderiza PostCard

PostCard → mostra post + chama PostMediaModal ao clicar em mídia

ComposerButton / ComposerSheet / CreatePostForm → cria novo post (useCreatePost)

PostActions → usa usePostActions para like, repost, etc.

FeedList re-renderiza após novo post ou interação