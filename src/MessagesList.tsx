function MessagesList() {
  return (
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
  )
}

export default MessagesList
