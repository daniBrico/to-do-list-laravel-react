import { type JSX } from 'react'
import TodoFormContainer from './components/TaskFormContainer'

function App(): JSX.Element {
  return (
    <>
      <main className="flex h-dvh items-center justify-center text-7xl">
        <TodoFormContainer />
      </main>
    </>
  )
}

export default App
