import React, { useState, useEffect, Suspense } from "react";
import Header from "./app/header/header";
import "./app.css";
import { useLocalStorage } from "./hook/useLocalStorage";
const Content = React.lazy(() => import("./app/content/content"));
function App() {
  // State and state setter for getting data
  const [contacts, setСontacts] = useLocalStorage("contacts", JSON.parse(localStorage.getItem("contacts")))
  // This is where the API is called
  // We useEffect because it is an asynchronous action
  useEffect(() => {
    !Boolean(contacts) &&
      fetch("https://demo.sibers.com/users")
        .then((response) => response.json())
        // setData serves to change
        .then((data) => {
          const contact = data.map((contact) => {
            const obj = {
              id: contact.id,
              name: contact.name,
              username: contact.username,
              email: contact.email,
              phone: contact.phone,
              website: contact.website,
              city: contact.address?.city,
            };
            return obj;
          });
          setСontacts(contact);
        });
        // eslint-disable-next-line
  }, []);



  // State and state setter for the search query
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const sortData = sort
    ? [...contacts, []].sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    : contacts;

  const results = !search
    ? sortData
    : contacts.filter((item) =>
        item.name
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase().trim())
      );

  return (
    <Suspense fallback={<div className="reload">Loading...</div>}>
      <div className="App">
        <div className="container">
          <Header
            handleChange={(search) => setSearch(search)}
            setSort={setSort}
            sort={sort}
            search={search}
          />
          <Content results={results} contacts={contacts} setСontacts={setСontacts} />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
