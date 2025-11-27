const express = require('express');
const { createClient } = require('redis');

const app = express();
app.use(express.json());

// Configuración de Redis (busca la variable de entorno o usa localhost)
const redisHost = process.env.REDIS_HOST || 'localhost';
const client = createClient({ url: `redis://${redisHost}:6379` });

client.on('error', (err) => console.log('Redis Client Error', err));

// Conectamos a Redis solo si no estamos en modo test (para simplificar el CI)
if (process.env.NODE_ENV !== 'test') {
    client.connect();
}

app.get('/', (req, res) => {
    res.status(200).json({ message: "API Node.js Funcionando", platform: process.platform });
});

app.get('/visitas', async (req, res) => {
    try {
        // Incrementamos un contador en Redis
        // Nota: En los tests simularemos esto para no depender de un Redis real
        let visitas = 1;
        if (process.env.NODE_ENV !== 'test') {
            visitas = await client.incr('contador_visitas');
        }
        res.status(200).json({ visitas: visitas });
    } catch (error) {
        res.status(500).json({ error: "Error conectando a DB" });
    }
});

// Endpoint para SonarQube (para generar complejidad y probar coverage)
app.post('/calculo', (req, res) => {
    const { numero } = req.body;
    if (!numero || typeof numero !== 'number') {
        return res.status(400).json({ error: "Se requiere un numero" });
    }

    let resultado = "";
    if (numero % 2 === 0) {
        resultado = "Par";
    } else {
        resultado = "Impar";
    }
    
    res.json({ numero, tipo: resultado });
});

module.exports = app;