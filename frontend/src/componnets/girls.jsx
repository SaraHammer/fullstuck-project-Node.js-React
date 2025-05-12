import { useEffect, useState } from 'react';

export const Girls = () => {
  const [girls, setGirls] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newGirl, setNewGirl] = useState({
    firstName: '',
    lastName: '',
    age: '',
    belonging: '',
    specialisation: ''
  });
  const [editingGirlId, setEditingGirlId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [specialisationFilter, setSpecialisationFilter] = useState('');
  const [belongingFilter, setBelongingFilter] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingGirlId ? `/girls/${editingGirlId}` : '/girls';
    const method = editingGirlId ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGirl)
    })
      .then(async res => {
        if (!res.ok) {
          let errorText = await res.text();
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error || 'שגיאה לא ידועה');
          } catch {
            throw new Error(errorText); // אם זה טקסט רגיל ולא JSON
          }
        }
        return res.json();
      })
      .then(data => {
        fetchGirls();
        setNewGirl({ firstName: '', lastName: '', age: '', belonging: '', specialisation: '' });
        setShowForm(false);
        setEditingGirlId(null);
        setErrorMessage(''); // איפוס הודעת שגיאה
      })
      .catch(err => {
        setErrorMessage(err.message); // רק הצגה באתר, בלי קונסול
      });
  }

  const handleDelete = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הבחורה?')) {
      fetch(`/girls/${id}`, {
        method: 'DELETE'
      })
        .then(async res => {
          if (!res.ok) {
            let errorText = await res.text();
            try {
              const errorData = JSON.parse(errorText);
              throw new Error(errorData.error || 'שגיאת מחיקה לא ידועה');
            } catch {
              throw new Error(errorText);
            }
          }
          return res.json();
        })
        .then(data => {
          fetchGirls();
          setErrorMessage('');
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  };


  const handleEdit = (girl) => {
    setNewGirl({
      firstName: girl.firstName,
      lastName: girl.lastName,
      age: girl.age,
      belonging: girl.belonging,
      specialisation: girl.specialisation
    });
    setEditingGirlId(girl._id); // ה-ID שמונגו נותן
    setShowForm(true);
    setErrorMessage('');
  };


  const fetchGirls = () => {
    fetch('/girls/')
      .then(res => res.json())
      .then(data => {
        setGirls(data); // שומר את הנתונים מהשרת ב-state
      })
      .catch(err => console.error(err));
  };

  // מפעילים את fetchBoys ב-useEffect
  useEffect(() => {
    fetchGirls();
  }, []);

  return (
    <div className="container mt-4">
      <h2>מאגר בחורות</h2>
  
      {/* כפתור להוספה */}
      <div className="text-center mb-3">
        <button className="btn btn-success" onClick={() => {
          setShowForm(true);
          setEditingGirlId(null);
          setNewGirl({ firstName: '', lastName: '', age: '', belonging: '', specialisation: '' });
          setErrorMessage('');
        }}>
          הוסף בחורה
        </button>
      </div>
  
      {/* טופס POP */}
      {showForm && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingGirlId ? 'עדכון בחורה' : 'הוספת בחורה'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
  
                  {/* שגיאה מוצגת כאן בתוך הטופס */}
                  {errorMessage && (
                    <div className="alert alert-danger text-center">{errorMessage}</div>
                  )}
  
                  <input type="text" className="form-control mb-2" placeholder="שם"
                    value={newGirl.firstName}
                    onChange={(e) => {
                      setNewGirl({ ...newGirl, firstName: e.target.value });
                      setErrorMessage('');
                    }}
                    required
                  />
                  <input type="text" className="form-control mb-2" placeholder="משפחה"
                    value={newGirl.lastName}
                    onChange={(e) => {
                      setNewGirl({ ...newGirl, lastName: e.target.value });
                      setErrorMessage('');
                    }}
                  />
                  <input type="number" className="form-control mb-2" placeholder="גיל"
                    value={newGirl.age}
                    onChange={(e) => {
                      setNewGirl({ ...newGirl, age: e.target.value });
                      setErrorMessage('');
                    }}
                  />
                  <input type="text" className="form-control mb-2" placeholder="שיוך"
                    value={newGirl.belonging}
                    onChange={(e) => {
                      setNewGirl({ ...newGirl, belonging: e.target.value });
                      setErrorMessage('');
                    }}
                  />
                  <input type="text" className="form-control mb-2" placeholder="התמחות"
                    value={newGirl.specialisation}
                    onChange={(e) => {
                      setNewGirl({ ...newGirl, specialisation: e.target.value });
                      setErrorMessage('');
                    }}
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">שמור</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>בטל</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
  
      {/* פילטרים ממורכזים */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-3">
          <label>סנן לפי גיל:</label>
          <input type="number" className="form-control" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} placeholder="הכנס גיל" />
        </div>
        <div className="col-md-3">
          <label>סנן לפי שיוך:</label>
          <select className="form-control" value={belongingFilter} onChange={(e) => setBelongingFilter(e.target.value)}>
            <option value="">הכל</option>
            <option value="ליטאים">ליטאים</option>
            <option value="חסידים">חסידים</option>
            <option value="ספרדים">ספרדים</option>
          </select>
        </div>
        <div className="col-md-3">
          <label>סנן לפי התמחות:</label>
          <input type="text" className="form-control" value={specialisationFilter} onChange={(e) => setSpecialisationFilter(e.target.value)} placeholder="הכנס התמחות" />
        </div>
      </div>
  
      {/* כרטיסיות Bootstrap */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {girls.filter(girl => {
          if (ageFilter && girl.age != ageFilter) return false;
          if (belongingFilter && girl.belonging !== belongingFilter) return false;
          if (specialisationFilter && girl.specialisation !== specialisationFilter) return false;
          return true;
        }).map((girl, index) => (
          <div className="col" key={index}>
            <div className="card border-dark h-100">
              <div className="card-header">{girl.firstName} {girl.lastName}</div>
              <div className="card-body text-dark">
                <h5 className="card-title">גיל: {girl.age}</h5>
                <p className="card-text">
                  שיוך: {girl.belonging}<br />
                  התמחות: {girl.specialisation}
                </p>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(girl)}>עדכן</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(girl._id)}>מחק</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};