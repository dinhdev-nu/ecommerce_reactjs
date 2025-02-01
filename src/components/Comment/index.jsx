import styles from "./index.module.scss";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    user: "John Doe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    rating: 5,
    comment: "Excellent quality and craftsmanship. Worth every penny!",
    date: "2023-12-01"
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.5,
    comment: "Great backpack, but a bit pricey. Overall satisfied with the purchase.",
    date: "2023-11-28"
  }
];

const Comment = () => {
  const renderStars = (rating) => {
    const stars = []; 
    for (let i = 1; i <= 5; i++) {
      if(i <= rating)
        stars.push(<FaStar key={i}  />);
      else if (i - 0.5 === rating)
        stars.push(<FaStarHalfAlt key={i+1} />);
    }
    return stars;
  }
  
  return (
    <div className={styles.reviewsSection}>
      <h2 className={styles.title}>Customer Reviews</h2>
      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <img src={review.avatar} alt={review.user} className={styles.avatar} />
              <div className={styles.reviewInfo}>
                <h3 className={styles.userName}>{review.user}</h3>
                <div className={styles.stars}>{renderStars(review.rating)}</div>
              </div>
                <p className={styles.date}>{review.date}</p>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
