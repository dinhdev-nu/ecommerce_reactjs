import React, { useState, useEffect, useRef } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply, FaFlag, FaSmile } from "react-icons/fa";
import styles from "./index.module.scss";

import avatar from "../../assets/avata.jpg";


const Comment = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: avatar
      },
      text: "This is an amazing post! Thanks for sharing your insights.",
      timestamp: "2 hours ago",
      likes: 5,
      dislikes: 1,
      replies: [
        {
          id: 2,
          user: {
            name: "Jane Smith",
            avatar: avatar
          },
          text: "I completely agree with your points.",
          timestamp: "1 hour ago",
          likes: 3,
          dislikes: 0
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const profanityList = ["bad", "worst", "hate"]; // Basic profanity list

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();

    if (!trimmedComment) {
      setError("Comment cannot be empty");
      return;
    }

    if (profanityList.some(word => trimmedComment.toLowerCase().includes(word))) {
      setError("Please keep comments respectful");
      return;
    }

    const newCommentObj = {
      id: Date.now(),
      user: {
        name: "Current User",
        avatar: avatar
      },
      text: trimmedComment,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments(prev => [newCommentObj, ...prev]);
    setNewComment("");
    setError("");
  };


  return (
    <div className={styles.superContainer}>
      <h1>Comment</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <img src={avatar} alt="Current user" className={styles.avatar} />
          <div className={styles.inputArea}>
            <textarea
              ref={textareaRef}
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                setError("");
              }}
              placeholder="Write a comment..."
              className={styles.textarea}
              maxLength={1000}
            />
            <div className={styles.footer}>
              <div className={styles.emojiSection}>
                <button type="button" className={styles.emojiButton} aria-label="Add emoji">
                  <FaSmile size={20} />
                </button>
                <span className={styles.charCount}>{newComment.length}/1000</span>
              </div>
              <button type="submit" className={styles.submitButton}>
                Post Comment
              </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </form>

      <div
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}
      >
        {comments.map((comment, i) => (
          <CommentCard key={i} comment={comment} isReply={false} />
        ))}
      </div>
    </div >
  );
};

export default Comment;



const CommentCard = ({ comment, isReply }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
    } else {
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
    } else {
      setDisliked(false);
    }
  };

  return (
    <div className={`${styles.commentCard} ${isReply ? styles.reply : ""}`}>
      <div className={styles.commentContainer}>
        <div className={styles.commentHeader}>
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className={styles.avatar}
            onError={(e) => {
              e.target.src = avatar;
            }}
          />
          <div className={styles.commentBody}>
            <div className={styles.commentInfo}>
              <h3 className={styles.userName}>{comment.user.name}</h3>
              <span className={styles.timestamp}>{comment.timestamp}</span>
            </div>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.actions}>
              <button onClick={handleLike} className={liked ? styles.liked : styles.actionButton}>
                <FaThumbsUp /> <span>{comment.likes + (liked ? 1 : 0)}</span>
              </button>
              <button onClick={handleDislike} className={disliked ? styles.disliked : styles.actionButton}>
                <FaThumbsDown /> <span>{comment.dislikes + (disliked ? 1 : 0)}</span>
              </button>
              <button onClick={() => setShowReplyInput(!showReplyInput)} className={styles.actionButton}>
                <FaReply /> <span>Reply</span>
              </button>
              <button className={styles.actionButton}>
                <FaFlag /> <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className={styles.replyInputContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowReplyInput(false);
              setReplyText("");
            }}
          >
            <div className={styles.replyForm}>
              <img
                src={avatar}
                alt="Current user"
                className={styles.avatarSmall}
              />
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className={styles.replyInput}
              />
              <button type="submit" className={styles.replyButton}>
                Reply
              </button>
            </div>
          </form>
        </div>

      )}

      {comment.replies?.map((reply) => (
        <CommentCard key={reply.id} comment={reply} isReply={true} />
      ))}
    </div>
  );
};


