import React, { useState, useEffect, useContext } from 'react';
import { FuncContext } from './contexts/FunctionsProvider';
import styled from 'styled-components';
import Loader from './LoaderQuote';
import { device } from './contexts/FunctionsProvider';

import axios from 'axios';

const Quote = styled.section`
  /* max-width: 600px; */

  @media ${device.mobileS} {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 50px;
    align-items: center;
  }

  @media ${device.laptop} {
    margin-top: 70px;
  }
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

  @media ${device.mobileS} {
    font-size: 16px;

    font-style: italic;
    line-height: 1.3;
    letter-spacing: 1.5px;
    width: 85%;
    text-align: center;
    font-family: 'Gentium Basic', serif;

    margin: 5px auto;
  }

  @media ${device.mobileL} {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 19px;
  }

  @media ${device.laptop} {
    font-size: 21px;
  }

  @media ${device.laptopL} {
    font-size: 21px;
  }

  @media ${device.desktop} {
    font-size: 23px;
  }

  footer {
    padding-top: 10px;
    font-style: normal;
    font-weight: bold;
    white-space: nowrap;

    & cite {
      @media ${device.mobileS} {
        font-size: 19px;
      }

      @media ${device.mobileL} {
        font-size: 20px;
      }

      @media ${device.tablet} {
        font-size: 20px;
      }

      @media ${device.laptop} {
        font-size: 21px;
      }

      @media ${device.laptopL} {
        font-size: 23px;
      }

      @media ${device.desktop} {
        font-size: 25px;
      }
    }
  }
`;

const UpperLine = styled.div`
  @media ${device.mobileS} {
    position: absolute;
    top: 0;

    width: 20%;
    top: -20%;
    right: 40%;
    height: 2px;

    background: #1d2122;

    margin-top: 15px;
  }

  @media ${device.mobileL} {
    top: -25%;
    height: 2px;
  }

  @media ${device.laptop} {
    top: -30%;
    height: 2px;
  }
`;

const BelowLine = styled.div`
  @media ${device.mobileS} {
    position: absolute;
    bottom: -20%;
    right: 40%;
    margin: 0 auto;
    width: 20%;
    height: 2px;
    /* width: 100px; */
    /* height: 2margin: 0 auto;px; */
    background: #1d2122;
    margin-bottom: 12px;
    /* margin-right: 70px; */
  }

  @media ${device.mobileM} {
    bottom: -25%;

    height: 2px;
  }

  @media ${device.laptop} {
    bottom: -30%;
    height: 2px;
  }
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
