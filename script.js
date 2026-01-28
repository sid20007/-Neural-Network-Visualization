// Neural Network Visualizer
// Configuration
const config = {
    hiddenLayers: 2,
    neuronsPerLayer: 4,
    learningRate: 0.1,
    epochs: 100,
    dataset: 'xor'
};

let model = null;
let isTraining = false;
let trainingData = null;

// Canvas Setup
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Network Visualization
class NetworkVisualizer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.layers = [];
        this.connections = [];
        this.particles = [];
    }

    buildNetwork(architecture) {
        this.layers = [];
        const layerSpacing = (canvas.width / window.devicePixelRatio) / (architecture.length + 1);

        architecture.forEach((neurons, layerIndex) => {
            const layer = [];
            const neuronSpacing = (canvas.height / window.devicePixelRatio) / (neurons + 1);

            for (let i = 0; i < neurons; i++) {
                const neuron = {
                    x: layerSpacing * (layerIndex + 1),
                    y: neuronSpacing * (i + 1),
                    radius: 8,
                    activation: 0,
                    layer: layerIndex
                };
                layer.push(neuron);
            }
            this.layers.push(layer);
        });

        this.buildConnections();
    }

    buildConnections() {
        this.connections = [];
        for (let i = 0; i < this.layers.length - 1; i++) {
            for (let from of this.layers[i]) {
                for (let to of this.layers[i + 1]) {
                    this.connections.push({
                        from,
                        to,
                        weight: Math.random() * 2 - 1,
                        active: false
                    });
                }
            }
        }
    }

    draw() {
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;

        ctx.clearRect(0, 0, w, h);

        // Draw connections
        this.connections.forEach(conn => {
            const alpha = conn.active ? 0.8 : 0.2;
            const width = Math.abs(conn.weight) * 2;

            ctx.strokeStyle = conn.weight > 0
                ? `rgba(0, 255, 136, ${alpha})`
                : `rgba(255, 68, 68, ${alpha})`;
            ctx.lineWidth = Math.max(0.5, width);
            ctx.beginPath();
            ctx.moveTo(conn.from.x, conn.from.y);
            ctx.lineTo(conn.to.x, conn.to.y);
            ctx.stroke();
        });

        // Draw neurons
        this.layers.forEach((layer, layerIndex) => {
            layer.forEach(neuron => {
                // Glow effect
                const gradient = ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, neuron.radius * 3
                );
                gradient.addColorStop(0, `rgba(0, 255, 136, ${neuron.activation})`);
                gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, neuron.radius * 3, 0, Math.PI * 2);
                ctx.fill();

                // Neuron core
                ctx.fillStyle = neuron.activation > 0.5
                    ? '#00ff88'
                    : `rgba(0, 255, 136, ${0.3 + neuron.activation * 0.4})`;
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
                ctx.fill();

                // Border
                ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        });

        // Draw layer labels
        ctx.fillStyle = '#888';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';

        const labels = ['Input', ...Array(this.layers.length - 2).fill('Hidden'), 'Output'];
        this.layers.forEach((layer, i) => {
            ctx.fillText(labels[i], layer[0].x, 30);
        });
    }

    activateNeuron(layerIndex, neuronIndex, value) {
        if (this.layers[layerIndex] && this.layers[layerIndex][neuronIndex]) {
            this.layers[layerIndex][neuronIndex].activation = value;
        }
    }

    activateConnection(fromLayer, fromNeuron, toLayer, toNeuron) {
        const conn = this.connections.find(c =>
            c.from === this.layers[fromLayer][fromNeuron] &&
            c.to === this.layers[toLayer][toNeuron]
        );
        if (conn) conn.active = true;
    }

    resetActivations() {
        this.layers.forEach(layer => {
            layer.forEach(neuron => neuron.activation = 0);
        });
        this.connections.forEach(conn => conn.active = false);
    }
}

const visualizer = new NetworkVisualizer(canvas, ctx);

// Generate Datasets
function generateXOR() {
    const xs = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const ys = [[0], [1], [1], [0]];
    return { xs: tf.tensor2d(xs), ys: tf.tensor2d(ys) };
}

function generateCircle() {
    const points = [];
    const labels = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const dist = Math.sqrt(x * x + y * y);
        points.push([x, y]);
        labels.push(dist < 0.5 ? [1] : [0]);
    }
    return { xs: tf.tensor2d(points), ys: tf.tensor2d(labels) };
}

