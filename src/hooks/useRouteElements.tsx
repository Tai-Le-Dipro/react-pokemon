import { useRoutes } from 'react-router-dom'
import PokemonPage from '../pages/pokemon'

export default function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
          <PokemonPage />
      )
    },
    {
      path: '/blog',
        element: (
          <span>ab</span>
        //   <Register />
      )
    }
  ])
  return routeElement
}