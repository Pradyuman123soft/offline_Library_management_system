import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { syncData } from "./lib/sync.service";
import { AuthProvider } from './context/AuthContext.tsx'


function App() {

  useEffect(() => {
    const handleOnline = () => {
      console.log("Back online");
      syncData();
    };

    window.addEventListener("online", handleOnline);
    // Sync immediately if already online on app start
    if (navigator.onLine) {
      syncData();
    }


    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;