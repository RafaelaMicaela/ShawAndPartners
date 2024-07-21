import ReactDOM from 'react-dom/client'
import App from './App'
import "primereact/resources/primereact.min.css"                
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-dark-blue/theme.css'
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <App />
)