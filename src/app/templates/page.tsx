import Image from 'next/image';
import Link from 'next/link';
import { Header , Footer , Inner } from '@/components'
import arrowTopRight from '@/assets/icons/arrow-top-right.svg';
import templateData from '@/data/api/template.json';

import { Template } from '@/components/types';

export default function HtmlTemplates() {
  const templates = (templateData.templates || []) as Template[];

  return (
    <>
      <Inner title="HTML Templates" first="Home" secend="HTML Templates" />

      <section className="work-card section-padding pt-0">
        <div className="container">
          <div className="cards">
            {templates.length > 0 ? (
              templates.map((template, index) => (
                <div className="card-item rounded-xl" key={index}>
                  <div className="d-lg-flex align-items-end mt-4">
                    <div>
                      <div className="tags">
                        {template.category ? (
                          <a href="#">{template.category}</a>
                        ) : (
                          <span>No category</span>
                        )}
                      </div>
                      <h3 className="title">
                        <Link href={`/templates/${template.url}`}>{template.title}</Link>
                      </h3>
                    </div>
                    <div className="ml-auto">
                      <a
                        href={template.buyLink}
                        className="mr-3 butn butn-md butn-bord butn-rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="d-flex align-items-center">
                          <span>Buy Now</span>
                          <span className="icon invert ml-10 n">
                            <Image src={arrowTopRight} alt="arrow icon" width={16} height={16} />
                          </span>
                        </div>
                      </a>
                      <Link
                        href={`/templates/${template.url}`}
                        className="mr-3 butn butn-md butn-bord butn-rounded"
                      >
                        <div className="d-flex align-items-center">
                          <span>View Template</span>
                          <span className="icon invert ml-10 n">
                            <Image src={arrowTopRight} alt="arrow icon" width={16} height={16} />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="img fit-img mt-30">
                    <Image
                      src={`/backend/${template.thumbnail}`}
                      alt={template.title}
                      width={800}
                      height={500}
                      className="w-full rounded-xl"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message">No templates found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
