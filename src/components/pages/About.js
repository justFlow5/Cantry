import React from 'react';
import styled from 'styled-components';
import NavBar from '../Navbar';
import Intro from '../../images/intro.jpg';
import FinishLine from '../../images/finish.png';
import Plan from '../../images/manlaptop.png';
import Knowledge from '../../images/mind.png';
import Start from '../../images/start.jpg';
import Shadow from '../../images/shadow.png';
import { device } from '../contexts/FunctionsProvider';

const Introduction = styled.div`
  position: relative;
  @media ${device.mobileS} {
    width: 100%;
    margin-top: 70px;
    display: flex;
    flex-direction: column;

    align-items: center;

    overflow: hidden;
    margin-bottom: 70px;
    /* padding: 80px 0; */
  }
  @media ${device.tablet} {
    padding: 80px 0;
  }

  @media ${device.laptop} {
    margin-top: 70px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 70px;
  }

  & .textSection {
    position: relative;
    @media ${device.mobileS} {
      width: 80%;
    }

    @media ${device.tablet} {
      width: 65%;
      margin-left: 10%;
    }

    @media ${device.laptop} {
      width: 25%;
      /* margin-left: unset; */
    }

    & .header {
      @media ${device.mobileS} {
        font-size: 24px;
      }

      @media ${device.mobileL} {
        font-size: 28px;
      }

      @media ${device.tablet} {
        font-size: 34px;
      }
    }

    & .text {
      @media ${device.mobileS} {
        font-size: 15px;
        margin-top: 10px;
      }

      @media ${device.mobileL} {
        font-size: 16px;
      }
      @media ${device.tablet} {
        /* display: none; */
        margin-top: 15px;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }

  & .intro {
    max-height: 410px;
    /* flex: 1 1 0; */

    @media ${device.mobileS} {
      margin-top: 30px;
      margin: 30px 5% 0;
      width: 90%;
    }

    @media ${device.mobileL} {
      width: 90%;
    }

    @media ${device.tablet} {
      margin-top: none;
      width: 60%;
    }

    @media ${device.laptop} {
      /* width: 35%; */
      margin: 0 5%;
      width: unset;
      /* min-width: 600px; */
    }
  }
`;

const PlanSection = styled.div`
  width: 100%;
  background: rgba(61, 57, 61, 1);
  color: rgba(244, 244, 244, 0.7);
  /* margin: 120px 15%; */
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  flex-wrap: wrap-reverse;

  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 70px;
  /* padding: 80px 0; */

  @media ${device.tablet} {
    padding: 80px 0;
  }

  & .text {
    @media ${device.mobileS} {
      margin-top: 60px;
      margin-left: 5px;
      width: 70%;
      justify-self: flex-start;
      line-height: 1.5;
      font-size: 18px;
    }

    @media ${device.mobileL} {
      width: 55%;
    }

    @media ${device.tablet} {
      margin-top: 15px;
      margin-left: 5px;
      line-height: 1.6;
      width: 30%;
      justify-self: flex-start;

      font-size: 19px;
    }

    @media ${device.laptop} {
      font-size: 21px;
      line-height: 1.7;
    }
  }

  & .girl {
    @media ${device.mobileS} {
      width: 100%;
    }
    @media ${device.mobileL} {
      width: 70%;
    }
    @media (min-width: 600px) {
      width: 50%;
    }

    @media ${device.tablet} {
      width: unset;
      justify-self: end;
    }
  }
`;

const OrganizerSection = styled.div`
  @media ${device.mobileS} {
    width: 100%;
    /* margin: 120px 15%; */
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* margin-bottom: 70px; */
  }
  @media ${device.laptop} {
    /* margin-bottom: 70px; */
  }

  & .text {
    @media ${device.mobileS} {
      margin-left: 5px;
      width: 75%;
      line-height: 1.5;
      font-size: 18px;
      margin-bottom: 30px;
    }

    @media ${device.mobileL} {
      font-size: 18px;
    }

    @media ${device.laptop} {
      width: 45%;
      /* justify-self: flex-start; */
      line-height: 1.7;
      font-size: 21px;
      margin-bottom: unset;
    }
  }

  & .papers {
    @media ${device.mobileS} {
      position: relative;
      bottom: 40px;
      width: 80%;
      margin-top: 30px;
    }
    @media ${device.tablet} {
      margin-top: unset;
      width: 70%;
    }
  }
`;

