import "./Home.css";
import phoneMockup from "./../assets/phone.png";
import {
  FaChartLine,
  FaClock,
  FaBell,
  FaEnvelope,
  FaList,
  FaLightbulb,
  FaChartPie,
} from "react-icons/fa";

function Home() {
  return (
    <div className="txs-home">
      <div className="presentation">
        <div className="content">
          <h1>Gérez vos cryptomonnaies avec notre plateforme avancée</h1>
          <p>
            Découvrez des outils puissants pour analyser, prévoir et recevoir
            des alertes personnalisées. Tout ce dont vous avez besoin pour
            rester informé et réagir rapidement aux évolutions du marché.
          </p>
          <a href="#" className="download-btn">
            Commencez dès maintenant
          </a>
        </div>
        <div className="phone-mockup">
          <img src={phoneMockup} alt="Phone Mockup" />
        </div>
      </div>
      <div className="services">
        <div className="service-box">
          <FaChartLine className="service-icon" />
          <h3>Analyse et visualisation</h3>
          <p>
            Visualisez l'évolution des prix des cryptomonnaies sous forme de
            courbes.
          </p>
        </div>
        <div className="service-box">
          <FaClock className="service-icon" />
          <h3>Plages de temps</h3>
          <p>Sélectionnez des plages spécifiques (1 mois, 1 semaine, etc.).</p>
        </div>
        <div className="service-box">
          <FaBell className="service-icon" />
          <h3>Alertes personnalisées</h3>
          <p>
            Configurez des alertes pour des prix supérieurs ou inférieurs à vos
            seuils.
          </p>
        </div>
        <div className="service-box">
          <FaEnvelope className="service-icon" />
          <h3>Alertes par email</h3>
          <p>Recevez des notifications directement dans votre boîte email.</p>
        </div>
        <div className="service-box">
          <FaList className="service-icon" />
          <h3>Liste des alertes</h3>
          <p>
            Consultez et gérez toutes les alertes que vous avez configurées.
          </p>
        </div>
        <div className="service-box">
          <FaLightbulb className="service-icon" />
          <h3>Prévision des tendances</h3>
          <p>Sélectionnez des modèles pour prédire les tendances du marché.</p>
        </div>
        <div className="service-box">
          <FaChartPie className="service-icon" />
          <h3>Graphiques interactifs</h3>
          <p>
            Visualisez vos prévisions directement sur des graphiques
            interactifs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
