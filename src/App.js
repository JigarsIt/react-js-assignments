import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import QuestionOne from './components/QuestionOne';
import QuestionTwo from './components/QuestionTwo';
import QuestionThree from './components/QuestionThree';

function App() {
  return (
    <>
      <Router>
        <Header title="Assignment-1" showSearchBox={false} />
        <Routes>
          <Route exact path="/" element={<QuestionOne />} />
          <Route exact path="/q2" element={<QuestionTwo />} />
          <Route exact path="/q3" element={<QuestionThree />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
