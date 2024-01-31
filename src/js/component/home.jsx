import React, { useState, useEffect } from "react";
import '../../styles/index.css'

const ToDo = () => {
  const [itemToDo, updateItemToDo] = useState("");
  const [list, updateList] = useState({ itemToDo: "" });
  const [listItems, updateListItems] = useState([]);
  const [hoverStates, updateHoverStates] = useState([]);
  const [height, updateHeight] = useState(20 + 'vh')
  const [user, updateUser ] = useState('')

  useEffect(() => {
    updateList({ itemToDo: itemToDo });
    fetch("https://playground.4geeks.com/apis/fake/todos/user")
  }, [itemToDo]);

  const toDoList = () => {
    updateListItems([...listItems, list]);
    updateItemToDo("");
    updateHoverStates([...hoverStates, false]);
    updateHeight(height + 5);
    fctFetch3();
  };

  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    updateHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    updateHoverStates(newHoverStates);
  };

  const handleDelete = (index) => {
    const updatedList = [...listItems];
    updatedList.splice(index, 1);
    updateListItems(updatedList);
    updateHeight(height - 5)
  };

//  const fctFetch = async () => {
//    fetch("https://playground.4geeks.com/apis/fake/todos/user/GoldenDrk", {
//      method: "GET",
//    })
//    .then(resp => {console.log(resp.status); return resp.json()})
//    .then(body => {
//      console.log(body);
//      let content = (body.map((t) => t.label));
//      console.log(content);
//      updateMQM(content)
//    });
//  }

  const fctFetch2 = async () => {
    updateUser("")
    let url = `https://playground.4geeks.com/apis/fake/todos/user/${user}`;
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(resp => {
        console.log(resp.status);
        return resp.json();
      })
      .then(body => {
        let content = (body.map((x) => ({ itemToDo: x.label })));
        console.log(content);
        updateListItems(content)
      })
  }

  const fctFetch3 = () => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/GoldenDrk', {
      method: "PUT",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.status);
        return resp.json();
    })
    .then(data => {
        updateItemToDo(data);
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });}

  const disFetch = () => {
    updateListItems([])
  }

  return (
    <>
      <div className="main__container text-center" style={{height: {height}}}>
        <input
          type="text"
          onChange={(e) => updateItemToDo(e.target.value)}
          value={itemToDo}
          placeholder="What needs to be done?"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              toDoList();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => toDoList()}
        >
          Add
        </button>
        <ul className="items__container fa-ul mt-3">
          {listItems.map((element, index) => (
            <li key={index} className="mt-2">
              <span className="fa-li me-3">
                <i className="fa-solid fa-poo fa-lg"></i>
              </span>
              <div
                className="d-flex justify-content-between ms-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {element.itemToDo}
                {hoverStates[index] && (
                  <button
                    type="button"
                    className="btn-close bg-secondary"
                    aria-label="Close"
                    onClick={() => handleDelete(index)}
                  ></button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <span>{listItems.length} things to do before the deadline!<br /></span>
        <div className="user__input">
          <input
            type="text"
            onChange={(e) => updateUser(e.target.value)}
            value={user}
            placeholder="Input your user name here"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fctFetch2();
              }
            }}
          />
          <button type="button" className="btn btn-light mt-3" onClick={() => fctFetch2()}><i class="fa-solid fa-plug-circle-plus"></i>&nbsp;Connect</button>
        </div>
        <button type="button" className="btn btn-secondary mt-3" onClick={() => disFetch()}><i class="fa-solid fa-plug-circle-minus"></i>&nbsp;Disconnect</button>
      </div>
    </>
  );
}

export default ToDo