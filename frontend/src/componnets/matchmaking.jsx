import { useEffect, useState } from "react"

export const Matchmaking = () => {
    const [matchmaking, setMatchmaking] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newMatchmaking, setNewMatchmaking] = useState({
        boyFirstName: '',
        boyLastName: '',
        girlFirstName: '',
        girlLastName: '',
        carriedOut: false,
        matchMaker: '',
        date: ''
    });
    const [editingMatchId, setEditingMatchId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [makerFilter, setMakerFilter] = useState('');

    const fetchMatchmaking = () => {
        fetch('/matchmaking/')
            .then(res => res.json())
            .then(data => {
                setMatchmaking(data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchMatchmaking();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = editingMatchId ? `/matchmaking/${editingMatchId}` : '/matchmaking';
        const method = editingMatchId ? 'PUT' : 'POST';
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMatchmaking)
        })
            .then(async res => {
                if (!res.ok) {
                    let errorText = await res.text();
                    try {
                        const errorData = JSON.parse(errorText);
                        throw new Error(errorData.error || 'שגיאה לא ידועה');
                    }
                    catch {
                        throw new Error(errorText)
                    }
                }
                return res.json();
            })
            .then(data => {
                fetchMatchmaking();
                setNewMatchmaking({ boyFirstName: '', boyLastName: '', girlFirstName: '', girlLastName: '', carriedOut: false, matchMaker: '', date: '' });
                setShowForm(false);
                setEditingMatchId(null);
                setErrorMessage('');
            })
            .catch(err => {
                setErrorMessage(err.message);
            })
    }

    const handleEdit = (match) => {
        setNewMatchmaking({
            boyFirstName: match.boyFirstName,
            boyLastName: match.boyLastName,
            girlFirstName: match.girlFirstName,
            girlLastName: match.girlLastName,
            carriedOut: match.carriedOut,
            matchMaker: match.matchMaker,
            date: match.date
        });
        setEditingMatchId(match._id);
        setShowForm(true);
        setErrorMessage('');
    };

  

    return (
        <div className="container mt-4">
          <h2 className="text-center mb-4">מאגר שידוכים</h2>
      
          {/* פילטרים */}
          <div className="row mb-3 justify-content-center">
            <div className="col-md-3">
              <label>סנן לפי תוצאה:</label>
              <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">הכל</option>
                <option value="כן">כן</option>
                <option value="לא">לא</option>
              </select>
            </div>
            <div className="col-md-3">
              <label>סנן לפי שדכן/ית:</label>
              <input className="form-control" value={makerFilter} onChange={(e) => setMakerFilter(e.target.value)} />
            </div>
          </div>
      
          {/* כפתור הוספה */}
          <div className="text-center mb-3">
            <button className="btn btn-success" onClick={() => {
              setShowForm(true);
              setEditingMatchId(null);
              setNewMatchmaking({
                boyFirstName: '', boyLastName: '', girlFirstName: '', girlLastName: '',
                matchMaker: '', carriedOut: false, date: ''
              });
              setErrorMessage('');
            }}>
              הוסף שידוך
            </button>
          </div>
      
          {/* טופס POP */}
          {showForm && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">הוספת/עדכון שידוך</h5>
                    <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body row g-3">
                      {/* הודעת שגיאה בתוך הטופס */}
                      {errorMessage && (
                        <div className="alert alert-danger text-center w-100">{errorMessage}</div>
                      )}
      
                      <div className="col-md-6">
                        <input className="form-control mb-2" placeholder="שם הבחור" value={newMatchmaking.boyFirstName}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, boyFirstName: e.target.value })}
                          required readOnly={editingMatchId !== null} />
                        <input className="form-control mb-2" placeholder="משפחת הבחור" value={newMatchmaking.boyLastName}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, boyLastName: e.target.value })}
                          required readOnly={editingMatchId !== null} />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control mb-2" placeholder="שם הבחורה" value={newMatchmaking.girlFirstName}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, girlFirstName: e.target.value })}
                          required readOnly={editingMatchId !== null} />
                        <input className="form-control mb-2" placeholder="משפחת הבחורה" value={newMatchmaking.girlLastName}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, girlLastName: e.target.value })}
                          required readOnly={editingMatchId !== null} />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control mb-2" placeholder="שדכן/ית" value={newMatchmaking.matchMaker}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, matchMaker: e.target.value })}
                          required />
                      </div>
                      <div className="col-md-3">
                        <select className="form-control mb-2"
                          value={newMatchmaking.carriedOut ? 'כן' : 'לא'}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, carriedOut: e.target.value === 'כן' })}
                        >
                          <option value="לא">לא</option>
                          <option value="כן">כן</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <input className="form-control mb-2" placeholder="תאריך" value={newMatchmaking.date}
                          onChange={(e) => setNewMatchmaking({ ...newMatchmaking, date: e.target.value })}
                          required />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">שמור</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>סגור</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
      
          {/* כרטיסיות */}
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {matchmaking
              .filter(match => {
                if (statusFilter) {
                  const isCarriedOut = match.carriedOut ? 'כן' : 'לא';
                  if (isCarriedOut !== statusFilter) return false;
                }
                if (makerFilter && match.matchMaker !== makerFilter) return false;
                return true;
              })
              .map((match, index) => (
                <div className="col" key={index}>
                  <div className="card border-info h-100">
                    <div className="card-header bg-info text-white">
                      שדכן: {match.matchMaker}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {match.boyFirstName} {match.boyLastName} - {match.girlFirstName} {match.girlLastName}
                      </h5>
                      <p className="card-text">
                        סטטוס: <strong>{match.carriedOut ? 'יצא לפועל' : 'לא יצא לפועל'}</strong><br />
                        תאריך: {match.date}
                      </p>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEdit(match)}>עדכן</button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      );
}      