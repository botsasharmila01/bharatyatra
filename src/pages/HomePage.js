import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { indiaStatesAndCities, popularCities, categoryIcons, categoryLabels } from "../data/indiaData";
import { FaSearch, FaMapMarkerAlt, FaStar, FaChevronRight, FaHotel, FaHospital } from "react-icons/fa";
import PlaceCard from "../components/PlaceCard";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const states = Object.keys(indiaStatesAndCities).sort();
  const cities = selectedState ? indiaStatesAndCities[selectedState] || [] : [];

  useEffect(() => {
    fetchFeatured();
    if (user?.city) fetchNearby(user.city);
    else setLoading(false);
  }, [user]);

  const fetchFeatured = async () => {
    try {
      const { data } = await axios.get("/api/places?featured=true");
      setFeaturedPlaces(data.slice(0, 8));
    } catch (e) {}
  };

  const fetchNearby = async (city) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/places?city=${city}`);
      setNearbyPlaces(data);
    } catch (e) {}
    finally { setLoading(false); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedCity) navigate(`/city/${selectedCity}`);
    else if (selectedState) {
      const firstCity = indiaStatesAndCities[selectedState]?.[0];
      if (firstCity) navigate(`/city/${firstCity}`);
    }
  };

  const handleCityClick = (city) => navigate(`/city/${city}`);

  const categories = [
    { key:"all", label:"All Places", icon:"🗺️" },
    { key:"tourist", label:"Tourist", icon:"🏛️" },
    { key:"hotel", label:"Hotels", icon:"🏨" },
    { key:"hostel", label:"Hostels", icon:"🛏️" },
    { key:"hospital", label:"Hospitals", icon:"🏥" },
    { key:"medical_shop", label:"Medical", icon:"💊" },
    { key:"temple", label:"Temples", icon:"🛕" },
    { key:"park", label:"Parks", icon:"🌳" },
  ];

  const filteredNearby = activeCategory === "all"
    ? nearbyPlaces
    : nearbyPlaces.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <div style={styles.heroTag}>✈️ Explore Incredible India</div>
            <h1 style={styles.heroTitle}>
              Discover <span style={{color:'var(--accent-light)'}}>Every Corner</span><br/>
              of Bharat
            </h1>
            <p style={styles.heroSub}>
              From the Himalayas to the backwaters — find hotels, places, hospitals & more
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={styles.searchBar}>
              <div style={styles.searchGroup}>
                <label style={styles.searchLabel}>STATE</label>
                <select style={styles.searchSelect} value={selectedState}
                  onChange={e => { setSelectedState(e.target.value); setSelectedCity(""); }}>
                  <option value="">Select State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={styles.searchDivider}></div>
              <div style={styles.searchGroup}>
                <label style={styles.searchLabel}>CITY</label>
                <select style={styles.searchSelect} value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  disabled={!selectedState}>
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button type="submit" style={styles.searchBtn}>
                <FaSearch style={{marginRight:8}}/>Explore
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Nearby Places (based on user's city) */}
      {user?.city && (
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <div style={styles.sectionTag}>📍 Your Location</div>
              <h2 className="section-title">
                Nearby in <span style={{color:'var(--accent)'}}>{user.city}</span>
              </h2>
              <div className="divider"></div>
            </div>
            <button className="btn-outline" onClick={() => navigate(`/city/${user.city}`)}>
              View All <FaChevronRight style={{marginLeft:6, fontSize:'0.8rem'}}/>
            </button>
          </div>

          {/* Category filter */}
          <div style={styles.catFilter}>
            {categories.map(c => (
              <button key={c.key}
                onClick={() => setActiveCategory(c.key)}
                style={{
                  ...styles.catBtn,
                  background: activeCategory === c.key ? 'var(--primary)' : '#fff',
                  color: activeCategory === c.key ? '#fff' : 'var(--text-mid)',
                  borderColor: activeCategory === c.key ? 'var(--primary)' : 'var(--border)',
                }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-container"><div className="spinner"></div><p>Finding places...</p></div>
          ) : filteredNearby.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{fontSize:'3rem'}}>🔍</div>
              <p>No places found in this category for {user.city}</p>
              <button className="btn-primary" onClick={() => setActiveCategory("all")}>Show All</button>
            </div>
          ) : (
            <div style={styles.placesGrid}>
              {filteredNearby.slice(0, 6).map(p => (
                <PlaceCard key={p._id} place={p} onClick={() => navigate(`/place/${p._id}`)}/>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Popular Cities */}
      <section style={{...styles.section, background:'var(--bg-secondary)'}}>
        <div style={styles.sectionHeader}>
          <div>
            <div style={styles.sectionTag}>🌟 Top Destinations</div>
            <h2 className="section-title">Popular Cities</h2>
            <div className="divider"></div>
          </div>
        </div>
        <div style={styles.citiesGrid}>
          {popularCities.map(city => (
            <div key={city.name} style={styles.cityCard} onClick={() => handleCityClick(city.name)}>
              <div style={styles.cityEmoji}>{city.emoji}</div>
              <h3 style={styles.cityName}>{city.name}</h3>
              <p style={styles.cityState}>{city.state}</p>
              <p style={styles.cityHighlight}>{city.highlight}</p>
              <div style={styles.cityArrow}>Explore →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Places */}
      {featuredPlaces.length > 0 && (
        <section style={styles.section}>
          <div>
            <div style={styles.sectionTag}>⭐ Editor's Picks</div>
            <h2 className="section-title">Featured Destinations</h2>
            <div className="divider"></div>
          </div>
          <div style={styles.placesGrid}>
            {featuredPlaces.map(p => (
              <PlaceCard key={p._id} place={p} onClick={() => navigate(`/place/${p._id}`)}/>
            ))}
          </div>
        </section>
      )}

      {/* Info Cards */}
      <section style={{...styles.section, background:'var(--primary-dark)'}}>
        <div style={styles.infoCards}>
          {[
            { icon:"🏨", title:"Hotels & Hostels", desc:"Find and pre-book accommodation across 100+ cities" },
            { icon:"🏥", title:"Hospitals & Medical", desc:"Locate nearby hospitals, clinics, and pharmacies instantly" },
            { icon:"🗺️", title:"Live Maps", desc:"Navigate with interactive maps and real-time tracking" },
            { icon:"⭐", title:"Ratings & Reviews", desc:"Authentic reviews from real travelers across India" },
          ].map(item => (
            <div key={item.title} style={styles.infoCard}>
              <div style={{fontSize:'2rem', marginBottom:12}}>{item.icon}</div>
              <h3 style={{color:'#fff', fontFamily:"'Playfair Display', serif", marginBottom:8}}>{item.title}</h3>
              <p style={{color:'rgba(255,255,255,0.65)', fontSize:'0.9rem', lineHeight:1.6}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    height: 540,
    backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600')`,
    backgroundSize: 'cover', backgroundPosition: 'center',
    position: 'relative',
  },
  heroOverlay: {
    position:'absolute', inset:0,
    background:'linear-gradient(to bottom, rgba(15,37,64,0.8) 0%, rgba(15,37,64,0.6) 100%)',
    display:'flex', alignItems:'center', justifyContent:'center',
  },
  heroContent: { textAlign:'center', color:'#fff', padding:'0 24px', maxWidth:800, width:'100%' },
  heroTag: {
    display:'inline-block', padding:'6px 18px', background:'rgba(200,150,60,0.3)',
    border:'1px solid var(--accent)', borderRadius:20, fontSize:'0.85rem',
    color:'var(--accent-light)', marginBottom:20, letterSpacing:'1px',
  },
  heroTitle: {
    fontFamily:"'Playfair Display', serif",
    fontSize:'3.2rem', fontWeight:700, color:'#fff', marginBottom:16, lineHeight:1.2,
  },
  heroSub: { fontSize:'1.1rem', color:'rgba(255,255,255,0.8)', marginBottom:36 },
  searchBar: {
    display:'flex', alignItems:'center',
    background:'#fff', borderRadius:12, padding:'8px 8px 8px 20px',
    boxShadow:'0 8px 40px rgba(0,0,0,0.25)', maxWidth:700, margin:'0 auto',
    flexWrap:'wrap', gap:8,
  },
  searchGroup: { display:'flex', flexDirection:'column', flex:1, minWidth:150 },
  searchLabel: { fontSize:'0.7rem', fontWeight:700, color:'var(--text-light)', letterSpacing:'1px', marginBottom:2 },
  searchSelect: {
    border:'none', outline:'none', fontSize:'0.95rem', color:'var(--text-dark)',
    background:'transparent', cursor:'pointer', padding:'4px 0',
  },
  searchDivider: { width:1, height:40, background:'var(--border)', margin:'0 8px' },
  searchBtn: {
    background:'var(--primary)', color:'#fff', border:'none', padding:'14px 24px',
    borderRadius:8, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center',
    fontSize:'0.95rem', fontFamily:"'Lato', sans-serif", whiteSpace:'nowrap',
  },
  section: { padding:'60px 60px' },
  sectionHeader: { display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32 },
  sectionTag: {
    display:'inline-block', fontSize:'0.8rem', fontWeight:700, color:'var(--accent)',
    textTransform:'uppercase', letterSpacing:'1px', marginBottom:8,
  },
  catFilter: { display:'flex', gap:8, flexWrap:'wrap', marginBottom:28 },
  catBtn: {
    padding:'8px 16px', borderRadius:20, border:'1.5px solid', cursor:'pointer',
    fontSize:'0.85rem', fontWeight:600, transition:'all 0.2s', fontFamily:"'Lato', sans-serif",
  },
  placesGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24,
  },
  citiesGrid: {
    display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16,
  },
  cityCard: {
    background:'#fff', borderRadius:12, padding:'24px 20px', cursor:'pointer',
    border:'1px solid var(--border)', transition:'all 0.3s', textAlign:'center',
    boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
  },
  cityEmoji: { fontSize:'2.5rem', marginBottom:10 },
  cityName: { fontFamily:"'Playfair Display', serif", fontSize:'1.2rem', color:'var(--primary-dark)', marginBottom:4 },
  cityState: { fontSize:'0.8rem', color:'var(--text-light)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' },
  cityHighlight: { fontSize:'0.85rem', color:'var(--text-mid)', marginBottom:12 },
  cityArrow: { fontSize:'0.85rem', color:'var(--accent)', fontWeight:700 },
  emptyState: {
    textAlign:'center', padding:'60px 20px', color:'var(--text-light)',
    display:'flex', flexDirection:'column', alignItems:'center', gap:16,
  },
  infoCards: {
    display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:24,
  },
  infoCard: {
    padding:'32px 24px', borderRadius:12,
    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
  },
};

export default HomePage;
