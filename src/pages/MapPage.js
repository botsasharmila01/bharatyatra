import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { categoryIcons, categoryLabels } from "../data/indiaData";
import { FaLocationArrow, FaSearch, FaFilter } from "react-icons/fa";
import toast from "react-hot-toast";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userIcon = L.divIcon({
  className:'',
  html:`<div style="width:20px;height:20px;background:#1a3c5e;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(26,60,94,0.3)"></div>`,
  iconSize:[20,20], iconAnchor:[10,10],
});

const createCatIcon = (cat) => {
  const colors = {
    tourist:'#1a3c5e', hotel:'#c8963c', hostel:'#2e7d32',
    hospital:'#c62828', medical_shop:'#7b1fa2', temple:'#e65100',
    park:'#388e3c', restaurant:'#f57c00',
  };
  const color = colors[cat] || '#1a3c5e';
  const icon = categoryIcons[cat] || '📍';
  return L.divIcon({
    className:'',
    html:`<div style="background:${color};color:white;width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
      <span style="transform:rotate(45deg);font-size:1rem">${icon}</span>
    </div>`,
    iconSize:[38,38], iconAnchor:[19,38], popupAnchor:[0,-38],
  });
};

const FlyTo = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 14, { duration: 1.5 });
  }, [coords, map]);
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
];

const MapPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [flyCoords, setFlyCoords] = useState(null);
  const [tracking, setTracking] = useState(false);
  const trackRef = useRef(null);

  // India center default
  const defaultCenter = [20.5937, 78.9629];

  useEffect(() => {
    // Load places for user's city by default
    if (user?.city) {
      fetchPlaces(user.city);
    }
    return () => {
      if (trackRef.current) navigator.geolocation.clearWatch(trackRef.current);
    };
  }, []);

  const fetchPlaces = async (city) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/places?city=${city}`);
      setPlaces(data.filter(p => p.latitude && p.longitude));
    } catch (e) {}
    finally { setLoading(false); }
  };

  const locateMe = () => {
    if (!navigator.geolocation) { toast.error("Geolocation not supported"); return; }
    setTracking(true);
    toast("Locating you...", {icon:"📍"});
    const id = navigator.geolocation.watchPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setFlyCoords([loc.lat, loc.lng]);
      },
      () => { toast.error("Location access denied"); setTracking(false); },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
    trackRef.current = id;
  };

  const stopTracking = () => {
    if (trackRef.current) navigator.geolocation.clearWatch(trackRef.current);
    setTracking(false);
    toast("Location tracking stopped");
  };

  const filtered = activeCategory === "all"
    ? places
    : places.filter(p => p.category === activeCategory);

  return (
    <div style={styles.page}>
      {/* Top Controls */}
      <div style={styles.topBar}>
        <div style={styles.topLeft}>
          <h2 style={styles.pageTitle}>🗺️ Explore Map</h2>
          {user?.city && (
            <span style={styles.cityTag}>📍 {user.city}</span>
          )}
        </div>
        <div style={styles.controls}>
          <button
            onClick={tracking ? stopTracking : locateMe}
            style={{
              ...styles.locBtn,
              background: tracking ? 'var(--success)' : 'var(--primary)',
            }}>
            <FaLocationArrow style={{marginRight:6}}/>
            {tracking ? "📍 Tracking..." : "Locate Me"}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.catBar}>
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
        <span style={styles.countBadge}>{filtered.length} places</span>
      </div>

      {/* Map */}
      <div style={styles.mapWrap}>
        <MapContainer
          center={defaultCenter}
          zoom={5}
          style={{height:'100%', width:'100%'}}
          zoomControl={false}
        >
          <ZoomControl position="bottomright"/>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          />
          {flyCoords && <FlyTo coords={flyCoords}/>}

          {/* User Location */}
          {userLocation && (
            <>
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <strong>📍 Your Location</strong><br/>
                  <span style={{fontSize:'0.82rem'}}>
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </span>
                </Popup>
              </Marker>
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={500}
                color="var(--primary)" fillColor="var(--primary)" fillOpacity={0.08}
              />
            </>
          )}

          {/* Place Markers */}
          {filtered.map(p => (
            <Marker
              key={p._id}
              position={[p.latitude, p.longitude]}
              icon={createCatIcon(p.category)}
            >
              <Popup maxWidth={260}>
                <div style={{padding:'4px 0'}}>
                  {p.photos?.[0] && (
                    <img src={p.photos[0]} alt={p.name}
                      style={{width:'100%', height:100, objectFit:'cover', borderRadius:6, marginBottom:8}}
                      onError={e => { e.target.style.display='none'; }}/>
                  )}
                  <div style={{fontWeight:700, fontSize:'0.95rem', marginBottom:4}}>
                    {categoryIcons[p.category]} {p.name}
                  </div>
                  <div style={{fontSize:'0.8rem', color:'#666', marginBottom:4}}>
                    {categoryLabels[p.category]}
                  </div>
                  <div style={{fontSize:'0.82rem', color:'#c8963c', marginBottom:4}}>
                    ⭐ {parseFloat(p.rating||0).toFixed(1)} ({p.totalReviews || 0} reviews)
                  </div>
                  {p.timings && <div style={{fontSize:'0.78rem', marginBottom:2}}>🕐 {p.timings.split('|')[0]}</div>}
                  {p.phone && <div style={{fontSize:'0.78rem', marginBottom:4}}>📞 {p.phone}</div>}
                  {p.priceRange && <div style={{fontSize:'0.8rem', fontWeight:700, color:'#a5731d', marginBottom:8}}>💰 {p.priceRange}</div>}
                  <button
                    onClick={() => navigate(`/place/${p._id}`)}
                    style={{
                      width:'100%', padding:'8px', background:'#1a3c5e', color:'#fff',
                      border:'none', borderRadius:6, cursor:'pointer', fontSize:'0.85rem',
                      fontWeight:700, marginBottom:4,
                    }}>
                    View Details →
                  </button>
                  {p.latitude && p.longitude && (
                    <button
                      onClick={() => {
                        const url = userLocation
                          ? `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${p.latitude},${p.longitude}`
                          : `https://www.google.com/maps/dir//${p.latitude},${p.longitude}`;
                        window.open(url, '_blank');
                      }}
                      style={{
                        width:'100%', padding:'7px', background:'#fff', color:'#1a3c5e',
                        border:'1.5px solid #1a3c5e', borderRadius:6, cursor:'pointer',
                        fontSize:'0.82rem', fontWeight:700,
                      }}>
                      🗺️ Get Directions
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Loading overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div className="spinner"></div>
            <p>Loading places...</p>
          </div>
        )}

        {/* Legend */}
        <div style={styles.legend}>
          <div style={styles.legendTitle}>Legend</div>
          {Object.entries({tourist:'#1a3c5e', hotel:'#c8963c', hospital:'#c62828', temple:'#e65100'}).map(([cat, color]) => (
            <div key={cat} style={styles.legendItem}>
              <div style={{...styles.legendDot, background:color}}></div>
              <span>{categoryLabels[cat]}</span>
            </div>
          ))}
          {userLocation && (
            <div style={styles.legendItem}>
              <div style={{...styles.legendDot, background:'#1a3c5e', border:'2px solid white', outline:'2px solid #1a3c5e'}}></div>
              <span>You</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { display:'flex', flexDirection:'column', height:'calc(100vh - 68px)' },
  topBar: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'12px 24px', background:'#fff', borderBottom:'1px solid var(--border)',
  },
  topLeft: { display:'flex', alignItems:'center', gap:12 },
  pageTitle: { fontSize:'1.15rem', color:'var(--primary-dark)' },
  cityTag: {
    padding:'4px 12px', background:'var(--bg-secondary)', borderRadius:20,
    fontSize:'0.82rem', color:'var(--text-mid)', border:'1px solid var(--border)',
  },
  controls: { display:'flex', gap:8 },
  locBtn: {
    color:'#fff', border:'none', padding:'9px 18px', borderRadius:8,
    cursor:'pointer', fontWeight:700, fontSize:'0.88rem',
    display:'flex', alignItems:'center', fontFamily:"'Lato', sans-serif",
    transition:'all 0.2s',
  },
  catBar: {
    display:'flex', gap:6, padding:'10px 16px', background:'var(--bg-secondary)',
    borderBottom:'1px solid var(--border)', overflowX:'auto', alignItems:'center',
  },
  catBtn: {
    padding:'6px 14px', borderRadius:20, border:'1.5px solid', cursor:'pointer',
    fontSize:'0.82rem', fontWeight:600, whiteSpace:'nowrap',
    fontFamily:"'Lato', sans-serif", transition:'all 0.2s',
  },
  countBadge: {
    marginLeft:'auto', fontSize:'0.8rem', color:'var(--text-light)',
    whiteSpace:'nowrap', paddingLeft:12,
  },
  mapWrap: { flex:1, position:'relative' },
  loadingOverlay: {
    position:'absolute', inset:0, background:'rgba(255,255,255,0.8)',
    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:1000,
    gap:12, color:'var(--text-mid)',
  },
  legend: {
    position:'absolute', bottom:40, left:12, zIndex:1000,
    background:'rgba(255,255,255,0.95)', borderRadius:10, padding:'12px 16px',
    boxShadow:'0 2px 12px rgba(0,0,0,0.15)', border:'1px solid var(--border)',
    backdropFilter:'blur(4px)',
  },
  legendTitle: { fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:8, color:'var(--text-mid)' },
  legendItem: { display:'flex', alignItems:'center', gap:8, fontSize:'0.82rem', marginBottom:6, color:'var(--text-dark)' },
  legendDot: { width:12, height:12, borderRadius:'50%', flexShrink:0 },
};

export default MapPage;
