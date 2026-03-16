import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home, 
  Grid, 
  Users, 
  MessageCircle, 
  X, 
  Phone, 
  ChevronRight,
  Heart,
  Stethoscope,
  Activity,
  Clipboard,
  ShieldCheck,
  Award,
  Star,
  MapPin
} from 'lucide-react';

// Configuration
const CONTACT_NUMBER = "+256702370441";

// Pin Images from User
const PIN_IMAGES = [
  "https://i.pinimg.com/736x/54/04/e3/5404e3a64276c7ceec38f2e70b989250.jpg",
  "https://i.pinimg.com/736x/5e/f6/47/5ef6471fb3a686e2add5653e1be36e91.jpg",
  "https://i.pinimg.com/1200x/fe/78/4b/fe784b99b37e1f12571695560bbe5472.jpg",
  "https://i.pinimg.com/1200x/2c/35/7e/2c357e9831a6fae514f9a5c4068544d4.jpg"
];

// Data Structs
const SLIDES = [
  {
    title: "Premium Home Healthcare",
    desc: "Professional medical care in your sanctuary.",
    img: PIN_IMAGES[0]
  },
  {
    title: "Maternal Excellence",
    desc: "Compassionate support for new mothers.",
    img: PIN_IMAGES[1]
  },
  {
    title: "Expert Recovery",
    desc: "Advanced physiotherapy at your home.",
    img: PIN_IMAGES[2]
  }
];

const CATEGORIES = [
  { id: 'bedside', name: 'Bedside Nursing', icon: <Heart size={28} />, img: PIN_IMAGES[3] },
  { id: 'maternity', name: 'Mothers & Newborns', icon: <Activity size={28} />, img: PIN_IMAGES[1] },
  { id: 'physio', name: 'Physiotherapy', icon: <Stethoscope size={28} />, img: PIN_IMAGES[2] },
  { id: 'childcare', name: 'Child Home Care', icon: <Award size={28} />, img: PIN_IMAGES[0] },
  { id: 'lab', name: 'Lab Home Services', icon: <Clipboard size={28} />, img: 'https://images.unsplash.com/photo-1579152433910-53ed7170881b?w=800' }
];

// Generate 30 Professionals
const PROFESSIONALS_RAW = [
  { name: "Sr. Mary Namubiru", cat: "bedside", title: "Lead Clinical Nurse" },
  { name: "Midwife Florence", cat: "maternity", title: "Maternal Consultant" },
  { name: "Dr. John Okello", cat: "physio", title: "Sports Therapist" },
  { name: "Nurse Sarah", cat: "childcare", title: "Pediatric Specialist" },
  { name: "Lab Tech David", cat: "lab", title: "Senior Phlebotomist" },
  { name: "Sr. Alice K.", cat: "bedside", title: "Geriatric Nurse" },
  { name: "Midwife Rose", cat: "maternity", title: "Postnatal Specialist" },
  { name: "Dr. Ben O.", cat: "physio", title: "Rehab Specialist" },
  { name: "Nurse Janet", cat: "childcare", title: "Neonatal Care" },
  { name: "Lab Tech Mark", cat: "lab", title: "Diagnostic Lead" },
  { name: "Sr. Martha L.", cat: "bedside", title: "ICU Specialist" },
  { name: "Midwife Grace", cat: "maternity", title: "Lactation Expert" },
  { name: "Dr. Samuel T.", cat: "physio", title: "Stroke Specialist" },
  { name: "Nurse Betty", cat: "childcare", title: "Behavioral expert" },
  { name: "Lab Tech Isaac", cat: "lab", title: "Field Analyst" },
  { name: "Sr. Catherine", cat: "bedside", title: "Palliative Care" },
  { name: "Midwife Joy", cat: "maternity", title: "Antenatal Coach" },
  { name: "Dr. Peter Z.", cat: "physio", title: "Pediatric Physio" },
  { name: "Nurse Lillian", cat: "childcare", title: "Eldercare Specialist" },
  { name: "Lab Tech Simon", cat: "lab", title: "Testing Expert" },
  { name: "Sr. Prossy", cat: "bedside", title: "Emergency Nurse" },
  { name: "Midwife Edith", cat: "maternity", title: "Motherhood Care" },
  { name: "Dr. Moses", cat: "physio", title: "Chiropractic Expert" },
  { name: "Nurse Ritah", cat: "childcare", title: "Daycare Nurse" },
  { name: "Lab Tech Ezra", cat: "lab", title: "Biotech Expert" },
  { name: "Sr. Hellen", cat: "bedside", title: "Trauma Specialist" },
  { name: "Midwife Sandra", cat: "maternity", title: "Surgical Recovery" },
  { name: "Dr. Paul", cat: "physio", title: "Occupational Physio" },
  { name: "Nurse Doreen", cat: "childcare", title: "Play Therapist" },
  { name: "Lab Tech Ruth", cat: "lab", title: "Analysis Lead" }
];

