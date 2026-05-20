import { useState, useEffect } from 'react'
import headshot from './assets/headshot.png'
import './App.css'

const FEATURED = {
  name: 'CorrLabX',
  description:
    'Full-stack quantitative research platform for identifying pricing inefficiencies in equity markets. The scoring engine combines three statistical signals — return autocorrelation, volatility clustering, and ARIMA predictive edge — into a weighted composite score used to surface tradeable inefficiencies across 10+ equity pairs.',
  tech: ['Python', 'React', 'Node.js', 'Express', 'Pandas', 'statsmodels', 'Railway', 'Vercel'],
  github: 'https://github.com/2u5hi/CorrLabX',
  live: 'https://corr-lab-x.vercel.app/',
  snippet: `def autocorrelation_score(returns):
    acf_vals = acf(returns, nlags=5, fft=False)[1:]
    return round(float(np.mean(np.abs(acf_vals))), 4)

def volatility_clustering_score(returns):
    squared  = returns ** 2
    acf_vals = acf(squared, nlags=5, fft=False)[1:]
    return round(float(np.mean(np.abs(acf_vals))), 4)

def arima_edge_score(returns):
    train = returns.iloc[:int(len(returns) * 0.8)]
    test  = returns.iloc[int(len(returns) * 0.8):]
    baseline_rmse = np.sqrt(mean_squared_error(
        test, np.full(len(test), train.mean())
    ))
    model = auto_arima(train, seasonal=False,
                       suppress_warnings=True)
    preds = [model.predict(n_periods=1)[0]
             for _ in range(len(test))]
    arima_rmse = np.sqrt(mean_squared_error(test, preds))
    return round(float(max(0, baseline_rmse - arima_rmse)), 6)

# weighted composite — inefficiency score /100
ac_normalized   = min(ac_score / 0.20, 1.0) * 40
vc_normalized   = min(vc_score / 0.20, 1.0) * 30
edge_normalized = min(edge_score / 0.05, 1.0) * 30
final = round(ac_normalized + vc_normalized + edge_normalized, 2)`,
}

const PROJECTS = [
  {
    name: 'TravelMS',
    description:
      'Full-stack travel management system with a normalized MySQL schema across 5+ entity types. Responsive Angular frontend with dynamic route-based views and integrated RESTful endpoints for real-time data binding.',
    tech: ['Angular', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Vercel'],
    github: 'https://github.com/2u5hi/TravelMS_SWE',
    live: 'https://travel-ms-swe.vercel.app/',
  },
  {
    name: 'Midas Core',
    description:
      'Financial transaction processing service consuming real-time Kafka events with atomic transaction management ensuring 100% consistency under concurrent load. Integrated external Incentive REST API post-validation.',
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'Spring Data JPA', 'H2', 'REST'],
    tag: 'JPMorgan Chase Forage',
    github: 'https://github.com/2u5hi/midas-core',
  },
  {
    name: 'Daikibo Analysis',
    description:
      'Telemetry analysis across 4 global Daikibo facilities with interactive Tableau dashboards identifying downtime by factory and device type. Includes gender pay equity classification using conditional scoring formulas.',
    tech: ['Tableau', 'Excel'],
    tag: 'Deloitte Forage',
  },
]

const EXPERIENCE = [
  {
    role: 'Web Developer Consultant',
    org: 'NGAO Security LLC',
    location: 'Atlanta, GA',
    range: 'Apr 2025 – Aug 2025',
    bullets: [
      'Rebuilt company website using HTML, CSS, and JavaScript, streamlining service request workflows and reducing update turnaround time by 40%',
      'Led stakeholder requirement sessions and restructured site architecture for SEO, increasing organic search visibility by 30%',
    ],
  },
  {
    role: 'Head of Alumni Relations · Health & Safety Rep. · VP Committee',
    org: 'Alpha Tau Omega, Eta Beta Chapter',
    location: 'Georgia State University',
    range: 'Aug 2023 – May 2026',
    bullets: [
      'Organized 10+ events per semester coordinating logistics, vendors, and guest lists for 50+ chapter members',
      'Managed chapter scheduling, communications, and operational planning across multiple concurrent committees',
    ],
  },
  {
    role: 'B.S. Computer Science — Honors College',
    org: 'Georgia State University',
    location: 'Atlanta, GA',
    range: 'Aug 2023 – May 2026',
    bullets: [
      'GPA: 3.5 | GSU Honors College',
      'Relevant coursework: Data Structures & Algorithms, Data Science, Probability & Statistics, Software Engineering, Database Systems',
    ],
  },
]

