import React, { Component } from "react";
import { observer } from "mobx-react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import AddAuthorCard from "./AddAuthorCard";

// Store
import authorStore from "./stores/AuthorStore";
import authStore from "./stores/authStore";

class AuthorsList extends Component {
  render() {
    const authorCards = authorStore.filteredAuthors.map(author => (
      <AuthorCard key={author.id} author={author} />
    ));

    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar store={authorStore} />
        {authStore.user && <AddAuthorCard />}
        <div className="row">{authorCards}</div>) : (
        <div className="row">{authorCards}</div>
        )}
      </div>
    );
  }
}

export default observer(AuthorsList);
