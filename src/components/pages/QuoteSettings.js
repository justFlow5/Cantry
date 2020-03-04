import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FuncContext } from '../contexts/FunctionsProvider';
import { AuthContext } from '../contexts/Auth';

import { device } from '../contexts/FunctionsProvider';

import db from '../../firebase/Firebase';

import { Link } from 'react-router-dom';
import NavBar from '../Navbar';
import Select from 'react-select';
import InputField from '../formComponents/InputQuote';
import uuid from 'uuid';

const Container = styled.div`
  @media ${device.mobileS} {
    width: 95%;
    min-height: 100%;
    margin: calc(50px + 20px) 5% 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media ${device.laptop} {
    margin: calc(50px + 20px) 5%;
    flex-direction: row;
    justify-content: unset;
  }
`;

const QuoteSettingsContainer = styled.div`
  @media ${device.mobileS} {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }

  @media ${device.laptop} {
    width: 50%;
    margin: 0 30px 0 70px;
  }
`;

const QuoteListingContainer = styled.div`
  @media ${device.mobileS} {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 30px auto;
    /* padding-top: 75px 10px 0px; */
  }

  @media ${device.laptop} {
    width: 50%;
    /* margin: 0 30px 0 70px; */
    margin-top: 10%;
  }
`;

const QuoteList = styled.ul`
  @media ${device.mobileS} {
    margin: 0 15%;
  }

  @media ${device.laptop} {
    margin-right: 150px;
  }
`;
const QuoteItem = styled.ul`
  @media ${device.mobileS} {
    font-size: 15px;
    font-family: 'Gentium Basic', serif;

    margin-bottom: 14px;
    color: black;
    position: relative;
    border-radius: 4px;
    word-wrap: break-word;
    border: 1px solid black;
    padding: 20px 10px 35px;
  }

  @media ${device.mobileL} {
    font-size: 16px;
  }

  @media ${device.tablet} {
    font-size: 17px;
  }

  @media ${device.tablet} {
    font-size: 18px;
  }

  @media ${device.desktop} {
    font-size: 20px;
  }

  & span {
    position: absolute;
    /* top: -10px; */
    /* right: -15px; */
    top: 0;
    right: 5px;

    font-size: 15px;
    cursor: pointer;
  }

  & cite {
    font-weight: 600;
    font-size: 15px;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
`;

const QuotesListHeader = styled.h3`
  text-align: left;
  font-size: 26px;
  letter-spacing: 0.3px;
  color: black;
  margin-bottom: 20px;
`;

const QuoteHeader = styled.h2`
  @media ${device.mobileS} {
    position: relative;
    /* margin-top: 20px; */
    font-size: 30px;
    letter-spacing: 1.2px;
    color: #404040;
  }
  @media ${device.mobileL} {
    margin-top: 5px;
    font-size: 35px;
  }

  @media ${device.tablet} {
    margin-top: 10px;
    font-size: 40px;
  }

  @media ${device.laptop} {
    margin-top: 20px;
    font-size: 50px;
  }

  @media ${device.desktop} {
    margin-top: 20px;
    font-size: 55px;
  }
`;

const Content = styled.div`
  position: relative;

  width: 80%;
`;

const QuoteSubtext = styled.p`
  @media ${device.mobileS} {
    font-size: 15px;
    margin: 10px 10px;

    /* letter-spacing: 0.2px; */
    font-weight: 500;
    width: 100%;
  }

  @media ${device.mobileL} {
    font-size: 16px;
  }

  @media ${device.tablet} {
    font-size: 17px;
    margin: 15px 20px;
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
    font-size: 18px;
    margin: 15px 20px;
  }

  @media ${device.desktop} {
  }
`;

const SelectOptions = styled.ul`
  @media ${device.mobileS} {
    list-style-type: circle;
    margin-left: 0px;
    margin-top: 15px;
    list-style-position: outside;
  }

  @media ${device.mobileL} {
  }

  @media ${device.tablet} {
    margin-left: 20px;
  }

  @media ${device.laptop} {
    margin-left: 30px;
  }

  @media ${device.laptopL} {
    margin-left: 35px;
  }

  @media ${device.desktop} {
  }
`;

const SelectItem = styled.li`
  @media ${device.mobileS} {
    margin-bottom: 15px;
    font-size: 16px;
    width: 95%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: #f0f0f0;
    padding: 0px;
    border-radius: 5px;
  }

  @media ${device.mobileL} {
  }

  @media ${device.tablet} {
    padding: 0px 15px;
    width: 70%;
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }

  & > span:first-child {
    font-weight: 700;
    /* display: inline-block; */
    position: relative;
    margin-right: 15px;
    text-align: center;
    line-height: 1.2;
    /* font-size: 14px; */
    border-right: 2px solid black;
    padding: 8px 15px 8px 0;
    width: 63px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 5px; */
  }

  @media ${device.tablet} {
    font-size: 16px;
  }

  & span:last-child {
    @media ${device.mobileS} {
      font-weight: 500;
      display: inline-block;
      padding: 8px 2px 8px;
      font-size: 12px;
    }

    @media ${device.mobileL} {
      font-size: 13px;
    }

    @media ${device.tablet} {
      font-size: 14px;
    }

    @media ${device.laptop} {
      font-size: 15px;
    }

    @media ${device.laptopL} {
    }

    @media ${device.desktop} {
    }
  }
`;

const FormSelect = styled.div`
  /* width: 80%; */

  @media ${device.mobileS} {
    width: 100%;
    margin: 40px auto;
  }

  @media ${device.mobileL} {
    max-width: 220px;
  }

  @media ${device.tablet} {
    /* margin: 40px auto; */
    width: 45%;
  }
`;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: stretch;
//   align-items: center;
//   width: 100%;
// `;

const InputInfo = styled.p`
  @media ${device.mobileS} {
    font-size: 18px;
    color: #404040;
    margin: 0 auto;
    display: inline-block;
    margin-left: 0%;
    margin-bottom: 3px;
  }
  @media ${device.mobileL} {
    margin-left: 10%;
  }

  @media ${device.tablet} {
    margin-left: 15%;
  }
`;

const AddButton = styled.button`
  @media ${device.mobileS} {
    width: 160px;
    height: 40px;
    /* color: #e2e2e2; */
    color: #eaeff0;
    border: 1px solid #1d2122;
    border-radius: 4px;
    background-color: #1d2122;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    letter-spacing: 0.6px;
    letter-spacing: 1.5px;
    cursor: pointer;
    text-transform: uppercase;
    margin: 25px auto;
  }

  @media ${device.mobileL} {
    width: 175px;
    height: 45px;
    font-size: 15px;
  }

  @media ${device.tablet} {
    width: 190px;
    height: 50px;
    font-size: 17px;
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }

  transition: all 0.3s;

  &:hover {
    color: #b1b1b1;
    border: 1px solid black;
    box-shadow: 0 10px 10px -5px;
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[disabled]:active {
    cursor: not-allowed;
    color: #eaeff0;
  }
`;

