import { useMicVAD } from "@ricky0123/vad-react";
import { useState } from "react";

const App = () => {

  const [isVADActive, setIsVADActive] = useState(false)

	const vad = useMicVAD({
	  startOnLoad: false,
	  onSpeechEnd: (audio) => {
		console.log("User stopped talking")
	  },
	})
  
  const startHandler = () => {
    if (!isVADActive) {
      vad.start();
      setIsVADActive(true); // VAD is now active
    } else {
      vad.stop();
      setIsVADActive(false); // VAD has been stopped
    }
  };

	return(
    <>
    <div>{vad.userSpeaking && "User is speaking"}</div>
    <button onClick={startHandler}>
      Start
    </button>
    </>
  ) 
  }

export default App;