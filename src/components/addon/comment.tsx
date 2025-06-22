'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
const DefaultProfile = '/assets/imgs/profile.png';
import '@/assets/css/comments.css';
import { Comment } from '@/components/types'; // Import Comment

interface CommentsSectionProps {
  url: string;
  initialComments?: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ url, initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

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

    if (!initialComments.length) {
      fetchComments();
    }
  }, [url, initialComments]);

  return (
    <div className="comments-list">
      {comments.length > 0 ? (
        comments
          .filter(comment => comment.parent_id === null)
          .map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <Image
                  src={DefaultProfile}
                  alt="avatar"
                  className="avatar"
                  width={40}
                  height={40}
                  unoptimized
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
                  .filter(reply => reply.parent_id === comment.id)
                  .map(reply => (
                    <div key={reply.id} className="comment reply">
                      <div className="comment-header">
                        <Image
                          src={DefaultProfile}
                          alt="avatar"
                          className="avatar"
                          width={40}
                          height={40}
                          unoptimized
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