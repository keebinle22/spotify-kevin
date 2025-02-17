import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './routes/Login.tsx'
import SpotifyLayout from './layout/SpotifyLayout.tsx'
import Loading from './routes/Loading.tsx'
import AuthProvider from './assets/component/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route element={<SpotifyLayout/>}>
                    <Route path="/" element={<App />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/loading" element={<Loading />} />
                </Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
)
