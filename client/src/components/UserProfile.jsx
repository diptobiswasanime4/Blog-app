import React from "react";

function UserProfile() {
  return (
    <div className="body-section-profile">
      <div className="upper-body-section">
        <img
          src="/src/assets/images/PP.jpg"
          alt="logo"
          className="profile-picture"
        />
        <div className="upper-right-body-section">
          <div className="profile-name">Name: Arya</div>
          <div className="profile-place">Kolkata</div>
          <div className="profile-join-date">12-14-2022</div>
        </div>
      </div>
      <div className="lower-body-section">
        <div className="my-posts">My Posts</div>
        <div className="my-comments">My Comments</div>
      </div>
    </div>
  );
}

export default UserProfile;
