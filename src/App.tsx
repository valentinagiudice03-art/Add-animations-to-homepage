import { useEffect, useRef, useState } from "react"

type Service = {
  number: string
  title: string
  description: string
  quote: string
  color: string
  icon: "site" | "brand" | "photo" | "social" | "automation"
}

const services: Service[] = [
  {
    number: "01",
    title: "Siti web",
    description: "Un sito su misura, fatto per farti chiamare.",
    quote: "“Il mio sito è vecchio. O non ce l’ho proprio.”",
    color: "#00d8e8",
    icon: "site",
  },
  {
    number: "02",
    title: "Branding e identità",
    description: "Logo, colori e tono: un’immagine che si riconosce.",
    quote: "“Non ho un’immagine che si riconosca.”",
    color: "#f268b5",
    icon: "brand",
  },
  {
    number: "03",
    title: "Foto e video",
    description: "Un solo shooting, materiale per mesi.",
    quote: "“Le foto le faccio col telefono, tra un cliente e l’altro.”",
    color: "#e5b50b",
    icon: "photo",
  },
  {
    number: "04",
    title: "Social Ads",
    description: "Contenuti e sponsorizzate per farti vedere in zona.",
    quote: "“Sui social non mi vede nessuno.”",
    color: "#d16e4c",
    icon: "social",
  },
  {
    number: "05",
    title: "Automazioni",
    description: "Meno lavoro a mano, sopra i programmi che usi già.",
    quote: "“Passo le serate a copiare dati e a rispondere alle stesse mail.”",
    color: "#67bd72",
    icon: "automation",
  },
]

const steps = [
  {
    number: "01",
    title: "Ci sentiamo.",
    copy: "Una call di 20 minuti: ci racconti la tua attività e cosa non va.",
  },
  {
    number: "02",
    title: "Un preventivo chiaro.",
    copy: "Scritto, con dentro anche quello che non è incluso. Se ti convince, si parte.",
  },
  {
    number: "03",
    title: "Lo costruiamo insieme.",
    copy: "Se servono foto, logo o testi, coordiniamo noi gli specialisti. Tu approvi ogni passo, e niente va online senza il tuo ok.",
  },
  {
    number: "04",
    title: "Non ci pensi più.",
    copy: "Dopo il lancio teniamo il sito online, aggiornato e sicuro. Cambi orari? Ci scrivi e lo sistemiamo.",
  },
]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, visible } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

function ServiceIcon({ type }: { type: Service["icon"] }) {
  if (type === "site")
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="15" width="34" height="25" rx="3" />
        <path d="M11 15V10h26v5M7 22h34" />
      </svg>
    )
  if (type === "brand")
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 5l4 5 6-1 1 6 5 4-3 5 3 6-5 3-1 7-6-2-4 5-4-5-6 2-1-7-5-3 3-6-3-5 5-4 1-6 6 1z" />
        <path d="M21 15c-4 9-3 14 3 18 6-4 7-9 3-18" />
      </svg>
    )
  if (type === "photo")
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 8v16l14 8M24 24L11 35M12 13l12 11" />
      </svg>
    )
  if (type === "social")
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 11h32v23H25l-8 7v-7H8z" />
        <path d="M18 22l5 5 8-11" />
      </svg>
    )
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 18a15 15 0 1 1 1 15" />
      <path d="M10 10v8h8M24 16v9l7 4" />
    </svg>
  )
}

function HeroThreads() {
  return (
    <svg
      className="hero-threads"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="thread aqua"
        d="M-20 45C166 60 180 150 380 145c165-4 219 86 417 56 175-27 283-132 663-76"
        pathLength="1"
        strokeWidth="2"
      />
      <path
        className="thread pink"
        d="M-20 72c184 11 208 96 398 82 176-13 228 83 414 54 184-29 291-112 668-58"
        pathLength="1"
        strokeWidth="2"
      />
      <path
        className="thread yellow"
        d="M-20 195c220 30 248-60 435-30 173 28 224-59 405-10 198 54 202-6 340 20 121 23 180-27 300-8"
        pathLength="1"
        strokeWidth="2"
      />
      <path
        className="thread orange"
        d="M-20 122c184-20 246 75 407 55 175-22 230 59 410 35 190-25 288-90 663-28"
        pathLength="1"
        strokeWidth="2"
      />
      <path
        className="thread green"
        d="M-20 158c204-41 249 55 413 32 172-25 231 45 408 26 192-21 302-68 659-4"
        pathLength="1"
        strokeWidth="2"
      />
    </svg>
  )
}

