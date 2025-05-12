import { Link } from "react-router-dom";
import "../css/Nav.css";

export const Nav = () => {
  const loggedInMatchMaker = JSON.parse(localStorage.getItem("loggedInMatchMaker"));

  return (
    <nav className="navbar navbar-expand-sm custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* שם המשתמש בצד ימין */}
        {loggedInMatchMaker && (
          <div className="nav-user">שלום {loggedInMatchMaker.firstName}</div>
        )}

        {/* קישורי ניווט במרכז */}
        <ul className="navbar-nav nav-center">


          {!loggedInMatchMaker && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/signup">הרשמה</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">התחברות</Link></li>
            </>
          )}

          {loggedInMatchMaker && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/matchmaking">מאגר שידוכים</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/boys">מאגר בחורים</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/girls">מאגר בחורות</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/matchMakers">מאגר שדכנים</Link></li>
            </>
          )}
          <li className="nav-item"><Link className="nav-link" to="/home">דף הבית</Link></li>
        </ul>

        {/* לוגו בצד שמאל */}
        <Link to="/home">
          <img src="/white.png" alt="לוגו" className="nav-logo large-logo" />
        </Link>

      </div>
    </nav>
  );
};