import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { brandGroups } from './brands';

export default function BrandMenu({ open, onClose, onSelectBrand, onExited }) {
  return <Dialog open={open} onClose={onClose} maxWidth={false} fullWidth
    aria-labelledby="brand-menu-title"
    className="brand-menu-dialog"
    slotProps={{ paper: { className: 'brand-menu-panel', id: 'brand-menu' }, transition: { onExited } }}>
    <DialogContent>
      <div className="brand-menu-heading">
        <div><p className="eyebrow muted">FIND YOUR NEXT DRIVE</p><h2 id="brand-menu-title">Explore our brands</h2></div>
        <button autoFocus className="brand-menu-close" aria-label="Close brand menu" onClick={onClose}><X size={22}/></button>
      </div>
      <div className="brand-menu-groups">
        {brandGroups.map((group, index) => <section key={group.name} aria-labelledby={`brand-menu-group-${index}`}>
          <h3 id={`brand-menu-group-${index}`}>{group.name}<span>{String(group.brands.length).padStart(2, '0')}</span></h3>
          <ul>{group.brands.map(brand => <li key={brand.name}>
            <button aria-controls="brands" onClick={() => onSelectBrand(brand)}>{brand.name}<ArrowRight size={16} aria-hidden="true"/></button>
          </li>)}</ul>
        </section>)}
      </div>
      <p className="brand-menu-note">Choose a brand to discover its models.</p>
    </DialogContent>
  </Dialog>;
}
