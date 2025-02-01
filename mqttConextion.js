const mqtt = require("mqtt");

// Configurar MQTT
const brokerUrl = 'mqtt://mosquitto:1883'; // Cambia por tu broker
const mqttClient = mqtt.connect(brokerUrl);

function conectionMqtt() {
  mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT');

    // Suscribirse al tema "casa/sala/temperatura"
    const topic = 'casa/sala/temperatura';
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('Error al suscribirse al tema:', err);
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

  mqttClient.on("error", (err) => {
    console.error("Error de conexión MQTT:", err.message || err);
    if (err.stack) {
      console.error("Stack trace:", err.stack);
    }
  });

  mqttClient.on("reconnect", () => {
    console.log("Intentando reconectar al broker MQTT...");
  });

  mqttClient.on("close", () => {
    console.log("Conexión cerrada con el broker MQTT");
  });
  return mqttClient;
}


module.exports = conectionMqtt;

