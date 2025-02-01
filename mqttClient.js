const conectionMqtt = require("./mqttConextion");

const mqttClient = conectionMqtt();

module.exports = mqttClient;
