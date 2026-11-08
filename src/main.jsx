import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, X, Menu, Pause, Play, Check, Plus, Minus } from 'lucide-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './styles.css';
import BrandGallery from './BrandGallery';
import BrandMenu from './BrandMenu';
import Footer from './Footer';

const theme = createTheme({
  typography: { fontFamily: '"DM Sans", Arial, sans-serif', button: { textTransform: 'none', fontWeight: 600 } },
  palette: { primary: { main: '#245b91' } },
  shape: { borderRadius: 3 },
});

const photos = {
  xc90: '/images/xc90.jpg',
  xc60: '/images/xc60.jpg',
  ec40: '/images/ec40.jpg',
  interior: '/images/interior.jpg',
};
const cars = [
  { name: 'XC90', type: 'Mild hybrid', category: 'Hybrid', image: photos.xc90, eyebrow: 'Meet the new XC90', title: 'Our iconic large SUV,\nmade even better', tagline: 'Room for more. Space for life.', description: 'A spacious seven-seat SUV with considered details, intuitive technology and comfort for every journey.', seats: '7 seats', detail: 'Large SUV' },
  { name: 'XC60', type: 'Mild hybrid', category: 'Hybrid', image: photos.xc60, eyebrow: 'Meet the wheelsense XC60', title: 'Performance where\nit matters the most', tagline: 'Everyday, elevated.', description: 'With Google built-in, intelligent safety assistance and all the space you need.', seats: '5 seats', detail: 'Midsize SUV' },
  { name: 'EC40', type: 'Pure electric', category: 'Electric', image: photos.ec40, eyebrow: 'Discover the EC40', title: 'The shape of\nthings to come', tagline: 'A new kind of energy.', description: 'Discover our pure electric crossover with leather-free interior and Google built-in.', seats: '5 seats', detail: 'Electric crossover' },
];

function CarImage({ src, alt, ...props }) {
  return <img src={src} alt={alt} {...props}/>;
}

