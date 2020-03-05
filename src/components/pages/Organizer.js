import React, { useState, useEffect, useContext, useRef } from 'react';

import styled, { keyframes } from 'styled-components';
import uuid from 'uuid';
import NavBar from '../Navbar';

import InputTask from '../formComponents/InputFieldToDo';
import TimeIcon from '../icons/Time';
import BlackCorrect from '../icons/BlackCorrect';

import db from '../../firebase/Firebase';

import { AuthContext } from '../contexts/Auth';

import { device } from '../contexts/FunctionsProvider';

const pulse = keyframes`
to {box-shadow: 0 0 0 25px rgba(232, 76, 61, 0);}}
`;

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
`;
const Container = styled.div`
  @media ${device.mobileS} {
    position: relative;
    margin: 80px auto 60px;
    width: 85%;
    padding-bottom: 20px;
    background: #dadada;
    border-radius: 14px;
    min-height: 520px;
    text-align: center;
    -webkit-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.75);
  }

  @media ${device.mobileL} {
    width: 65%;
  }

  @media ${device.tablet} {
    width: 40%;
    margin: 100px auto;
  }

  & .form-field__control {
    margin: 0;
  }

  /* box-shadow: 0 0 50px 0; */
`;

const Header = styled.h2`
  font-size: 34px;
  letter-spacing: 0.5px;
  position: relative;
  width: 70%;
  color: #1d2122;
  display: inline-block;
  margin: 30px 0;
  /* margin-left: 17%; */
  /* text-align: left; */
  /* margin: 0 auto; */

  /* box-shadow: 0 0 50px 0; */
`;

const Init = styled.button`
  /* position: absolute; */
  /* top: 35%;
  right: 33%; */
  margin: 30px auto 0;
  width: 200px;
  height: 50px;
  border: none;
  padding: 8px 14px;
  box-shadow: 0 0 0 0 #1d2122;
  color: rgba(244, 244, 244, 0.8);
  font-size: 19px;
  border-radius: 4px;
  background-color: #1d2122;
  transition: all 0.4s;
  cursor: pointer;
  -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: ${pulse} 1.25s infinite cubic-bezier(0.66, 0, 0, 1);

  &:hover {
    -webkit-animation: none;
    -moz-animation: none;
    -ms-animation: none;
    animation: none;
    color: #f0f0f0;
    /* box-shadow: 0 10px 10px -5px; */
    -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.75);
  }
`;

const InputContainer = styled.div`
  @media ${device.mobileS} {
    margin: auto auto 10px;
    width: 70%;
    position: relative;
  }

  @media ${device.mobileL} {
    width: 65%;
  }

  @media ${device.tablet} {
    width: 60%;
  }

  &.isHidden {
    display: none;
  }
`;
const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  &.isHidden {
    display: none;
  }
  /* justify-content: flex-start; */

  & button:last-child {
    margin-top: 0;
  }
`;
const AddButton = styled.button`
  width: 220px;
  /* flex: 1 1 0; */
  height: 35px;
  /* color: #e2e2e2; */
  color: #eaeff0;
  border: 1px solid #1d2122;
  border-radius: 4px;
  background-color: #1d2122;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  letter-spacing: 0.6px;
  letter-spacing: 1.5px;
  cursor: pointer;
  text-transform: uppercase;
  margin: 25px auto 10px;

  transition: all 0.3s;

  &.editButton {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 190px;
    font-size: 17px;
    /* padding: 10px 15px; */
  }

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

const Label = styled.p`
  font-size: 17px;
  color: #1d2122;
  font-weight: 600;
  position: relative;
  margin-bottom: 5px;
  text-align: left;
  /* bottom: -5px; */
`;

const TaskList = styled.ul`
  @media ${device.mobileS} {
    margin-bottom: auto;
    width: 85%;

    margin: 0 auto;
    text-align: left;
    list-style-type: none;
  }

  @media ${device.tablet} {
    width: 70%;
  }

  margin-bottom: auto;
  /* padding: auto auto; */
  width: 70%;
  margin: 0 auto;
  text-align: left;
  list-style-type: none;

  &.editing {
    padding-bottom: 110px;
  }
