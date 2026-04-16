import React from "react";
import { FaStar, FaMapMarkerAlt, FaPhone, FaClock, FaBookmark } from "react-icons/fa";
import { categoryIcons, categoryLabels } from "../data/indiaData";

const PlaceCard = ({ place, onClick }) => {
  const photo = place.photos?.[0] || `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600`;

  const renderStars = (rating) => {
    return Array.from({length: 5}, (_, i) => (
      <span key={i} style={{color: i < Math.floor(rating) ? 'var(--accent)' : '#ddd'}}>★</span>
    ));
  };

  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.imgWrapper}>
        <img src={photo} alt={place.name} style={styles.img}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600'; }}/>
        <div style={styles.categoryBadge}>
          {categoryIcons[place.category]} {categoryLabels[place.category]}
        </div>
        {place.featured && (
          <div style={styles.featuredBadge}>⭐ Featured</div>
        )}
        {place.isPreBookable && (
          <div style={styles.bookableBadge}>📅 Pre-Book</div>
        )}
      </div>

      <div style={styles.body}>
        <h3 style={styles.name}>{place.name}</h3>
        <div style={styles.locationRow}>
          <FaMapMarkerAlt style={{color:'var(--accent)', fontSize:'0.8rem', flexShrink:0}}/>
          <span style={styles.locationText}>{place.city}, {place.state}</span>
        </div>

        {place.description && (
          <p style={styles.desc}>
            {place.description.length > 90 ? place.description.slice(0,90) + '...' : place.description}
          </p>
        )}

        <div style={styles.footer}>
          <div style={styles.ratingRow}>
            <div style={styles.stars}>{renderStars(place.rating)}</div>
            <span style={styles.ratingNum}>{parseFloat(place.rating || 0).toFixed(1)}</span>
            <span style={styles.reviewCount}>({place.totalReviews || 0})</span>
          </div>
          {place.priceRange && (
            <span style={styles.price}>{place.priceRange}</span>
          )}
        </div>

        {(place.timings || place.phone) && (
          <div style={styles.metaRow}>
            {place.timings && (
              <div style={styles.metaItem}>
                <FaClock style={{fontSize:'0.75rem', color:'var(--text-light)'}}/>
                <span>{place.timings.split('|')[0].trim()}</span>
              </div>
            )}
            {place.phone && (
              <div style={styles.metaItem}>
                <FaPhone style={{fontSize:'0.75rem', color:'var(--text-light)'}}/>
                <span>{place.phone}</span>
              </div>
            )}
          </div>
        )}

        <button style={styles.viewBtn}>View Details →</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background:'#fff', borderRadius:12, overflow:'hidden',
    border:'1px solid var(--border)', cursor:'pointer',
    transition:'all 0.3s', boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
  },
  imgWrapper: { position:'relative', height:200, overflow:'hidden' },
  img: { width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' },
  categoryBadge: {
    position:'absolute', top:12, left:12,
    background:'rgba(15,37,64,0.85)', color:'#fff',
    padding:'5px 12px', borderRadius:20, fontSize:'0.75rem', fontWeight:700,
  },
  featuredBadge: {
    position:'absolute', top:12, right:12,
    background:'rgba(200,150,60,0.9)', color:'#fff',
    padding:'5px 10px', borderRadius:20, fontSize:'0.72rem', fontWeight:700,
  },
  bookableBadge: {
    position:'absolute', bottom:12, right:12,
    background:'rgba(46,125,50,0.9)', color:'#fff',
    padding:'4px 10px', borderRadius:20, fontSize:'0.72rem', fontWeight:700,
  },
  body: { padding:'16px 18px' },
  name: {
    fontFamily:"'Playfair Display', serif",
    fontSize:'1.05rem', color:'var(--primary-dark)', marginBottom:6, lineHeight:1.3,
  },
  locationRow: { display:'flex', alignItems:'center', gap:5, marginBottom:8 },
  locationText: { fontSize:'0.82rem', color:'var(--text-light)' },
  desc: { fontSize:'0.85rem', color:'var(--text-mid)', lineHeight:1.5, marginBottom:10 },
  footer: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  ratingRow: { display:'flex', alignItems:'center', gap:4 },
  stars: { fontSize:'0.85rem' },
  ratingNum: { fontSize:'0.9rem', fontWeight:700, color:'var(--text-dark)' },
  reviewCount: { fontSize:'0.78rem', color:'var(--text-light)' },
  price: { fontSize:'0.82rem', fontWeight:700, color:'var(--accent-dark)' },
  metaRow: { display:'flex', flexDirection:'column', gap:4, marginBottom:12 },
  metaItem: { display:'flex', alignItems:'center', gap:6, fontSize:'0.78rem', color:'var(--text-light)' },
  viewBtn: {
    width:'100%', padding:'10px', background:'var(--bg-secondary)',
    border:'1.5px solid var(--border)', borderRadius:8, cursor:'pointer',
    fontSize:'0.88rem', fontWeight:700, color:'var(--primary)',
    fontFamily:"'Lato', sans-serif", transition:'all 0.2s',
  },
};

export default PlaceCard;
