import React, { useState } from "react";
import "./index.css";
const Modal = ({ setModalActive, contact, contacts, setСontacts }) => {
  const [contactObj, setContactObj] = useState({
    name: "",
    email: "",
    username: "",
    city: "",
    phone: "",
    website: "",
  });

  // change each contactObj
  const handleChange = (e) => {
    const value = e.target.value;
    setContactObj({
      ...contactObj,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let contactName =
      contactObj.name[0].toUpperCase() + contactObj.name.slice(1);
    const newObject = {
      id: contact.id,
      name: contactName,
      email: contactObj.email,
      username: contactObj.username,
      city: contactObj.city,
      phone: contactObj.phone,
      website: contactObj.website,
    };
    //Find index of specific object using findIndex method.
    // localStorage setItem
    setСontacts(contacts.map((n) => (n.id === contact.id ? newObject : n)));
    setTimeout(() => {
      setModalActive(false);
      document.body.style.overflow = "auto";
    }, 500);
  };
  // close modal  outside click
  const modalRef = React.useRef();
  React.useEffect(() => {
    const modalWrapper = modalRef.current;
    const checkClick = (event) => {
      if (!event.path.includes(modalWrapper)) {
        setModalActive(false);
        document.body.style.overflow = "auto";
        
      }
    };
    document.addEventListener("click", checkClick);
    return () => {
      document.removeEventListener("click", checkClick);
    };
    
  }, []);

  return (
    <div className="modal">
      <div ref={modalRef} className="modal__inner">
        <h2 className="modal__title">Редактирование контакта</h2>
        <p className="modal__description">
          Вы всегда можете внести измениния в информацию, которую Вы сохранили
          для контакта
        </p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-content">
            <label>Введите имя</label>
            <input
              type="text"
              className="modal__input"
              placeholder="Имя"
              name="name"
              onChange={handleChange}
              required
            />
            <label>Введите имя пользователя</label>
            <input
              type="text"
              className="modal__input"
              placeholder="Имя пользователя"
              name="username"
              onChange={handleChange}
              required
            />
            <label>Введите Email</label>
            <input
              type="email"
              className="modal__input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <label>Введите номер мобильного телефон</label>
            <input
              type="phone"
              className="modal__input"
              placeholder="Номер мобильного телефона"
              name="phone"
              onChange={handleChange}
              required
            />
            <label>Введите название веб-сайта</label>
            <input
              type="text"
              className="modal__input"
              placeholder="Название сайта"
              name="website"
              onChange={handleChange}
              required
            />
            <label>Введите имя пользователя</label>
            <input
              type="text"
              className="modal__input"
              placeholder="Город"
              name="city"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="modal__button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
