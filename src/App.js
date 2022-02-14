import './App.css';
import Header from './components/Header';
// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Form from './components/Form';
import ThankYou from './components/ThankYou';
import { useState } from 'react';

function App() {

  const [isSubmit, setIsSubmit] = useState(true);

  const changeIsSubmit = () => {
    setIsSubmit(!isSubmit);
  }

  return (
    <>
      <Header />
      {isSubmit?<Form changeIsSubmit={changeIsSubmit} />:<ThankYou />}
    </>
  );
}

export default App;
