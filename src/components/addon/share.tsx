"use client"
import React from 'react';

import { ShareButtonsProps } from '../types'

const ShareButtons: React.FC<ShareButtonsProps> = ({ currentUrl, currentTitle }) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(currentTitle)}`;
    const youtubeShareUrl = `https://www.youtube.com/share?url=${encodeURIComponent(currentUrl)}`;

    return (
        <div>
            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f" />
            </a>
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter" />
            </a>
            <a href={youtubeShareUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube" />
            </a>
        </div>

    );
};

export default ShareButtons;
