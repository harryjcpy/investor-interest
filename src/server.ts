import app from "./app";
import { PORT } from "./utils/env";

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})