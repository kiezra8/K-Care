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
  Award
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
    desc: "Experience professional medical care in the comfort of your sanctuary.",
    img: PIN_IMAGES[0]
  },
  {
    title: "Maternal Excellence",
    desc: "Compassionate support for mothers and newborns from day one.",
    img: PIN_IMAGES[1]
  },
  {
    title: "Expert Recovery",
    desc: "Advanced physiotherapy to get you back to your best life.",
    img: PIN_IMAGES[2]
  }
];

const CATEGORIES = [
  { id: 'bedside', name: 'Bedside Nursing', icon: <Heart />, img: PIN_IMAGES[3] },
  { id: 'maternity', name: 'Maternity & Post Op Mothers', icon: <Activity />, img: PIN_IMAGES[1] },
  { id: 'physio', name: 'Physiotherapy', icon: <Stethoscope />, img: PIN_IMAGES[2] },
  { id: 'childcare', name: 'Child Home Care', icon: <Award />, img: PIN_IMAGES[0] },
  { id: 'lab', name: 'Lab Home Services', icon: <Clipboard />, img: 'https://images.unsplash.com/photo-1579152433910-53ed7170881b?w=800' }
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
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  reviews: Math.floor(Math.random() * 200) + 20,
  img: `https://i.pravatar.cc/300?u=${p.name}`,
  cv: `${p.name} is a highly qualified ${p.title} with extensive training in ${CATEGORIES.find(c => c.id === p.cat).name}. Over ${10 + i % 5} years of dedicated service in various healthcare facilities across East Africa.`
}));

// Components
const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal" style={{ display: 'block' }}>
      <motion.div 
        className="modal-content"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        style={{ minHeight: 'auto', borderTopLeftRadius: '32px', borderTopRightRadius: '32px' }}
      >
        <div className="p-8 text-center">
          <div className="modal-close" onClick={onClose} style={{ top: '20px', left: 'auto', right: '20px' }}>
            <X size={20} />
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <MessageCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connect with K'Care</h2>
          <p className="text-gray-500 mb-8">Our support team is available 24/7 for your emergencies.</p>
          
          <div className="space-y-4">
            <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} className="contact-btn whatsapp-btn w-full py-4 text-lg">
              <MessageCircle size={24} /> WhatsApp Support
            </a>
            <a href={`tel:${CONTACT_NUMBER}`} className="contact-btn call-btn w-full py-4 text-lg">
              <Phone size={24} /> Call Direct
            </a>
          </div>
          <p className="mt-6 text-xs text-gray-400 font-medium tracking-widest uppercase">Emergency Response: {CONTACT_NUMBER}</p>
        </div>
      </motion.div>
    </div>
  );
};

