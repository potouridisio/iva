import RecordButton from './RecordButton'

function App() {
  return (
    <div className="flex h-screen flex-col bg-neutral-200">
      <header className="sticky top-0 flex justify-center bg-white p-4">
        <h1 className="text-2xl font-bold">Iva</h1>
      </header>
      <main className="flex grow flex-col-reverse overflow-y-auto p-4">
        <ul className="space-y-4">
          <li className="flex">
            <div className="max-w-3/5 rounded-2xl rounded-tl-none bg-white p-4">
              <p>Interviewer's question</p>
            </div>
          </li>
          <li className="flex flex-row-reverse">
            <div className="max-w-3/5 rounded-2xl rounded-br-none bg-blue-500 p-4 text-white">
              <p>OpenAI's response</p>
            </div>
          </li>
        </ul>
      </main>
      <footer className="sticky bottom-0 flex justify-center bg-white p-4">
        <RecordButton />
      </footer>
    </div>
  )
}

export default App