const PROFESSIONALS = PROFESSIONALS_RAW.map((p, i) => ({
  ...p,
  id: i + 1,
  rating: (4.7 + Math.random() * 0.3).toFixed(1),
  reviews: Math.floor(Math.random() * 200) + 50,
  img: `https://i.pravatar.cc/300?u=${p.name.replace(/\s/g, '')}`,
  cv: `${p.name} is a premier ${p.title} at K'Care, specializing in ${CATEGORIES.find(c => c.id === p.cat)?.name || 'General Care'}. With a commitment to excellence and over ${12 + (i % 8)} years of clinical experience, they provide unparalleled home-based medical support.`
}));

// Components
const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full max-w-[480px] rounded-t-[3rem] p-8 pb-12 text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-8" />
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <MessageCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-primary uppercase italic mb-2">Connect to K'Care</h2>
        <p className="text-gray-500 text-sm mb-10">Professional healthcare is just a tap away.</p>
        
        <div className="space-y-4">
          <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} className="bg-[#25D366] text-white w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:brightness-110 transition-all">
            <MessageCircle size={24} /> WhatsApp Us
          </a>
          <a href={`tel:${CONTACT_NUMBER}`} className="bg-primary text-white w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:brightness-110 transition-all">
            <Phone size={24} /> Call Specialist
          </a>
        </div>
        <p className="mt-10 text-[10px] text-gray-400 font-bold tracking-[0.3em] uppercase">Emergency Response: {CONTACT_NUMBER}</p>
      </motion.div>
    </div>
  );
};

