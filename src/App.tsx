import RecordButton from './RecordButton'
import MessagesList from './MessagesList'

function App() {
  return (
    <div className="flex h-screen flex-col bg-neutral-200">
      <header className="sticky top-0 flex justify-center bg-white p-4">
        <h1 className="text-2xl font-bold">Iva</h1>
      </header>
      <main className="flex grow flex-col-reverse overflow-y-auto p-4">
        <MessagesList />
      </main>
      <footer className="sticky bottom-0 flex justify-center bg-white p-4">
        <RecordButton />
      </footer>
    </div>
  )
}

export default App
