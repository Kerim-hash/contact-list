import React, { useState } from "react";
import "./index.css";
const Modal = ({ setModalActive, contact, contacts, setСontacts }) => {
  const [contactObj, setContactObj] = useState({
    name: contact.name ,
    email:  contact.email,
    username:  contact.username,
    city:  contact.city,
    phone:  contact.phone,
    website:  contact.website,
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
    let contactName =  contactObj.name[0].toUpperCase() + contactObj.name.slice(1);
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
    console.log(newObject)
    // const arr = contacts.map((n) => (n.id === contact.id ? newObject : n))
    // console.log(arr)
    setСontacts(contacts.map((n) => (n.id === contact.id ? newObject : n)));
    setTimeout(() => {
      setModalActive(false);
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
      <button type="button" onClick={() =>  setModalActive(false)} className="modal__close"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4C35.046 4 44 12.954 44 24C44 35.046 35.046 44 24 44ZM24 21.172L18.344 15.514L15.514 18.344L21.172 24L15.514 29.656L18.344 32.486L24 26.828L29.656 32.486L32.486 29.656L26.828 24L32.486 18.344L29.656 15.514L24 21.172Z" fill="#7C7C7C" />
                </svg></button>
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
              value={contactObj.name}
              className="modal__input"
              placeholder="Имя"
              name="name"
              onChange={handleChange}
              required
            />
            <label>Введите имя пользователя</label>
            <input
              type="text"
              value={contactObj.username}
              className="modal__input"
              placeholder="Имя пользователя"
              name="username"
              onChange={handleChange}
              required
            />
            <label>Введите Email</label>
            <input
              type="email"
              value={contactObj.email}
              className="modal__input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <label>Введите номер мобильного телефон</label>
            <input
              type="phone"
              value={contactObj.phone}
              className="modal__input"
              placeholder="Номер мобильного телефона"
              name="phone"
              onChange={handleChange}
              required
            />
            <label>Введите название веб-сайта</label>
            <input
              type="text"
              value={contactObj.website}
              className="modal__input"
              placeholder="Название сайта"
              name="website"
              onChange={handleChange}
              required
            />
            <label>Введите имя пользователя</label>
            <input
              type="text"
              value={contactObj.city}
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
