"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import data from '@/data/contactus-page.json';
import ArrowRightTop from '@/assets/imgs/icons/arrow-top-right.svg'

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
    <section className="contact-pg section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 valign">
            <div className="full-width md-mb80">
              <div className="sec-head md-mb80">
                <h2 className="text-u">
                  Let&rsquo;s make your <br /> brand <span className="fw-200">{texts.headerHighlight}</span>
                </h2>
                <p className="mt-20 mb-20">{texts.description}</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="morinfo mt-30">
                      <h6 className="mb-15">Address</h6>
                      <p>{contact.address}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="morinfo mt-30">
                      <h6 className="mb-15">Email</h6>
                      {contact.emails.map(email => (
                        <a key={email} href={`mailto:${email}`}>{email}</a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="phone fz-30 fw-600 mt-30 underline main-color">
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
                <ul className="rest social-text d-flex mt-60 fz-16">
                  <li className="mr-30">
                    <a href={contact.social.telegram} target='_blank' rel="noreferrer" className="hover-this">
                      <span className="hover-anim">Telegram</span>
                    </a>
                  </li>
                  <li className="mr-30">
                    <a href={contact.social.github} target='_blank' rel="noreferrer" className="hover-this">
                      <span className="hover-anim">Github</span>
                    </a>
                  </li>
                  <li className="mr-30">
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
          <div className="col-lg-6 offset-lg-1 valign">
            <div className="full-width">
              <div className="sec-head mb-50">
                <h6 className="sub-head">{texts.contactTitle}</h6>
              </div>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="messages">{responseMessage}</div>
                <div className="controls row">
                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        placeholder={texts.formPlaceholders.name}
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-30">
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder={texts.formPlaceholders.email}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-30">
                      <input
                        id="form_subject"
                        type="text"
                        name="subject"
                        placeholder={texts.formPlaceholders.subject}
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        id="form_message"
                        name="message"
                        placeholder={texts.formPlaceholders.message}
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mt-30">
                      <button
                        type="submit"
                        className="butn butn-md butn-bord butn-rounded"
                      >
                        <div className="d-flex align-items-center">
                          <span>{texts.submitButton}</span>
                          <span className="icon ml-10">
                            <Image
                              src={ArrowRightTop}
                              alt=""
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
