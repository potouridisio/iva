import { Mic, MicOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type RecordButtonProps = {
  onRecognitionResult: (transcript: string) => void
}

function RecordButton({ onRecognitionResult }: RecordButtonProps) {
  const recognition = useRef<SpeechRecognition | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const prevIsRecording = useRef(isRecording)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    recognition.current = new SpeechRecognition()

    const onEnd = () => {
      if (prevIsRecording.current) return

      recognition.current?.start()
    }

    const onResult = (event: SpeechRecognitionEvent) => {
      onRecognitionResult(event.results[0][0].transcript)
    }

    recognition.current.addEventListener('end', onEnd)
    recognition.current.addEventListener('result', onResult)

    return () => {
      recognition.current?.removeEventListener('end', onEnd)
      recognition.current?.removeEventListener('result', onResult)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleRecording = () => {
    prevIsRecording.current = isRecording

    if (isRecording) {
      recognition.current?.stop()
    } else {
      recognition.current?.start()
    }

    setIsRecording(!isRecording)
  }

  return (
    <button
      className="rounded-full bg-red-500 p-3 text-white"
      onClick={toggleRecording}
    >
      {isRecording ? <MicOff /> : <Mic />}
    </button>
  )
}

export default RecordButton
