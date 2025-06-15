import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AnaSayfa from './pages/AnaSayfa.jsx';
import Login from './pages/Login.jsx';
import DashboardHome from './pages/DashboardHome';
import Analytics from './pages/Analytics';
import Feedbacks from './pages/Feedbacks';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <main>
                            <AnaSayfa />
                        </main>
                        <Footer />
                    </>
                } />
                <Route path="/login" element={
                    <>
                        <Header />
                        <main>
                            <Login />
                        </main>
                        <Footer />
                    </>
                } />

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <DashboardHome />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Analytics />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/feedbacks" element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Feedbacks />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}

export default App;