`;
const ToDoItemContainer = styled.div`
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  padding: 15px 10px 0;
  /* margin-bottom: 15px; */
  transition: all 0.3s;

  &:last-child {
    margin-bottom: 30px;
  }

  & svg {
    width: 35px !important;
    height: 35px !important;
    flex-shrink: 0;
    /* margin-right: 15px !important; */
  }

  & hr {
    border: 0;
    height: 1px;
    /* background-image: linear-gradient(90deg, #8c8b8b, #585858, #8c8b8b); */
    background-image: linear-gradient(90deg, #a0a0a0, #585858, #a0a0a0);
    margin-top: 5px;
    position: relative;

    /* */
    /* padding: ; */
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }

  & .deleteField {
    position: absolute;
    top: -7px;
    right: -7px;
    font-size: 16px;
    color: #414a4c;
    cursor: pointer;
    border-radius: 50%;
    padding: 0 3px;
    /* margin-left: 5px; */
    /* padding: 3px; */
    z-index: 12;
    font-weight: 400;
    left: unset;
    /* background-color: #b5b5b5; */

    transition: color 0.3s, font-weight 0.1s linear, background-color 0.3s;

    /* &.ishovered{
    background-color: #b5b5b5;
  } */

    &:hover {
      color: #0e1111;
      color: black;
      /* color: white; */
      font-weight: 600;
      font-size: 15px;

      /* background-color: #b5b5b5; */
      /* padding: 3px; */
    }
  }

  &:hover .deleteField {
    background-color: #c0c0c0;
  }
`;

const ToDoItem = styled.li`
  margin-left: 15px;
  margin-bottom: 5px;
  width: 100%;
  & p {
    /* margin-left: 50px; */
    /* top: -15px; */
    margin-bottom: 2px;

    font-size: 19px;
    position: relative;
    font-weight: 600;
    color: black;
    word-wrap: break-word;
    text-decoration: none;
    width: 100%;
    display: inline-block;
    /* margin-left: 15px; */

    transition: all 0.8s;

    /* display: block; */
    &.crossedLine {
      text-decoration: line-through;
    }
  }

  & span {
    /* margin-left: 50px;
    font-size: 14px;
    top: -20px;

    margin-top: 3px; */

    display: inline-block;
    font-weight: 400;
    color: #808080;
    position: relative;
    word-wrap: break-word;
    text-decoration: none;
    margin-bottom: 8px;

    transition: all 0.3s;

    &.crossedLine {
      text-decoration: line-through;
    }
  }

  /* &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  } */

  /* &:last-child {
    margin-bottom: 30px;
  } */
`;

const Roomtaker = styled.div`
  padding: 8px;
`;

const Organizer = () => {
  const { currentUser } = useContext(AuthContext);

  const [toDoList, setToDoList] = useState(
    JSON.parse(localStorage.getItem('todo')) || []
  );
  const [singleToDo, setSingleToDo] = useState('');
  const [singleToDoNote, setSingleToDoNote] = useState('');
  const [initClicked, setInitClicked] = useState(false);
  const [isEditible, setIsEditible] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);

  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [isHidden, setIsHidden] = useState('');
  const [isPadding, setIsPadding] = useState('editing');

  // const [isbeingHovered, setIsBeingHovered] = useState('');

  const [isCrossed, setIsCrossed] = useState('');

  const addButton = useRef(null);

  const noTaskInfo = 'There is no task scheduled for today';
  const yesTaskInfo = "Today's focus";

  const handleAdd = () => {
    const innerText = addButton.current.innerText;
    const id = uuid();

    // if (innerText === 'ADD TASK') {

    setToDoList([
      ...toDoList,
      { toDo: singleToDo, note: singleToDoNote, done: false, id }
    ]);

    setSingleToDo('');
    setSingleToDoNote('');

    // addButton.current.innerText = 'Save';
    // }
    // else addButton.current.innerText = 'Add task';
  };

  const handleUpdate = (id, e) => {
    // console.log(e.target);
    if (e.target.localName === 'small') {
      deleteTask(id);
      return;
    }

    const updatedToDo = toDoList.map(singleItem => {
      if (singleItem.id === id) {
        let updatedItem = singleItem;
        updatedItem.done = !updatedItem.done;
        return updatedItem;
      } else {
        return singleItem;
      }
    });

    setToDoList(updatedToDo);
    localStorage.setItem('todo', JSON.stringify(updatedToDo));

    db.ref(`users/${currentUser.uid}/todo`).update(updatedToDo);
  };

  const handleIsHidden = () => {
    if (!isHidden) setIsHidden('isHidden');
    // else if (JSON.parse(localStorage.getItem('todo')).length > 0)
    //   setIsHidden('');
  };

  const deleteTask = id => {
    const updatedToDoList = toDoList.filter(singleToDo => {
      return singleToDo.id !== id;
    });
    db.ref(`users/${currentUser.uid}/todo`).set(updatedToDoList);
    setToDoList([...updatedToDoList], updatedToDoList);
  };

  const handleSave = () => {
    db.ref(`users/${currentUser.uid}/todo`).set(toDoList);
    localStorage.setItem('todo', JSON.stringify(toDoList));
  };

  const handleClear = () => {
    db.ref(`users/${currentUser.uid}/todo`).set(null);
    localStorage.removeItem('todo');
    setToDoList([]);
  };

  useEffect(() => {
    getDataFromDb();
  }, []);

  const getDataFromDb = () => {
    db.ref(`users/${currentUser.uid}/todo`)
      .once('value')
      .then(snapshot => {
        // console.log('HEERE snap val', snapshot.val());
        var toDoDb = [];
        snapshot.forEach(taskDb => {
          // console.log('HEERE 2');
          let toDo = taskDb.val();
          toDoDb.push(toDo);
        });
        if (toDoDb.length > 0) {
          setToDoList(toDoDb);
          localStorage.setItem('todo', JSON.stringify(toDoDb));
        }
      });

    // setToDoList(data);
  };
  return (
    <>
      <NavBar />
      <Wrapper>
        <Container>
          {/* <div>{JSON.stringify(toDoList)}</div> */}
          <Header>{toDoList.length === 0 ? noTaskInfo : yesTaskInfo}</Header>
          {!initClicked && toDoList.length === 0 && (
            <Init
              onClick={() => {
                setInitClicked(true);
                setIsEditible(true);
                setIsPadding('');
                if (isHidden) setIsHidden('');
              }}
            >
              Let's get started!
            </Init>
          )}
          <TaskList className={isPadding}>
            {/* <div>{JSON.stringify(toDoList)}</div> */}
            {toDoList.map(singleToDo => {
              return (
                <ToDoItemContainer
                  id={singleToDo.id}
                  key={singleToDo.id}
                  onClick={e => {
                    handleUpdate(singleToDo.id, e);
                  }}
                >
                  {singleToDo.done ? <BlackCorrect /> : <TimeIcon />}

                  <ToDoItem
                  // id={singleToDo.id}
                  // key={singleToDo.id}
                  // onClick={e => {
                  //   handleUpdate(singleToDo.id, e);
                  // }}
                  // onBlur={() => {
                  //   setClickedInputId('');
                  // }}
                  >
                    {/* <TimeIcon /> */}

                    <p className={singleToDo.done ? 'crossedLine' : ''}>
                      {singleToDo.toDo}
                    </p>
                    <br />
                    {singleToDo.note ? (
                      <span className={singleToDo.done ? 'crossedLine' : ''}>
                        {singleToDo.note}
                      </span>
                    ) : (
                      <Roomtaker />
                    )}
                    {!isSaveClicked && isEditible && (
                      <small
                        className="deleteField"
                        onClick={e => {
                          deleteTask(singleToDo.id);
                        }}
                      >
                        &#x2715;
                      </small>
                    )}
                    <hr />
                  </ToDoItem>
                </ToDoItemContainer>
              );
            })}
          </TaskList>
          {/* {toDoList.length === 0 && (
            <Roomtaker>
              <div></div>
            </Roomtaker>
          )} */}
          {(toDoList.length > 0 || initClicked) && isEditible && (
            <InputContainer className={isHidden}>
              <Label>Type Task</Label>
              <InputTask
                textarea
                value={singleToDo}
                action={setSingleToDo}
                isAddClicked={isAddClicked}
                setIsAddClicked={setIsAddClicked}
              />
              <Label>Type Note (optional)</Label>
              <InputTask
                textarea
                value={singleToDoNote}
                action={setSingleToDoNote}
                isAddClicked={isAddClicked}
                setIsAddClicked={setIsAddClicked}
              />
              <ButtonsContainer>
                <AddButton
                  onClick={() => {
                    handleAdd();
                    setIsAddClicked(true);
                  }}
                  ref={addButton}
                  disabled={singleToDo.length === 0}
                >
                  + Add task
                </AddButton>
                <AddButton
                  onClick={() => {
                    setIsSaveClicked(true);
                    handleIsHidden();
                    if (toDoList.length < 1) {
                      setInitClicked(false);
                    }
                    handleSave();
                    setIsEditible(false);
                    setIsPadding('editing');
                  }}
                  disabled={toDoList.length === 0 || singleToDo === 0}
                >
                  Save
                </AddButton>
                <AddButton
                  onClick={() => {
                    // setIsSaveClicked(true);
                    // handleIsHidden();
                    // if (toDoList.length < 1) {
                    //   setInitClicked(false);
                    // }
                    handleClear();
                    setInitClicked(false);
                  }}
                >
                  Clear
                </AddButton>
              </ButtonsContainer>
            </InputContainer>
          )}
          {toDoList.length > 0 && !isEditible && (
            <AddButton
              className="editButton"
              onClick={() => {
                setIsSaveClicked(false);
                setIsHidden('');
                setIsEditible(true);
                setIsPadding('');
              }}
            >
              Edit
            </AddButton>
          )}
          {/* )} */}
        </Container>
      </Wrapper>
    </>
  );
};

export default Organizer;
