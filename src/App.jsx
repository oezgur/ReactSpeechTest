import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [listening, setListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  
  const handleButtonClick = () => {
    if (recognition) {
      if (listening) {
        recognition.stop()
        setListening(false)
      } else {
        recognition.start()
        setListening(true)
      }
    }
  }

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        if (transcript.includes('start')) { 
          // Start 
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              const audioContext = new window.AudioContext()
              const source = audioContext.createMediaStreamSource(stream)
              
              setListening(true)
            })
            .catch(err => console.error(err))
        }
        if (transcript.includes('stop')) {
          // Stop
          setTimeout(() => {
            setListening(false)
            if (recognition) {
              recognition.stop()
            }
          }, 1000) 
        }
      }
      setRecognition(recognitionInstance)
    } else {
      console.error('SpeechRecognition is not supported in this browser.')
    }
  }, [])

  useEffect(() => {
    if (recognition) {
      recognition.start()
    }
    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [recognition])

  return (
    <div className="center">
      <button onClick={handleButtonClick} className={listening ? 'listening' : ''}>
        {listening ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default App