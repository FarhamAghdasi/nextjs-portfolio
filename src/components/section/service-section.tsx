import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import smokeBg from '/imgs/smoke-bg.jpg';
import arrowTopRight from '/imgs/icons/arrow-top-right.svg';

import servicesData from '@/data/service-section.json';

interface Service {
  title: string;
  tags: string[];
  image: string;
}

const Services = () => {
  const services: Service[] = servicesData;

  return (
    <section
      className="services-personal section-padding bg-img"
      style={{ backgroundImage: `url(${smokeBg.src})` }}
    >
      <div className="container pt-30 bord-thin-top-light ontop">
        <div className="sec-head mb-80">
          <div className="d-flex">
            <div>
              <span className="sub-head">What I Do ?</span>
            </div>
            <div className="ml-auto">
              <div className="bract">
                {"{"} <span>A+ Support</span> {"}"}
              </div>
            </div>
          </div>
          <div className="row mt-30">
            <div className="col-lg-7 offset-lg-3">
              <div>
                <h2>
                  What areas am I
                  <br /> skilled in?
                </h2>
                <Link href="/about/">
                  <a className="butn-under mt-15">
                    React About My Skills{" "}
                    <span className="icon invert">
                      <Image src={arrowTopRight} alt="" width={16} height={16} />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-end">
          <div className="col-lg-8">
            <div className="serv-items">
              {services.map((service, index) => (
                <div key={index} className="item">
                  <h2>{service.title}</h2>
                  <div className="tags">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                  <div className="img fit-img">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      layout="responsive"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
