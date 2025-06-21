'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DefaultProfile from '@/assets/imgs/profile.png';
import '@/assets/css/comments.css';


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

const CommentsSection: React.FC<CommentsSectionProps> = ({ url }) => {
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
    <div className="comments-list">
      {comments.length > 0 ? (
        comments
          .filter(comment => comment.parent_id === null) // کامنت‌های اصلی
          .map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <Image
                  src={DefaultProfile}
                  alt="avatar"
                  className="avatar"
                  width={40}
                  height={40}
                />
                <div className="comment-details">
                  <h6>{comment.author_name}</h6>
                  <small>{new Date(comment.date).toLocaleString()}</small>
                </div>
              </div>
              <div className="comment-body">
                <p>{comment.content}</p>
              </div>
              <div className="replies">
                {comments
                  .filter(reply => reply.parent_id === comment.id) // پاسخ‌ها
                  .map(reply => (
                    <div key={reply.id} className="comment reply">
                      <div className="comment-header">
                        <Image
                          src={DefaultProfile}
                          alt="avatar"
                          className="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="comment-details">
                          <h6>{reply.author_name}</h6>
                          <small>{new Date(reply.date).toLocaleString()}</small>
                        </div>
                      </div>
                      <div className="comment-body">
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
};

export default CommentsSection;
