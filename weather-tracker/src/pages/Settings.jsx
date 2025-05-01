import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel, IonToggle, IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const saved = localStorage.getItem('useFahrenheit');
    if (saved !== null) {
      setUseFahrenheit(saved === 'true');
    }
  }, []);

  const handleToggle = (e) => {
    const value = e.detail.checked;
    setUseFahrenheit(value);
    localStorage.setItem('useFahrenheit', value);
  };

  const goBackHome = () => {
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="settings-container">
          <IonItem className="settings-item">
            <IonLabel>Use °F instead of °C</IonLabel>
            <IonToggle
              checked={useFahrenheit}
              onIonChange={handleToggle}
              slot="end"
            />
          </IonItem>

          <IonButton expand="block" className="ion-margin-top" onClick={goBackHome}>
            Back to Home
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Settings;
