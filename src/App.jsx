import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaClock, FaTimes, FaBars } from "react-icons/fa";

export default function App(){

/* ---------------- STATE ---------------- */
const [loading,setLoading]=useState(true);
const [form,setForm]=useState({name:"",email:"",message:""});
const [ripples,setRipples]=useState([]);
const [cursor,setCursor]=useState({x:0,y:0});
const [scrolled,setScrolled]=useState(false);
const [lightbox,setLightbox]=useState(null);
const [menuOpen,setMenuOpen]=useState(false);

/* counters */
const [projects,setProjects]=useState(0);
const [clients,setClients]=useState(0);
const [satisfaction,setSatisfaction]=useState(0);

const aboutRef=useRef(null);
const canvasRef=useRef(null);

/* ---------------- SCROLL PARALLAX ---------------- */
const {scrollY}=useScroll();
const heroParallax=useTransform(scrollY,[0,500],[0,-120]);

/* ---------------- DATA ---------------- */
const works=[
 {video:"/Images/work/project1.mp4",site:"https://example.com"},
 {video:"/Images/work/project2.mp4",site:"https://example.com"},
 {video:"/Images/work/project3.mp4",site:"https://example.com"}
];

const scrollingWorks=[...works,...works];

const services=[
 {title:"Business Website",img:"/Images/services/business.jpg"},
 {title:"Company Website",img:"/Images/services/company.jpg"},
 {title:"Education Website",img:"/Images/services/education.jpg"},
 {title:"Import Export Website",img:"/Images/services/importexport.jpg"},
 {title:"Restaurant Website",img:"/Images/services/restaurant.jpg"},
 {title:"Portfolio Website",img:"/Images/services/portfolio.jpg"},
 {title:"Startup Landing Page",img:"/Images/services/startup.jpg"}
];

const reviews=new Array(20).fill(0).map((_,i)=>({
 name:`Client ${i+1}`,
 text:"Pole Digital Solutions built an amazing website that helped our business grow online."
}));

const scrollingReviews=[...reviews,...reviews];

/* ---------------- PRELOADER ---------------- */
useEffect(()=>{
 const t=setTimeout(()=>setLoading(false),1200);
 return ()=>clearTimeout(t);
},[]);

/* ---------------- CURSOR ---------------- */
useEffect(()=>{
 const move=e=>setCursor({x:e.clientX,y:e.clientY});
 window.addEventListener("mousemove",move);
 return ()=>window.removeEventListener("mousemove",move);
},[]);

/* ---------------- RIPPLE ---------------- */
useEffect(()=>{
 const click=e=>{
  const ripple={x:e.clientX,y:e.clientY,id:Date.now()};
  setRipples(prev=>[...prev,ripple]);
  setTimeout(()=>{
   setRipples(prev=>prev.filter(r=>r.id!==ripple.id));
  },600);
 };
 window.addEventListener("click",click);
 return ()=>window.removeEventListener("click",click);
},[]);

/* ---------------- NAVBAR SCROLL ---------------- */
useEffect(()=>{
 const s=()=>setScrolled(window.scrollY>50);
 window.addEventListener("scroll",s);
 return ()=>window.removeEventListener("scroll",s);
},[]);

/* ---------------- LOOPING COUNTERS ---------------- */
useEffect(()=>{
 const runCounter=()=>{
  let p=0,c=0,s=0;
  const interval=setInterval(()=>{
   if(p<50)p++;
   if(c<20)c++;
   if(s<98)s++;
   setProjects(p);
   setClients(c);
   setSatisfaction(s);
   if(p===50 && c===20 && s===98) clearInterval(interval);
  },40);
 };

 const observer=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){
   setProjects(0);
   setClients(0);
   setSatisfaction(0);
   runCounter();
  }
 },{threshold:0.6});

 if(aboutRef.current) observer.observe(aboutRef.current);
 return ()=>observer.disconnect();
},[]);