const CVModal = ({ isOpen, onClose, prof }) => {
  if (!isOpen || !prof) return null;
  return (
    <div className="modal" style={{ display: 'block' }}>
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="modal-header">
          <img src={prof.img} alt={prof.name} className="modal-image" />
          <div className="modal-close" onClick={onClose}>
            <X size={20} />
          </div>
        </div>
        <div className="modal-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="modal-name">{prof.name}</h2>
              <p className="modal-profession text-secondary flex items-center gap-2">
                <ShieldCheck size={16} /> {prof.title}
              </p>
            </div>
            <div className="bg-primary/5 px-3 py-1 rounded-full text-primary font-bold text-sm">
              ⭐ {prof.rating}
            </div>
          </div>
          
          <div className="cv-section">
            <h3 className="flex items-center gap-2 text-primary font-bold mb-3">
              <Award size={18} /> Professional Summary
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">{prof.cv}</p>
          </div>

          <div className="cv-section">
            <h3 className="text-primary font-bold mb-3">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-md text-xs font-medium">Bachelors of Nursing</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-xs font-medium">Critical Care Certified</span>
              <span className="bg-gray-100 px-3 py-1 rounded-md text-xs font-medium">AHA BLS/ACLS</span>
            </div>
          </div>

          <div className="contact-section">
            <a href={`https://wa.me/${CONTACT_NUMBER.replace('+', '')}`} className="contact-btn whatsapp-btn">
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a href={`tel:${CONTACT_NUMBER}`} className="contact-btn call-btn">
              <Phone size={18} /> Book Now
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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider" style={{ height: '240px' }}>
      {SLIDES.map((slide, idx) => (
        <motion.div 
          key={idx}
          className={`slide ${idx === current ? 'active' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === current ? 1 : 0 }}
          style={{ backgroundImage: `url(${slide.img})`, margin: 0, borderRadius: 0 }}
        >
          <div className="slide-content">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: idx === current ? 0 : 20, opacity: idx === current ? 1 : 0 }}
            >
              {slide.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: idx === current ? 0 : 20, opacity: idx === current ? 0.9 : 0 }}
            >
              {slide.desc}
            </motion.p>
          </div>
        </motion.div>
      ))}
      <div className="slide-indicators">
        {SLIDES.map((_, idx) => (
          <span key={idx} className={`indicator ${idx === current ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

// Main Component
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [filter, setFilter] = useState(null);
  const [selectedProf, setSelectedProf] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCategoryClick = (catId) => {
    setFilter(catId);
    setActiveTab('profs');
  };

  const filteredProfs = filter 
    ? PROFESSIONALS.filter(p => p.cat === filter)
    : PROFESSIONALS;

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="header sticky top-0 z-[100]">
        <div className="header-top">
          <div className="logo cursor-pointer" onClick={() => {setActiveTab('home'); setFilter(null);}}>
            K'<span>Care</span>
          </div>
          <div className="flex gap-4 text-white opacity-80">
            <Search size={20} />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroSlider />
              
              <div className="section-title">Healthcare Categories</div>
              <div className="categories-grid">
                {CATEGORIES.map(cat => (
                  <motion.div 
                    key={cat.id} 
                    whileTap={{ scale: 0.95 }}
                    className="category-card" 
                    style={{ backgroundImage: `url(${cat.img})` }}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <div className="category-name">{cat.name}</div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 mx-4 mt-8 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Certified & Verified</h3>
                    <p className="text-xs text-gray-500">Every provider undergoes strict background checks.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="section-title">All Services</div>
              <div className="px-4 space-y-4">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary transition-all cursor-pointer"
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{cat.name}</h3>
                      <p className="text-xs text-gray-500">{PROFESSIONALS.filter(p => p.cat === cat.id).length} Specialists available</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'profs' && (
            <motion.div key="profs" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <div className="flex items-center justify-between px-4 mt-6">
                <div className="section-title m-0">
                  {filter ? CATEGORIES.find(c => c.id === filter).name : "All Professionals"}
                </div>
                {filter && (
                  <button onClick={() => setFilter(null)} className="text-xs font-bold text-secondary uppercase tracking-wider">
                    Show All
                  </button>
                )}
              </div>

              <div className="professionals-list mt-4">
                {filteredProfs.map(prof => (
                  <div key={prof.id} className="professional-card" onClick={() => setSelectedProf(prof)}>
                    <div className="prof-image-container">
                      <img src={prof.img} alt={prof.name} className="prof-image" />
                      <div className="prof-overlay">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="prof-name">{prof.name}</h3>
                            <p className="prof-profession">{prof.title}</p>
                          </div>
                          <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold">
                            ⭐ {prof.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {selectedProf && <CVModal isOpen={!!selectedProf} onClose={() => setSelectedProf(null)} prof={selectedProf} />}
        {isChatOpen && <ContactModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => {setActiveTab('home'); setFilter(null);}}>
          <Home size={22} />
          <span>Home</span>
        </div>
        <div className={`nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
          <Grid size={22} />
          <span>Services</span>
        </div>
        <div className={`nav-item ${activeTab === 'profs' ? 'active' : ''}`} onClick={() => {setActiveTab('profs'); setFilter(null);}}>
          <Users size={22} />
          <span>Professionals</span>
        </div>
        <div className="nav-item" onClick={() => setIsChatOpen(true)}>
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
            <MessageCircle size={22} />
          </div>
          <span>Chat</span>
        </div>
      </nav>
    </div>
  );
};

export default App;
