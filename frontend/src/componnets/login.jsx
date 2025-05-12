import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [makers, setMakers] = useState([]);
    const [newMaker, setNewMaker] = useState({
        firstName: '',
        lastName: '',
    });
    let where = useNavigate();
    const fetchMatchMakers = () => {
        fetch('/matchMakers/')
            .then(res => res.json())
            .then(data => {
                setMakers(data);
            })
            .catch(err => console.error(err));
    };
    const check = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/matchMakers/');
            const data = await response.json();

            // בדיקה אם יש התאמה
            let res1 = data.filter(x =>
                x.firstName === newMaker.firstName && x.lastName === newMaker.lastName
            );

            if (res1.length < 1) {
                // לא קיים → להפנות לדף הרשמה
                where('/signup');
            } else {
                // קיים → לשמור במצב גלובלי שהשדכן מחובר!
                localStorage.setItem('loggedInMatchMaker', JSON.stringify(res1[0]));
                where('/home'); // או כל דף שתרצי
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="container mt-5">
          <h2 className="mb-4">טופס התחברות</h2>
          <form onSubmit={check}>
            <div className="form-group mb-3">
              <label>שם</label>
              <input
                type="text"
                className="form-control"
                value={newMaker.firstName}
                onChange={(e) => setNewMaker({ ...newMaker, firstName: e.target.value })}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>משפחה</label>
              <input
                type="text"
                className="form-control"
                value={newMaker.lastName}
                onChange={(e) => setNewMaker({ ...newMaker, lastName: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">התחבר</button>
          </form>
        </div>
      );
    };
