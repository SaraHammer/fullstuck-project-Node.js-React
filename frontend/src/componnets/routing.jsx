import { Route,Routes } from "react-router-dom"
import { Home } from "./home"
import { Boys } from "./boys"
import { Girls } from "./girls"
import { MatchMakers } from "./matchMakers"
import { Matchmaking } from "./matchmaking"
import { Login } from "./login"
import { Signup } from "./signup"

export const Routing=()=>{
    return<Routes>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="boys" element={<Boys></Boys>}></Route>
        <Route path="girls" element={<Girls></Girls>}></Route>
        <Route path="matchMakers" element={<MatchMakers></MatchMakers>}></Route>
        <Route path="matchmaking" element={<Matchmaking></Matchmaking>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="/" element={<Home />} />
    </Routes>
}