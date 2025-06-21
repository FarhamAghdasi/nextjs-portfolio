"use client";
import React, { useState, useEffect, ChangeEvent, FC, useCallback } from 'react';

type CreateCaptchaProps = {
  onCaptchaChange: (value: string) => void;
};

const CreateCaptcha: FC<CreateCaptchaProps> = ({ onCaptchaChange }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [captchaImage, setCaptchaImage] = useState<string>('');

  const generateCaptchaCode = (): string => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  };

  const generateCaptchaImage = (code: string): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return '';

    const width = 200;
    const height = 60;
    canvas.width = width;
    canvas.height = height;

    const backgroundColor = '#f0f0f0';
    const textColor = '#333';
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const lineColor = '#ccc';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    }

    ctx.font = '30px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(code, width / 2, height / 2);

    return canvas.toDataURL('image/png');
  };

  const getCaptcha = useCallback((): void => {
    const newCaptchaCode = generateCaptchaCode();
    const newCaptchaImage = generateCaptchaImage(newCaptchaCode);
    setCaptchaCode(newCaptchaCode);
    setCaptchaImage(newCaptchaImage);
  }, []);

  useEffect(() => {
    getCaptcha();
  }, [getCaptcha]);

  const handleCaptchaInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onCaptchaChange(e.target.value);
  };

  return (
    <div className="col-12">
      <div className="form-group d-flex align-items-center mt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={captchaImage}
          alt="Captcha"
          style={{ cursor: "pointer", marginRight: "10px" }}
          onClick={getCaptcha}
        />
        <input
          type="text"
          name="captcha"
          placeholder="Enter CAPTCHA"
          onChange={handleCaptchaInputChange}
          required
        />
      </div>
    </div>
  );
};

export default CreateCaptcha;
