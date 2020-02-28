import React, { useState, useEffect, useContext } from 'react';
import { FuncContext } from './contexts/FunctionsProvider';
import styled from 'styled-components';
import Loader from './LoaderQuote';

import axios from 'axios';

const Quote = styled.section`
  /* max-width: 600px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 70px;
  align-items: center;
  /* align-items: center; */
  /* margin: 70px auto 30px;
  background-position: center;
  background-size: cover; */
  /* background-color: red; */

  /* img {
    width: 90%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
    z-index: -1;
    left: 200px;
    top: 0;
    right: 100px;
    overflow: hidden;
  } */
`;

const QuoteContainer = styled.div`
  /* width: 100%; */
  margin-top: 40px;
  margin: 40px 0 40px;
  max-width: 600px;
  position: relative;
  /* margin: 15px auto 35px; */
`;

const QuoteContent = styled.blockquote`
  /* border: 2em solid transparent; */
  font-size: 20px;
  /* font-family: 'Great Vibes', cursive; */
  font-style: italic;
  line-height: 1.3;
  letter-spacing: 1.5px;
  width: 85%;
  text-align: center;
  font-family: 'Gentium Basic', serif;

  margin: 5px 0;

  footer {
    padding-top: 10px;

    & cite {
      font-style: normal;
      font-size: 22px;
      font-weight: bold;
      white-space: nowrap;
    }
  }
`;

const UpperLine = styled.div`
  position: absolute;
  top: 0;

  width: 20%;
  top: -30%;
  right: 48%;
  height: 2px;

  background: #1d2122;

  margin-top: 15px;
`;

const BelowLine = styled.div`
  position: absolute;
  bottom: -30%;
  right: 48%;
  margin: 0 auto;
  width: 20%;
  height: 2px;
  /* width: 100px; */
  /* height: 2margin: 0 auto;px; */
  background: #1d2122;
  margin-bottom: 12px;
  /* margin-right: 70px; */
`;

const SpaceForNoQuote = styled.div`
  margin-top: 150px;
  & img {
  }
`;

const LoaderContainer = styled.div`
  /* margin-top: 80px; */
  text-align: center;
  margin: 80px auto;
  position: relative;
  right: 40px;
`;

export default () => {
  const { quoteOption, singleQuoteDb, quotesDb } = useContext(FuncContext);

  const [quote, setQuote] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const [qStatus, setQStatus] = useState('');

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = async () => {
    let quoteStatus = localStorage.getItem('quoteStatus');
    setQStatus(quoteStatus);
    if (!quoteStatus) {
      quoteStatus = quoteOption;
      setQStatus(quoteStatus);
    }

    if (quoteStatus === 'many') {
      let quotes = JSON.parse(localStorage.getItem('quoteMany')) || quotesDb;
      let singleQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(singleQuote);
      setIsLoaded(true);
    } else if (quoteStatus === 'one') {
      const quote =
        JSON.parse(localStorage.getItem('quoteOne')) || singleQuoteDb;
      setQuote(quote);
      setIsLoaded(true);
    } else {
      try {
        const res = await axios.get('https://type.fit/api/quotes');
        let data = res.data;
        let singleQuote = data[Math.floor(Math.random() * data.length)];

        setQuote(singleQuote);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {!isLoaded && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {quote ? (
        <Quote>
          <QuoteContainer>
            <UpperLine />
            {!isLoaded && <Loader />}
            <QuoteContent>
              {qStatus ? quote.quote : quote.text}
              {/* {quote.quote} */}
              <footer>
                {/* &mdash; */}
                {qStatus ? (
                  <cite> {quote.author === null ? '' : quote.author}</cite>
                ) : (
                  <cite>
                    {' '}
                    {quote.author === null ? ' Author Unknown' : quote.author}
                  </cite>
                )}
              </footer>
            </QuoteContent>
            <BelowLine />
          </QuoteContainer>
        </Quote>
      ) : (
        <SpaceForNoQuote>{/* <img src="/feather.jpg" /> */}</SpaceForNoQuote>
      )}
    </>
  );
};
