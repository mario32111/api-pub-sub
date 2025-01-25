const express = require("express");
const mqtt = require("mqtt");

const app = express();
const port = 3000;

// Cambiar localhost por el nombre del servicio definido en docker-compose.yml
const mqttClient = mqtt.connect("mqtt://mosquitto:1883");

mqttClient.on("connect", () => {
  console.log("Conectado al broker MQTT");
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

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Endpoint de prueba
app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello" });
});

// Endpoint para publicar datos
app.post("/publish", (req, res) => {
  const { topic, message } = req.body;

  console.log("Solicitud recibida:", req.body); // Verifica el cuerpo de la solicitud

  if (!topic || !message) {
    return res.status(400).json({ error: "Por favor, proporciona 'topic' y 'message'" });
  }

  // Publica el mensaje al broker
  mqttClient.publish(topic, message, (err) => {
    if (err) {
      console.error("Error al publicar:", err);
      return res.status(500).json({ error: "No se pudo publicar el mensaje" });
    }

    console.log(`Mensaje publicado en el tema '${topic}': ${message}`);
    res.status(200).json({ message: "Mensaje publicado con éxito" });
  });
});

// Simulación de sensor que publica un mensaje cada segundo
app.get("/simulate-sensor", (req, res) => {
  let count = 0;

  // Simulación de publicación de 20 mensajes
  const interval = setInterval(() => {
    count++;

    // Definir topic y mensaje con valores aleatorios para simular un sensor
    const topic = "sensor/temperature";
    const message = (Math.random() * 10 + 20).toFixed(1); // Temperatura aleatoria entre 20 y 30

    console.log(`Publicando mensaje: ${message} en el topic: ${topic}`);

    mqttClient.publish(topic, message, (err) => {
      if (err) {
        console.error("Error al publicar:", err);
        clearInterval(interval); // Detener la simulación si hay un error
        return res.status(500).json({ error: "No se pudo publicar el mensaje" });
      }

      console.log(`Mensaje publicado: ${message} en el topic '${topic}'`);

      // Si ya hemos publicado 20 mensajes, detener la simulación
      if (count === 20) {
        clearInterval(interval);
        res.status(200).json({ message: "20 mensajes publicados con éxito" });
      }
    });
  }, 1000); // Intervalo de 1 segundo
});

// Inicia la API (hace que sea accesible desde otras PCs)
app.listen(port, '0.0.0.0', () => {
  console.log(`API escuchando en http://0.0.0.0:${port}`);
});
