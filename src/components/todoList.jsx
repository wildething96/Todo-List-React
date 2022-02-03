import styled, { css } from "styled-components";
import React, { useState } from "react";

const AddTodo = () => {
  const [todoList, setTodoList] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [item, setItem] = useState();

  const addItem = (event) => {
    event.preventDefault();
    let tempArr = [...todoList];
    tempArr.push(item);
    setTodoList(tempArr);
  };

  const next = (newList, index, list) => {
    let tempTodo = list === "Todo" ? [...todoList] : [...inProgress];
    tempTodo.splice(index, 1);
    list === "Todo" ? setTodoList(tempTodo) : setInProgress(tempTodo);
    list === "Todo" ? setInProgress(newList) : setDone(newList);
  };

  const previous = (newList, index, list) => {
    let tempTodo = list === "In Progress" ? [...inProgress] : [...done];
    tempTodo.splice(index, 1);
    list === "In Progress" ? setInProgress(tempTodo) : setDone(tempTodo);
    list === "In Progress" ? setTodoList(newList) : setInProgress(newList);
  };

  const del = (newList, list) => {
    list === "Todo"
      ? setTodoList(newList)
      : list === "In Progress"
      ? setInProgress(newList)
      : setDone(newList);
  };

  return (
    <div>
      <h1>Todo List Organiser</h1>
      <form onSubmit={addItem}>
        <input type="text" onChange={(event) => setItem(event.target.value)} />
        <br />
        <Add>
          Add Item <span>+</span>
        </Add>
      </form>
      <Flex>
        <List
          title="Todo"
          current={todoList}
          next={inProgress}
          nextFunction={next}
          del={del}
        />
        <List
          title="In Progress"
          previous={todoList}
          current={inProgress}
          next={done}
          nextFunction={next}
          prevFunction={previous}
          del={del}
        />
        <List
          title="Finished"
          previous={inProgress}
          current={done}
          prevFunction={previous}
          del={del}
        />
      </Flex>
    </div>
  );
};

const List = (props) => {
  const next = (item) => {
    let tempArr = [...props.next];
    tempArr.push(item);
    let index = props.current.indexOf(item);
    props.nextFunction(tempArr, index, props.title);
  };

  const previous = (item) => {
    let tempArr = [...props.previous];
    tempArr.push(item);
    let index = props.current.indexOf(item);
    props.prevFunction(tempArr, index, props.title);
  };

  const del = (item) => {
    let tempArr = [...props.current];
    let index = props.current.indexOf(item);
    tempArr.splice(index, 1);
    props.del(tempArr, props.title);
  };

  let num = 0;
  return (
    <Spacer key={num}>
      <h1>{props.title}</h1>
      {
        (console.log(props.current),
        props.current.map((item) => {
          num++;
          return (
            <Item>
              <h3>{item}</h3>
              <Flex key={num}>
                {props.title !== "Todo" && (
                  <button onClick={() => previous(item)}>Previous</button>
                )}
                {props.title !== "Finished" && (
                  <button onClick={() => next(item)}>Next</button>
                )}
                {props.title !== "In Progress" && (
                  <button onClick={() => del(item)}>Delete</button>
                )}
              </Flex>
            </Item>
          );
        }))
      }
    </Spacer>
  );
};

export default AddTodo;

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  button {
    margin-bottom: 1rem;
    height: 40px;
    width: 120px;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 1em;
    border: 2px solid #e8e7e7;
    background: #faaca8;
    cursor: pointer;
  }
`;

const Item = styled.div`
  border-top: 2px solid #e8e7e7;
  border-bottom: 2px solid #e8e7e7;
  background: #eecccc;
  overflow-x: auto;
  &:last-of-type {
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }
`;

const Spacer = styled.div`
  color: white;
  width: 30%;
  min-width: 190px;
  max-width: 400px;
  background: #faaca8;
  margin: 4rem 2rem;
  border-radius: 20px;
  border: 2px solid lightgrey;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Add = styled.button`
  width: 20%;
  max-width: 150px;
  height: 40px;
  border-radius: 7px;
  cursor: pointer;
  background: #9C8181;
  color: white;
  font-size: 1.2em;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
