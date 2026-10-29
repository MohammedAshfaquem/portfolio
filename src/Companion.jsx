import React, {useEffect, useId, useRef, useState} from 'react';
import {ArrowUpRight, X} from 'lucide-react';
import './companion.css';

function CharacterArt({greeting=false}) {
  const id=useId().replace(/[^a-zA-Z0-9]/g,'');
  const hand='160,190 345,190 385,345 315,600 160,600';
  return <svg className={'companion-art'+(greeting?' is-waving':'')} viewBox="0 0 1098 1433" aria-hidden="true">
    <defs>
      <clipPath id={'hand-'+id}><polygon points={hand}/></clipPath>
      <mask id={'body-'+id}><rect width="1098" height="1433" fill="white"/><polygon points={hand} fill="black"/></mask>
    </defs>
    <image href="/mini-ashfaque-stylized.png" width="1098" height="1433" mask={'url(#body-'+id+')'}/>
    <g className="companion-hand"><image href="/mini-ashfaque-stylized.png" width="1098" height="1433" clipPath={'url(#hand-'+id+')'}/></g>
  </svg>;
}

export function ContactCompanion() {
  const [hello,setHello]=useState(false);
  const timer=useRef();
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  const greet=()=>{setHello(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setHello(false),3200);};
  return <div className="contact-companion">
    <button className="contact-greeting" onClick={greet} aria-label="Say hello to mini Ashfaque" aria-live="polite">
      {hello?<>Hai! Thanks for stopping by.<br/>Let’s make something great.</>:<>Hai! Let’s build<br/>something good.</>}<span>✋</span>
    </button>
    <button className="contact-character" onClick={greet} aria-label="Wave hello to mini Ashfaque"><CharacterArt greeting={hello}/></button>
    <span className="character-caption">A LITTLE HELLO GOES A LONG WAY.</span>
  </div>;
}

export default function PortfolioCompanion({suppressed=false}) {
  const [contactVisible,setContactVisible]=useState(false),[open,setOpen]=useState(false),[answer,setAnswer]=useState(false);
  const host=useRef(),trigger=useRef(),closeButton=useRef();
  useEffect(()=>{
    const contact=document.getElementById('contact');if(!contact)return;
    const observer=new IntersectionObserver(([entry])=>{
      setContactVisible(entry.isIntersecting);
      if(entry.isIntersecting)setOpen(false);
    },{threshold:0,rootMargin:'0px 0px -10% 0px'});
    observer.observe(contact);return()=>observer.disconnect();
  },[]);
  useEffect(()=>{if(suppressed)setOpen(false);},[suppressed]);
  useEffect(()=>{
    if(!open)return;
    closeButton.current?.focus();
    const key=e=>{if(e.key==='Escape'){setOpen(false);trigger.current?.focus();}};
    const outside=e=>{if(!host.current?.contains(e.target))setOpen(false);};
    document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);
    return()=>{document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};
  },[open]);
  const hide=contactVisible||suppressed;
  const dismiss=()=>{setOpen(false);trigger.current?.focus();};
  return <aside ref={host} className={'floating-companion'+(hide?' is-hidden':'')} aria-label="Portfolio companion" aria-hidden={hide} inert={hide?true:undefined}>
    {open&&<section className="companion-guide" id="ashfaque-guide" role="region" aria-labelledby="guide-heading">
      <div className="guide-header"><span className="guide-eyebrow">A LITTLE HELP EXPLORING?</span><button ref={closeButton} onClick={dismiss} aria-label="Close portfolio guide"><X size={17}/></button></div>
      <h3 id="guide-heading">Hai! I’m mini Ashfaque.</h3>
      <p>Let me show you around. Here’s a little about the developer behind this portfolio.</p>
      <nav aria-label="Portfolio guide">
        <a href="#work" onClick={()=>setOpen(false)}>Explore my projects <ArrowUpRight size={15}/></a>
        <a href="#experience" onClick={()=>setOpen(false)}>See where I’ve worked <ArrowUpRight size={15}/></a>
        <button onClick={()=>setAnswer(!answer)} aria-expanded={answer} aria-controls="guide-tools">What do I build with? <span>{answer?'−':'+'}</span></button>
        {answer&&<div className="guide-answer" id="guide-tools">Python, FastAPI, Django, React and PostgreSQL. I build production APIs and full-stack experiences.<a href="#toolkit" onClick={()=>setOpen(false)}>See my toolkit ↗</a></div>}
        <a href="#contact" onClick={()=>setOpen(false)}>Let’s make something together <ArrowUpRight size={15}/></a>
      </nav>
      <small>A small guide. Answers from my CV.</small>
    </section>}
    <button ref={trigger} className="companion-launcher" aria-label={open?'Close mini Ashfaque guide':'Open mini Ashfaque guide'} aria-expanded={open} aria-controls="ashfaque-guide" onClick={()=>setOpen(!open)}>
      <span className="floating-hello">Hai! I’m mini Ashfaque <span>✋</span></span>
      <span className="floating-character"><CharacterArt greeting={open}/></span>
    </button>
  </aside>;
}