const QuoteSection = styled.div`
  width: 100%;
  background: rgba(61, 57, 61, 1);
  color: rgba(244, 244, 244, 0.7);
  /* margin: 120px 15%; */
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 70px;

  & .text {
    @media ${device.mobileS} {
      width: 70%;
      justify-self: flex-end;
      line-height: 1.5;
      font-size: 18px;
      margin-top: 70px;
    }

    @media ${device.mobileL} {
      line-height: 1.6;

      font-size: 18px;
    }

    @media ${device.tablet} {
      font-size: 21px;
      line-height: 1.7;
      width: 30%;
      margin-top: unset;
    }
  }

  & .knowledge {
    @media ${device.mobileS} {
      width: 100%;
      margin: 0 0 70px;
    }
    @media ${device.mobileL} {
      width: 70%;
    }
    @media (min-width: 600px) {
      width: 50%;
    }

    @media ${device.tablet} {
      width: unset;
      margin: 60px 0;
    }
  }
`;

const SummarySection = styled.div`
  width: 100%;
  position: relative;
  /* margin: 120px 15%; */
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 70px;

  & .text {
    @media ${device.mobileS} {
      width: 70%;
      justify-self: flex-end;
      line-height: 1.5;
      font-size: 18px;
      margin-top: 20px;
    }

    @media ${device.mobileL} {
      line-height: 1.6;

      font-size: 18px;
    }

    @media ${device.tablet} {
      font-size: 21px;
      line-height: 1.7;
      width: 30%;
      margin-top: unset;
    }

    & > span {
      @media ${device.mobileS} {
        position: absolute;
        bottom: 18px;
        margin: 0 auto;
        font-size: 32px;
        font-weight: 600;
      }

      @media ${device.tablet} {
        position: static;

        display: block;
        margin: 0 auto;
        text-align: center;
        margin-top: 20px;
      }
    }
  }

  & .businessman {
    padding-bottom: 100px;
    @media ${device.mobileS} {
      width: 90%;
      margin: 30px 0 0;
    }
    @media ${device.mobileL} {
      width: 70%;
    }
    @media (min-width: 600px) {
      width: 50%;
    }

    @media ${device.tablet} {
      width: unset;
      margin: 60px 0;
    }

    @media ${device.laptop} {
      padding-bottom: unset;
    }
  }
`;

const About = () => {
  return (
    <>
      {' '}
      <NavBar />
      <Introduction>
        <div className="textSection">
          <h3 className="header">
            Application Cantry provides all the neccessary tools that will let
            you accomplish your biggest ambitions.
          </h3>
          <p className="text">
            Cantry offers a lot of functionalities including detailed plan
            creation, progress data visualization, organizer, which is a great
            help in arranging your daily duties and inspiring quotes that will
            help you stay motivated.
          </p>
        </div>
        <img className="intro" src={FinishLine} alt="cards" />
      </Introduction>
      <PlanSection>
        <img className="girl" src={Plan} alt="creating Plan" />
        <p className="text">
          Create your plan with 6 simple steps. Each step is followed with clear
          and detailed instructions, so don't worry about getting lost halfway
          through. And remember to take elaborate approach when filling all the
          given fields as it will significantly increase your chances of
          success.
        </p>
      </PlanSection>
      <OrganizerSection>
        <p className="text">
          Take your day obligations under control by listing them in your
          Organizer. After finishing a single task just check it out. This way
          you will spend your day in a much more productive way.
        </p>
        <img className="papers" src={Intro} alt="papers" />
      </OrganizerSection>
      <QuoteSection>
        <p className="text">
          Stay inspired by reading thoughts of the greatest in humankind
          history. Quotes are generated randomly from a great collection, so you
          won't have to worry about getting bored from repetitiveness. In case
          you have your own preferences, you can always set your custom quotes.
        </p>
        <img className="knowledge" src={Knowledge} alt="papers" />
      </QuoteSection>
      <SummarySection>
        <img className="businessman" src={Shadow} alt="papers" />
        <p className="text">
          Do not wait any longer. You are at the very beginning of your journey.
          The bigger your goals the more daunting they may seem to you to
          accomplish. But rest assured! You have all the neccessary tools at
          your disposal to make them come true. <span>Good luck!</span>
        </p>
      </SummarySection>
    </>
  );
};
export default About;
