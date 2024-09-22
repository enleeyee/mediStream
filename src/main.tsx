import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";


Amplify.configure(outputs);

const root = ReactDOM.createRoot(document.getElementById('root')!); // The exclamation mark is a TypeScript assertion to say the element exists
root.render(<App />);


