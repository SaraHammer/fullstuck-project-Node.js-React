import { useEffect, useState } from 'react';

export const Boys = () => {
    const [boys, setBoys] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newBoy, setNewBoy] = useState({
        firstName: '',
        lastName: '',
        age: '',
        belonging: '',
        yeshiva: ''
    });
    const [editingBoyId, setEditingBoyId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    const [yeshivaFilter, setYeshivaFilter] = useState('');
    const [belongingFilter, setBelongingFilter] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();

        const url = editingBoyId ? `/boys/${editingBoyId}` : '/boys';
        const method = editingBoyId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBoy)
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
                fetchBoys();
                setNewBoy({ firstName: '', lastName: '', age: '', belonging: '', yeshiva: '' });
                setShowForm(false);
                setEditingBoyId(null);
                setErrorMessage(''); // איפוס הודעת השגיאה במקרה הצלחה
            })
            .catch(err => {
                setErrorMessage(err.message); // רק הצגה באתר, בלי קונסול
              });

    };

    const handleDelete = (id) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק את הבחור?')) {
            fetch(`/boys/${id}`, {
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
                    fetchBoys();
                    setErrorMessage('');
                })
                .catch(err => {
                    setErrorMessage(err.message);
                  });
        }
    };


    const handleEdit = (boy) => {
        setNewBoy({
            firstName: boy.firstName,
            lastName: boy.lastName,
            age: boy.age,
            belonging: boy.belonging,
            yeshiva: boy.yeshiva
        });
        setEditingBoyId(boy._id); // ה-ID שמונגו נותן
        setShowForm(true);
        setErrorMessage('');
    };

    // >>> הוספנו את fetchBoys כאן:
    const fetchBoys = () => {
        fetch('/boys/')
            .then(res => res.json())
            .then(data => {
                setBoys(data); // שומר את הנתונים מהשרת ב-state
            })
            .catch(err => console.error(err));
    };

    // מפעילים את fetchBoys ב-useEffect
    useEffect(() => {
        fetchBoys();
    }, []);

    useEffect(() => {
        fetch('/boys/')
            .then(res => res.json())
            .then(data => {
                setBoys(data); // שומר את הנתונים מהשרת ב-state
            })
            .catch(err => console.error(err));
    }, []); // רץ רק כשהקומפוננטה נטענת

    
    return (
        <div className="container mt-4">
          <h2>מאגר בחורים</h2>
      
          <div className="text-center mb-3">
            <button className="btn btn-success" onClick={() => {
              setShowForm(true);
              setEditingBoyId(null);
              setNewBoy({ firstName: '', lastName: '', age: '', belonging: '', yeshiva: '' });
              setErrorMessage('');
            }}>הוסף בחור</button>
          </div>
      
          {showForm && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{editingBoyId ? 'עדכון בחור' : 'הוספת בחור'}</h5>
                    <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      {/* ✨ הודעת שגיאה בתוך הטופס */}
                      {errorMessage && (
                        <div className="alert alert-danger text-center">{errorMessage}</div>
                      )}
      
                      <input type="text" className="form-control mb-2" placeholder="שם" value={newBoy.firstName} onChange={(e) => setNewBoy({ ...newBoy, firstName: e.target.value })} required />
                      <input type="text" className="form-control mb-2" placeholder="משפחה" value={newBoy.lastName} onChange={(e) => setNewBoy({ ...newBoy, lastName: e.target.value })} />
                      <input type="number" className="form-control mb-2" placeholder="גיל" value={newBoy.age} onChange={(e) => setNewBoy({ ...newBoy, age: e.target.value })} />
                      <input type="text" className="form-control mb-2" placeholder="שיוך" value={newBoy.belonging} onChange={(e) => setNewBoy({ ...newBoy, belonging: e.target.value })} />
                      <input type="text" className="form-control mb-2" placeholder="ישיבה" value={newBoy.yeshiva} onChange={(e) => setNewBoy({ ...newBoy, yeshiva: e.target.value })} />
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
      
          {/* הסרתי את הודעת השגיאה מכאן – כי עכשיו היא בפנים */}
      
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
              <label>סנן לפי ישיבה:</label>
              <input type="text" className="form-control" value={yeshivaFilter} onChange={(e) => setYeshivaFilter(e.target.value)} placeholder="הכנס ישיבה" />
            </div>
          </div>
      
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {boys.filter(boy => {
              if (ageFilter && boy.age != ageFilter) return false;
              if (belongingFilter && boy.belonging !== belongingFilter) return false;
              if (yeshivaFilter && boy.yeshiva !== yeshivaFilter) return false;
              return true;
            }).map((boy, index) => (
              <div className="col" key={index}>
                <div className="card border-dark h-100">
                  <div className="card-header">{boy.firstName} {boy.lastName}</div>
                  <div className="card-body text-dark">
                    <h5 className="card-title">גיל: {boy.age}</h5>
                    <p className="card-text">
                      שיוך: {boy.belonging}<br />
                      ישיבה: {boy.yeshiva}
                    </p>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(boy)}>עדכן</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(boy._id)}>מחק</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}    