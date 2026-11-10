
import DimensionalField from "./ui/dimensional-field";
import { WordRotate } from "./ui/word-rotate";

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
           Thoughtfully designed. Intentionally built.
          </p>

                  <WordRotate
          duration={3500}
          className="hero__description-rotate"
          words={[
            "Turning ideas into digital\nexperiences.",
            "Creating thoughtful and\ninterractive designs.",
            "Building digital products\nwith purpose.",
          ]}
        />

        </div>
      </div>
    </section>
  );
}
