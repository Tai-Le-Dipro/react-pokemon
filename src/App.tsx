import { useEffect } from "react";
import "../src/components/pokemon.css";
import "./App.css";
import useRouteElements from "./hooks/useRouteElements";
import { useServiceWorker } from "./hooks/useServiceWorker";
import PWAUpdatePrompt from "./components/PWAUpdatePrompt";

function App() {
  const router = useRouteElements();
  const { isOffline, isUpdateAvailable } = useServiceWorker();

  useEffect(() => {
    if (isUpdateAvailable || isOffline) {
      document.body.classList.add("has-pwa-banner");
    } else {
      document.body.classList.remove("has-pwa-banner");
    }
  }, [isUpdateAvailable, isOffline]);
  return (
    <>
      {router}
      <PWAUpdatePrompt />
    </>
  );
}

export default App;