const CVModal = ({ prof, onClose }) => {
  if (!prof) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-[90%] max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-[300px]">
          <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white" onClick={onClose}>
            <X size={24} />
          </button>
          <img src={prof.img} alt={prof.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">{prof.name}</h2>
            <p className="text-secondary font-bold flex items-center gap-2">
              <ShieldCheck size={18} /> {prof.title}
            </p>
          </div>
        </div>
        <div className="p-8">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 bg-gray-50 p-4 rounded-2xl text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Rating</p>
              <p className="text-xl font-black text-primary italic">⭐ {prof.rating}</p>
            </div>
            <div className="flex-1 bg-gray-50 p-4 rounded-2xl text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Experience</p>
              <p className="text-xl font-black text-primary italic">12+ Yrs</p>
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-4">
              <Award size={16} /> Professional Profile
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm font-medium">{prof.cv}</p>
          </div>

          <div className="flex gap-3">
            <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-md">
              <MessageCircle size={20} /> WhatsApp
            </a>
            <a href={`tel:${CONTACT_NUMBER}`} className="flex-1 bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-md">
              <Phone size={20} /> Book
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[240px] w-full overflow-hidden mb-8">
      <AnimatePresence mode='wait'>
        <motion.div 
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center flex items-end"
          style={{ backgroundImage: `url(${SLIDES[current].img})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
          <div className="relative p-6 pb-12 text-white">
            <motion.h2 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-black uppercase italic tracking-tighter">
              {SLIDES[current].title}
            </motion.h2>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm opacity-90 font-medium">
              {SLIDES[current].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-6 flex gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-secondary' : 'w-2 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

// Main App
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [filter, setFilter] = useState(null);
  const [selectedProf, setSelectedProf] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleCategoryClick = (catId) => {
    setFilter(catId);
    setActiveTab('profs');
  };

  const filteredProfs = filter 
    ? PROFESSIONALS.filter(p => p.cat === filter)
    : PROFESSIONALS;

  const topProfs = PROFESSIONALS.slice(0, 8);

  return (
    <div className="max-w-[480px] mx-auto bg-white min-h-screen pb-28 relative shadow-xl">
      {/* Premium Header */}
      <header className="sticky top-0 z-[1000] bg-primary/95 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex flex-col">
          <span className="text-2xl font-black italic tracking-tighter leading-none cursor-pointer" onClick={() => {setActiveTab('home'); setFilter(null);}}>
            K'<span className="text-secondary">Care</span>
          </span>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] opacity-60">Premium Healthcare</span>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroSlider />
              
              <div className="px-6 mb-8">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-xl font-black text-primary uppercase italic tracking-tighter">Our Services</h2>
                  <button onClick={() => setActiveTab('services')} className="text-xs font-black text-secondary uppercase tracking-[0.1em]">Explore All</button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.slice(0, 4).map(cat => (
                    <motion.div 
                      key={cat.id} 
                      whileTap={{ scale: 0.96 }}
                      className="relative h-[160px] rounded-[2rem] overflow-hidden shadow-md group border-2 border-transparent active:border-secondary transition-all"
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-bold text-xs uppercase tracking-wider block">{cat.name}</span>
                        <div className="h-0.5 w-6 bg-secondary mt-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-6 mb-12">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-xl font-black text-primary uppercase italic tracking-tighter">Featured Staff</h2>
                  <button onClick={() => setActiveTab('profs')} className="text-xs font-black text-secondary uppercase tracking-[0.1em]">View 30+</button>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {topProfs.map(prof => (
                    <motion.div 
                      key={prof.id} 
                      whileTap={{ scale: 0.95 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProf(prof)}
                    >
                      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-2 shadow-lg">
                        <img src={prof.img} alt={prof.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black text-white flex items-center gap-1">
                          <Star size={8} fill="white" /> {prof.rating}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                      </div>
                      <h3 className="text-sm font-black text-primary truncate leading-tight uppercase italic">{prof.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{prof.title}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-12">
                <div className="bg-primary/5 p-8 rounded-[3rem] border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck size={100} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-primary uppercase italic tracking-tighter mb-2">Safe & Trusted</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">Every professional at K'Care is fully vetted, licensed, and insured to ensure your absolute safety and peace of mind.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
              <h2 className="text-3xl font-black text-primary uppercase italic tracking-tighter mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Our Expertise</h2>
              <div className="space-y-4">
                {CATEGORIES.map(cat => (
                  <motion.div 
                    key={cat.id} 
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 hover:border-primary/20 transition-all cursor-pointer group"
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6 shadow-sm">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-primary uppercase italic tracking-widest text-xs mb-1">{cat.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                        {PROFESSIONALS.filter(p => p.cat === cat.id).length} Active Providers
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'profs' && (
            <motion.div key="profs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-primary uppercase italic tracking-tighter">
                    {filter ? CATEGORIES.find(c => c.id === filter)?.name : "Our Team"}
                  </h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1">{filteredProfs.length} Certified Experts</p>
                </div>
                {filter && (
                  <button onClick={() => setFilter(null)} className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                {filteredProfs.map(prof => (
                  <motion.div 
                    key={prof.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.96 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedProf(prof)}
                  >
                    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-3 shadow-lg group">
                      <img src={prof.img} alt={prof.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-xl text-[10px] font-black text-white flex items-center gap-1">
                        <Star size={10} fill="white" /> {prof.rating}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                        <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-black text-primary uppercase italic tracking-tight">{prof.name}</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{prof.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 inset-x-0 mx-auto max-w-[480px] bg-white/90 backdrop-blur-2xl border-t border-gray-50 flex justify-between items-center h-20 px-10 pb-2 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-[1100]">
        <button className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'home' ? 'text-primary' : 'text-gray-300'}`} onClick={() => {setActiveTab('home'); setFilter(null);}}>
          <Home size={22} className={activeTab === 'home' ? 'scale-110' : ''} />
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
          {activeTab === 'home' && <motion.div layoutId="navDot" className="w-1 h-1 bg-secondary rounded-full" />}
        </button>
        <button className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'services' ? 'text-primary' : 'text-gray-300'}`} onClick={() => setActiveTab('services')}>
          <Grid size={22} className={activeTab === 'services' ? 'scale-110' : ''} />
          <span className="text-[9px] font-black uppercase tracking-widest">Services</span>
          {activeTab === 'services' && <motion.div layoutId="navDot" className="w-1 h-1 bg-secondary rounded-full" />}
        </button>
        <button className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'profs' ? 'text-primary' : 'text-gray-300'}`} onClick={() => {setActiveTab('profs'); setFilter(null);}}>
          <Users size={22} className={activeTab === 'profs' ? 'scale-110' : ''} />
          <span className="text-[9px] font-black uppercase tracking-widest">Experts</span>
          {activeTab === 'profs' && <motion.div layoutId="navDot" className="w-1 h-1 bg-secondary rounded-full" />}
        </button>
        <button className="flex flex-col items-center gap-1.5 text-secondary relative" onClick={() => setIsChatOpen(true)}>
          <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white -mt-12 shadow-2xl shadow-secondary/50 ring-4 ring-white active:scale-90 transition-transform">
            <MessageCircle size={28} fill="currentColor" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Chat</span>
        </button>
      </nav>

      {/* Modals */}
      <AnimatePresence>
        {selectedProf && <CVModal prof={selectedProf} onClose={() => setSelectedProf(null)} />}
        {isChatOpen && <ContactModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
