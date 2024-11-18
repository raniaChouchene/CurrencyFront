// src/pages/Home.tsx

import React, { useState } from "react";

// Composant Home
const Home = () => {
  // Utilisation de l'état pour la gestion des données
  const [counter, setCounter] = useState<number>(0);

  // Fonction pour augmenter le compteur
  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="home-container">
      {/* En-tête */}
      <header className="home-header">
        <h1>Welcome to My Crypto Market App</h1>
        <p>Your gateway to real-time cryptocurrency data</p>
      </header>

      {/* Compteur simple pour l'exemple */}
      <div className="counter-section">
        <h2>Counter: {counter}</h2>
        <button onClick={incrementCounter} className="btn-increment">
          Increment Counter
        </button>
      </div>

      {/* Section pour ajouter plus de contenu */}
      <section className="features">
        <h3>Features</h3>
        <ul>
          <li>Track real-time cryptocurrency prices</li>
          <li>Visualize market trends</li>
          <li>Set price alerts and notifications</li>
          <li>Analyze market forecasts</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
