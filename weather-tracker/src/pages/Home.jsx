import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonIcon, IonPopover, IonItem, IonLabel
} from '@ionic/react';
import { personCircleOutline, settingsOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getWeather } from '../api';
import './Home.css';

function Home() {
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('weatherUser'));
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
      history.push('/login');
    } else {
      setUser(savedUser);
      getWeather(53.3498, -6.2603).then(data => setWeather(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('loggedIn');
    setShowPopover(false);
    history.push('/login');
  };

  const goToForecast = () => {
    history.push('/data');
  };

  const openPopover = (e) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  const goToSettings = () => {
    setShowPopover(false);
    history.push('/settings');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Weather Tracker</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={openPopover}>
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-container">
        {user && <h2 className="home-welcome">Welcome, {user.name}!</h2>}
        {weather ? (
          <div className="weather-details">
            <h3>{weather.city}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Condition: {weather.description}</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}

        <IonButton onClick={goToForecast} color="primary" className="logout-button">
          View 5-Day Forecast
        </IonButton>

        <IonPopover
          event={popoverEvent}
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        >
          <IonItem lines="none">
            <IonLabel>
              <strong>{user?.name || 'User'}</strong><br />
              <small>{user?.email || 'user@example.com'}</small>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={goToSettings}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Settings</IonLabel>
          </IonItem>

          <IonItem button onClick={logout}>
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel color="danger">Logout</IonLabel>
          </IonItem>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
}

export default Home;
