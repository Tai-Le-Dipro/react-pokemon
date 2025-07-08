import React from "react";
import { useServiceWorker } from "../hooks/useServiceWorker";
import "./PWAUpdatePrompt.css";

const PWAUpdatePrompt: React.FC = () => {
  const { isUpdateAvailable, isOffline, updateApp } = useServiceWorker();

  if (!isUpdateAvailable && !isOffline) {
    return null;
  }

  return (
    <div className="pwa-update-container">
      {isUpdateAvailable && (
        <div className="pwa-update-banner">
          <div className="pwa-update-content">
            <span>🔄 New version available!</span>
            <button onClick={updateApp} className="pwa-update-button">
              Update Now
            </button>
          </div>
        </div>
      )}

      {isOffline && (
        <div className="pwa-offline-banner">
          <div className="pwa-offline-content">
            <span>📱 You're offline - App is still available!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWAUpdatePrompt;