const QuoteSettings = () => {
  const {
    // quoteOption,
    // setQuoteOption,
    singleQuoteDb,
    // setSingleQuote,
    quotesDb
    // setQuotes
  } = useContext(FuncContext);

  const [quoteOption, setQuoteOption] = useState(
    localStorage.getItem('quoteStatus')
  );

  const [singleQuote, setSingleQuote] = useState(
    JSON.parse(localStorage.getItem('quoteOne')) || singleQuoteDb
  );

  const [quotes, setQuotes] = useState(
    JSON.parse(localStorage.getItem('quoteMany')) || quotesDb
  );

  const { currentUser } = useContext(AuthContext);

  const [temporaryQuote, setTemporaryQuote] = useState('');
  const [temporaryAuthor, setTemporaryAuthor] = useState('');
  const [isAddClicked, setIsAddClicked] = useState(false);

  const options = [
    //   for random generation value is null
    { value: '', label: 'random quotes (default)' },
    { value: 'one', label: 'one custom quote' },
    { value: 'many', label: 'many custom quotes', style: { color: 'red' } }
  ];

  const changeQuoteStatus = status => {
    db.ref(`users/${currentUser.uid}/quotes/status`).set(status);
    localStorage.setItem('quoteStatus', status);
    setQuoteOption(status);
  };

  const addQuote = () => {
    if (quoteOption === 'one') {
      // add to firebase
      db.ref(`users/${currentUser.uid}/quotes/one`).update({
        quote: temporaryQuote,
        author: temporaryAuthor,
        id: uuid()
      });

      const newQuote = {
        quote: temporaryQuote,
        author: temporaryAuthor,
        id: uuid()
      };

      setSingleQuote(newQuote);

      localStorage.setItem('quoteOne', JSON.stringify(newQuote));
      setTemporaryQuote('');
      setTemporaryAuthor('');
    }

    //
    else if (quoteOption === 'many') {
      // add to db
      db.ref(`users/${currentUser.uid}/quotes/many`).update([
        ...quotes,
        { quote: temporaryQuote, author: temporaryAuthor, id: uuid() }
      ]);
      // END add to db

      const newQuotes = [
        ...quotes,
        { quote: temporaryQuote, author: temporaryAuthor, id: uuid() }
      ];

      setQuotes(newQuotes);
      localStorage.setItem('quoteMany', JSON.stringify(newQuotes));

      setTemporaryQuote('');
      setTemporaryAuthor('');
    }
  };

  const deleteQuote = id => {
    if (quoteOption === 'many') {
      const updatedQuotes = quotes.filter(quote => {
        return quote.id !== id;
      });

      //   const upQuotes = [];
      setQuotes(updatedQuotes);
      localStorage.setItem('quoteMany', JSON.stringify(updatedQuotes));

      db.ref(`users/${currentUser.uid}/quotes/many`).set(updatedQuotes);
    } else if (quoteOption === 'one') {
      db.ref(`users/${currentUser.uid}/quotes/one`).set(null);

      setSingleQuote('');
      localStorage.setItem('quoteOne', JSON.stringify(null));
    }
  };

  const QuotesListContainer = styled.div``;

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #707070',
      fontWeight: '600',
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#e2e2e2' : 'white',
      color: state.isSelected ? 'black' : '#404040',
      border: state.isSelected ? '1px solid #9a9a9a' : 'none',
      cursor: state.isSelected ? 'normal' : 'pointer',

      '&:hover': {
        borderColor: '#707070',
        background: '#e2e2e2',
        color: 'black'
      }
    }),
    control: provided => ({
      ...provided,
      paddingTop: '5%'
      //   cursor: 'pointer'
    }),

    control: base => ({
      ...base,
      boxShadow: 'none',
      borderColor: 'gray',
      outline: 'none',

      '&:hover': {
        borderColor: 'black'
      }
    })
  };

  return (
    <>
      <NavBar />
      <Container>
        <QuoteSettingsContainer>
          <QuoteHeader>Quote Settings</QuoteHeader>
          <Content>
            <QuoteSubtext>
              The quotes on the main page are generated randomly from hundreds
              of other quotes. You can change it by selecting a different option
              from the menu below.
              <SelectOptions>
                <SelectItem>
                  <span>one quote </span>
                  {/* <div className="vl"></div> */}
                  <span>
                    type/paste your own selected quote, that will always be
                    displayed on the front of your dashboard.
                  </span>
                </SelectItem>
                <SelectItem>
                  {' '}
                  <span>many quotes </span>
                  <div></div>
                  <span>
                    type/paste as many quotes as you want and watch them
                    randomly appear on the front of your dashboard.
                  </span>
                  {/* <div>{JSON.stringify(quoteOption)}</div> */}
                </SelectItem>
              </SelectOptions>
            </QuoteSubtext>
            <FormSelect>
              <Select
                placeholder={
                  quoteOption
                    ? quoteOption === 'one'
                      ? 'one custom quote'
                      : 'many custom quotes'
                    : 'random quotes'
                }
                options={options}
                styles={customStyles}
                onChange={newValue => {
                  changeQuoteStatus(newValue.value);
                  //   setQuoteOption(newValue.value);
                }}
              ></Select>
            </FormSelect>

            {quoteOption && (
              <>
                <InputInfo>Type quote: </InputInfo>
                <InputField
                  textarea
                  //   content={content}
                  value={temporaryQuote}
                  id={uuid()}
                  name="singleTask"
                  action={setTemporaryQuote}
                  title="Quote"
                  autoComplete="false"
                  isAddClicked={isAddClicked}
                  setIsAddClicked={setIsAddClicked}
                />
                <InputInfo>Type author: </InputInfo>
                <InputField
                  value={temporaryAuthor}
                  id={uuid()}
                  name="singleTask"
                  action={setTemporaryAuthor}
                  title="Author"
                  autoComplete="false"
                  isAddClicked={isAddClicked}
                  setIsAddClicked={setIsAddClicked}
                />
                <AddButton
                  onClick={() => {
                    addQuote();
                  }}
                  disabled={temporaryQuote.length > 0 ? false : true}
                >
                  Add quote
                </AddButton>
              </>
            )}
          </Content>
        </QuoteSettingsContainer>
        <QuoteListingContainer>
          <QuoteList>
            {/* {console.log('QUOOOOTE OPTIONNN: ', quoteOption)} */}
            {(() => {
              //   console.log('QUOOOOTE OPTIONNN BEFORE : ', quoteOption);
              //   console.log('QUOTES.LENGTH BEFORE : ', quotes.length);
              //   console.log('singleQuote BEFORE : ', singleQuote);

              if (quoteOption === 'many' && quotes.length > 0) {
                // console.log('QUOOOOTE OPTIONNN of MANY : ', quoteOption);

                return (
                  <>
                    <QuotesListHeader>Many Custom Quotes</QuotesListHeader>
                    {quotes.map(quote => {
                      return (
                        <QuoteItem>
                          {quote.quote}{' '}
                          <span
                            onClick={() => {
                              deleteQuote(quote.id);
                            }}
                          >
                            &#x2715;
                          </span>
                          <cite>{quote.author}</cite>
                        </QuoteItem>
                      );
                    })}{' '}
                  </>
                );
              } else if (quoteOption === 'one' && singleQuote) {
                // console.log('QUOOOOTE OPTIONNN of one : ', quoteOption);
                return (
                  <>
                    <QuotesListHeader>Single Custom Quote</QuotesListHeader>
                    <QuoteItem>
                      {singleQuote.quote}{' '}
                      <span
                        onClick={() => {
                          deleteQuote(singleQuote.id);
                        }}
                      >
                        &#x2715;
                      </span>
                      <cite>{singleQuote.author}</cite>
                    </QuoteItem>
                  </>
                );
              }
            })()}
            {/* {quoteOption === 'many' && quotes.length > 0 && (
              <>
                <QuotesListHeader>Many Custom Quotes</QuotesListHeader>
                {quotes.map(quote => {
                  return (
                    <QuoteItem>
                      {quote.quote}{' '}
                      <span
                        onClick={() => {
                          deleteQuote(quote.id);
                        }}
                      >
                        &#x2715;
                      </span>
                      <cite>{quote.author}</cite>
                    </QuoteItem>
                  );
                })}{' '}
              </>
            )} */}

            {/* {quoteOption === 'one' && singleQuote && (
              <>
                <QuotesListHeader>Single Custom Quote</QuotesListHeader>
                <QuoteItem>
                  {singleQuote.quote}{' '}
                  <span
                    onClick={() => {
                      deleteQuote(singleQuote.id);
                    }}
                  >
                    &#x2715;
                  </span>
                  <cite>{singleQuote.author}</cite>
                </QuoteItem>
              </>
            )} */}
          </QuoteList>
        </QuoteListingContainer>
      </Container>
    </>
  );
};

export default QuoteSettings;
