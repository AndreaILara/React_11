import FloatingImage from '../../components/FloatingImage/FloatingImage';
import './About.css';

const About = () => {
  return (
    <section id="about" className="separation">
      <h2>
        <span className="chubby-title">Climatología</span>
      </h2>
      <p>
        Esta aplicación fue desarrollada utilizando <b>React</b> como librería
        principal para la construcción de interfaces interactivas y se
        inicializó con <b>Vite</b>, una herramienta moderna de construcción
        para aplicaciones web que acelera el desarrollo gracias a su entorno
        rápido y optimizado.
      </p>
      <p>
        Los datos climáticos son proporcionados en tiempo real por la API de{' '}
        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
          <b>OpenWeather</b>
        </a>
        , una de las plataformas más fiables para obtener información
        meteorológica a nivel global.
      </p>
      <p>
        Las imágenes utilizadas en esta aplicación provienen de{' '}
        <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">
          <b>Flaticon</b>
        </a>
        , un recurso destacado para encontrar gráficos vectoriales y
        elementos visuales de alta calidad.
      </p>
      <p>
        Este proyecto tiene como objetivo ser una herramienta simple pero útil
        para consultar el clima actual de distintas localidades. Además,
        representa una práctica enriquecedora en el aprendizaje y
        consolidación de mis conocimientos en desarrollo web.
      </p>
      <FloatingImage />
    </section>
  );
};

export default About;
