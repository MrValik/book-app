import { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Loader from './components/Loader'
const Books = lazy(() => import('./pages/Books'))
const Book = lazy(() => import('./pages/Book'))


export default function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/">
          <Books />
        </Route>

        <Route exact path="/:bookId">
          <Book />
        </Route>
      </Switch>
    </Suspense>
  )
}