function ServicesThreads() {
  const { ref, visible } = useInView<SVGSVGElement>()

  return (
    <svg
      ref={ref}
      className={`service-threads ${visible ? "is-visible" : ""}`}
      viewBox="0 0 1200 620"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="service-line aqua"
        pathLength="1"
        d="M600 0v30C510 66 108 42 108 132v292c0 102 346 68 492 196"
      />
      <path
        className="service-line pink"
        pathLength="1"
        d="M600 0v30c-52 40-300 32-300 112v282c0 94 188 90 300 196"
      />
      <path className="service-line yellow" pathLength="1" d="M600 0v620" />
      <path
        className="service-line orange"
        pathLength="1"
        d="M600 0v30c52 40 244 32 244 112v282c0 94-132 90-244 196"
      />
      <path
        className="service-line green"
        pathLength="1"
        d="M600 0v30c90 36 494 12 494 102v292c0 102-348 68-494 196"
      />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [threadsPaused, setThreadsPaused] = useState(false)

  return (
    <main className={threadsPaused ? "threads-paused" : ""}>
      <nav className="nav shell" aria-label="Navigazione principale">
        <a className="logo" href="#top" aria-label="Loom studio, home">
          loom studio
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          Menu
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#servizi">
            Servizi <span>⌄</span>
          </a>
          <a href="#lavori">Lavori</a>
          <a href="#metodo">Studio &amp; metodo</a>
          <a className="button small" href="#contatti">
            Prenota una call
          </a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-item">
            Studio creativo per piccole attività
          </p>
          <h1 className="hero-item">
            Un’immagine all’altezza
            <em>di come lavori.</em>
          </h1>
          <p className="hero-description hero-item">
            Sito, immagine, foto e video, social e automazioni: un solo studio,
            un solo referente. E sai sempre cosa stai pagando.
          </p>
          <a className="button hero-item" href="#servizi">
            Scopri i servizi <span>→</span>
          </a>
        </div>
        <HeroThreads />
        <button
          className="pause-button"
          onClick={() => setThreadsPaused(!threadsPaused)}
        >
          {threadsPaused ? "▶ Avvia i fili" : "Ⅱ Ferma i fili"}
        </button>
      </header>

      <section className="services shell" id="servizi">
        <Reveal className="section-heading">
          <span className="stem" />
          <h2>Cinque fili, un solo studio.</h2>
          <p>Prendi solo quello che ti serve, oppure mettili insieme.</p>
        </Reveal>
        <div className="services-stage">
          <ServicesThreads />
          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal
                className="service-wrap"
                delay={index * 90}
                key={service.number}
              >
                <article
                  className="service-card"
                  style={{ "--accent": service.color } as React.CSSProperties}
                >
                  <ServiceIcon type={service.icon} />
                  <span className="number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <blockquote>{service.quote}</blockquote>
                </article>
              </Reveal>
            ))}
          </div>
          <a className="all-services" href="#contatti">
            Non sai da dove partire? Guarda tutti i servizi <span>→</span>
          </a>
        </div>
      </section>

      <section className="featured shell" id="lavori">
        <Reveal className="featured-card">
          <div className="featured-copy">
            <p className="eyebrow">Lavoro in evidenza</p>
            <h2>Avenger House of Strength</h2>
            <p className="muted">
              Palestra di 1.200 mq a Cernusco sul Naviglio.
            </p>
            <p>
              Sito, foto e video, gestione clienti, app e sponsorizzate: un solo
              studio per tutto.
            </p>
            <a href="#contatti">
              Guarda il lavoro <span>→</span>
            </a>
          </div>
          <div className="featured-visual">
            <span>[FOTO · palestra Avenger]</span>
            <div className="scan-line" />
          </div>
          <div className="status-bar">
            {[
              "Sito ● online",
              "Gestione clienti ◐ in test",
              "App ◐ in sviluppo",
              "Campagne social ◐ in corso",
              "Foto e video ● online",
            ].map((status, i) => (
              <span
                key={status}
                style={
                  { "--status-delay": `${i * 120}ms` } as React.CSSProperties
                }
              >
                {status}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="process shell" id="metodo">
        <Reveal className="process-heading">
          <h2>Niente sorprese.</h2>
          <p>Sai cosa paghi prima di firmare.</p>
        </Reveal>
        <div className="process-list">
          <div className="timeline" aria-hidden="true">
            <span />
          </div>
          {steps.map((step, index) => (
            <Reveal
              className={`step step-${index + 1}`}
              delay={index * 100}
              key={step.number}
            >
              <article>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact shell" id="contatti">
        <Reveal className="contact-content">
          <h2>Parliamo della tua attività.</h2>
          <div className="cta-thread" aria-hidden="true" />
          <a className="button contact-button" href="mailto:ciao@loomstudio.it">
            Prenota una call
          </a>
          <p>
            Preferisci scrivere?{" "}
            <a href="mailto:ciao@loomstudio.it">Scrivici</a>
          </p>
          <small>Ti rispondiamo entro 2 giorni lavorativi.</small>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="shell">
          <h2>Il percorso del filo</h2>
          <p>storyboard · lo scroll in quattro momenti</p>
          <div className="storyboard">
            {[
              "scroll 0% · i fili si intrecciano",
              "scroll 30% · il filo si divide in 5",
              "scroll 70% · si riannoda: 4 nodi",
              "scroll 100% · nodo sulla call",
            ].map((label, i) => (
              <div className={`story story-${i + 1}`} key={label}>
                <div className="story-art">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
