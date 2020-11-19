import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Typography, Toolbar, Button, LinearProgress  } from "@material-ui/core";
import { Container } from "@material-ui/core";
import useFetchData from "./useFetchData";
import JobPagination from "./JobPagination";
import Job from "./Job";
import SearchForm from "./SearchForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  }
}));

function App() {
  const classes = useStyles();
  const { state, params, setParams } = useFetchData();

  function handleChangePage(page) {
    setParams({
      ...params,
      page: page
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Github Jobs
          </Typography>
          <Button color="inherit">All jobs</Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <SearchForm setParams={setParams} />

        {state.isError ? <h2>Error.</h2> : null}
        {state.isLoading ? <LinearProgress /> : null}
        {state.data.map(job => (
          <Job key={job.id} job={job} />
        ))}

        <JobPagination page={params.page} changePage={handleChangePage}  hasNextPage={state.hasNextPage} />

      </Container>
    </div>
  );
}

export default App;






