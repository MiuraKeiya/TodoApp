import { createRoot } from 'react-dom/client';
import { App} from './App';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Profile } from './components/Profile';
import { Home } from './components/Home';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
// <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
// </React.StrictMode>,
);