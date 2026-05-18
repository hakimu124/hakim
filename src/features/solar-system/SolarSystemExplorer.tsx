"use client";
import React, { useState } from 'react';
import './SolarSystem.css';

const PLANETS = [
  {
    name: "Mercury",
    color: "#A5A5A5",
    size: 10,
    orbitRadius: 60,
    orbitSpeed: 8.8, // days (simplified for animation)
    distance: "57.9 million km",
    moons: 0,
    fact: "Smallest planet and closest to the Sun. A year is only 88 days long!"
  },
  {
    name: "Venus",
    color: "#E3BB76",
    size: 18,
    orbitRadius: 90,
    orbitSpeed: 22.5,
    distance: "108.2 million km",
    moons: 0,
    fact: "The hottest planet in our solar system, with a surface temperature of 471°C."
  },
  {
    name: "Earth",
    color: "#2271B3",
    size: 20,
    orbitRadius: 130,
    orbitSpeed: 36.5,
    distance: "149.6 million km",
    moons: 1,
    fact: "The only known planet to support life and have liquid water on its surface."
  },
  {
    name: "Mars",
    color: "#E27B58",
    size: 14,
    orbitRadius: 170,
    orbitSpeed: 68.7,
    distance: "227.9 million km",
    moons: 2,
    fact: "Known as the Red Planet due to iron oxide on its surface."
  },
  {
    name: "Jupiter",
    color: "#D39C7E",
    size: 34,
    orbitRadius: 220,
    orbitSpeed: 11.9,
    distance: "778.6 million km",
    moons: 79,
    fact: "The largest planet in our solar system, twice as massive as all others combined."
  },
  {
    name: "Saturn",
    color: "#C5AB6E",
    size: 28,
    orbitRadius: 270,
    orbitSpeed: 29.5,
    distance: "1.4 billion km",
    moons: 82,
    fact: "Famous for its stunning ring system made of ice and rock."
  },
  {
    name: "Uranus",
    color: "#BBE1EP",
    size: 22,
    orbitRadius: 310,
    orbitSpeed: 84,
    distance: "2.9 billion km",
    moons: 27,
    fact: "An ice giant that rotates on its side, with an extreme axial tilt."
  },
  {
    name: "Neptune",
    color: "#6081B3",
    size: 22,
    orbitRadius: 350,
    orbitSpeed: 164.8,
    distance: "4.5 billion km",
    moons: 14,
    fact: "The windiest planet, with speeds reaching up to 2,000 km/h."
  },
];

export const SolarSystemExplorer = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof PLANETS[0] | null>(null);

  return (
    <div className="solar-system-container">
      <div className="star-field" />

      <div className="sun" />

      {PLANETS.map((planet) => (
        <div
          key={planet.name}
          className="orbit"
          style={{
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2,
            animationDuration: `${planet.orbitSpeed * 5}s`
          }}
        >
          <div
            className="planet"
            style={{
              width: planet.size,
              height: planet.size,
              backgroundColor: planet.color,
              left: 'calc(50% - ' + (planet.size / 2) + 'px)',
              top: `-${planet.size / 2}px`
            }}
            onClick={() => setSelectedPlanet(planet)}
          />
        </div>
      ))}

      {selectedPlanet && (
        <div className={`planet-info-panel ${selectedPlanet ? 'visible' : ''}`}>
          <div className="planet-info-title">{selectedPlanet.name}</div>
          <div className="planet-info-detail"><strong>Distance:</strong> {selectedPlanet.distance}</div>
          <div className="planet-info-detail"><strong>Moons:</strong> {selectedPlanet.moons}</div>
          <div className="planet-info-fact">{selectedPlanet.fact}</div>
          <button
            className="close-btn"
            onClick={() => setSelectedPlanet(null)}
            style={{
              marginTop: '1rem',
              padding: '4px 12px',
              fontSize: '10px',
              backgroundColor: 'transparent',
              border: '1px solid #00d4ff',
              color: '#00d4ff',
              cursor: 'pointer',
              borderRadius: '4px',
              fontFamily: 'DM Mono, monospace'
            }}
          >
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
};
