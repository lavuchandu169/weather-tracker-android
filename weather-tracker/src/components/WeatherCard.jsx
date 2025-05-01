import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import './WeatherCard.css';

function WeatherCard({ city, temperature, description }) {
  const unit = localStorage.getItem('useFahrenheit') === 'true' ? '°F' : '°C';

  return (
    <IonCard className="weather-card">
      <IonCardHeader>
        <IonCardTitle>{city}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Temperature: {temperature}{unit}</p>
        <p>Condition: {description}</p>
      </IonCardContent>
    </IonCard>
  );
}

export default WeatherCard;
