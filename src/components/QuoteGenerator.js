import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  max-width: 600px;
  position: relative;
  /* margin: 15px auto 35px; */
`;

const QuoteContent = styled.blockquote`
  /* border: 2em solid transparent; */
  font-size: 18px;
  font-family: 'Lora', serif;
  font-style: italic;
  line-height: 1.5;
  width: 85%;
  text-align: center;

  footer {
    padding-top: 10px;

    & cite {
      font-style: normal;
      font-size: 22px;
      font-weight: bold;
    }
  }
`;

const UpperLine = styled.div`
  /* -webkit-transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -moz-transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1); */

  /* width: 0px; */
  width: 100px;

  height: 1px;
  /* background: #fff; */
  background: black;

  margin-bottom: 20px;
  margin-top: 15px;
  margin-right: 70px;
`;

const BelowLine = styled.div`
  /* -webkit-transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -moz-transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: width 900ms cubic-bezier(0.165, 0.84, 0.44, 1); */
  width: 100px;
  height: 1px;
  background: black;
  margin-bottom: 12px;
  margin-top: 20px;
  margin-right: 70px;
`;

export default () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = async () => {
    try {
      const res = await axios.get('https://type.fit/api/quotes');
      let data = res.data;
      let singleQuote = data[Math.floor(Math.random() * data.length)];

      return setQuote(singleQuote);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Quote>
      <UpperLine></UpperLine>
      <QuoteContainer>
        <QuoteContent>
          {quote.text}
          <footer>
            {/* &mdash; */}
            <cite> {quote.author === null ? 'Unknown' : quote.author}</cite>
          </footer>
        </QuoteContent>
      </QuoteContainer>
      <BelowLine></BelowLine>
    </Quote>
  );
};
