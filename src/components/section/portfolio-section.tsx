import React from 'react';
import Link from 'next/link';

import portfoliosData from '@/data/api/portfolio.json';
import templatesData from '@/data/api/template.json';

import { PortfolioItem , TemplateItem } from '../types'

const Work: React.FC = () => {
  const portfolios: PortfolioItem[] = portfoliosData.portfolio || [];
  const htmlTemplates: TemplateItem[] = templatesData.templates || [];

  return (
    <section className="work-min ontop bord-thin-top-light">
      <div className="container pt-30 bord-thin-top-light">
        <div className="sec-head mb-80 col-lg-7 offset-lg-3">
          <h2>My Projects <br />and Website Templates</h2>
        </div>
        <div className="row">
          {portfolios.length > 0 ? (
            portfolios.slice(0, 2).map((portfolio) => (
              <div className="col-lg-6 fade-up" key={portfolio.url}>
                <div className="item md-mb50">
                  <div className="img fit-img">
                    <img
                      src={`https://farhamaghdasi.ir/uploads/${portfolio.thumbnail}`}
                      alt={portfolio.title}
                    />
                  </div>
                  <div className="cont mt-30">
                    <div className="info">
                      <span className="date">{new Date(portfolio.date).getFullYear()}</span>
                      <span className="tag">{portfolio.category || 'Portfolio'}</span>
                    </div>
                    <h5>
                      <Link href={`/portfolio/${portfolio.url}/`}>
                        {portfolio.title}
                      </Link>
                    </h5>
                    <p>{portfolio.Shortdescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-12">
              <p>No portfolios available at the moment.</p>
            </div>
          )}

          {htmlTemplates.length > 0 ? (
            htmlTemplates.slice(0, 2).map((template) => (
              <div className="col-lg-6 fade-up" key={template.url}>
                <div className="item md-mb50">
                  <div className="img fit-img">
                    <img
                      src={`https://farhamaghdasi.ir/uploads/${template.thumbnail}`}
                      alt={template.title}
                    />
                  </div>
                  <div className="cont mt-30">
                    <div className="info">
                      <span className="date">{new Date(template.date).getFullYear()}</span>
                      <span className="tag">{template.category || 'HTML Template'}</span>
                    </div>
                    <h5>
                      <Link href={`/templates/${template.url}/`}>
                        {template.title}
                      </Link>
                    </h5>
                    <p>{template.Shortdescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-12">
              <p>No HTML templates available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
