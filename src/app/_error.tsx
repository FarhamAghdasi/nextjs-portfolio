import { NextPageContext } from 'next';
import React from 'react';
import { Header , Footer , Inner , SEO } from '@/components';
import errorTexts from '@/data/errors.json';

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
  const message = (errorTexts as Record<string, string>)[String(statusCode)] || errorTexts.default;

  return (
    <>
      <SEO
        title={`Error ${statusCode}`}
        description={message}
        url="https://farhamaghdasi.ir/error"
        noIndex
      />

      <Header />
      <Inner
        title={String(statusCode)}
        first="Home"
        secend={`Error ${statusCode}`}
        cpage={
          <p>
            {message} <br />
            Back to <a href="/" className="underline text-blue-500">Home</a>
          </p>
        }
        noimage
      />
      <Footer />
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

export default ErrorPage;
