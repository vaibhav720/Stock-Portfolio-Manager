import * as React from "react";
import { Suspense} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import UserList from "../charts/UserList";
import UserPortfolio from "../charts/UserPortfolio";





//

function DashboardContent() {


  return (<>
          <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <UserList />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <UserPortfolio/>
                </Paper>
              </Grid>
              </>
  );
}

export default function WatchList(async) {
  
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <DashboardContent />
    </Suspense>
  );
}
