/** Renders the introductory banner shown above the feed. */
export function WelcomeBanner() {
  return <section className="welcome">
    <div className="eyebrow">МЕСТО ДЛЯ ВАШИХ ИНТЕРЕСОВ</div>
    <h2>Разные мысли.<br />Общий интерес<span>.</span></h2>
    <p>Делитесь своим. Находите близкое. Будьте собой.</p>
    <div className="art" aria-hidden="true"><i /><i /><span>✳</span><b /></div>
  </section>
}