function generateSpiral() {
    const points = [];
    const labels = [];
    for (let i = 0; i < 100; i++) {
        const r = i / 100 * 5;
        const t = 1.25 * i / 100 * 2 * Math.PI + Math.random() * 0.1;

        points.push([r * Math.sin(t), r * Math.cos(t)]);
        labels.push([1]);

        points.push([r * Math.sin(t + Math.PI), r * Math.cos(t + Math.PI)]);
        labels.push([0]);
    }
    return { xs: tf.tensor2d(points), ys: tf.tensor2d(labels) };
}

function getDataset(name) {
    switch (name) {
        case 'xor': return generateXOR();
        case 'circle': return generateCircle();
        case 'spiral': return generateSpiral();
        default: return generateXOR();
    }
}

// Build Model
function buildModel() {
    model = tf.sequential();

    // Input layer
    model.add(tf.layers.dense({
        inputShape: [2],
        units: config.neuronsPerLayer,
        activation: 'relu'
    }));

    // Hidden layers
    for (let i = 0; i < config.hiddenLayers - 1; i++) {
        model.add(tf.layers.dense({
            units: config.neuronsPerLayer,
            activation: 'relu'
        }));
    }

    // Output layer
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));

    model.compile({
        optimizer: tf.train.adam(config.learningRate),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    // Update visualizer
    const architecture = [
        2,
        ...Array(config.hiddenLayers).fill(config.neuronsPerLayer),
        1
    ];
    visualizer.buildNetwork(architecture);
    visualizer.draw();
}

// Train Model
async function trainModel() {
    if (isTraining) {
        isTraining = false;
        document.getElementById('trainBtn').textContent = 'Start Training';
        document.getElementById('trainBtn').classList.remove('training');
        return;
    }

    isTraining = true;
    document.getElementById('trainBtn').textContent = 'Stop Training';
    document.getElementById('trainBtn').classList.add('training');

    trainingData = getDataset(config.dataset);

    await model.fit(trainingData.xs, trainingData.ys, {
        epochs: config.epochs,
        shuffle: true,
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                if (!isTraining) return;

                document.getElementById('currentEpoch').textContent = epoch + 1;
                document.getElementById('currentLoss').textContent = logs.loss.toFixed(4);
                document.getElementById('accuracy').textContent =
                    ((logs.acc || 0) * 100).toFixed(1) + '%';

                // Animate network
                visualizer.resetActivations();
                const sample = trainingData.xs.slice([0, 0], [1, -1]);
                const activations = await model.predict(sample).data();

                // Activate input layer
                visualizer.activateNeuron(0, 0, Math.random());
                visualizer.activateNeuron(0, 1, Math.random());

                // Activate random neurons in hidden layers
                for (let i = 1; i < visualizer.layers.length - 1; i++) {
                    for (let j = 0; j < visualizer.layers[i].length; j++) {
                        visualizer.activateNeuron(i, j, Math.random());
                    }
                }

                // Activate output
                visualizer.activateNeuron(visualizer.layers.length - 1, 0, activations[0]);

                visualizer.draw();
                await tf.nextFrame();
            },
            onTrainEnd: () => {
                isTraining = false;
                document.getElementById('trainBtn').textContent = 'Start Training';
                document.getElementById('trainBtn').classList.remove('training');
            }
        }
    });
}

// Event Listeners
document.getElementById('hiddenLayers').addEventListener('input', (e) => {
    config.hiddenLayers = parseInt(e.target.value);
    document.getElementById('hiddenLayersValue').textContent = e.target.value;
    buildModel();
});

document.getElementById('neuronsPerLayer').addEventListener('input', (e) => {
    config.neuronsPerLayer = parseInt(e.target.value);
    document.getElementById('neuronsPerLayerValue').textContent = e.target.value;
    buildModel();
});

document.getElementById('learningRate').addEventListener('input', (e) => {
    config.learningRate = parseFloat(e.target.value);
    document.getElementById('learningRateValue').textContent = e.target.value;
    if (model) {
        model.compile({
            optimizer: tf.train.adam(config.learningRate),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });
    }
});

document.getElementById('epochs').addEventListener('input', (e) => {
    config.epochs = parseInt(e.target.value);
    document.getElementById('epochsValue').textContent = e.target.value;
});

document.querySelectorAll('.dataset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.dataset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        config.dataset = btn.dataset.dataset;
    });
});

document.getElementById('trainBtn').addEventListener('click', trainModel);

document.getElementById('resetBtn').addEventListener('click', () => {
    isTraining = false;
    buildModel();
    document.getElementById('currentEpoch').textContent = '0';
    document.getElementById('currentLoss').textContent = '0.000';
    document.getElementById('accuracy').textContent = '0%';
});

// Initialize
buildModel();
