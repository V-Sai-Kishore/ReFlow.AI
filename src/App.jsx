import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RiverPage from './pages/RiverPage';
import ComplaintPage from './pages/ComplaintPage';
import IntegrationPage from './pages/IntegrationPage';
import JoinTeamPage from './pages/JoinTeamPage';
import RiverBotPage from './pages/modules/RiverBotPage';
import EcoBuoyPage from './pages/modules/EcoBuoyPage';
import RiverGuardPage from './pages/modules/RiverGuardPage';
import AiIndexPage from './pages/modules/AiIndexPage';
import ReflowVisionPage from './pages/modules/ReflowVisionPage';
import PartnerDashboardPage from './pages/modules/PartnerDashboardPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="rivers/:riverId" element={<RiverPage />} />
        <Route path="complaint" element={<ComplaintPage />} />
        <Route path="integration" element={<IntegrationPage />} />
        <Route path="join-team" element={<JoinTeamPage />} />
        <Route path="modules/riverbot" element={<RiverBotPage />} />
        <Route path="modules/ecobuoy" element={<EcoBuoyPage />} />
        <Route path="modules/riverguard" element={<RiverGuardPage />} />
        <Route path="modules/ai-index" element={<AiIndexPage />} />
        <Route path="modules/reflow-vision" element={<ReflowVisionPage />} />
        <Route path="modules/partner-dashboard" element={<PartnerDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
