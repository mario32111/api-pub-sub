const mqtt = require('mqtt');

// Conectar al broker MQTT
const client = mqtt.connect('mqtt://localhost');
const topic = 'sensors/temperature';

// Middleware para validar datos
function validateMessage(message) {
  return new Promise((resolve, reject) => {
    const data = JSON.parse(message.toString());
    if (data && data.value && typeof data.value === 'number') {
      resolve(data);  // Si el mensaje es válido, lo pasamos al siguiente
    } else {
      reject(new Error('Mensaje inválido'));  // Rechazamos si no es válido
    }
  });
}

// Middleware para procesar datos
function processData(data) {
  return new Promise((resolve) => {
    console.log('Procesando datos:', data);
    // Aquí puedes hacer cálculos o transformaciones sobre los datos
    resolve(data);  // Pasamos los datos procesados al siguiente middleware
  });
}

// Middleware para guardar datos en la base de datos
function saveDataToDB(data) {
  return new Promise((resolve) => {
    console.log('Guardando datos en la base de datos...');
    // Simulamos una operación de base de datos
    resolve();  // Finalizamos el flujo
  });
}

// Función para manejar los mensajes recibidos
function handleMessage(message) {
  validateMessage(message)
    .then(processData)       // Si la validación pasa, procesamos
    .then(saveDataToDB)      // Si el procesamiento pasa, guardamos
    .catch((error) => {
      console.error('Error en el procesamiento del mensaje:', error.message);
    });
}

// Conectarse al broker y suscribirse a un tema
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Suscrito a ${topic}`);
    }
  });
});

// Manejo de los mensajes recibidos
client.on('message', (topic, message) => {
  if (topic === 'sensors/temperature') {
    console.log(`Mensaje recibido en ${topic}:`, message.toString());
    handleMessage(message);  // Pasamos el mensaje a través de los middlewares
  }
});
