import { Route, Routes } from 'react-router-dom';

function HomePage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-parchment-100">
      <h1 className="text-4xl font-bold text-stone-900">Paramithenio</h1>
      <p className="mt-2 text-stone-600">Greek fables for children</p>
    </main>
  );
}

export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
