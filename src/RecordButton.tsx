import { useAtom } from 'jotai'
import { Mic, MicOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { interimAtom } from './store'

type RecordButtonProps = {
  onRecognitionResult: (transcript: string) => void
}

function RecordButton({ onRecognitionResult }: RecordButtonProps) {
  const [, setInterim] = useAtom(interimAtom)
  const recognition = useRef<SpeechRecognition | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const prevIsRecording = useRef(isRecording)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    recognition.current = new SpeechRecognition()

    recognition.current.interimResults = true

    const onEnd = () => {
      if (prevIsRecording.current) return

      recognition.current?.start()
    }

    const onResult = (event: SpeechRecognitionEvent) => {
      let interim = ''

      for (let index = 0; index < event.results.length; ++index) {
        if (event.results[index].isFinal) {
          onRecognitionResult(event.results[index][0].transcript)
        } else {
          interim += event.results[index][0].transcript
        }
      }

      setInterim(interim)
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

      setInterim('')
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
