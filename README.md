# 🧠 Neural Network Visualizer

> An interactive visualization of a neural network with real-time forward propagation and dynamic animations

![Neural Network](https://img.shields.io/badge/AI-Neural_Network-FF6B6B?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge)

## ✨ What is This?

**Neural Network Visualizer** is an interactive, animated representation of how neural networks process information. Watch as signals propagate through layers of neurons, mimicking how artificial intelligence "thinks" and learns.

Neural networks are the foundation of modern AI - from image recognition to language models. This visualization helps you understand how they work by showing:
- **Input Layer** - Data enters here
- **Hidden Layers** - Where the "magic" happens
- **Output Layer** - Final predictions
- **Connections** - Weighted links between neurons

## 🎮 Features

- **Real-time Animation**: Watch signals flow through the network
- **Interactive Neurons**: Hover and click to see neuron activity
- **Dynamic Connections**: Weighted edges that visualize signal strength
- **Particle Effects**: Glowing particles traveling along connections
- **Pulsating Neurons**: Visual feedback showing activation states
- **Smooth Animations**: Silky 60fps rendering
- **Neon Aesthetics**: Beautiful gradient colors and glow effects

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sid20007/neural-network-viz.git
   cd neural-network-viz
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser, **OR**
   - Use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

3. **Start exploring!**
   - Watch the automatic signal propagation
   - Hover over neurons to see details
   - Click for manual activation

## 🎯 How to Use

### Interaction
- **Auto Mode**: Signals automatically propagate through the network
- **Hover**: See individual neuron activation levels
- **Click**: Manually trigger neuron firing
- **Watch**: Observe how information flows from input to output

### Understanding the Visualization
- **Nodes/Circles**: Individual neurons
- **Lines**: Connections (synapses) between neurons
- **Particles**: Signals traveling through the network
- **Colors**: Represent activation strength
  - Bright = Highly activated
  - Dim = Less activated
- **Glow Effects**: Show current activity

## 🧠 The Science Behind It

Neural networks are inspired by the human brain:

1. **Neurons** receive inputs from previous layers
2. Each connection has a **weight** (importance)
3. Neurons **sum weighted inputs**
4. An **activation function** determines the output
5. Signals propagate **forward** through layers
6. The output layer produces the **final result**

This visualization simplifies the process to show the core concept: **information flowing and transforming through layers of connected nodes**.

## 🛠️ Technology Stack

- **Pure JavaScript** - No frameworks needed
- **HTML5 Canvas** - For smooth rendering
- **Vanilla CSS** - Clean, modern styling
- **No Dependencies** - Runs anywhere

## 🎨 Customization

You can easily modify:
- **Network Architecture**: Change layer sizes in `script.js`
- **Colors**: Modify gradient values
- **Animation Speed**: Adjust timing parameters
- **Particle Count**: Control visual density
- **Glow Effects**: Fine-tune shadow blur values

Example:
```javascript
// In script.js, modify network structure
const layers = [4, 6, 6, 3]; // [input, hidden1, hidden2, output]
```

## 📚 Educational Value

Perfect for:
- **Learning AI Basics** - Visual understanding of neural networks
- **Teaching** - Demonstrate concepts to students
- **Presentations** - Eye-catching visualization for talks
- **Portfolio** - Show your understanding of AI/ML concepts

## 🤝 Contributing

Contributions welcome! Ideas:
- Add backpropagation visualization
- Include training animation
- Add different activation functions
- Create preset network architectures
- Add real dataset examples (MNIST, etc.)

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 💡 Inspiration

Inspired by:
- TensorFlow Playground
- 3Blue1Brown's neural network videos
- The biological neural networks in our brains
- Modern deep learning architectures

## 🔗 Links
https://sid20007.github.io/-Neural-Network-Visualization/
- [Learn More About Neural Netrks](https://en.wikipedia.org/wiki/Artificial_neural_network)
- [Deep Learning Resources](https://www.deeplearning.ai/)

---

**Made with 🧠 and JavaScript**

*If you find this helpful, give it a ⭐ on GitHub!*
