
import DimensionalField from "./ui/dimensional-field";

export function Hero() {
  return (
    <section
      id="top"
      className="hero hero--field on-dark"
      aria-labelledby="hero-title"
    >
      {/* Animated background */}
      <div className="hero__field" aria-hidden="true">
        <DimensionalField
          mode="dark"
          saturation={0.85}
          brightness={0.72}
          className="hero__field-frame"
        />
      </div>

      {/* Brand identity */}
      <div className="container hero__inner">
        <div className="hero__copy">

          <img
            src="/Brina.png"
            alt="Brina logo"
            className="hero__logo"
          />

          <h1 id="hero-title" className="hero__title">
            BRINA
          </h1>

          <p className="hero__role">
            UI/UX Designer
          </p>

          <p className="hero__lead">
            Turning ideas into digital experiences.
          </p>

        </div>
      </div>
    </section>
  );
}
