import { type JSX } from 'react'
import TaskFormContainer from './components/TaskFormContainer'

function App(): JSX.Element {
  return (
    <>
      <main className="flex h-dvh items-center justify-center text-7xl">
        <TaskFormContainer />
      </main>
    </>
  )
}

export default App
