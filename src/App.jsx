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
  Clipboard
} from 'lucide-react';

// Data
const SLIDES = [
  {
    title: "Quality Care at Home",
    desc: "Experience professional healthcare in the comfort of your home",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
  },
  {
    title: "Our Premium Services",
    desc: "Comprehensive healthcare solutions tailored to your needs",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
  },
  {
    title: "Trusted Professionals",
    desc: "Certified nurses and midwives dedicated to compassionate care",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
  }
];

const CATEGORIES = [
  { id: 'nursing', name: 'General Nursing', icon: <Heart size={24} />, img: 'https://images.unsplash.com/photo-1584515153299-8d8213797371?w=400' },
  { id: 'maternity', name: 'Maternity & Child', icon: <Activity size={24} />, img: 'https://images.unsplash.com/photo-1502741126161-b84865e60275?w=400' },
  { id: 'physio', name: 'Physiotherapy', icon: <Stethoscope size={24} />, img: 'https://images.unsplash.com/photo-1576091160550-2173dad99978?w=400' },
  { id: 'labs', name: 'Laboratory Services', icon: <Clipboard size={24} />, img: 'https://images.unsplash.com/photo-1579152433910-53ed7170881b?w=400' }
];

const PROFESSIONALS = [
  {
    id: 1,
    name: "Sr. Mary Namubiru",
    title: "Senior Nurse Specialist",
    rating: 4.9,
    reviews: 124,
    desc: "Dedicated senior nurse with over 15 years experience in critical home care and geriatric nursing.",
    img: "https://images.unsplash.com/photo-1559839734-2b71f1e59816?w=600",
    phone: "+256700111222",
    whatsapp: "256700111222"
  },
  {
    id: 2,
    name: "Midwife Florence",
    title: "Maternal Care Expert",
    rating: 4.8,
    reviews: 89,
    desc: "Expert midwife specializing in postnatal care, newborn wellness, and lactation consulting.",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600",
    phone: "+256700333444",
    whatsapp: "256700333444"
  },
  {
    id: 3,
    name: "Dr. John Okello",
    title: "Home Physiotherapist",
    rating: 5.0,
    reviews: 56,
    desc: "Registered physiotherapist focusing on stroke recovery, sports injuries, and mobility restoration.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
    phone: "+256700555666",
    whatsapp: "256700555666"
  }
];

// Components
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {SLIDES.map((slide, idx) => (
        <motion.div 
          key={idx}
          className={`slide ${idx === current ? 'active' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          <div className="slide-content">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: idx === current ? 0 : 20, opacity: idx === current ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              {slide.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: idx === current ? 0 : 20, opacity: idx === current ? 0.9 : 0 }}
              transition={{ delay: 0.4 }}
            >
              {slide.desc}
            </motion.p>
          </div>
        </motion.div>
      ))}
      <div className="slide-indicators">
        {SLIDES.map((_, idx) => (
          <span 
            key={idx} 
            className={`indicator ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, professional }) => {
  if (!isOpen || !professional) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <motion.div 
        className="modal-content"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="modal-header">
          <img src={professional.img} alt={professional.name} className="modal-image" />
          <div className="modal-close" onClick={onClose}>
            <X size={20} />
          </div>
        </div>
        <div className="modal-body">
          <h2 className="modal-name">{professional.name}</h2>
          <p className="modal-profession">{professional.title}</p>
          
          <div className="cv-section">
            <div className="cv-title">About Professional</div>
            <div className="cv-value">{professional.desc}</div>
          </div>

          <div className="cv-section">
            <div className="cv-title">Performance Metrics</div>
            <div className="cv-item">
              <div className="cv-label">Rating</div>
              <div className="cv-value">⭐ {professional.rating} / 5.0</div>
            </div>
            <div className="cv-item">
              <div className="cv-label">Total Appointments</div>
              <div className="cv-value">{professional.reviews}+ Served</div>
            </div>
          </div>

          <div className="contact-section">
            <a href={`https://wa.me/${professional.whatsapp}`} className="contact-btn whatsapp-btn">
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a href={`tel:${professional.phone}`} className="contact-btn call-btn">
              <Phone size={18} /> Book Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [search, setSearch] = useState('');
  const [selectedProf, setSelectedProf] = useState(null);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-top">
          <div className="logo">K'<span>Care</span></div>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search nurses, midwives, services..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="search-icon" size={18} />
        </div>
      </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <HeroSlider />
              
              <h2 className="section-title">Common Services</h2>
              <div className="categories-grid">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id} 
                    className="category-card" 
                    style={{ backgroundImage: `url(${cat.img})` }}
                  >
                    <div className="category-name">
                      {cat.name}
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="section-title">Top Rated Professionals</h2>
              <div className="professionals-list">
                {PROFESSIONALS.map(prof => (
                  <div 
                    key={prof.id} 
                    className="professional-card"
                    onClick={() => setSelectedProf(prof)}
                  >
                    <div className="prof-image-container">
                      <img src={prof.img} alt={prof.name} className="prof-image" />
                      <div className="prof-overlay">
                        <h3 className="prof-name">{prof.name}</h3>
                        <p className="prof-profession">{prof.title}</p>
                        <button className="more-btn">
                          View Details <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="page active"
              style={{ padding: '20px' }}
            >
              <h2 className="section-title">All Services</h2>
              {/* Specialized services list could go here */}
              <div className="cv-section">
                <p>Full suite of home-based healthcare services currently being expanded...</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'nurses' && (
            <motion.div
              key="nurses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="page active"
              style={{ padding: '0 16px' }}
            >
              <h2 className="section-title">Expert Staff</h2>
              <div className="professionals-list">
                {PROFESSIONALS.map(prof => (
                  <div 
                    key={prof.id} 
                    className="professional-card"
                    onClick={() => setSelectedProf(prof)}
                  >
                    <div className="prof-image-container">
                      <img src={prof.img} alt={prof.name} className="prof-image" />
                      <div className="prof-overlay">
                        <h3 className="prof-name">{prof.name}</h3>
                        <p className="prof-profession">{prof.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Professional Detail Modal */}
      <AnimatePresence>
        {selectedProf && (
          <Modal 
            isOpen={!!selectedProf} 
            onClose={() => setSelectedProf(null)} 
            professional={selectedProf}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={22} />
          <span>Home</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <Grid size={22} />
          <span>Services</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'nurses' ? 'active' : ''}`}
          onClick={() => setActiveTab('nurses')}
        >
          <Users size={22} />
          <span>Nurses</span>
        </div>
      </nav>
    </div>
  );
};

export default App;