/* ---------------- FORM ---------------- */
const handleChange=e=>{
 setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit=e=>{
 e.preventDefault();
 alert("Form captured. Connect EmailJS to enable email delivery.");
 setForm({name:"",email:"",message:""});
};

/* ---------------- NAV ---------------- */
const scrollTo=id=>{
 const el=document.getElementById(id);
 if(el) el.scrollIntoView({behavior:"smooth"});
 setMenuOpen(false);
};

/* ---------------- MAGNETIC BUTTON ---------------- */
const magnetic=e=>{
 const rect=e.currentTarget.getBoundingClientRect();
 const x=e.clientX-rect.left-rect.width/2;
 const y=e.clientY-rect.top-rect.height/2;
 e.currentTarget.style.transform=`translate(${x*0.2}px,${y*0.2}px)`;
};

const resetMagnetic=e=>{
 e.currentTarget.style.transform="translate(0,0)";
};

/* ---------------- COSMIC GALAXY BACKGROUND ---------------- */
useEffect(()=>{
 const canvas=canvasRef.current;
 if(!canvas) return;
 const ctx=canvas.getContext("2d");

 let animationId;

 const resize=()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
 };
 resize();
 window.addEventListener("resize",resize);

 /* mouse + scroll */
 let mouse={x:window.innerWidth/2,y:window.innerHeight/2};
 const move=e=>{mouse.x=e.clientX;mouse.y=e.clientY};
 window.addEventListener("mousemove",move);

 /* star field */
 const stars=new Array(120).fill(0).map(()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  vx:(Math.random()-0.5)*0.1,
  vy:(Math.random()-0.5)*0.1,
  r:Math.random()*1.4+0.2
 }));

 let shooting=[];

 function spawnShooting(){
  if(Math.random()<0.002){
   shooting.push({x:Math.random()*canvas.width,y:-20,vx:6,vy:6,life:0});
  }
 }

 function drawAurora(){
  const g=ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  g.addColorStop(0,"rgba(0,255,255,0.05)");
  g.addColorStop(0.5,"rgba(0,100,255,0.05)");
  g.addColorStop(1,"rgba(0,255,180,0.05)");
  ctx.fillStyle=g;
  ctx.fillRect(0,0,canvas.width,canvas.height);
 }

 function drawStars(){
  stars.forEach(s=>{

   /* mouse gravity */
   const dx=mouse.x-s.x;
   const dy=mouse.y-s.y;
   const dist=Math.sqrt(dx*dx+dy*dy);
   if(dist<120){
    s.x-=dx*0.0008;
    s.y-=dy*0.0008;
   }

   s.x+=s.vx;
   s.y+=s.vy;

   if(s.x<0||s.x>canvas.width) s.vx*=-1;
   if(s.y<0||s.y>canvas.height) s.vy*=-1;

   ctx.beginPath();
   ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
   ctx.fillStyle="rgba(220,230,255,0.9)";
   ctx.fill();
  });
 }

 function drawConstellations(){
  for(let i=0;i<stars.length;i++){
   for(let j=i+1;j<stars.length;j++){
    const dx=stars[i].x-stars[j].x;
    const dy=stars[i].y-stars[j].y;
    const dist=Math.sqrt(dx*dx+dy*dy);

    if(dist<120){
     ctx.beginPath();
     ctx.moveTo(stars[i].x,stars[i].y);
     ctx.lineTo(stars[j].x,stars[j].y);
     ctx.strokeStyle=`rgba(180,200,255,${1-dist/120})`;
     ctx.lineWidth=0.4;
     ctx.stroke();
    }
   }
  }
 }

 function drawShooting(){
  shooting.forEach((s,i)=>{
   ctx.beginPath();
   ctx.moveTo(s.x,s.y);
   ctx.lineTo(s.x-80,s.y-80);
   ctx.strokeStyle="rgba(255,255,255,0.8)";
   ctx.lineWidth=1;
   ctx.stroke();

   s.x+=s.vx;
   s.y+=s.vy;
   s.life++;

   if(s.life>60) shooting.splice(i,1);
  });
 }

 function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawAurora();
  drawStars();
  drawConstellations();

  spawnShooting();
  drawShooting();

  animationId=requestAnimationFrame(draw);
 }

 draw();

 return()=>{
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize",resize);
  window.removeEventListener("mousemove",move);
 };

},[]);

return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6}} className="bg-[#020617] text-white overflow-x-hidden font-sans relative">

{/* PARTICLE BACKGROUND */}
<canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-70 pointer-events-none"/>

{/* GRADIENT BACKGROUND */}
<div className="fixed inset-0 -z-10 opacity-50" style={{background:"radial-gradient(circle at 20% 30%,#1e3a8a,transparent 40%), radial-gradient(circle at 80% 20%,#0891b2,transparent 40%), radial-gradient(circle at 60% 80%,#2563eb,transparent 40%)"}}/>

