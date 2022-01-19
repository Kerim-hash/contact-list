import React, { useState } from "react";
import Modal from "./modal/modal";
import "./index.css";
import { useLocalStorage } from "../../hook/useLocalStorage";
const Content = ({ results, contacts, setСontacts}) => {
  // State and state setter for the modal
  const [modal, setModal] = useState(false);
  const [contact, setСontact] = useLocalStorage("contact", JSON.parse(localStorage.getItem("contact")))
 
  const handleClick = (item) => {
    setModal(!modal)
    document.body.style.overflow = 'hidden';
    setСontact(item)
  }

  return (
    <div className="content">
      <div className="wrapper">
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>username</th>
              <th>email</th>
              <th>phone</th>
              <th>website</th>
              <th>city</th>
            </tr>
          </thead>
          <tbody>
          {results !== null && results.length > 0 ? results.map((item) => {
             return <tr onClick={() => handleClick(item)} key={item.id}>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.website}</td>
                <td>{item.city}</td>
              </tr>
            }) : 
            <tr className="content__notFound" > <td>не найдено</td> </tr>
          }
          </tbody>
        </table>
      </div>
      {modal && <Modal setModalActive={setModal} contacts={contacts} setСontacts={setСontacts} contact={contact}/>}
    </div>
  );
};

export default Content;
