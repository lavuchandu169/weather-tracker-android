import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonBackButton, IonButton,
  IonIcon, IonPopover, IonList, IonItem, IonLabel
} from '@ionic/react';
import { personCircleOutline, logOutOutline } from 'ionicons/icons';
import ChartComponent from '../components/ChartComponent';

function DataView() {
  const [forecast, setForecast] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('weatherUser'));
    setUser(savedUser || {});
    
    const lat = 53.3498;
    const lon = -6.2603;
    const apiKey = "7ca078f55275b7822e68bdc3fcc644ab";

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter((_, index) => index % 8 === 0).map(entry => ({
          date: new Date(entry.dt * 1000).toLocaleDateString('en-GB', { weekday: 'short' }),
          temp: entry.main.temp
        }));
        setForecast(dailyData);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Forecast weather in Ireland</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                e.persist();
                setPopoverEvent(e.nativeEvent);
                setShowPopover(true);
              }}
            >
              <IonIcon icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {forecast.length > 0 && <ChartComponent forecastData={forecast} />}
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>{user?.name}</strong><br />
              <small>{user?.email}</small>
            </IonLabel>
          </IonItem>
          <IonItem button onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  );
}

export default DataView;
