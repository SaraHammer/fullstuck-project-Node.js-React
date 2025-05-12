import { useEffect, useState } from "react"

export const MatchMakers = () => {
    const [matchMakers, setMatchMaker] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newMatchMaker, setNewMatchMaker] = useState({
        firstName: '',
        lastName: ''
    });

    const fetchMatchMakers = () => {
        fetch('/matchMakers/')
            .then(res => res.json())
            .then(data => {
                setMatchMaker(data);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchMatchMakers();
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const url='/matchMakers/';
        fetch(url,{
            method: 'POST',
            headers :{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newMatchMaker)
        })
        .then(async res => {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'שגיאה לא ידועה');
            }
            return res.json();
        })
        .then(data => {
            fetchMatchMakers();
            setNewMatchMaker({ firstName: '', lastName: '' });
            setShowForm(false);
        })
        .catch(err => {
            console.error(err);
        });

    }

    const handleDelete=(id)=>{
        if(window.confirm('האם את/ה בטוח/ה שברצונך למחוק את השדכן?')){
            fetch(`/matchMakers/${id}`,{
                method:'DELETE'
            })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'שגיאה לא ידועה');
                }
                return res.json();
            })
            .then(data => {
                fetchMatchMakers();
            })
            .catch(err => {
                console.error(err);
            });
        }

    }

    return (
        <div className="container mt-4">
          <h2>מאגר שדכנים</h2>
    
          <div className="text-center mb-3">
            <button className="btn btn-success" onClick={() => {
              setShowForm(true);
              setNewMatchMaker({ firstName: '', lastName: '' });
            }}>
              הוסף שדכן/ית
            </button>
          </div>
    
          {/* טופס POP */}
          {showForm && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">הוספת שדכן/ית</h5>
                    <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <input type="text" className="form-control mb-2" placeholder="שם" value={newMatchMaker.name} onChange={(e) => setNewMatchMaker({ ...newMatchMaker, firstName: e.target.value })} required />
                      <input type="text" className="form-control mb-2" placeholder="משפחה" value={newMatchMaker.surname} onChange={(e) => setNewMatchMaker({ ...newMatchMaker, lastName: e.target.value })} required />
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
    
          {/* כרטיסיות */}
          <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
            {matchMakers.map((matchmaker, index) => (
              <div className="col" key={index}>
                <div className="card border-secondary h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">{matchmaker.firstName} {matchmaker.lastName}</h5>
                    <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleDelete(matchmaker._id)}>מחק</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
