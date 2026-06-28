import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { SettingsPage } from './pages/SettingsPage';
import { StoryPage } from './pages/StoryPage';

export default function App(): React.ReactElement {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/legal/*" element={<LegalPage />} />
      </Routes>
    </>
  );
}
