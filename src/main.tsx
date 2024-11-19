import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./store/store"
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer stacked />
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>,
)