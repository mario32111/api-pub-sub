const express = require("express");
const routerApi = require('./routes');
const cors = require('cors');
const mqtt = require('mqtt');
const { config } = require("dotenv");

const app = express();
const port = config.port;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());
app.use(cors());
require('./utils/auth');

// Objeto para almacenar los mensajes recibidos del broker MQTT
const messages = {};

// Configuración del cliente MQTT
const mqttClient = mqtt.connect('mqtt://mosquitto:1883', {
  clientId: 'express_api_' + Math.random().toString(16).substr(2, 8),
});

// Conexión al broker MQTT
mqttClient.on('connect', () => {
  console.log('Conectado al broker MQTT');

  // Suscribirse a todos los temas usando el comodín '#'
  mqttClient.subscribe('#', (err) => {
    if (!err) {
      console.log('Suscrito a todos los temas');
    } else {
      console.error('Error al suscribirse:', err);
    }
  });
});

// Manejar mensajes recibidos
mqttClient.on('message', (topic, message) => {
  const payload = message.toString();
  console.log(`Mensaje recibido - Tema: ${topic}, Mensaje: ${payload}`);

  // Almacenar el mensaje en el objeto 'messages'
  messages[topic] = {
    payload: payload,
    timestamp: new Date().toISOString(),
  };
});

// Manejar errores de conexión
mqttClient.on('error', (err) => {
  console.error('Error en la conexión MQTT:', err);
});

// Hacer que 'messages' esté disponible globalmente para las rutas
app.set('mqttMessages', messages);

// Configurar las rutas
routerApi(app);

// Inicia la API (hace que sea accesible desde otras PCs)
app.listen(port, '0.0.0.0', () => {
  console.log(`API escuchando en http://0.0.0.0:${port}`);
});
