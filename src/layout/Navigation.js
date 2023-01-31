import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Add Client 1</Link>
        </li>
        <li>
          <Link to="/mybooks">Add Client 2</Link>
        </li>
        <li>
          <Link to="/favorites">Add Client 3</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
