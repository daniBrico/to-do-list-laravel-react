import { type JSX } from 'react'
import TodoFormContainer from './components/TodoFormContainer'

function App(): JSX.Element {
  return (
    <>
      <main className="flex items-center h-dvh text-7xl justify-center">
        <TodoFormContainer />
      </main>
    </>
  )
}

export default App
