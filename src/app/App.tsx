import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <RouterProvider router={router} />
      </div>
    </AppProvider>
  );
}