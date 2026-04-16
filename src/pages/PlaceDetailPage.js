import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useAuth } from "../context/AuthContext";
import { categoryIcons, categoryLabels } from "../data/indiaData";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaBookmark,
  FaRoute, FaHeart, FaShare, FaChevronLeft, FaCheckCircle
} from "react-icons/fa";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const PlaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [booking, setBooking] = useState({ checkIn:"", checkOut:"", guests:1, specialRequests:"" });
  const [review, setReview] = useState({ rating:5, comment:"" });
  const [userLocation, setUserLocation] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchPlace();
    getUserLocation();
  }, [id]);

  const fetchPlace = async () => {
    try {
      const { data } = await axios.get(`/api/places/${id}`);
      setPlace(data);
    } catch (e) { toast.error("Place not found"); navigate(-1); }
    finally { setLoading(false); }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await axios.post("/api/bookings", { placeId: id, ...booking });
      toast.success("Booking confirmed! 🎉");
      setShowBooking(false);
    } catch (e) { toast.error("Booking failed"); }
    finally { setBookingLoading(false); }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/places/${id}/review`, review);
      setPlace(data);
      setShowReview(false);
      setReview({ rating:5, comment:"" });
      toast.success("Review submitted! ✅");
    } catch (e) { toast.error("Failed to submit review"); }
  };

  const openDirections = () => {
    if (place.latitude && place.longitude) {
      const url = userLocation
        ? `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${place.latitude},${place.longitude}`
        : `https://www.google.com/maps/dir//${place.latitude},${place.longitude}`;
      window.open(url, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.city)}`, '_blank');
    }
  };

  const renderStars = (rating, size = '1rem') => (
    Array.from({length:5}, (_, i) => (
      <span key={i} style={{color: i < Math.round(rating) ? '#c8963c' : '#ddd', fontSize:size}}>★</span>
    ))
  );

  if (loading) return <div className="loading-container"><div className="spinner"></div><p>Loading...</p></div>;
  if (!place) return null;

  const photos = place.photos?.length > 0 ? place.photos : [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'
  ];

  return (
    <div style={styles.page}>
      {/* Photo Gallery */}
      <div style={styles.gallery}>
        <div style={{...styles.mainPhoto, backgroundImage:`url(${photos[activePhoto]})`}}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <FaChevronLeft/> Back
          </button>
          <div style={styles.photoMeta}>
            <span style={styles.categoryTag}>
              {categoryIcons[place.category]} {categoryLabels[place.category]}
            </span>
            {place.featured && <span style={styles.featuredTag}>⭐ Featured</span>}
          </div>
        </div>
        {photos.length > 1 && (
          <div style={styles.thumbRow}>
            {photos.map((p, i) => (
              <div key={i} onClick={() => setActivePhoto(i)}
                style={{...styles.thumb, border: i===activePhoto ? '3px solid var(--accent)' : '3px solid transparent'}}>
                <img src={p} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}
                  onError={e => { e.target.src='https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200'; }}/>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftCol}>
          {/* Title & Rating */}
          <div style={styles.titleSection}>
            <h1 style={styles.title}>{place.name}</h1>
            <div style={styles.ratingBar}>
              <div style={styles.ratingStars}>
                {renderStars(place.rating, '1.2rem')}
                <span style={styles.ratingNum}>{parseFloat(place.rating||0).toFixed(1)}</span>
                <span style={styles.reviewCount}>({place.totalReviews || 0} reviews)</span>
              </div>
              {place.priceRange && (
                <div style={styles.priceBadge}>{place.priceRange}</div>
              )}
            </div>

            <div style={styles.locationBar}>
              <FaMapMarkerAlt style={{color:'var(--accent)'}}/>
              <span>{place.address || `${place.city}, ${place.state}, India`}</span>
            </div>
          </div>

          {/* Quick Info */}
          <div style={styles.infoGrid}>
            {place.phone && (
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>📞</div>
                <div>
                  <div style={styles.infoLabel}>Phone</div>
                  <a href={`tel:${place.phone}`} style={styles.infoValue}>{place.phone}</a>
                </div>
              </div>
            )}
            {place.timings && (
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>🕐</div>
                <div>
                  <div style={styles.infoLabel}>Timings</div>
                  <div style={styles.infoValue}>{place.timings}</div>
                </div>
              </div>
            )}
            {place.price > 0 && (
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>💰</div>
                <div>
                  <div style={styles.infoLabel}>Price</div>
                  <div style={styles.infoValue}>{place.priceRange}</div>
                </div>
              </div>
            )}
            {place.city && (
              <div style={styles.infoCard}>
                <div style={styles.infoIcon}>🏙️</div>
                <div>
                  <div style={styles.infoLabel}>Location</div>
                  <div style={styles.infoValue}>{place.city}, {place.state}</div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {place.description && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>About</h3>
              <div style={styles.divider}></div>
              <p style={styles.description}>{place.description}</p>
            </div>
          )}

          {/* Amenities */}
          {place.amenities?.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Amenities</h3>
              <div style={styles.divider}></div>
              <div style={styles.amenitiesGrid}>
                {place.amenities.map(a => (
                  <div key={a} style={styles.amenityItem}>
                    <FaCheckCircle style={{color:'var(--success)', fontSize:'0.9rem'}}/>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {place.tags?.length > 0 && (
            <div style={{marginBottom:24}}>
              <div className="tag-strip">
                {place.tags.map(t => <span key={t} className="tag">#{t}</span>)}
              </div>
            </div>
          )}

          {/* Map */}
          {place.latitude && place.longitude && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Location & Route</h3>
              <div style={styles.divider}></div>
              <div style={{height:320, borderRadius:12, overflow:'hidden', marginBottom:12}}>
                <MapContainer center={[place.latitude, place.longitude]} zoom={15}
                  style={{height:'100%', width:'100%'}}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={[place.latitude, place.longitude]}>
                    <Popup>
                      <strong>{place.name}</strong><br/>
                      <span style={{fontSize:'0.85rem'}}>{categoryLabels[place.category]}</span>
                    </Popup>
                  </Marker>
                  {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>📍 Your Location</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
              <button onClick={openDirections} className="btn-primary" style={{width:'100%', justifyContent:'center'}}>
                <FaRoute style={{marginRight:8}}/> Get Directions on Google Maps
              </button>
            </div>
          )}

          {/* Reviews */}
          <div style={styles.section}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <h3 style={styles.sectionTitle}>Reviews ({place.reviews?.length || 0})</h3>
              <button className="btn-outline" onClick={() => setShowReview(!showReview)}>
                + Write Review
              </button>
            </div>
            <div style={styles.divider}></div>

            {/* Write Review Form */}
            {showReview && (
              <form onSubmit={handleReview} style={styles.reviewForm}>
                <div style={styles.starPicker}>
                  <span style={{fontWeight:700, color:'var(--text-mid)'}}>Your Rating:</span>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} onClick={() => setReview({...review, rating:n})}
                      style={{fontSize:'1.6rem', cursor:'pointer',
                        color: n <= review.rating ? 'var(--accent)' : '#ddd'}}>★</span>
                  ))}
                </div>
                <textarea
                  placeholder="Share your experience..."
                  value={review.comment}
                  onChange={e => setReview({...review, comment: e.target.value})}
                  required
                  style={styles.textarea}
                  rows={3}
                />
                <div style={{display:'flex', gap:10}}>
                  <button type="submit" className="btn-primary">Submit Review</button>
                  <button type="button" className="btn-outline" onClick={() => setShowReview(false)}>Cancel</button>
                </div>
              </form>
            )}

            {place.reviews?.length === 0 ? (
              <p style={{color:'var(--text-light)', textAlign:'center', padding:'24px'}}>
                No reviews yet. Be the first to review!
              </p>
            ) : (
              <div style={styles.reviewsList}>
                {[...place.reviews].reverse().map((r, i) => (
                  <div key={i} style={styles.reviewItem}>
                    <div style={styles.reviewHeader}>
                      <div style={styles.reviewAvatar}>{r.user?.charAt(0).toUpperCase() || "U"}</div>
                      <div>
                        <div style={styles.reviewUser}>{r.user}</div>
                        <div style={{display:'flex', gap:2}}>
                          {renderStars(r.rating, '0.85rem')}
                        </div>
                      </div>
                      <div style={styles.reviewDate}>
                        {r.date ? new Date(r.date).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'}) : ''}
                      </div>
                    </div>
                    <p style={styles.reviewComment}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column — Booking Panel */}
        <div style={styles.rightCol}>
          <div style={styles.bookingPanel}>
            <div style={styles.bookingHeader}>
              <h3 style={styles.bookingTitle}>
                {place.priceRange || (place.price > 0 ? `₹${place.price}` : "Free Entry")}
              </h3>
              <p style={styles.bookingSubtitle}>
                {place.isPreBookable ? "Pre-booking available" : "Walk-in only"}
              </p>
            </div>

            {place.isPreBookable ? (
              <>
                {!showBooking ? (
                  <button className="btn-accent" onClick={() => setShowBooking(true)}
                    style={{width:'100%', justifyContent:'center', padding:'14px', fontSize:'1rem'}}>
                    📅 Book Now
                  </button>
                ) : (
                  <form onSubmit={handleBooking} style={{display:'flex', flexDirection:'column', gap:12}}>
                    <div className="input-group" style={{marginBottom:0}}>
                      <label>Check-in Date</label>
                      <input type="date" value={booking.checkIn}
                        onChange={e => setBooking({...booking, checkIn:e.target.value})}
                        min={new Date().toISOString().split('T')[0]} required/>
                    </div>
                    <div className="input-group" style={{marginBottom:0}}>
                      <label>Check-out Date</label>
                      <input type="date" value={booking.checkOut}
                        onChange={e => setBooking({...booking, checkOut:e.target.value})}
                        min={booking.checkIn || new Date().toISOString().split('T')[0]}/>
                    </div>
                    <div className="input-group" style={{marginBottom:0}}>
                      <label>Guests</label>
                      <input type="number" min="1" max="20" value={booking.guests}
                        onChange={e => setBooking({...booking, guests:parseInt(e.target.value)})}/>
                    </div>
                    <div className="input-group" style={{marginBottom:0}}>
                      <label>Special Requests</label>
                      <input type="text" placeholder="Any special requests..."
                        value={booking.specialRequests}
                        onChange={e => setBooking({...booking, specialRequests:e.target.value})}/>
                    </div>
                    <div style={{display:'flex', gap:8}}>
                      <button type="submit" className="btn-accent"
                        style={{flex:2, justifyContent:'center'}} disabled={bookingLoading}>
                        {bookingLoading ? "Booking..." : "Confirm Booking"}
                      </button>
                      <button type="button" className="btn-outline" onClick={() => setShowBooking(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div style={styles.walkinBox}>
                <p>🚶 Walk-in only — no pre-booking required</p>
              </div>
            )}

            <div style={styles.bookingActions}>
              <button style={styles.actionBtn} onClick={openDirections}>
                <FaRoute style={{marginRight:6}}/>Get Directions
              </button>
              {place.phone && (
                <a href={`tel:${place.phone}`} style={styles.actionBtn}>
                  📞 Call Now
                </a>
              )}
            </div>

            {/* Quick Info Summary */}
            <div style={styles.quickInfo}>
              {place.timings && (
                <div style={styles.quickRow}>
                  <span style={styles.quickLabel}>🕐 Timings</span>
                  <span style={styles.quickValue}>{place.timings.split('|')[0]}</span>
                </div>
              )}
              {place.phone && (
                <div style={styles.quickRow}>
                  <span style={styles.quickLabel}>📞 Contact</span>
                  <span style={styles.quickValue}>{place.phone}</span>
                </div>
              )}
              <div style={styles.quickRow}>
                <span style={styles.quickLabel}>📍 City</span>
                <span style={styles.quickValue}>{place.city}, {place.state}</span>
              </div>
              <div style={styles.quickRow}>
                <span style={styles.quickLabel}>⭐ Rating</span>
                <span style={styles.quickValue}>{parseFloat(place.rating||0).toFixed(1)} / 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { background:'var(--bg)' },
  gallery: { position:'relative' },
  mainPhoto: {
    height:460, backgroundSize:'cover', backgroundPosition:'center',
    position:'relative', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:24,
  },
  backBtn: {
    background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.3)', color:'#fff',
    padding:'10px 20px', borderRadius:8, cursor:'pointer', fontWeight:600,
    display:'flex', alignItems:'center', gap:8, width:'fit-content',
    backdropFilter:'blur(4px)', fontFamily:"'Lato', sans-serif",
  },
  photoMeta: { display:'flex', gap:10, justifyContent:'flex-end' },
  categoryTag: {
    background:'rgba(15,37,64,0.85)', color:'#fff', padding:'8px 16px',
    borderRadius:20, fontSize:'0.88rem', fontWeight:700, backdropFilter:'blur(4px)',
  },
  featuredTag: {
    background:'rgba(200,150,60,0.9)', color:'#fff', padding:'8px 16px',
    borderRadius:20, fontSize:'0.88rem', fontWeight:700,
  },
  thumbRow: { display:'flex', gap:6, padding:'6px', background:'#000' },
  thumb: {
    width:80, height:60, borderRadius:6, overflow:'hidden', cursor:'pointer',
    flexShrink:0, transition:'border 0.2s',
  },
  mainContent: {
    display:'grid', gridTemplateColumns:'1fr 360px', gap:32,
    padding:'32px 60px', maxWidth:1400, margin:'0 auto',
  },
  leftCol: {},
  titleSection: { marginBottom:24 },
  title: {
    fontFamily:"'Playfair Display', serif", fontSize:'2.2rem', color:'var(--primary-dark)', marginBottom:12,
  },
  ratingBar: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12, flexWrap:'wrap', gap:8 },
  ratingStars: { display:'flex', alignItems:'center', gap:6 },
  ratingNum: { fontSize:'1.1rem', fontWeight:700, color:'var(--text-dark)' },
  reviewCount: { fontSize:'0.9rem', color:'var(--text-light)' },
  priceBadge: {
    background:'rgba(200,150,60,0.12)', border:'1.5px solid var(--accent)',
    color:'var(--accent-dark)', padding:'6px 16px', borderRadius:8, fontWeight:700, fontSize:'0.9rem',
  },
  locationBar: { display:'flex', alignItems:'center', gap:8, color:'var(--text-mid)', fontSize:'0.95rem' },
  infoGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:12, marginBottom:24 },
  infoCard: {
    display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px',
    background:'#fff', borderRadius:10, border:'1px solid var(--border)',
  },
  infoIcon: { fontSize:'1.4rem', flexShrink:0 },
  infoLabel: { fontSize:'0.75rem', color:'var(--text-light)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:3 },
  infoValue: { fontSize:'0.9rem', color:'var(--text-dark)', fontWeight:600, wordBreak:'break-word' },
  section: { marginBottom:32 },
  sectionTitle: { fontFamily:"'Playfair Display', serif", fontSize:'1.3rem', marginBottom:4 },
  divider: { width:40, height:3, background:'var(--accent)', borderRadius:2, marginBottom:16 },
  description: { color:'var(--text-mid)', lineHeight:1.8, fontSize:'0.95rem' },
  amenitiesGrid: { display:'flex', flexWrap:'wrap', gap:12 },
  amenityItem: { display:'flex', alignItems:'center', gap:8, fontSize:'0.9rem', color:'var(--text-mid)' },
  reviewForm: {
    background:'var(--bg-secondary)', padding:20, borderRadius:10,
    border:'1px solid var(--border)', marginBottom:20, display:'flex', flexDirection:'column', gap:12,
  },
  starPicker: { display:'flex', alignItems:'center', gap:8 },
  textarea: {
    padding:'12px', border:'1.5px solid var(--border)', borderRadius:8,
    fontFamily:"'Lato', sans-serif", fontSize:'0.95rem', resize:'vertical', outline:'none',
  },
  reviewsList: { display:'flex', flexDirection:'column', gap:12 },
  reviewItem: {
    padding:'16px', background:'#fff', borderRadius:10, border:'1px solid var(--border)',
  },
  reviewHeader: { display:'flex', alignItems:'flex-start', gap:12, marginBottom:10 },
  reviewAvatar: {
    width:38, height:38, borderRadius:'50%', background:'var(--primary)',
    color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
    fontWeight:700, flexShrink:0, fontSize:'1rem',
  },
  reviewUser: { fontWeight:700, fontSize:'0.95rem', marginBottom:3 },
  reviewDate: { marginLeft:'auto', fontSize:'0.78rem', color:'var(--text-light)' },
  reviewComment: { fontSize:'0.9rem', color:'var(--text-mid)', lineHeight:1.6, margin:0 },
  rightCol: { },
  bookingPanel: {
    background:'#fff', borderRadius:16, padding:'24px',
    border:'1px solid var(--border)', boxShadow:'0 4px 20px rgba(0,0,0,0.08)',
    position:'sticky', top:90,
  },
  bookingHeader: { marginBottom:20, paddingBottom:16, borderBottom:'1px solid var(--border)' },
  bookingTitle: {
    fontFamily:"'Playfair Display', serif", fontSize:'1.5rem', color:'var(--primary-dark)', marginBottom:4,
  },
  bookingSubtitle: { fontSize:'0.88rem', color:'var(--text-light)' },
  walkinBox: {
    background:'var(--bg-secondary)', padding:'14px 16px', borderRadius:8,
    border:'1px solid var(--border)', fontSize:'0.9rem', color:'var(--text-mid)', textAlign:'center',
  },
  bookingActions: { display:'flex', flexDirection:'column', gap:8, marginTop:16 },
  actionBtn: {
    display:'flex', alignItems:'center', justifyContent:'center',
    padding:'11px', borderRadius:8, border:'1.5px solid var(--border)',
    background:'#fff', cursor:'pointer', fontSize:'0.9rem', fontWeight:600,
    color:'var(--primary)', fontFamily:"'Lato', sans-serif", transition:'all 0.2s',
    textDecoration:'none',
  },
  quickInfo: {
    marginTop:16, paddingTop:16, borderTop:'1px solid var(--border)',
    display:'flex', flexDirection:'column', gap:10,
  },
  quickRow: { display:'flex', justifyContent:'space-between', gap:8 },
  quickLabel: { fontSize:'0.82rem', color:'var(--text-light)' },
  quickValue: { fontSize:'0.82rem', fontWeight:600, color:'var(--text-dark)', textAlign:'right', flex:1 },
};

export default PlaceDetailPage;
