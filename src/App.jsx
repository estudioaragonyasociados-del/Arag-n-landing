import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Music2, ChevronDown, Menu, X, Check, Loader2, HeartPulse, Briefcase, ScrollText, Home, Gavel, ShieldCheck, Lock, FileText, Coins } from 'lucide-react'

const WA = '5492995039477', EMAIL = 'estudioaragonyasociados@gmail.com'
const wa = (m) => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`
const HOLA = 'Hola, quisiera hacer una consulta con la Dra. Aragón.'
const EXT = { target: '_blank', rel: 'noopener noreferrer' }
const SOCIAL = [[Instagram, 'Instagram', 'https://instagram.com/mariamarcelaaragon_'], [Facebook, 'Facebook', 'https://www.facebook.com/mariam.aragon'], [Music2, 'TikTok', 'https://www.tiktok.com/@ab.aragonmarcela']]
const NAV = [['Áreas', '#areas'], ['Cómo trabajamos', '#proceso'], ['Sobre mí', '#sobre'], ['Contacto', '#contacto']]
const TESTIMONIOS = [] // Completar solo con testimonios autorizados: [{ texto, nombre }]

const AREAS = [
  { icon: HeartPulse, t: 'ART y accidentes de trabajo', d: 'Te acompañamos cuando la ART no te da respuestas o discute tu cobertura.', i: ['Accidentes laborales y enfermedades profesionales', 'Rechazos de cobertura y altas médicas cuestionadas', 'Determinación de incapacidad e indemnizaciones', 'Reclamos ante Comisiones Médicas y en sede judicial'], m: 'Hola, quiero consultar por un tema de ART / accidente de trabajo.', big: true },
  { icon: Briefcase, t: 'Reclamos laborales', d: 'Analizamos tu situación y te explicamos qué te corresponde.', i: ['Despidos e indemnizaciones', 'Diferencias salariales', 'Trabajo no registrado o mal registrado', 'Descuentos indebidos'], m: 'Hola, quiero consultar por un reclamo laboral.' },
  { icon: ScrollText, t: 'Sucesiones', d: 'Ordenamos el trámite para que lo transites con tranquilidad.', i: ['Inicio y seguimiento del proceso', 'Declaratoria de herederos', 'Transmisión y distribución de bienes'], m: 'Hola, quiero consultar por una sucesión.' },
  { icon: Home, t: 'Prescripciones adquisitivas (usucapiones)', d: 'Te ayudamos a regularizar el inmueble que poseés sin escritura.', i: ['Evaluación de antecedentes posesorios', 'Documentación y prueba', 'Representación judicial para el reconocimiento del dominio'], m: 'Hola, quiero consultar por una prescripción adquisitiva (usucapión).' },
  { icon: Gavel, t: 'Causas penales', d: 'Un acompañamiento claro desde la primera consulta.', i: ['Asesoramiento inicial', 'Defensa técnica', 'Seguimiento cercano de tu causa'], m: 'Hola, quiero consultar por una causa penal.' },
]
const SITU = ['La ART rechazó tu cobertura', 'Te dieron el alta y seguís con dolor', 'Te despidieron sin pagar lo que corresponde', 'Trabajás sin estar registrado', 'Necesitás iniciar una sucesión', 'Poseés un inmueble sin escritura', 'Enfrentás una causa penal']
const PASOS = ['Nos escribís por WhatsApp y contás tu situación brevemente.', 'Coordinamos una consulta y analizamos tu documentación.', 'Te explicamos alternativas, alcance, honorarios y gastos.', 'Te acompañamos y te mantenemos informado en cada etapa.']
const DOCS = ['DNI', 'Recibos de sueldo', 'Telegramas o cartas documento', 'Certificados y estudios médicos', 'Notificaciones de la ART', 'Escrituras, boletos o impuestos del inmueble', 'Partidas', 'Cualquier papel sobre el tema']
const FAQ = [
  ['¿Cuánto cuestan los honorarios?', 'Los honorarios se presupuestan según el tipo de asunto, su complejidad y el alcance del trabajo. Te los informamos con claridad en la consulta, junto con los gastos previstos.'],
  ['¿Cuánto dura un trámite o un juicio?', 'Depende de cada caso, por eso no se garantizan plazos. En la consulta te explicamos las etapas y qué podés esperar de cada una.'],
  ['¿Mi consulta es confidencial?', 'Sí. Todo lo que nos cuentes y la documentación que compartas se maneja con estricta confidencialidad.'],
  ['¿Atienden fuera de Neuquén capital?', 'Atendemos en Neuquén y localidades cercanas. Escribinos por WhatsApp y vemos cómo coordinar.'],
  ['¿Qué hago si la ART ya rechazó mi caso?', 'Reuní la notificación de la ART y tus estudios médicos y contanos: analizamos la documentación y te explicamos qué alternativas existen, sin prometer resultados.'],
]

const R = ({ d = 0, c = '', v = '', children }) => <div className={'rv ' + v + ' ' + c} style={{ '--d': d + 'ms' }}>{children}</div>
const Wa = ({ m = HOLA, children = 'Consultar por WhatsApp', c = '' }) => <a href={wa(m)} {...EXT} className={'btn-wa ' + c}><MessageCircle size={20} aria-hidden />{children}</a>
const Sec = ({ id, c = '', bg, children }) => <section id={id} className={'relative py-16 md:py-24 ' + c}>{bg}<div className="relative mx-auto max-w-[1200px] px-5">{children}</div></section>
const H = ({ k, children, light, sub }) => <R c="mx-auto mb-10 max-w-2xl text-center">{k && <p className={'mb-2 text-xs font-semibold uppercase tracking-[.18em] ' + (light ? 'text-lila2' : 'text-p600')}>{k}</p>}<h2 className={'text-3xl font-bold md:text-5xl ' + (light ? 'text-white' : 'text-ink')}>{children}</h2>{sub && <p className={'mt-3 ' + (light ? 'text-lila' : 'text-ink/80')}>{sub}</p>}</R>
const inp = 'w-full min-h-[48px] rounded-xl border border-lila2 bg-white px-4 outline-none transition-colors duration-200 focus:border-p500 focus:ring-2 focus:ring-p500/20'

function Faq({ q, a }) {
  const [o, setO] = useState(false)
  return <div className="card overflow-hidden"><button onClick={() => setO(!o)} aria-expanded={o} className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-3 text-left font-semibold"><span>{q}</span><ChevronDown className={'shrink-0 text-p600 transition-transform duration-500 ' + (o ? 'rotate-180' : '')} /></button><div className={'faq ' + (o ? 'open' : '')}><div className="overflow-hidden"><p className="px-5 pb-5 text-ink/85">{a}</p></div></div></div>
}

function Form() {
  const [f, setF] = useState({ n: '', t: '', a: '', m: '' }), [e, setE] = useState({}), [s, setS] = useState('idle')
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.value })
  const send = (ev) => {
    ev.preventDefault()
    const x = {}
    if (f.n.trim().length < 2) x.n = 'Ingresá tu nombre.'
    if (f.t.replace(/\D/g, '').length < 8) x.t = 'Ingresá un teléfono válido, con código de área.'
    if (!f.a) x.a = 'Elegí el tipo de consulta.'
    setE(x); if (Object.keys(x).length) return
    setS('loading')
    window.open(wa(`Hola, soy ${f.n.trim()}. Quisiera consultar por: ${f.a}. ${f.m.trim()} Mi teléfono: ${f.t.trim()}`), '_blank', 'noopener')
    setTimeout(() => setS('ok'), 800)
  }
  if (s === 'ok') return <div className="card p-8 text-center" role="status"><span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-p600 text-white"><Check /></span><h3 className="text-2xl font-bold">¡Gracias, {f.n.trim()}!</h3><p className="mt-2">Se abrió WhatsApp con tu consulta. Si no se abrió, escribinos desde el botón de abajo.</p><div className="mt-5"><Wa m={`Hola, soy ${f.n.trim()}. Quisiera consultar por: ${f.a}.`} /></div></div>
  const Err = ({ k }) => e[k] ? <p className="mt-1 text-sm font-medium text-red-700" role="alert">{e[k]}</p> : null
  return <form onSubmit={send} noValidate className="card space-y-4 p-6 md:p-8">
    <div><label htmlFor="n" className="mb-1 block text-sm font-semibold">Nombre</label><input id="n" className={inp} value={f.n} onChange={set('n')} autoComplete="name" /><Err k="n" /></div>
    <div><label htmlFor="t" className="mb-1 block text-sm font-semibold">Teléfono</label><input id="t" type="tel" className={inp} value={f.t} onChange={set('t')} autoComplete="tel" inputMode="tel" /><Err k="t" /></div>
    <div><label htmlFor="a" className="mb-1 block text-sm font-semibold">Tipo de consulta</label><select id="a" className={inp} value={f.a} onChange={set('a')}><option value="">Elegí una opción</option>{AREAS.map((a) => <option key={a.t}>{a.t}</option>)}</select><Err k="a" /></div>
    <div><label htmlFor="m" className="mb-1 block text-sm font-semibold">Mensaje breve</label><textarea id="m" rows="3" className={inp + ' py-3'} value={f.m} onChange={set('m')} /></div>
    <button className="btn w-full" disabled={s === 'loading'}>{s === 'loading' ? <><Loader2 className="animate-spin" size={20} />Enviando…</> : 'Solicitar consulta'}</button>
    <p className="flex items-center justify-center gap-2 text-sm"><Lock size={16} className="text-p600" />Tu información es confidencial.</p>
  </form>
}

export default function App() {
  const [sc, setSc] = useState(false), [menu, setMenu] = useState(false), [fab, setFab] = useState(false), [inForm, setInForm] = useState(false), bar = useRef()
  useEffect(() => {
    const f = () => { const h = document.documentElement.scrollHeight - innerHeight; setSc(scrollY > 20); document.documentElement.style.setProperty('--sy', scrollY); if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})` }
    f(); addEventListener('scroll', f, { passive: true })
    const t = setTimeout(() => setFab(true), 2000)
    const els = [...document.querySelectorAll('.rv,.ln')]
    let io, io2
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }), { threshold: 0.15 })
      els.forEach((x) => io.observe(x))
      io2 = new IntersectionObserver(([x]) => setInForm(x.isIntersecting)); io2.observe(document.getElementById('consulta'))
    } else els.forEach((x) => x.classList.add('in'))
    return () => { removeEventListener('scroll', f); clearTimeout(t); io && io.disconnect(); io2 && io2.disconnect() }
  }, [])

  return <>
    <div ref={bar} className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-p600" style={{ transform: 'scaleX(0)' }} />
    <header className={'fixed inset-x-0 top-0 z-50 transition-all duration-500 ' + (sc || menu ? 'bg-white/85 shadow-md backdrop-blur-md' : 'bg-transparent')}>
      <div className="mx-auto flex h-[76px] max-w-[1200px] md:h-20 items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2"><img src="/images/logo-aragon.png" width="417" height="393" alt="Logo de Aragón & Asociados, estudio jurídico" className="h-14 w-auto md:h-16" /><span className="hidden font-serif text-xl font-bold text-p900 sm:block md:text-2xl">Aragón & Asociados</span></a>
        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-p600">{l}</a>)}</nav>
        <div className="flex items-center gap-2"><Wa c="!min-h-[44px] !px-4 text-sm max-sm:hidden" /><button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setMenu(!menu)} aria-label="Abrir menú" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button></div>
      </div>
      {menu && <nav className="border-t border-lila2 bg-white px-5 pb-5 lg:hidden">{NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setMenu(false)} className="flex min-h-[48px] items-center border-b border-lila font-medium">{l}</a>)}<div className="mt-4"><Wa c="w-full" /></div></nav>}
    </header>

    <main id="top">
      <section className="g-hero overflow-hidden pb-16 pt-28 md:pt-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2">
          <div>
            <p className="a-up mb-3 text-xs font-semibold uppercase tracking-[.16em] text-p900">ART y reclamos laborales · Neuquén</p>
            <h1 className="a-up text-[2.1rem] font-bold text-ink sm:text-5xl lg:text-6xl" style={{ '--d': '100ms' }}>Defendemos tus derechos frente a la ART y en conflictos laborales</h1>
            <p className="a-up mt-4 text-base text-ink/85 md:text-lg" style={{ '--d': '200ms' }}>Asesoramiento y representación en accidentes de trabajo, enfermedades profesionales, despidos e indemnizaciones. También intervenimos en sucesiones, prescripciones adquisitivas y causas penales.</p>
            <div className="a-up mt-6 flex flex-col gap-3 sm:flex-row" style={{ '--d': '300ms' }}><Wa /><a href="#areas" className="btn-o">Ver áreas de trabajo</a></div>
            <p className="a-up mt-5 text-sm font-semibold" style={{ '--d': '400ms' }}>Maria Marcela Aragón — Abogada | Matrícula de Neuquén N.º 4323</p>
            <p className="a-up mt-1 text-sm text-ink/80" style={{ '--d': '400ms' }}>Atención personalizada · Confidencialidad · Te explicamos tus opciones</p>
            <div className="a-up mt-4 flex flex-wrap gap-2" style={{ '--d': '450ms' }}>{['Sucesiones', 'Prescripciones adquisitivas', 'Causas penales'].map((x) => <a key={x} href="#areas" className="inline-flex min-h-[44px] items-center rounded-full border border-lila2 bg-white/70 px-4 text-sm font-medium hover:border-p500">{x}</a>)}</div>
          </div>
          <div className="a-sl relative mx-auto w-full max-w-[420px]" style={{ '--d': '150ms' }}>
            <div className="glow absolute -inset-8 rounded-full bg-orq/25 blur-3xl" aria-hidden />
            <div className="px relative rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-b from-orq to-p600 p-1.5"><div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.7rem]"><img src="/images/hero-abogada.jpg" width="900" height="1061" fetchpriority="high" alt="Maria Marcela Aragón, abogada, en su estudio jurídico de Neuquén" className="h-full w-full object-cover" /></div></div>
            <div className="a-up card absolute -bottom-5 left-2 right-2 px-4 py-3 text-sm sm:left-auto sm:-left-6 sm:right-auto" style={{ '--d': '400ms' }}><p className="font-serif text-lg font-bold text-p900">Maria Marcela Aragón</p><p>Abogada | Matrícula N.º 4323</p></div>
          </div>
        </div>
      </section>

      <section className="g-dark py-8 text-white"><div className="mx-auto grid max-w-[1200px] gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck, 'Atención directa con la abogada'], [Lock, 'Confidencialidad'], [FileText, 'Información clara sobre tu caso'], [Coins, 'Claridad en honorarios y gastos']].map(([I, t], i) => <R key={t} d={i * 80} c="flex items-center gap-3 font-medium"><I className="shrink-0 text-gold" />{t}</R>)}</div></section>

      <Sec c="bg-white">
        <H k="Situaciones frecuentes">¿Te pasa alguna de estas situaciones?</H>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{SITU.map((s, i) => <R key={s} d={i * 80} v={['rv-l', 'rv-z', 'rv-r'][i % 3]} c={i === SITU.length - 1 ? 'sm:col-span-2 sm:w-[calc(50%-.5rem)] sm:justify-self-center lg:col-span-1 lg:col-start-2 lg:w-full' : ''}><div className="card flex h-full items-center gap-3 p-5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lila text-p600"><Check size={18} /></span>{s}</div></R>)}</div>
        <R c="mt-10 text-center"><p className="mb-4 font-serif text-2xl font-bold">No tenés que resolverlo solo. Contanos tu caso y te orientamos.</p><Wa /></R>
      </Sec>

      <Sec id="areas" c="bg-lila">
        <H k="Áreas de trabajo">¿En qué podemos ayudarte?</H>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{AREAS.map((a, i) => <R key={a.t} d={i * 80} v="rv-z" c={a.big ? 'md:col-span-2' : ''}>
          <article className={'area flex h-full flex-col p-6 md:p-7 ' + (a.big ? 'g-dark rounded-[1.25rem] text-white shadow-[0_18px_40px_-16px_rgba(74,36,134,.6)]' : 'card')}>
            <span className={'ico mb-4 grid h-12 w-12 place-items-center rounded-xl ' + (a.big ? 'bg-white/15 text-gold' : 'bg-lila text-p600')}><a.icon /></span>
            <h3 className={'font-bold ' + (a.big ? 'text-3xl' : 'text-2xl')}>{a.t}</h3>
            <p className={'mt-2 ' + (a.big ? 'text-lila' : 'text-ink/80')}>{a.d}</p>
            <ul className={'mt-4 flex-1 space-y-2 text-sm ' + (a.big ? 'md:columns-2 md:gap-6' : '')}>{a.i.map((x) => <li key={x} className="flex gap-2 break-inside-avoid"><Check size={16} className={'mt-0.5 shrink-0 ' + (a.big ? 'text-gold' : 'text-p600')} />{x}</li>)}</ul>
            <div className="mt-6">{a.big ? <Wa m={a.m}>Consultar por esta situación</Wa> : <a href={wa(a.m)} {...EXT} className="btn w-full">Consultar por esta situación</a>}</div>
          </article></R>)}</div>
      </Sec>

      <Sec id="proceso" c="overflow-hidden bg-p900" bg={<><img src="/images/estudio.jpg" alt="" aria-hidden="true" width="1200" height="800" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-br from-p900/85 to-p600/75" /></>}>
        <H k="Cómo trabajamos" light>Cuatro pasos, sin vueltas</H>
        <div className="relative grid gap-8 md:grid-cols-4"><div className="ln absolute left-[12%] right-[12%] top-6 hidden h-px bg-lila2/60 md:block" />
          {PASOS.map((p, i) => <R key={p} d={i * 80} v="rv-z" c="relative text-center text-white"><span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gold font-serif text-2xl font-bold text-ink">{i + 1}</span><p>{p}</p></R>)}</div>
        <R c="mt-10 text-center"><Wa m={HOLA}>Dar el primer paso</Wa></R>
      </Sec>

      <Sec id="sobre" c="bg-white">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <R v="rv-l"><img src="/images/sobre-abogada.jpg" width="1100" height="876" loading="lazy" alt="Maria Marcela Aragón revisando documentación junto a una clienta" className="w-full rounded-3xl border border-lila2 object-cover shadow-[0_20px_50px_-20px_rgba(123,63,191,.5)]" /></R>
          <R d={120} v="rv-r"><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-p600">Sobre la abogada</p><h2 className="text-3xl font-bold md:text-5xl">Maria Marcela Aragón</h2>
            <p className="mt-1 font-semibold text-p900">Abogada · Matrícula de Neuquén N.º 4323 · Licenciada en Recursos Humanos</p>
            <p className="mt-4">Mi forma de trabajar es el trato directo: escucho tu situación, analizo cada caso en particular y te explico las alternativas con claridad. Vas a hablar conmigo, no con un intermediario.</p>
            <p className="mt-3">Mi formación en Derecho y en Recursos Humanos me da una mirada complementaria para entender los conflictos laborales.</p>
            <div className="mt-6"><Wa m="Hola, quisiera hablar con la abogada.">Hablar con la abogada</Wa></div></R>
        </div>
      </Sec>

      <Sec c="bg-lila">
        <H k="Antes de escribirnos" sub="Es una lista orientativa: si no tenés todo, igual podés escribirnos.">¿Qué necesitás para consultar?</H>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{DOCS.map((d, i) => <R key={d} d={i * 80} v="rv-z"><div className="card flex h-full items-center gap-3 p-4"><FileText size={20} className="shrink-0 text-p600" />{d}</div></R>)}</div>
      </Sec>

      <Sec c="bg-white">
        <H k="Preguntas frecuentes">Lo que más nos consultan</H>
        <div className="mx-auto max-w-3xl space-y-3">{FAQ.map(([q, a], i) => <R key={q} d={i * 80}><Faq q={q} a={a} /></R>)}</div>
        <R c="mt-10 text-center"><Wa m="Hola, tengo una duda y quisiera consultarla.">¿Tenés otra duda? Escribinos</Wa></R>
      </Sec>

      {TESTIMONIOS.length > 0 && <Sec id="testimonios" c="bg-lila"><H k="Testimonios">Lo que dicen quienes nos consultaron</H><div className="grid gap-5 md:grid-cols-3">{TESTIMONIOS.map((t) => <figure key={t.nombre} className="card p-6"><blockquote>{t.texto}</blockquote><figcaption className="mt-3 font-semibold">{t.nombre}</figcaption></figure>)}</div></Sec>}

      <Sec id="consulta" c="bg-lila">
        <div className="mx-auto max-w-xl"><H k="Consulta breve" sub="Dejanos tus datos y te respondemos a la brevedad.">Solicitá tu consulta</H><R><Form /></R></div>
      </Sec>

      <Sec id="contacto" c="bg-white">
        <H k="Contacto y ubicación">Estamos en Neuquén</H>
        <div className="grid gap-8 md:grid-cols-2">
          <R v="rv-l"><ul className="space-y-4">
            <li className="flex gap-3"><MessageCircle className="shrink-0 text-p600" /><a href={wa(HOLA)} {...EXT} className="min-h-[44px] font-medium hover:text-p600">WhatsApp: +54 9 2995 03-9477</a></li>
            <li className="flex gap-3"><Mail className="shrink-0 text-p600" /><a href={`mailto:${EMAIL}`} className="min-h-[44px] break-all font-medium hover:text-p600">{EMAIL}</a></li>
            <li className="flex gap-3"><MapPin className="shrink-0 text-p600" />Carlos H. Rodríguez 139, 6.º piso, Neuquén</li>
            <li className="flex gap-3"><Clock className="shrink-0 text-p600" />Horario: de 9 a 17 hs</li>
          </ul>
            <div className="mt-5 flex gap-3">{SOCIAL.map(([I, l, h]) => <a key={l} href={h} {...EXT} aria-label={l} className="grid h-11 w-11 place-items-center rounded-full border border-lila2 bg-lila text-p600 transition hover:border-p500 hover:bg-white"><I size={20} /></a>)}</div>
            </R>
          <R d={120} v="rv-r"><img src="/images/estudio.jpg" width="1200" height="800" loading="lazy" alt="Escritorio del estudio con la estatua de la Justicia y libros de derecho" className="aspect-[3/2] w-full rounded-2xl border border-lila2 object-cover md:aspect-auto md:h-full" /></R>
        </div>
      </Sec>

      <Sec id="mapa" c="bg-lila">
        <H k="Ubicación" sub="Carlos H. Rodríguez 139, 6.º piso, Neuquén · Horario: de 9 a 17 hs">Cómo llegar al estudio</H>
        <R v="rv-z"><div className="card relative h-[360px] overflow-hidden md:h-[460px]">
          <div className="absolute inset-0 grid place-items-center p-6 text-center"><div><MapPin className="mx-auto mb-2 text-p600" size={36} /><p className="font-semibold">Carlos H. Rodríguez 139, 6.º piso</p><p>Neuquén</p></div></div>
          <iframe title="Mapa con la ubicación del estudio: Carlos H. Rodríguez 139, Neuquén" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Carlos+H.+Rodr%C3%ADguez+139,+Neuqu%C3%A9n&output=embed" className="absolute inset-0 h-full w-full border-0" />
        </div></R>
        <R c="mt-6 text-center"><a href="https://www.google.com/maps/search/?api=1&query=Carlos+H.+Rodr%C3%ADguez+139%2C+Neuqu%C3%A9n" {...EXT} className="btn"><MapPin size={20} aria-hidden />Abrir en Google Maps</a></R>
      </Sec>

      <section className="g-dark py-16 text-center text-white"><R c="mx-auto max-w-2xl px-5"><h2 className="text-3xl font-bold md:text-5xl">Contanos tu caso hoy.</h2><p className="mb-6 mt-3 text-lila">Te escuchamos y te explicamos tus opciones con claridad.</p><Wa /></R></section>
    </main>

    <footer className="g-foot pt-14 text-lila">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-5 md:grid-cols-3">
        <div><span className="inline-block rounded-2xl bg-white p-3"><img src="/images/logo-aragon.png" width="417" height="393" loading="lazy" alt="Logo de Aragón & Asociados" className="h-20 w-auto" /></span><p className="mt-4 font-serif text-xl font-bold text-white">Aragón & Asociados – Estudio jurídico en Neuquén</p><p className="mt-1 text-sm">Maria Marcela Aragón · Matrícula N.º 4323</p></div>
        <ul className="space-y-2 text-sm"><li><a href={wa(HOLA)} {...EXT} className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"><MessageCircle size={18} />+54 9 2995 03-9477</a></li><li><a href={`mailto:${EMAIL}`} className="inline-flex min-h-[44px] items-center gap-2 break-all hover:text-white"><Mail size={18} />{EMAIL}</a></li><li className="flex gap-2"><MapPin size={18} className="shrink-0" />Carlos H. Rodríguez 139, 6.º piso, Neuquén</li></ul>
        <div className="flex gap-3 md:justify-end">{SOCIAL.map(([I, l, h]) => <a key={l} href={h} {...EXT} aria-label={l} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 hover:bg-white/10"><I size={20} /></a>)}</div>
      </div>
      <p className="mx-auto mt-10 max-w-[1200px] border-t border-white/15 px-5 py-6 text-xs">La información de este sitio es orientativa y no constituye asesoramiento legal específico. No se garantizan resultados judiciales ni plazos de resolución.</p>
    </footer>
    <div className="bg-ink px-5 py-3 text-xs text-lila2"><div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center"><span className="andy" style={{ '--m': 'url(/images/andy-logo.png)' }}><img src="/images/andy-logo.png" width="54" height="36" loading="lazy" alt="Logo de ANDY Digital Studio" className="h-9 w-auto" /></span><span>Diseño web por ANDY Digital Studio · ¿Querés una página como esta? <a href="https://andydigitalstudio.com" {...EXT} className="underline transition-colors hover:text-orq">Escribime</a></span></div></div>

    {fab && !inForm && <a href={wa(HOLA)} {...EXT} aria-label="Consultar por WhatsApp" className="a-pop fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-xl"><MessageCircle size={28} /></a>}
  </>
}
