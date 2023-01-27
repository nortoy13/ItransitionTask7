import React, { useState } from "react";

const EnterName = ({ setUser }) => {
  const [name, setName] = useState("");
  const createUser = () => {
    setUser(name);
  };
  return (
    <div className="name">
      <h2>Enter Your Name</h2>
      <input
        type="text"
        required
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <button onClick={createUser}>Enter</button>
    </div>
  );
};

export default EnterName;
