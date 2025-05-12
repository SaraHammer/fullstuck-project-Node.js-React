import { useEffect, useRef } from "react";
import '../css/home.css';

export const Home = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch((e) => console.log("Audio play error:", e));
    }
  }, []);

  return (
    <div className="home-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/vid.mp4" type="video/mp4" />
      </video>

      <img src="/pic.jpg" alt="רקע חופה" className="background-image" />
      <div className="overlay"></div>
      <audio ref={audioRef} src="/mp.mp4" loop autoPlay />

      <div className="welcome-content">
        <img src="/white.png" alt="לוגו האתר" className="logo" />
        <h1 className="welcome-title">ברוכים הבאים</h1>
        <h1 className="welcome-title">לאתר בחכמה יבנה</h1>
   
      </div>

      {/* <div className="about-section scroll-section">
        <h2>המיזם</h2>
        <p>
          "בחכמה יבנה" הוא מיזם קהילתי שנועד לחבר בין לבבות. מטרתו להנגיש את עולם השידוכים בצורה מכבדת, צנועה ומקצועית,
          עבור שדכניות ושדכנים שפועלים מתוך שליחות ואחריות. האתר מציע ממשק נעים, פשוט ויעיל, תוך שמירה מלאה על פרטיות ונגישות.
        </p>
        <p>
          אם גם את או אתה מרגישים שליחות בשידוך, זה המקום בשבילכם. כל הנתונים נשמרים באהבה, כדי ליצור בתים של אמונה.
        </p>
      </div> */}
    </div>
  );
};
