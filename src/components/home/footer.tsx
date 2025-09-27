import React from 'react'
import { Box, Typography, Button, Link, Divider } from '@mui/material'
import GoodGameLogo from 'src/@core/components/logo'

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        bgcolor: '#0d1117',
        color: '#c9d1d9',
        px: 6,
        pt: 6,
        pb: 3,
        fontSize: '0.875rem',
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Left: Logo and newsletter */}
        <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <GoodGameLogo width={70} height={70} />
            <Typography variant='h6' fontWeight='bold' color='white'>
              GoodGame
            </Typography>
          </Box>
          <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
            Assine nossa newsletter de jogos
          </Typography>
          <Typography sx={{ mb: 2, fontSize: '0.9rem', color: '#8b949e' }}>
            Receba novidades, dicas e oportunidades de jogos multiplayer
            remunerados.
          </Typography>
          <Button
            variant='outlined'
            sx={{
              color: '#c9d1d9',
              borderColor: '#30363d',
              '&:hover': { borderColor: '#58a6ff', color: '#58a6ff' },
            }}
          >
            Assinar
          </Button>
        </Box>

        {/* Columns */}
        <Box
          sx={{
            display: 'flex',
            flex: '3 1 600px',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            minWidth: 300,
          }}
        >
          {/* Column 1 */}
          <Box>
            <Typography fontWeight='bold' gutterBottom>
              Plataforma
            </Typography>
            {[
              'Jogos Populares',
              'Torneios',
              'Ranking',
              'Recompensas',
              'Modo Competitivo',
              'Streamings',
              'Cadastro',
              'Parceiros',
              'Atualizações',
              'Compare Planos',
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { color: '#58a6ff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Column 2 */}
          <Box>
            <Typography fontWeight='bold' gutterBottom>
              Ecossistema
            </Typography>
            {[
              'API para Desenvolvedores',
              'Programas de Afiliados',
              'Educação e Tutoriais',
              'Aplicativo Desktop',
              'App Mobile',
              'Marketplace de Itens',
              'Suporte Técnico',
              'Eventos Esportivos',
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { color: '#58a6ff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Column 3 */}
          <Box>
            <Typography fontWeight='bold' gutterBottom>
              Suporte
            </Typography>
            {[
              'Central de Ajuda',
              'Fórum da Comunidade',
              'Suporte Premium',
              'Política de Pagamentos',
              'Termos de Uso',
              'Status do Sistema',
              'Contato',
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { color: '#58a6ff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Column 4 */}
          <Box>
            <Typography fontWeight='bold' gutterBottom>
              Empresa
            </Typography>
            {[
              'Sobre Nós',
              'Carreiras',
              'Blog de Jogos',
              'Histórias de Sucesso',
              'Imprensa',
              'Inclusão e Diversidade',
              'Responsabilidade Social',
              'Política de Privacidade',
              'Loja Oficial',
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  py: 0.5,
                  cursor: 'pointer',
                  '&:hover': { color: '#58a6ff' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ bgcolor: '#30363d', my: 3 }} />

      {/* Bottom Section */}
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          color: '#8b949e',
          fontSize: '0.8rem',
          gap: 2,
        }}
      >
        <Box>
          © 2025 GoodGame, Inc. Termos Privacidade (atualizado 09/2025) Mapa do
          site Sobre jogos multiplayer Gerenciar cookies
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link
            href='#'
            color='inherit'
            underline='none'
            sx={{ '&:hover': { color: '#58a6ff' } }}
          >
            LinkedIn
          </Link>
          <Link
            href='#'
            color='inherit'
            underline='none'
            sx={{ '&:hover': { color: '#58a6ff' } }}
          >
            Instagram
          </Link>
          <Link
            href='#'
            color='inherit'
            underline='none'
            sx={{ '&:hover': { color: '#58a6ff' } }}
          >
            YouTube
          </Link>
          <Link
            href='#'
            color='inherit'
            underline='none'
            sx={{ '&:hover': { color: '#58a6ff' } }}
          >
            Twitter
          </Link>
          <Link
            href='#'
            color='inherit'
            underline='none'
            sx={{ '&:hover': { color: '#58a6ff' } }}
          >
            Discord
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
