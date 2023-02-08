import { createRoot } from 'react-dom/client';
import { RouterConfig } from './RouterConfig';

const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
// <React.StrictMode>
    <RouterConfig />
// </React.StrictMode>,
);