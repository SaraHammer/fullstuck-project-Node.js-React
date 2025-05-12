const express=require('express');
const port=3001;
const app=express();

const boyRoute=require("./ROUTES/BoyRoute");
const girlRoute=require("./ROUTES/GirlRoute");
const matchMakerRoute=require("./ROUTES/MatchMakerRoute");
const matchmakingRoute=require("./ROUTES/MatchmakingRoute");

app.use(express.json());
app.use('/api/boys',boyRoute);
app.use('/api/girls',girlRoute);
app.use('/api/matchMakers',matchMakerRoute);
app.use('/api/matchmaking',matchmakingRoute);

app.listen(port, () => console.log(`I am runing at http://localhost:${port}/api`));
