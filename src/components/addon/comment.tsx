'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DefaultProfile from '@/assets/imgs/profile.png';
import styles from './comments.module.css';

interface Comment {
  id: number;
  parent_id: number | null;
  author_name: string;
  content: string;
  date: string;
}

interface CommentsSectionProps {
  url: string;
}

export default function CommentsSection({ url }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://api.farhamaghdasi.ir/comments?url=${url}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [url]);

  return (
    <div className={styles.commentsList}>
      {comments.length > 0 ? (
        comments
          .filter(comment => comment.parent_id === null)
          .map(comment => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <Image
                  src={DefaultProfile}
                  alt="avatar"
                  className={styles.avatar}
                  width={40}
                  height={40}
                />
                <div className={styles.commentDetails}>
                  <h6>{comment.author_name}</h6>
                  <small>{new Date(comment.date).toLocaleString()}</small>
                </div>
              </div>
              <div className={styles.commentBody}>
                <p>{comment.content}</p>
              </div>
              <div className={styles.replies}>
                {comments
                  .filter(reply => reply.parent_id === comment.id)
                  .map(reply => (
                    <div key={reply.id} className={`${styles.comment} ${styles.reply}`}>
                      <div className={styles.commentHeader}>
                        <Image
                          src={DefaultProfile}
                          alt="avatar"
                          className={styles.avatar}
                          width={40}
                          height={40}
                        />
                        <div className={styles.commentDetails}>
                          <h6>{reply.author_name}</h6>
                          <small>{new Date(reply.date).toLocaleString()}</small>
                        </div>
                      </div>
                      <div className={styles.commentBody}>
                        <p>{reply.content}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}