const SKILLS = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'HTML/CSS'],
  Frameworks: ['React', 'Angular', 'Spring Boot', 'Node.js', 'Express', 'Pandas'],
  Tools: ['Git', 'MySQL', 'Apache Kafka', 'Vercel', 'Railway', 'Tableau'],
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('visible', e.isIntersecting)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const navIds = ['about', 'experience', 'projects', 'contact']

  return (
    <div className="app">
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-logo">
          DA<span className="cursor">_</span>
        </a>
        <ul className="nav-links">
          {navIds.map((id, i) => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? 'active' : ''}>
                <span className="nav-num">0{i + 1}.</span> {id}
              </a>
            </li>
          ))}
          <li className="resume-dropdown">
            <button className="btn-nav">Resume ▾</button>
            <ul className="resume-menu">
              <li>
                <a href="/SWE_updated_DA.pdf" target="_blank" rel="noreferrer">
                  Software Engineer
                </a>
              </li>
              <li>
                <a href="/Dhanush Annoji - Data Resume.pdf" target="_blank" rel="noreferrer">
                  Data Scientist
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section id="hero">
        <div className="hero-inner">
          <p className="hero-greeting">Hi, my name is</p>
          <h1 className="hero-name">Dhanush Annoji.</h1>
          <h2 className="hero-sub-name">Software Engineer</h2>
          <p className="hero-desc">
            Computer Science graduate from Georgia State University’s Honors College.
            I build things that work — quantitative research tools, full-stack applications, and backend systems designed for real-world use.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Check out my work
            </a>
            <a href="mailto:dhanushannoji@gmail.com" className="btn btn-outline">
              Get in touch
            </a>
          </div>
        </div>

        <div className="social-sidebar">
          <a href="https://github.com/2u5hi" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/dhanush-annoji-45040b221/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <div className="sidebar-line" />
        </div>

        <div className="email-sidebar">
          <a href="mailto:dhanushannoji@gmail.com">dhanushannoji@gmail.com</a>
          <div className="sidebar-line" />
        </div>
      </section>

      <main>
        {/* ── About ── */}
        <section id="about">
          <h2 className="section-heading fade-in">
            <span className="num">01.</span> About Me
          </h2>
          <div className="about-grid">
            <div className="about-text fade-in" style={{ transitionDelay: '100ms' }}>
              <p>
                I recently graduated from Georgia State University’s Honors College with a B.S. in Computer Science. My work sits at the intersection of backend engineering and data — from building a quantitative research platform that scores equity inefficiencies using ARIMA and autocorrelation analysis, to designing normalized schemas and RESTful APIs across full-stack applications.
              </p>
              <p>
                Outside of personal projects, I consulted for NGAO Security where I rebuilt their client-facing web presence and cut service request turnaround by 40%. I’m drawn to problems where correctness actually matters — systems that have to hold up under real load, not just in demos.
              </p>
              <p>Here are some technologies I’ve been working with recently:</p>
              <div className="skills-grid">
                {Object.entries(SKILLS).map(([cat, items]) => (
                  <div key={cat}>
                    <h4>{cat}</h4>
                    <ul>
                      {items.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-img fade-in" style={{ transitionDelay: '200ms' }}>
              <div className="img-wrapper">
                <img src={headshot} alt="Dhanush Annoji" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience">
          <h2 className="section-heading fade-in">
            <span className="num">02.</span> Experience
          </h2>
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="timeline-item fade-in" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{e.role}</h3>
                      <p className="timeline-org">{e.org} <span className="timeline-location">· {e.location}</span></p>
                    </div>
                    <span className="timeline-range">{e.range}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects">
          <h2 className="section-heading fade-in">
            <span className="num">03.</span> Things I've Built
          </h2>
          <div className="featured-project fade-in">
            <p className="featured-label">Featured Project</p>
            <div className="featured-grid">
              <div className="featured-info">
                <h3 className="featured-name">{FEATURED.name}</h3>
                <div className="featured-desc-box">
                  <p>{FEATURED.description}</p>
                </div>
                <ul className="featured-tech">
                  {FEATURED.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="featured-links">
                  <a href={FEATURED.github} target="_blank" rel="noreferrer" aria-label="CorrLabX GitHub">
                    <GitHubIcon />
                  </a>
                  <a href={FEATURED.live} target="_blank" rel="noreferrer" aria-label="CorrLabX live">
                    <ExternalIcon />
                  </a>
                </div>
              </div>
              <div className="code-window">
                <div className="code-chrome">
                  <span className="chrome-dot dot-red" />
                  <span className="chrome-dot dot-yellow" />
                  <span className="chrome-dot dot-green" />
                  <span className="chrome-file">inefficiency_score.py</span>
                </div>
                <pre className="code-body"><code>{FEATURED.snippet}</code></pre>
              </div>
            </div>
          </div>

          <p className="other-projects-label">Other Projects</p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <article
                key={p.name}
                className="project-card fade-in"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="card-top">
                  <div className="card-folder">
                    <FolderIcon />
                  </div>
                  <div className="card-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.name} GitHub`}>
                        <GitHubIcon />
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.name} live`}>
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>
                {p.tag && <span className="card-tag">{p.tag}</span>}
                <h3 className="card-title">{p.name}</h3>
                <p className="card-desc">{p.description}</p>
                <ul className="card-tech">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact">
          <h2 className="section-heading centered fade-in">
            <span className="num">04.</span> What's Next?
          </h2>
          <p className="contact-sub fade-in" style={{ transitionDelay: '100ms' }}>Get In Touch</p>
          <p className="contact-desc fade-in" style={{ transitionDelay: '200ms' }}>
            I'm currently open to new opportunities. Whether you have a question, a project idea,
            or just want to say hi — my inbox is always open.
          </p>
          <a href="mailto:dhanushannoji@gmail.com" className="btn btn-primary btn-lg fade-in" style={{ transitionDelay: '300ms' }}>
            Say Hello
          </a>
          <div className="contact-links fade-in" style={{ transitionDelay: '400ms' }}>
            <a href="https://github.com/2u5hi" target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhanush-annoji-45040b221/" target="_blank" rel="noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>Designed &amp; Built by Dhanush Annoji</p>
      </footer>
    </div>
  )
}
