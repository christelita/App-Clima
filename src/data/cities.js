function mockWeek(){
  const days = [];
  const states = ["Soleado","Nublado","Lluvioso","Parcialmente nublado","Tormenta","Llovizna","Ventoso"];

  for(let i=0;i<7;i++){
    days.push({
      day: new Date(Date.now() + i*86400000).toLocaleDateString('es-CL',{
        weekday:'short', day:'numeric', month:'short'
      }),
      max: Math.round(Math.random()*15+5),
      min: Math.round(Math.random()*7-5),
      state: states[Math.floor(Math.random()*states.length)]
    });
  }

  return days;
}

export const CITIES = [
  { id: "scl", name: "Santiago", countryCode: "CL", temp: 18, state: "Parcialmente nublado", humidity: 60, wind: "8 km/h", coords: "-33.45, -70.66", weekly: mockWeek() },
  { id: "nyc", name: "New York", countryCode: "US", temp: 12, state: "Soleado", humidity: 50, wind: "10 km/h", coords: "40.71, -74.00", weekly: mockWeek() },
  { id: "lon", name: "London", countryCode: "UK", temp: 9, state: "Lluvioso", humidity: 75, wind: "12 km/h", coords: "51.51, -0.13", weekly: mockWeek() },
  { id: "tok", name: "Tokyo", countryCode: "JP", temp: 20, state: "Nublado", humidity: 68, wind: "6 km/h", coords: "35.68, 139.69", weekly: mockWeek() },
  { id: "syd", name: "Sydney", countryCode:"AU", temp: 24, state: "Soleado", humidity: 55, wind: "14 km/h", coords: "-33.86, 151.21", weekly: mockWeek() },
  { id: "par", name: "Paris", countryCode: "FR", temp: 11, state: "Llovizna", humidity: 72, wind: "9 km/h", coords: "48.85, 2.35", weekly: mockWeek() },
  { id: "rio", name: "Rio de Janeiro", countryCode: "BR", temp: 28, state: "Soleado", humidity: 65, wind: "11 km/h", coords: "-22.90, -43.20", weekly: mockWeek() },
  { id: "ber", name: "Berlin", countryCode: "DE", temp: 10, state: "Parcialmente nublado", humidity: 67, wind: "7 km/h", coords: "52.52, 13.40", weekly: mockWeek() },
  { id: "msc", name: "Moscow", countryCode: "RU", temp: -2, state: "Frío", humidity: 80, wind: "15 km/h", coords: "55.75, 37.62", weekly: mockWeek() },
  { id: "cph", name: "Copenhagen", countryCode: "DK", temp: 7, state: "Viento", humidity: 70, wind: "20 km/h", coords: "55.68, 12.57", weekly: mockWeek() }
];