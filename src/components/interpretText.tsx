import { Predictions } from '@aws-amplify/predictions';
import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

function TextInterpretation() {
    const [response, setResponse] = useState('Input some text and click enter to test');
    const [textToInterpret, setTextToInterpret] = useState('write some text here to interpret');
  
    const interpretFromPredictions = async () => {
      try {
        const result = Predictions.interpret({
          text: {
            source: {
              text: textToInterpret,
            },
            type: 'all'
          }
        })
        setResponse(JSON.stringify(result, null, 2));
      } catch (err) { 
        setResponse(JSON.stringify(err, null, 2));
      }
    }
  
    function setText(event: React.ChangeEvent<HTMLInputElement>) {
      setTextToInterpret(event.target.value);
    }
  
    return (
      <div>
        <div>
          <h3>Text interpretation</h3>
          <input value={textToInterpret} onChange={setText}></input>
          <button onClick={interpretFromPredictions}>test</button>
          <p>{response}</p>
        </div>
      </div>
    );
  }
  
export default TextInterpretation;