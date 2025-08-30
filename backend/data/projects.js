const projects = [
  {
    id: "1",
    name: "AI Portfolio Terminal",
    description: "Interactive AI-powered portfolio website with retro terminal interface and real-time chat functionality",
    tech_stack: ["React", "Node.js", "Express", "OpenAI API", "Tailwind CSS", "Vite"],
    github_url: "https://github.com/harsh-kakadiya1/PORTFOLIO",
    live_demo: "https://portfolio-frontend.onrender.com",
    category: "web_development",
    status: "completed",
    code_snippet: "const handleCommand = async (input) => {\n  if (input.startsWith('/')) {\n    return processCommand(input);\n  }\n  return await aiAPI.chat(input);\n};",
    ascii_art: "    💻 TERMINAL\n    ┌─────────────┐\n    │ > /help     │\n    │ > /projects │\n    │ > AI Chat   │\n    └─────────────┘"
  },
  {
    id: "2",
    name: "Neural Network Visualizer",
    description: "Interactive 3D visualization of neural network architectures with real-time training visualization",
    tech_stack: ["Python", "TensorFlow", "Three.js", "React", "WebGL"],
    github_url: "https://github.com/harsh-kakadiya1/neural-viz",
    live_demo: "https://neural-viz.demo.com",
    category: "ai_ml",
    status: "completed",
    code_snippet: "def visualize_network(model):\n    layers = model.layers\n    for i, layer in enumerate(layers):\n        nodes = layer.units\n        render_layer_3d(nodes, i)\n    return network_graph",
    ascii_art: "    🧠 NEURAL NETWORK\n    ┌─○─○─○─┐\n    │ │ │ │ │\n    ├─○─○─○─┤\n    │ │ │ │ │\n    └─○─○─○─┘\n   INPUT → OUTPUT"
  },
  {
    id: "3",
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard",
    tech_stack: ["React", "Node.js", "MongoDB", "Stripe API", "JWT", "Material-UI"],
    github_url: "https://github.com/harsh-kakadiya1/ecommerce-platform",
    live_demo: "https://ecommerce-demo.com",
    category: "web_development",
    status: "completed",
    code_snippet: "const processPayment = async (orderData) => {\n  const paymentIntent = await stripe.paymentIntents.create({\n    amount: orderData.total * 100,\n    currency: 'usd'\n  });\n  return paymentIntent.client_secret;\n};",
    ascii_art: "    🛒 E-COMMERCE\n    ┌─────────────┐\n    │ 📦 Products │\n    │ 💳 Payment  │\n    │ 📊 Analytics│\n    └─────────────┘"
  },
  {
    id: "4",
    name: "Real-time Chat Application",
    description: "WebSocket-based chat app with rooms, file sharing, and emoji reactions",
    tech_stack: ["Socket.io", "React", "Node.js", "Redis", "JWT"],
    github_url: "https://github.com/harsh-kakadiya1/realtime-chat",
    live_demo: "https://chat-app-demo.com",
    category: "web_development",
    status: "in_progress",
    code_snippet: "io.on('connection', (socket) => {\n  socket.on('join-room', (roomId) => {\n    socket.join(roomId);\n    socket.to(roomId).emit('user-joined', socket.id);\n  });\n});",
    ascii_art: "    💬 CHAT APP\n    ┌─────────────┐\n    │ User1: Hi!  │\n    │ User2: Hey! │\n    │ [typing...] │\n    └─────────────┘"
  },
  {
    id: "5",
    name: "Machine Learning API",
    description: "RESTful API for image classification and sentiment analysis using pre-trained models",
    tech_stack: ["Python", "FastAPI", "TensorFlow", "Docker", "AWS"],
    github_url: "https://github.com/harsh-kakadiya1/ml-api",
    category: "ai_ml",
    status: "completed",
    code_snippet: "from fastapi import FastAPI, File, UploadFile\n\n@app.post('/classify-image')\nasync def classify_image(file: UploadFile = File(...)):\n    image = await process_image(file)\n    prediction = model.predict(image)\n    return {'class': prediction, 'confidence': confidence}",
    ascii_art: "    🤖 ML API\n    ┌─────────────┐\n    │ 📸 → 🏷️    │\n    │ 📝 → 😊😢   │\n    │ API Ready   │\n    └─────────────┘"
  }
];

module.exports = projects;
