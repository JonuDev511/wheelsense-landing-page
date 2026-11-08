import React from 'react';
import { Globe } from 'lucide-react';
import { brandGroups } from './brands';

const popularBrands = brandGroups[0].brands.slice(0, 8);
const footerBlocks = [
  ['Popular cars', ['Creta', 'Nexon', 'Swift', 'Thar', 'Scorpio-N', 'Fortuner', 'Innova Crysta', 'Brezza']],
  ['Popular searches', ['Cars under ₹10 lakh', 'Best SUVs under ₹15 lakh', 'Best automatic cars', 'Best CNG cars', 'Best EVs in India', '7-seater cars', 'Used cars under ₹5 lakh']],
  ['Cities', ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Meerut', 'Chandigarh']],
  ['Tools and services', ['Car loan EMI calculator', 'Car loan eligibility', 'Car insurance', 'Insurance renewal', 'On-road price calculator', 'Car comparison', 'Total cost of ownership calculator', 'Income tax planning for car buyers', 'Book an expert call']],
  ['Company', ['About us', 'How it works', 'Careers', 'Blog', 'Press', 'Contact us', 'Partner with us (dealers)', 'Partner with us (banks and insurers)']],
  ['Legal pages', ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Grievance Redressal', 'Disclaimer', 'Sitemap']],
  ['Social and contact', ['Instagram', 'YouTube', 'LinkedIn', 'X', 'Facebook']],
];
const disclaimers = [
  'Prices shown are indicative. The final on-road price is confirmed by the dealer.',
  'Loan and insurance products are offered through partner banks and insurers. Approval is at their discretion.',
  'Brand names and logos belong to their respective owners.',
  'Tax guidance is informational. Please consult a qualified tax advisor.',
];

export default function Footer({ onSelectBrand, open }) {
  const actions = {
    'Privacy Policy': () => open('privacy'),
    'Terms of Use': () => open('terms'),
    'Contact us': () => open('contact'),
    'Car comparison': () => open('compare'),
  };
  return <footer className="footer wrap">
    <div className="footer-top"><a className="wordmark" href="#" aria-label="wheelsense home">wheelsense</a><p>Designed for life.</p><button onClick={() => open('region')}><Globe size={16}/> India · English</button></div>
    <div className="footer-directory">
      <section className="footer-block" aria-labelledby="footer-popular-brands">
        <h2 id="footer-popular-brands">Popular brands</h2>
        <ul>{popularBrands.map(brand => <li key={brand.name}><a href="#brands" onClick={e => { e.preventDefault(); onSelectBrand(brand); }}>{brand.name}</a></li>)}</ul>
      </section>
      {footerBlocks.map(([title, items], index) => <section className="footer-block" key={title} aria-labelledby={`footer-block-${index}`}>
        <h2 id={`footer-block-${index}`}>{title}</h2>
        <ul>{items.map(item => <li key={item}>{actions[item] ? <button onClick={actions[item]}>{item}</button> : item === 'Disclaimer' ? <a href="#footer-disclaimers">{item}</a> : <span>{item}</span>}</li>)}</ul>
      </section>)}
    </div>
    <section className="footer-disclaimers" id="footer-disclaimers" aria-labelledby="footer-disclaimer-title">
      <h2 id="footer-disclaimer-title">Disclaimers</h2>
      <ul>{disclaimers.map(text => <li key={text}>{text}</li>)}</ul>
    </section>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} wheelsense. All rights reserved.</p><div><button onClick={() => open('privacy')}>Privacy</button><button onClick={() => open('terms')}>Legal</button><button onClick={() => open('contact')}>Contact us</button></div></div>
    <p className="demo-note">Independent design concept. Vehicle names and trademarks belong to their respective owners. Additional car photography: Wikimedia Commons; credits appear with the selected brand. Not affiliated with the featured manufacturers. Finance, insurance, search tools and social profiles are not connected in this demo.</p>
  </footer>;
}
