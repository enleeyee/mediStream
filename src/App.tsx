import React, { useState } from 'react';
import { Predictions } from '@aws-amplify/predictions';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
// import { Text } from '@aws-amplify/ui-react';

function TextInterpretation() {
  const [response, setResponse] = useState('Input some text and click enter to test');
  const [textToInterpret, setTextToInterpret] = useState('write some text here to interpret');

  const interpretFromPredictions = async () => {
      try {
          const result = await Predictions.interpret({ // Added await
              text: {
                  source: {
                      text: textToInterpret,
                  },
                  type: 'all', // Use uppercase 'ALL'
              },
          });
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
          <h3>Text Interpretation</h3>
          <input value={textToInterpret} onChange={setText} />
          <button onClick={interpretFromPredictions}>Test</button>
          <p>{response}</p>
      </div>
  );
}
Amplify.configure(amplifyconfig);

function App() {
    return (
        <main>
            <h1>Hello World</h1>
            <TextInterpretation />
        </main>
    );
}

export default App;