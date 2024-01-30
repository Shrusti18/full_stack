
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Page from './page/Page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddStudent from './student/AddStudent';
import EditStudent from './student/EditStudent';
import ViewStudent from './student/ViewStudent';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Page />} />
          <Route exact path='/addstudent' element={<AddStudent />} />
          <Route exact path='/editstudent/:id' element={<EditStudent/>}/>
          <Route exact path='/viewstudent/:id' element={<ViewStudent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

