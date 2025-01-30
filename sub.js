const mqtt = require('mqtt');


const brokerUrl = 'mqtt://192.168.1.73:1883'; // Cambia por tu broker
const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');

  // Suscribirse al tema "casa/habitacion/temperatura"
  const topic = 'test';
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error('Error al sus cribirse al tema:', err);
    } else {
      console.log(`Suscrito al tema: ${topic}`);
    }
  });
});

mqttClient.on('message', (topic, message) => {
  const msg = message.toString();
  console.log(`Mensaje recibido en ${topic}: ${msg}`);
  // Aquí podrías guardar el mensaje en la base de datos o procesarlo
});