function App() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [menu, setMenu] = useState(false);
  const [brandMenu, setBrandMenu] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const pendingBrandScroll = useRef(false);
  const [filter, setFilter] = useState('All models');
  const [modal, setModal] = useState(null);
  const overlayOpen = Boolean(modal || menu || brandMenu);
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState(true);
  const [faq, setFaq] = useState(null);
  useEffect(() => { if (paused || overlayOpen) return; const timer = setInterval(() => setSlide(s => (s + 1) % cars.length), 3000); return () => clearInterval(timer); }, [paused, slide, overlayOpen]);
  useLayoutEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menu]);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previousFocus = document.activeElement;
    const container = document.querySelector('.menu-overlay');
    const getFocusable = () => [...container.querySelectorAll('button, input, select, a[href]')].filter(el => !el.disabled);
    getFocusable()[0]?.focus();
    const trapFocus = e => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items.at(-1)?.focus(); }
      else if (!e.shiftKey && document.activeElement === items.at(-1)) { e.preventDefault(); items[0]?.focus(); }
    };
    container.addEventListener('keydown', trapFocus);
    return () => { container.removeEventListener('keydown', trapFocus); previousFocus?.focus(); };
  }, [menu]);
  const open = (kind, car = selectedCar) => { setSelectedCar(car); setSubmitted(false); setModal(kind); setMenu(false); };
  const openBrands = () => { setMenu(false); setBrandMenu(true); };
  const selectBrand = brand => {
    pendingBrandScroll.current = true;
    setSelectedBrand(brand);
    setBrandMenu(false);
  };
  const finishBrandNavigation = () => {
    if (!pendingBrandScroll.current) return;
    pendingBrandScroll.current = false;
    document.getElementById('brands-heading')?.focus({ preventScroll: true });
    document.getElementById('brands')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  };
  const scroll = id => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <>
    <header className="header"><a className="wordmark" href="#" aria-label="wheelsense home">wheelsense<span className="brand-dot">®</span></a><nav aria-label="Main navigation"><button className="brand-nav-trigger" aria-haspopup="dialog" aria-expanded={brandMenu} aria-controls={brandMenu ? "brand-menu" : undefined} onClick={openBrands}>Brand<ChevronDown size={13}/></button><button onClick={() => scroll('experience')}>Culture</button><button aria-haspopup="dialog" onClick={() => open('collaborations')}>Collaborations</button></nav><div className="header-right"><button className="test-drive-nav" onClick={() => open('test')}>Book a test drive <ArrowUpRight size={15}/></button><button className="menu-button" aria-label="Open menu" onClick={() => setMenu(true)}><Menu size={23}/><span>Menu</span></button></div></header>
    {/* {notice && <div className="announcement"><span>Experience luxury in a wheelsense car.</span><button onClick={() => open('test')}>Book a test drive <ChevronRight size={14}/></button><button className="close-announcement" aria-label="Dismiss announcement" onClick={() => setNotice(false)}><X size={16}/></button></div>} */}
    <main>
      <section className="hero" aria-roledescription="carousel" aria-label="Featured wheelsense cars">
        {cars.map((car, i) => <div className={`hero-slide ${slide === i ? 'active' : ''}`} key={car.name} aria-hidden={slide !== i}><CarImage src={car.image} alt={`wheelsense ${car.name} in a scenic landscape`} loading={i ? 'eager' : undefined}/><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow">{car.eyebrow}</p>{i === slide ? <h1>{car.title}</h1> : <h2>{car.title}</h2>}<Button variant="contained" disableElevation className="hero-cta" tabIndex={slide === i ? 0 : -1} onClick={() => open('details', car)}>Explore</Button></div></div>)}
        <div className="hero-bottom"><span className="hero-note">DESIGNED AROUND YOU.</span><div className="carousel-controls"><span className="slide-count">0{slide + 1}<span> / 03</span></span><button aria-label="Previous slide" onClick={() => setSlide((slide + 2) % 3)}><ChevronLeft size={20}/></button><div className="slide-dots">{cars.map((car,i) => <button key={car.name} className={slide === i ? 'selected' : ''} aria-label={`Show ${car.name}`} aria-current={slide === i} onClick={() => setSlide(i)}><span key={`${slide}-${paused}`} style={{animationPlayState: paused || overlayOpen ? 'paused' : 'running'}}/></button>)}</div><button aria-label="Next slide" onClick={() => setSlide((slide + 1) % 3)}><ChevronRight size={20}/></button><button aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused(!paused)}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button></div></div>
      </section>
      <section className="quick-links wrap" aria-label="Helpful links">{[['Book a test drive','Find out what it would be like to drive a wheelsense every day.','test'],['Accessories and service','Personalise your drive by adding equipment and more.','service'],['Approved used cars','Find an approved used car at the right price.','used'],['Find a retailer','Contact us or visit us in person.','retailer']].map(([title,desc,kind]) => <button key={kind} onClick={() => open(kind)}><span>{title}<ArrowUpRight size={19}/></span><p>{desc}</p></button>)}</section>
      <BrandGallery selectedBrand={selectedBrand}/>
      <section className="cars-section wrap" id="cars"><div className="section-top"><div><p className="eyebrow muted">FIND YOUR wheelsense</p><h2>A car for the way you live.</h2></div><button className="text-link" onClick={() => open('compare')}>Compare models <ArrowUpRight size={18}/></button></div><div className="filters" aria-label="Filter cars">{['All models','Electric','Hybrid'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}{f === 'All models' && <span>03</span>}</button>)}</div><div className="car-grid">{cars.filter(c => filter === 'All models' || c.category === filter).map(car => <article className="car-card" key={car.name}><div className="car-title"><div><h3>{car.name}</h3><p>{car.type} <span>·</span> {car.detail}</p></div><ArrowUpRight size={22}/></div><button className="car-photo" aria-label={`Explore ${car.name}`} onClick={() => open('details', car)}><CarImage src={car.image} alt={`${car.name} exterior`} loading="lazy"/><span>{car.seats}</span></button><div className="card-bottom"><p>{car.tagline}</p><button onClick={() => open('details',car)}>Explore <ArrowRight size={17}/></button></div></article>)}</div></section>
      <section className="model-story" aria-labelledby="xc60-heading">
        <div className="story-image"><CarImage src={photos.xc60} alt="wheelsense XC60 on a quiet, tree-lined road" loading="lazy"/><span className="image-caption">THE MILD HYBRID SUV</span></div>
        <div className="story-copy"><p className="eyebrow muted">COMFORT IN EVERY MOMENT</p><h2 id="xc60-heading">Meet the wheelsense XC60</h2><p>Performance where it matters the most. With Google built-in, intelligent safety assistance and all the space you need.</p><Button variant="outlined" onClick={() => open('details', cars[1])}>Explore the XC60 <ArrowRight size={17}/></Button></div>
      </section>
      <section className="model-story reverse" aria-labelledby="ec40-heading">
        <div className="story-image"><CarImage src={photos.ec40} alt="The all-electric wheelsense EC40 crossover" loading="lazy"/><span className="image-caption">THE PURE ELECTRIC CROSSOVER</span></div>
        <div className="story-copy"><p className="eyebrow muted">A DIFFERENT KIND OF ENERGY</p><h2 id="ec40-heading">Discover the EC40</h2><p>The shape of things to come. Discover our pure electric crossover with leather-free interior and Google built-in.</p><Button variant="outlined" onClick={() => open('details', cars[2])}>Explore the EC40 <ArrowRight size={17}/></Button></div>
      </section>
      <section className="experience wrap" id="experience"><p className="eyebrow muted">DESIGNED AROUND YOU</p><h2>Freedom to move.<br/>Room to be yourself.</h2><p className="intro">We’re dedicated to giving you the freedom to move in a personal, sustainable and safe way.</p><div className="values">{[['01','Electrification','A quieter drive. A brighter future. Explore a new way to move with confidence.'],['02','Safety','Thoughtful technology, built around what matters most. You and the people you love.'],['03','Sustainability','Small details. Meaningful change. A considered approach to the world we share.']].map(([n,t,d]) => <button key={n} onClick={() => open(t.toLowerCase())}><span className="value-number">{n}</span><h3>{t}<ArrowUpRight size={22}/></h3><p>{d}</p><span className="value-link">Discover more <ArrowRight size={16}/></span></button>)}</div></section>
      <section className="interior-section" id="ownership"><div className="interior-photo"><CarImage src={photos.interior} alt="Central touchscreen showing navigation in a wheelsense interior" loading="lazy"/></div><div className="interior-copy"><p className="eyebrow muted">CONNECTED TO YOUR WORLD</p><h2>A more controlled<br/>driving experience</h2><p>Look forward to the new and improved design on your car’s display. Coming soon to selected wheelsense cars.</p><button className="text-link" onClick={() => open('technology')}>Get a preview <ArrowUpRight size={18}/></button></div></section>
      <section className="faq wrap"><div><p className="eyebrow muted">A LITTLE MORE CLARITY</p><h2>Your journey, simplified.</h2></div><div className="faq-list">{[['How do I book a test drive?','Choose your preferred wheelsense model, enter your contact details and select your city in the test-drive form. You can explore every model before choosing your favourite.'],['Which wheelsense is right for me?','Explore the seven-seat XC90 for more room, the versatile XC60 for everyday journeys, or the fully electric EC40. Use Compare models to see them side by side.'],['How can I explore electric driving?','Discover the EC40 in our model collection. Its electric powertrain and thoughtfully designed interior offer a fresh perspective on your daily drive.']].map(([q,a],i) => <div className="faq-item" key={q}><button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>{q}{faq === i ? <Minus size={19}/> : <Plus size={19}/>}</button>{faq === i && <p>{a}</p>}</div>)}</div></section>
      <section className="closing"><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>Some things are better experienced.</h2><button className="button light" onClick={() => open('test')}>Book a test drive <ArrowUpRight size={19}/></button></section>
    </main>
    <Footer open={open} onSelectBrand={brand => {
      pendingBrandScroll.current = true;
      setSelectedBrand(brand);
      requestAnimationFrame(finishBrandNavigation);
    }}/>

    {menu && <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="menu-header"><span className="wordmark">wheelsense</span><button aria-label="Close menu" onClick={() => setMenu(false)}><X/></button></div><nav><button aria-haspopup="dialog" onClick={openBrands}>Brand<ChevronRight/></button><button onClick={() => scroll('experience')}>Culture<ArrowUpRight/></button><button aria-haspopup="dialog" onClick={() => open('collaborations')}>Collaborations<ArrowUpRight/></button><button onClick={() => scroll('ownership')}>Ownership<ArrowUpRight/></button><button onClick={() => open('test')}>Book a test drive<ArrowUpRight/></button></nav><p>SCANDINAVIAN DESIGN. A NEW PERSPECTIVE.</p></div>}
    <BrandMenu open={brandMenu} onClose={() => setBrandMenu(false)} onSelectBrand={selectBrand} onExited={finishBrandNavigation}/>
    <Dialog open={Boolean(modal)} onClose={() => setModal(null)} maxWidth="sm" fullWidth aria-labelledby="modal-title" slotProps={{ paper: { className: 'modal' } }}><DialogContent><button className="modal-close" autoFocus aria-label="Close dialog" onClick={() => setModal(null)}><X size={23}/></button>{modal && <ModalContent kind={modal} car={selectedCar} submitted={submitted} onSubmit={() => setSubmitted(true)} open={open}/>}</DialogContent></Dialog>
  </>;
}

