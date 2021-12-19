import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import Identities from "./components/Identities";
import IdentityAdd from "./components/IdentityAdd";
import IdentityEdit from "./components/IdentityEdit";
import IdentityView from "./components/IdentityView";

function App(props) {
  return (
      <div>
          {/* Defining the routes of the app */}
          <Routes>
              <Route exact path='/' element={<Identities />} />
              <Route path='/editIdentity' element={<IdentityEdit />} />
              <Route path='/viewIdentity' element={<IdentityView />} />
              <Route path='/addIdentity' element={<IdentityAdd />} />
          </Routes>
      </div>
  );
}

export default App;
