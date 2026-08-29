"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import data from '@/data/contactus-page.json';
const ArrowRightTop = '/assets/imgs/icons/arrow-top-right.svg'

const ContactPageContent = () => {
  const { contact, texts } = data;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.farhamaghdasi.ir/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setResponseMessage(texts.successMessage);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setResponseMessage(texts.failureMessage);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseMessage(texts.errorMessagePrefix + error.message);
      } else {
        setResponseMessage(texts.errorMessagePrefix + 'Unexpected error occurred.');
      }
    }
  };

  return (
    <section className="section-padding max-md:[&_.sec-head_h2]:text-[30px]">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-5/12 flex items-center lg:mt-[0px] mt-4">
            <div className="full-width md:mb-[80px]">
              <div className="sec-head md:mb-[80px]">
                <h2 className="text-u">
                  Let&rsquo;s make your <br /> brand <span className="font-extralight">{texts.headerHighlight}</span>
                </h2>
                <p className="mt-[20px] mb-[20px]">{texts.description}</p>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-6/12">
                    <div className="morinfo mt-[30px]">
                      <h6 className="mb-[15px]">Address</h6>
                      <p>{contact.address}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-6/12">
                    <div className="morinfo mt-[30px]">
                      <h6 className="mb-[15px]">Email</h6>
                      {contact.emails.map(email => (
                        <a key={email} href={`mailto:${email}`}>{email}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="phone text-[30px] font-semibold mt-[30px] main-color transition-all duration-500 ease-in-out hover:my-6">
                  <a href={`tel:${contact.phone}`} className="transition-all duration-300 hover:text-white">{contact.phone}</a>
                </div>
                <ul className="rest social-text flex mt-[60px] text-[16px]">
                  <li className="mr-[30px]">
                    <a href={contact.social.telegram} target='_blank' rel="noreferrer" className="hover-this">
                      <span className="hover-anim">Telegram</span>
                    </a>
                  </li>
                  <li className="mr-[30px]">
                    <a href={contact.social.github} target='_blank' rel="noreferrer" className="hover-this">
                      <span className="hover-anim">Github</span>
                    </a>
                  </li>
                  <li className="mr-[30px]">
                    <a href={contact.social.linkedin} target='_blank' rel="noreferrer" className="hover-this">
                      <span className="hover-anim">LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.social.instagram} target='_blank' rel="noreferrer" className="hover-this">
                      <span className="hover-anim">Instagram</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 lg:ml-[8.33%] flex items-center mt-4">
            <div className="full-width">
              <div className="sec-head mb-[50px]">
                <h6 className="sub-head">{texts.contactTitle}</h6>
              </div>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center mb-8 text-main underline">{responseMessage}</div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12">
                    <div className="form-group mb-[30px]">
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        className="w-full border-0 border-b border-white/20 bg-transparent text-white py-[15px] focus:border-white"
                        placeholder={texts.formPlaceholders.name}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12">
                    <div className="form-group mb-[30px]">
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        className="w-full border-0 border-b border-white/20 bg-transparent text-white py-[15px] focus:border-white"
                        placeholder={texts.formPlaceholders.email}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="form-group mb-[30px]">
                      <input
                        id="form_subject"
                        type="text"
                        name="subject"
                        className="w-full border-0 border-b border-white/20 bg-transparent text-white py-[15px] focus:border-white"
                        placeholder={texts.formPlaceholders.subject}
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        name="message"
                        className="w-full border-0 border-b border-white/20 bg-transparent text-white py-[15px] focus:border-white min-h-[180px]"
                        placeholder={texts.formPlaceholders.message}
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mt-[30px]">
                      <button
                        type="submit"
                        className="butn butn-md butn-bord butn-rounded hover:text-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.5)] hover:bg-black [&:hover_.icon_img]:[filter:brightness(0)_invert(1)]"
                      >
                        <div className="flex items-center">
                          <span>{texts.submitButton}</span>
                          <span className="icon ml-[10px]">
                            <Image
                              src={ArrowRightTop}
                              alt="Arrow top right"
                              width={24}
                              height={24}
                              unoptimized
                            />
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageContent;