import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },


}));

export default function JobPagination ({ page, changePage, hasNextPage }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {(page>1) &&
      <Button
        onClick={() => changePage(page-1)}
        variant={'contained'}
        color="primary" >
        <ArrowBackIosIcon />
      </Button>}

      {(page === 1 && !hasNextPage) ? null : (
        <Button
          onClick={() => changePage(page-1)}
          variant={'contained'}
          disabled >
          {page}
        </Button>
      )}

      {(hasNextPage) &&
      <Button
        onClick={() => changePage(page+1)}
        variant={'contained'}
        color="primary" >
        <ArrowForwardIosIcon />
      </Button>}

    </div>
  );
};

