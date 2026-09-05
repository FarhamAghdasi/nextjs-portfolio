"use client"
import React, { useState } from 'react';
import data from '@/data/contactus-page.json';

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
                <div className="flex flex-wrap gap-3 mt-[60px]">
                  {[
                    { href: contact.social.telegram, label: 'Telegram', icon: 'fa-brands fa-telegram', cardClass: 'social-card-telegram' },
                    { href: contact.social.github, label: 'GitHub', icon: 'fa-brands fa-github', cardClass: 'social-card-github' },
                    { href: contact.social.linkedin, label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', cardClass: 'social-card-linkedin' },
                    { href: contact.social.instagram, label: 'Instagram', icon: 'fa-brands fa-instagram', cardClass: 'social-card-instagram' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 ${item.cardClass}`}
                    >
                      <i className={item.icon} />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
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
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-[0_0_35px_-6px_rgba(255,255,255,0.7)] transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_45px_-6px_rgba(255,255,255,0.9)]"
                      >
                        <span>{texts.submitButton}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <path
                            d="M3 11L11 3M11 3H5M11 3V9"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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