{/* CURSOR GLOW */}
<div className="pointer-events-none fixed w-40 h-40 rounded-full blur-3xl bg-cyan-500/20 -translate-x-1/2 -translate-y-1/2 z-30" style={{left:cursor.x,top:cursor.y}}/>

{/* RIPPLE */}
{ripples.map(r=> (
 <div key={r.id} className="pointer-events-none fixed w-6 h-6 rounded-full border-2 border-cyan-400 animate-ping" style={{left:r.x-12,top:r.y-12}}/>
))}

<Helmet>
<title>Pole Digital Solutions | Premium Website Design</title>
<meta name="description" content="Premium websites for businesses startups and brands." />
</Helmet>

{/* NAVBAR */}
<nav className={`fixed w-full z-50 transition-all ${scrolled?"bg-black/60 backdrop-blur-lg py-2":"py-5"}`}>
<div className="max-w-7xl mx-auto flex justify-between items-center px-6">

<div className="flex items-center gap-2 font-bold text-lg">
<img src="/Images/services/logo.png" className="w-8 h-8"/>
Pole Digital Solutions
</div>

<div className="hidden md:flex gap-8">
<button onClick={()=>scrollTo("about")}>About</button>
<button onClick={()=>scrollTo("services")}>Services</button>
<button onClick={()=>scrollTo("work")}>Projects</button>
<button onClick={()=>scrollTo("reviews")}>Reviews</button>
<button onClick={()=>scrollTo("contact")}>Contact</button>
</div>

<button className="md:hidden" onClick={()=>setMenuOpen(!menuOpen)}>
<FaBars size={22}/>
</button>

</div>

{menuOpen && (
<div className="md:hidden bg-black/90 backdrop-blur-xl p-6 flex flex-col gap-6">
<button onClick={()=>scrollTo("about")}>About</button>
<button onClick={()=>scrollTo("services")}>Services</button>
<button onClick={()=>scrollTo("work")}>Projects</button>
<button onClick={()=>scrollTo("reviews")}>Reviews</button>
<button onClick={()=>scrollTo("contact")}>Contact</button>
</div>
)}
</nav>

{/* HERO */}
<section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
<motion.div style={{y:heroParallax}}>

<h1 className="text-5xl md:text-6xl font-bold leading-tight">
Premium Websites
<span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent pb-2">
For Growing Businesses
</span>
</h1>

<p className="mt-6 text-gray-300">Modern high converting websites for startups and brands.</p>

<div className="flex gap-6 justify-center mt-10 flex-wrap">
<button onClick={()=>scrollTo("work")} onMouseMove={magnetic} onMouseLeave={resetMagnetic} className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold">View Work</button>

<button onClick={()=>scrollTo("contact")} onMouseMove={magnetic} onMouseLeave={resetMagnetic} className="px-8 py-3 rounded-lg border border-white/30 hover:bg-white/10">Start Project</button>
</div>

</motion.div>
</section>

{/* ABOUT */}
<section id="about" ref={aboutRef} className="py-32 max-w-6xl mx-auto px-6 text-center">
<h2 className="text-4xl font-bold mb-10">About Pole Digital Solutions</h2>

<p className="text-gray-300 max-w-3xl mx-auto mb-12">We build modern websites that help businesses grow online and convert visitors into customers.</p>

<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
<div className="bg-white/10 p-8 rounded-xl"><h3 className="text-4xl font-bold">{projects}+</h3><p>Projects</p></div>
<div className="bg-white/10 p-8 rounded-xl"><h3 className="text-4xl font-bold">{clients}+</h3><p>Clients</p></div>
<div className="bg-white/10 p-8 rounded-xl"><h3 className="text-4xl font-bold">{satisfaction}%</h3><p>Satisfaction</p></div>
</div>
</section>

{/* SERVICES */}
<section id="services" className="py-32 max-w-7xl mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-16">Types of Websites We Build</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
{services.map((s,i)=>(
<motion.div key={i} whileHover={{y:-10,scale:1.05}} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
<img src={s.img} className="h-40 w-full object-cover"/>
<div className="p-6 text-center"><h3 className="font-semibold">{s.title}</h3></div>
</motion.div>
))}
</div>
</section>

{/* PROJECTS AUTOSCROLL */}
<section id="work" className="py-32 overflow-hidden">
<h2 className="text-4xl font-bold text-center mb-16">Projects</h2>

<motion.div className="flex gap-10 px-6" animate={{x:[0,-2000]}} transition={{duration:40,repeat:Infinity,ease:"linear"}}>

{scrollingWorks.map((item,i)=> (
<div key={i} onClick={()=>setLightbox(item.video)} className="min-w-[320px] md:min-w-[420px] cursor-pointer">
<div className="bg-black rounded-2xl border border-gray-700 p-3">
<div className="bg-gray-900 rounded-lg overflow-hidden">
<video src={item.video} autoPlay muted loop className="w-full h-[200px] md:h-[240px] object-cover"/>
</div>
</div>
</div>
))}

</motion.div>
</section>

{/* REVIEWS AUTOSCROLL */}
<section id="reviews" className="py-32 overflow-hidden">
<h2 className="text-4xl font-bold text-center mb-16">Client Reviews</h2>

<motion.div className="flex gap-8 px-6" animate={{x:[0,-2500]}} transition={{duration:50,repeat:Infinity,ease:"linear"}}>

{scrollingReviews.map((r,i)=> (
<div key={i} className="min-w-[260px] md:min-w-[320px] bg-white/10 p-6 rounded-xl">
<div className="flex text-yellow-400 mb-2">★★★★★</div>
<p className="text-gray-300">{r.text}</p>
<p className="mt-3 font-semibold">{r.name}</p>
</div>
))}

</motion.div>
</section>

{/* CONTACT */}
<section id="contact" className="py-32 max-w-6xl mx-auto px-6">
<h2 className="text-4xl font-bold text-center mb-16">Contact Us</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

<form onSubmit={handleSubmit} className="flex flex-col gap-4">
<input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-3 rounded bg-white/10"/>
<input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 rounded bg-white/10"/>
<textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="p-3 rounded bg-white/10"/>
<button className="bg-blue-500 py-3 rounded">Send Message</button>
</form>

<div className="space-y-6">
<p><FaEnvelope className="inline mr-2"/> poledigitalsolutions@gmail.com</p>
<p><FaPhone className="inline mr-2"/> +91 9391084425</p>
<p><FaClock className="inline mr-2"/> Mon - Sat 10AM - 7PM</p>
</div>

</div>
</section>

{/* FOOTER */}
<footer className="bg-black/70 py-16 px-6">

<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">

{/* Opening Hours */}
<div className="flex flex-col items-center md:items-start gap-2">
<h3 className="font-semibold text-lg mb-2">Opening Hours</h3>
<p className="text-gray-300">Mon - Sat : 10AM - 7PM</p>
<p className="text-gray-300">Sunday : Closed</p>
</div>

{/* Quick Links perfectly aligned */}
<div className="flex flex-col items-center gap-3">
<h3 className="font-semibold text-lg">Quick Links</h3>
<button onClick={()=>scrollTo("about")} className="text-gray-300 hover:text-white">About</button>
<button onClick={()=>scrollTo("services")} className="text-gray-300 hover:text-white">Services</button>
<button onClick={()=>scrollTo("work")} className="text-gray-300 hover:text-white">Projects</button>
<button onClick={()=>scrollTo("reviews")} className="text-gray-300 hover:text-white">Reviews</button>
<button onClick={()=>scrollTo("contact")} className="text-gray-300 hover:text-white">Contact</button>
</div>

{/* Social Links */}
<div className="flex flex-col items-center md:items-end gap-4">
<h3 className="font-semibold text-lg">Social Links</h3>
<div className="flex gap-6 text-xl">
<a href="https://wa.me/919391084425" target="_blank" rel="noreferrer"><FaWhatsapp/></a>
<a href="mailto:poledigitalsolutions@gmail.com"><FaEnvelope/></a>
<a href="https://www.instagram.com/pole_digital_solutions/" target="_blank" rel="noreferrer"><FaInstagram/></a>
<a href="https://www.linkedin.com/company/pole-digital-solutions/" target="_blank" rel="noreferrer"><FaLinkedin/></a>
</div>
</div>

</div>

<div className="text-center text-gray-400 mt-12 border-t border-white/10 pt-6">
Pole Digital Solutions — Premium Website Design Agency
</div>

</footer>

{/* LIGHTBOX */}
{lightbox && (
<div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
<button onClick={()=>setLightbox(null)} className="absolute top-10 right-10 text-3xl"><FaTimes/></button>
<video src={lightbox} controls autoPlay className="max-h-[80vh] rounded-xl"/>
</div>
)}

</motion.div>
);
}
