import React, { useState } from 'react';

import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const [updatedUser, updateUser] = useState(user);

  const onFormChange = (input, name) => {
    updateUser((prevState) => ({
      ...prevState,
      [name]: input,
    }));
  };

  const onProfileUpdate = (data) => {
    fetch(`https://detecting-faces-api.herokuapp.com/profile/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 204) {
          toggleModal();
          loadUser({ ...user, ...data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h1>{updatedUser.name}</h1>
          <h4>{`Images submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="name">
            Name:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="name"
            id="name"
            onChange={(e) => onFormChange(e.target.value, e.target.name)}
          />
          <label className="mt2 fw6" htmlFor="age">
            Age:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={user.age}
            type="number"
            name="age"
            id="age"
            onChange={(e) => onFormChange(e.target.value, e.target.name)}
          />
          <label className="mt2 fw6" htmlFor="pet">
            Pet:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={user.pet}
            type="text"
            name="pet"
            id="pet"
            onChange={(e) => onFormChange(e.target.value, e.target.name)}
          />
          <div
            className="mt4"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => onProfileUpdate(updatedUser)}
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-red b--black-20"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
