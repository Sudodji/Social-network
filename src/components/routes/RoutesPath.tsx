import { FC } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Auth from '../pages/auth/Auth'
import { useAuth } from '../providers/useAuth'
import { routes } from './list'
const RoutesPath:FC = () => {
  const {user} = useAuth()
  return (
    <Router>
      <Routes>
        {routes.map(route => {
          return (
            <Route
              path={route.path}
              key={`route ${route.path}`}
              element={(
                <Layout>
                  {route.auth && !user ? <Auth /> : <route.component />}
                </Layout>
              )}
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default RoutesPath