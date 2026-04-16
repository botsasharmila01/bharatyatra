import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaUsers, FaRupeeSign, FaTimesCircle, FaMapMarkerAlt } from "react-icons/fa";
import { categoryIcons, categoryLabels } from "../data/indiaData";

const statusColors = {
  pending: { bg:'rgba(245,124,0,0.1)', color:'#e65100', border:'rgba(245,124,0,0.3)' },
  confirmed: { bg:'rgba(46,125,50,0.1)', color:'#2e7d32', border:'rgba(46,125,50,0.3)' },
  cancelled: { bg:'rgba(198,40,40,0.1)', color:'#c62828', border:'rgba(198,40,40,0.3)' },
};

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/my");
      setBookings(data);
    } catch (e) { toast.error("Failed to load bookings"); }
    finally { setLoading(false); }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axios.put(`/api/bookings/${id}/cancel`);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch (e) { toast.error("Failed to cancel"); }
  };

  if (loading) return (
    <div className="loading-container"><div className="spinner"></div><p>Loading bookings...</p></div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Bookings</h1>
          <p style={styles.subtitle}>Manage your upcoming and past bookings</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/")}>
          + New Booking
        </button>
      </div>

      {bookings.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{fontSize:'4rem', marginBottom:16}}>📅</div>
          <h3 style={{fontFamily:"'Playfair Display', serif", marginBottom:8}}>No bookings yet</h3>
          <p style={{color:'var(--text-light)', marginBottom:24}}>
            Explore destinations and pre-book your favourite places!
          </p>
          <button className="btn-primary" onClick={() => navigate("/")}>Explore Destinations</button>
        </div>
      ) : (
        <div style={styles.list}>
          {bookings.map(b => {
            const sc = statusColors[b.status] || statusColors.pending;
            return (
              <div key={b._id} style={styles.card}>
                <div style={styles.cardLeft}>
                  <div style={styles.placeIcon}>
                    {b.category ? categoryIcons[b.category] : "📍"}
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardHeader}>
                    <div>
                      <h3 style={styles.placeName}>{b.placeName}</h3>
                      {b.category && (
                        <span style={styles.catLabel}>
                          {categoryLabels[b.category]}
                        </span>
                      )}
                    </div>
                    <div style={{...styles.statusBadge, background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`}}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </div>
                  </div>

                  <div style={styles.bookingMeta}>
                    {b.checkIn && (
                      <div style={styles.metaItem}>
                        <FaCalendarAlt style={{color:'var(--accent)'}}/>
                        <span>{new Date(b.checkIn).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}</span>
                        {b.checkOut && <span style={{color:'var(--text-light)'}}>→ {new Date(b.checkOut).toLocaleDateString('en-IN', {day:'numeric', month:'short'})}</span>}
                      </div>
                    )}
                    {b.guests && (
                      <div style={styles.metaItem}>
                        <FaUsers style={{color:'var(--accent)'}}/>
                        <span>{b.guests} Guest{b.guests > 1 ? 's' : ''}</span>
                      </div>
                    )}
                    {b.totalAmount > 0 && (
                      <div style={styles.metaItem}>
                        <FaRupeeSign style={{color:'var(--accent)'}}/>
                        <span style={{fontWeight:700}}>₹{b.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  {b.specialRequests && (
                    <p style={styles.specialReq}>
                      <strong>Notes:</strong> {b.specialRequests}
                    </p>
                  )}

                  <div style={styles.cardFooter}>
                    <span style={styles.bookedDate}>
                      Booked on {new Date(b.bookedAt).toLocaleDateString('en-IN', {day:'numeric', month:'long', year:'numeric'})}
                    </span>
                    <div style={{display:'flex', gap:8}}>
                      {b.place?._id && (
                        <button className="btn-outline" style={{padding:'7px 16px', fontSize:'0.85rem'}}
                          onClick={() => navigate(`/place/${b.place._id}`)}>
                          View Place
                        </button>
                      )}
                      {b.status === 'pending' && (
                        <button
                          onClick={() => cancelBooking(b._id)}
                          style={{...styles.cancelBtn}}>
                          <FaTimesCircle style={{marginRight:4}}/>Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding:'48px 60px', maxWidth:1000, margin:'0 auto' },
  header: {
    display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:36,
  },
  title: {
    fontFamily:"'Playfair Display', serif", fontSize:'2.2rem', color:'var(--primary-dark)', marginBottom:6,
  },
  subtitle: { color:'var(--text-light)', fontSize:'0.95rem' },
  emptyState: {
    textAlign:'center', padding:'80px 20px',
    display:'flex', flexDirection:'column', alignItems:'center',
  },
  list: { display:'flex', flexDirection:'column', gap:16 },
  card: {
    display:'flex', gap:0, background:'#fff', borderRadius:12,
    border:'1px solid var(--border)', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
  },
  cardLeft: {
    width:80, background:'var(--bg-secondary)', display:'flex',
    alignItems:'center', justifyContent:'center', flexShrink:0,
  },
  placeIcon: { fontSize:'2rem' },
  cardBody: { flex:1, padding:'20px 24px' },
  cardHeader: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 },
  placeName: {
    fontFamily:"'Playfair Display', serif", fontSize:'1.2rem', color:'var(--primary-dark)', marginBottom:4,
  },
  catLabel: { fontSize:'0.78rem', color:'var(--text-light)', textTransform:'uppercase', letterSpacing:'0.5px' },
  statusBadge: {
    padding:'5px 14px', borderRadius:20, fontSize:'0.8rem', fontWeight:700,
    whiteSpace:'nowrap', flexShrink:0,
  },
  bookingMeta: { display:'flex', gap:20, flexWrap:'wrap', marginBottom:10 },
  metaItem: { display:'flex', alignItems:'center', gap:6, fontSize:'0.9rem', color:'var(--text-mid)' },
  specialReq: { fontSize:'0.85rem', color:'var(--text-mid)', fontStyle:'italic', marginBottom:10 },
  cardFooter: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12, flexWrap:'wrap', gap:8 },
  bookedDate: { fontSize:'0.8rem', color:'var(--text-light)' },
  cancelBtn: {
    display:'flex', alignItems:'center', padding:'7px 16px', fontSize:'0.85rem',
    background:'rgba(198,40,40,0.08)', color:'#c62828', border:'1.5px solid rgba(198,40,40,0.3)',
    borderRadius:8, cursor:'pointer', fontFamily:"'Lato', sans-serif", fontWeight:600,
  },
};

export default BookingsPage;
