import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [makers, setMakers] = useState([]);
    const [newMaker, setNewMaker] = useState({
        firstName: '',
        lastName: '',
    });
    let where= useNavigate(); 

    const fetchMatchMakers = () => {
        fetch('/matchMakers/')
            .then(res => res.json())
            .then(data => {
                setMakers(data);
            })
            .catch(err => console.error(err));
    };

    const addMaker = async(e) => {
        e.preventDefault();

        try {
          // שליפת כל השדכנים
          const response = await fetch('/matchMakers/');
          const data = await response.json();
    
          // בדיקת קיום
          let res = data.filter(x =>
            x.firstName === newMaker.firstName && x.lastName === newMaker.lastName
          );
    
          if (res.length >= 1) {
            // כבר קיים → נשלח להתחברות
            where('/login');
          } else {
            // מוסיפים חדש
            const res = await fetch('/matchMakers/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newMaker)
            });
    
            // טיפול בתשובה
            if (!res.ok) {
              let errorText = await res.text();
              try {
                const errorData = JSON.parse(errorText);
                throw new Error(errorData.error || 'שגיאה לא ידועה');
              } catch {
                throw new Error(errorText);
              }
            }
    
            await res.json();
    
            // איפוס הטופס
            setNewMaker({ firstName: '', lastName: '' });
    
            // מעבר לדף הבית או אחר
            where('/home');
          }
        } catch (err) {
          console.error("שגיאה בהרשמה:", err.message);
        }
    }

    return (
      <div className="container mt-5">
        <h2 className="mb-4">טופס הרשמה</h2>
        <form onSubmit={addMaker}>
          <div className="form-group mb-3">
            <label>שם</label>
            <input
              type="text"
              className="form-control"
              value={newMaker.name}
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
          <button type="submit" className="btn btn-success">הרשם</button>
        </form>
      </div>
    );
  };
  