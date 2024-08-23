// /* eslint-disable react-hooks/exhaustive-deps */
// import { Container, Grid, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import PageHeader from 'src/@core/components/page-header'
// import { getLeagueTeams } from 'src/pages/api/football/league/getLeagueTeams'
// export default function Football() {
//   const router = useRouter()
//   const { leagueId } = router.query

//   const [teams, setTeams] = useState([])

//   useEffect(() => {
//     if (leagueId) {
//       getLeagueTeams(leagueId as string).then((response) => {
//         if (response) {
//           setTeams(teams)
//         }
//       })
//     }
//   }, [leagueId])

//   return (
//     <Container>
//       <PageHeader
//         title={<Typography variant='h5'>Football</Typography>}
//         subtitle={
//           <Typography variant='body2'>
//             Explore comprehensive data and insights on football leagues from
//             around the world, including standings, schedules, and more.
//           </Typography>
//         }
//       />

//       <Grid container spacing={3}>
//         <pre>{teams}</pre>
//       </Grid>
//     </Container>
//   )
// }
