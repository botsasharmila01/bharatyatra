import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { categoryIcons, categoryLabels } from "../data/indiaData";
import PlaceCard from "../components/PlaceCard";
import { FaSearch, FaFilter, FaMapMarkedAlt, FaList, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="background:${color};width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
    </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const categoryColors = {
  tourist: '#1a3c5e', hotel: '#c8963c', hostel: '#2e7d32',
  hospital: '#c62828', medical_shop: '#7b1fa2', temple: '#e65100',
  park: '#388e3c', restaurant: '#f57c00', museum: '#0288d1',
};

const MapCenterControl = ({ places }) => {
  const map = useMap();
  useEffect(() => {
    const placesWithCoords = places.filter(p => p.latitude && p.longitude);
    if (placesWithCoords.length > 0) {
      const bounds = L.latLngBounds(placesWithCoords.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [places, map]);
  return null;
};

const categories = [
  { key:"all", label:"All", icon:"🗺️" },
  { key:"tourist", label:"Tourist", icon:"🏛️" },
  { key:"hotel", label:"Hotels", icon:"🏨" },
  { key:"hostel", label:"Hostels", icon:"🛏️" },
  { key:"hospital", label:"Hospitals", icon:"🏥" },
  { key:"medical_shop", label:"Medical", icon:"💊" },
  { key:"temple", label:"Temples", icon:"🛕" },
  { key:"park", label:"Parks", icon:"🌳" },
  { key:"restaurant", label:"Restaurants", icon:"🍽️" },
];

const CityPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid | map
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetchPlaces();
  }, [cityName]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/places?city=${cityName}`);
      setPlaces(data);
    } catch (e) {
      toast.error("Failed to load places");
    } finally {
      setLoading(false);
    }
  };

  const filtered = places
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === "rating" ? (b.rating - a.rating) : (a.name.localeCompare(b.name)));

  const mapPlaces = filtered.filter(p => p.latitude && p.longitude);
  const defaultCenter = mapPlaces.length > 0
    ? [mapPlaces[0].latitude, mapPlaces[0].longitude]
    : [20.5937, 78.9629];

  const categoryCounts = {};
  places.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div>
      {/* City Header */}
      <div style={styles.header}>
        <div style={styles.headerOverlay}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
          <div style={styles.headerContent}>
            <h1 style={styles.cityTitle}>{cityName}</h1>
            <p style={styles.cityMeta}>{places.length} places found · India</p>
            <div style={styles.statPills}>
              {Object.entries(categoryCounts).slice(0,4).map(([cat, count]) => (
                <div key={cat} style={styles.statPill}>
                  {categoryIcons[cat]} {count} {categoryLabels[cat]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div style={styles.controlsBar}>
        <div style={styles.searchInput}>
          <FaSearch style={{color:'var(--text-light)'}}/>
          <input
            type="text"
            placeholder={`Search in ${cityName}...`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={styles.searchField}
          />
        </div>

        <div style={styles.sortGroup}>
          <span style={{fontSize:'0.85rem', color:'var(--text-light)'}}>Sort:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={styles.sortSelect}>
            <option value="rating">Top Rated</option>
            <option value="name">A-Z</option>
          </select>
        </div>

        <div style={styles.viewToggle}>
          <button style={{...styles.viewBtn, background: viewMode==='grid'?'var(--primary)':'#fff',
            color: viewMode==='grid'?'#fff':'var(--text-mid)'}}
            onClick={() => setViewMode("grid")}>
            <FaList/> List
          </button>
          <button style={{...styles.viewBtn, background: viewMode==='map'?'var(--primary)':'#fff',
            color: viewMode==='map'?'#fff':'var(--text-mid)'}}
            onClick={() => setViewMode("map")}>
            <FaMapMarkedAlt/> Map
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div style={styles.catRow}>
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
            {c.key !== 'all' && categoryCounts[c.key] &&
              <span style={styles.catCount}>{categoryCounts[c.key]}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading {cityName}...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{fontSize:'4rem'}}>🔍</div>
            <h3>No places found</h3>
            <p>Try changing the category or search term</p>
            <button className="btn-primary" onClick={() => { setActiveCategory("all"); setSearchTerm(""); }}>
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <>
            <p style={styles.resultCount}>{filtered.length} places found</p>
            <div style={styles.grid}>
              {filtered.map(p => (
                <PlaceCard key={p._id} place={p} onClick={() => navigate(`/place/${p._id}`)}/>
              ))}
            </div>
          </>
        ) : (
          /* Map View */
          <div style={styles.mapLayout}>
            <div style={styles.mapSidebar}>
              <p style={styles.resultCount}>{filtered.length} places</p>
              <div style={styles.sidebarList}>
                {filtered.map(p => (
                  <div key={p._id} style={styles.sidebarItem}
                    onClick={() => navigate(`/place/${p._id}`)}>
                    <div style={{...styles.sidebarDot, background: categoryColors[p.category] || '#1a3c5e'}}></div>
                    <div style={{flex:1}}>
                      <div style={styles.sidebarName}>{p.name}</div>
                      <div style={styles.sidebarCat}>{categoryIcons[p.category]} {categoryLabels[p.category]}</div>
                      <div style={{display:'flex', alignItems:'center', gap:4}}>
                        <span style={{color:'var(--accent)', fontSize:'0.8rem'}}>★</span>
                        <span style={{fontSize:'0.82rem', fontWeight:700}}>{parseFloat(p.rating||0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.mapContainer}>
              <MapContainer center={defaultCenter} zoom={13} style={{height:'100%', width:'100%'}}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <MapCenterControl places={mapPlaces}/>
                {mapPlaces.map(p => (
                  <Marker
                    key={p._id}
                    position={[p.latitude, p.longitude]}
                    icon={createIcon(categoryColors[p.category] || '#1a3c5e')}
                  >
                    <Popup maxWidth={280}>
                      <div style={{padding:'4px'}}>
                        <strong style={{fontSize:'0.95rem'}}>{categoryIcons[p.category]} {p.name}</strong>
                        <div style={{fontSize:'0.8rem', color:'#666', margin:'4px 0'}}>
                          {categoryLabels[p.category]} · ⭐ {parseFloat(p.rating||0).toFixed(1)}
                        </div>
                        {p.timings && <div style={{fontSize:'0.78rem'}}>🕐 {p.timings}</div>}
                        {p.phone && <div style={{fontSize:'0.78rem'}}>📞 {p.phone}</div>}
                        {p.priceRange && <div style={{fontSize:'0.78rem', fontWeight:700, color:'var(--accent-dark)', marginTop:4}}>
                          💰 {p.priceRange}
                        </div>}
                        <button
                          onClick={() => navigate(`/place/${p._id}`)}
                          style={{
                            marginTop:8, padding:'6px 14px', background:'var(--primary)',
                            color:'#fff', border:'none', borderRadius:6, cursor:'pointer',
                            fontSize:'0.82rem', fontWeight:700, width:'100%',
                          }}>
                          View Details →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    height:280,
    backgroundImage:`url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200')`,
    backgroundSize:'cover', backgroundPosition:'center', position:'relative',
  },
  headerOverlay: {
    position:'absolute', inset:0,
    background:'linear-gradient(to bottom, rgba(15,37,64,0.75) 0%, rgba(15,37,64,0.9) 100%)',
    padding:'24px 40px', display:'flex', flexDirection:'column', justifyContent:'space-between',
  },
  backBtn: {
    background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.3)',
    color:'#fff', padding:'8px 18px', borderRadius:8, cursor:'pointer',
    fontSize:'0.9rem', fontFamily:"'Lato', sans-serif", width:'fit-content',
  },
  headerContent: { color:'#fff' },
  cityTitle: {
    fontFamily:"'Playfair Display', serif", fontSize:'3rem', color:'#fff', marginBottom:6,
  },
  cityMeta: { color:'rgba(255,255,255,0.75)', marginBottom:16 },
  statPills: { display:'flex', gap:10, flexWrap:'wrap' },
  statPill: {
    background:'rgba(200,150,60,0.25)', border:'1px solid rgba(200,150,60,0.5)',
    padding:'5px 14px', borderRadius:20, fontSize:'0.82rem', color:'var(--accent-light)',
  },
  controlsBar: {
    display:'flex', alignItems:'center', gap:12, padding:'16px 40px',
    background:'#fff', borderBottom:'1px solid var(--border)', flexWrap:'wrap',
  },
  searchInput: {
    display:'flex', alignItems:'center', gap:10, flex:1, minWidth:200,
    border:'1.5px solid var(--border)', borderRadius:8, padding:'8px 14px',
  },
  searchField: { border:'none', outline:'none', fontSize:'0.9rem', width:'100%', fontFamily:"'Lato', sans-serif" },
  sortGroup: { display:'flex', alignItems:'center', gap:8 },
  sortSelect: { border:'1.5px solid var(--border)', borderRadius:8, padding:'8px 12px', fontSize:'0.88rem', cursor:'pointer' },
  viewToggle: { display:'flex', border:'1.5px solid var(--border)', borderRadius:8, overflow:'hidden' },
  viewBtn: {
    padding:'8px 16px', border:'none', cursor:'pointer', fontSize:'0.88rem',
    fontFamily:"'Lato', sans-serif", fontWeight:600, display:'flex', alignItems:'center', gap:6,
    transition:'all 0.2s',
  },
  catRow: {
    display:'flex', gap:8, padding:'12px 40px', background:'var(--bg-secondary)',
    borderBottom:'1px solid var(--border)', overflowX:'auto', flexWrap:'nowrap',
  },
  catBtn: {
    padding:'8px 16px', borderRadius:20, border:'1.5px solid', cursor:'pointer',
    fontSize:'0.85rem', fontWeight:600, transition:'all 0.2s', whiteSpace:'nowrap',
    fontFamily:"'Lato', sans-serif", display:'flex', alignItems:'center', gap:6,
  },
  catCount: {
    background:'rgba(255,255,255,0.25)', padding:'1px 7px', borderRadius:10,
    fontSize:'0.75rem',
  },
  content: { padding:'32px 40px', minHeight:400 },
  resultCount: { color:'var(--text-light)', fontSize:'0.9rem', marginBottom:20 },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24 },
  emptyState: {
    textAlign:'center', padding:'80px 20px',
    display:'flex', flexDirection:'column', alignItems:'center', gap:16,
    color:'var(--text-mid)',
  },
  mapLayout: { display:'flex', height:'calc(100vh - 300px)', gap:0, margin:'0 -40px' },
  mapSidebar: {
    width:320, borderRight:'1px solid var(--border)', overflowY:'auto',
    background:'#fff', flexShrink:0, padding:'16px 0',
  },
  sidebarList: { display:'flex', flexDirection:'column' },
  sidebarItem: {
    display:'flex', gap:12, padding:'12px 16px', cursor:'pointer',
    borderBottom:'1px solid var(--border)', transition:'background 0.2s', alignItems:'flex-start',
  },
  sidebarDot: { width:10, height:10, borderRadius:'50%', marginTop:4, flexShrink:0 },
  sidebarName: { fontSize:'0.9rem', fontWeight:700, color:'var(--primary-dark)', marginBottom:3 },
  sidebarCat: { fontSize:'0.78rem', color:'var(--text-light)', marginBottom:3 },
  mapContainer: { flex:1, minWidth:0 },
};

export default CityPage;