function ModalContent({kind, car, submitted, onSubmit, open}) {
  if (kind === 'test') return <>
    <p className="eyebrow muted">EXPERIENCE wheelsense</p>
    <h2 id="modal-title">Your next journey<br/>starts here.</h2>
    {submitted ? <div className="success" role="status"><Check size={34}/><h3>Your request is ready.</h3><p>This is a demonstration form. Your details have not been sent or stored. On a live website, your selected retailer would contact you to arrange a drive.</p></div> : <>
      <p className="modal-description">Choose your car. Find a moment to make it yours.</p>
      <form className="test-drive-form" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <TextField select fullWidth label="Preferred model" defaultValue={car.name} name="model">{cars.map(c => <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>)}</TextField>
        <TextField fullWidth label="Full name" name="name" required autoComplete="name"/>
        <div className="form-row"><TextField fullWidth type="email" label="Email" name="email" required autoComplete="email"/><TextField fullWidth type="tel" label="Phone" name="phone" required autoComplete="tel" slotProps={{ htmlInput: { pattern: '[+0-9 ]{7,20}' } }}/></div>
        <TextField fullWidth label="City" name="city" required autoComplete="address-level2"/>
        <FormControlLabel className="consent" control={<Checkbox required size="small"/>} label="I agree to be contacted about this test-drive request."/>
        <Button variant="contained" disableElevation fullWidth type="submit" endIcon={<ArrowRight size={18}/>}>Request a test drive</Button>
        <p className="form-note">Demo only. No information is sent to a retailer.</p>
      </form>
    </>}
  </>;
  if(kind === 'details') return <><p className="eyebrow muted">{car.type} · {car.detail}</p><h2 id="modal-title">The wheelsense {car.name}.</h2><CarImage className="detail-image" src={car.image} alt={car.name}/><h3>{car.tagline}</h3><p className="modal-description">{car.description}</p><div className="spec-row"><span>{car.seats}</span><span>{car.type}</span><span>Scandinavian design</span></div><button className="button dark" onClick={() => open('test',car)}>Book a test drive<ArrowUpRight size={18}/></button></>;
  if(kind === 'compare') return <><p className="eyebrow muted">FIND YOUR wheelsense</p><h2 id="modal-title">Compare models.</h2><div className="compare-table"><table><thead><tr><th>Model</th>{cars.map(c => <th key={c.name}>{c.name}</th>)}</tr></thead><tbody>{[['Powertrain',...cars.map(c => c.type)],['Seating',...cars.map(c => c.seats)],['Body style',...cars.map(c => c.detail)]].map(row => <tr key={row[0]}>{row.map((v,i) => i ? <td key={i}>{v}</td> : <th key={i}>{v}</th>)}</tr>)}</tbody></table></div><button className="button dark" onClick={() => open('test')}>Experience your favourite<ArrowRight size={18}/></button></>;
  const content = {
    collaborations:['Collaborations','A meeting of design, craftsmanship and fresh perspectives. This space will bring together wheelsense’s future creative collaborations. Partner stories and collections will be shared here as they become available.'],
    service:['Accessories & service','Make your wheelsense your own. Explore practical accessories and considered care for every journey. Retailer service booking will be available when this concept is connected to a dealership.'],
    used:['Approved used cars','The confidence of wheelsense, with a story already begun. Approved used-car inventory will appear here when a retailer catalogue is connected.'],
    retailer:['Find a retailer','Start with your city in the test-drive form. This concept is ready for a retailer directory; no live dealership locations are connected yet.'],
    electrification:['A new way to move.','Explore the pure electric EC40. Learn about home charging, public charging and how an electric car can fit into your everyday journeys.'],
    safety:['Designed around your safety.','From considered visibility to intelligent driver assistance, safety is at the heart of the wheelsense experience. Explore each model with a test drive.'],
    sustainability:['A more considered tomorrow.','Thoughtful materials and the move towards electric mobility inform our vision. Discover the leather-free interior of the EC40.'],
    technology:['Connected. Intuitive. Yours.','Explore navigation, media and vehicle controls together in a thoughtfully designed central display. Book a test drive to discover the experience.'],
    region:['India · English','You are viewing the India edition of the wheelsense concept website. Additional regions are not available in this demo.'],
    privacy:['Your privacy','This demo does not send or store your test-drive information and does not use analytics or tracking cookies. Vehicle photography is bundled locally. The optional website font loads from Google Fonts.'],
    terms:['About this concept','wheelsense is an independent website design concept inspired by the Volvo Cars India website. Vehicle model names and photography belong to their respective owners. This website is not affiliated with Volvo Cars.'],
    contact:['Let’s start a conversation.','Use the test-drive form to try the wheelsense experience. This is a design demonstration; no live customer service or retailer contact is connected.'],
  }[kind] || ['Discover wheelsense','Explore our collection of thoughtfully designed cars.'];
  return <><p className="eyebrow muted">THE wheelsense EXPERIENCE</p><h2 id="modal-title">{content[0]}</h2><p className="modal-description">{content[1]}</p>{!['privacy','terms','region'].includes(kind) && <button className="button dark" onClick={() => open('test')}>Book a test drive<ArrowUpRight size={18}/></button>}</>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><ThemeProvider theme={theme}><App/></ThemeProvider></React.StrictMode>);
