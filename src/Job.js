import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Collapse,
  CardContent,
  CardActions,
  IconButton,
  Typography, Hidden
} from "@material-ui/core";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: theme.spacing(1),
    borderTopColor: 'black'
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: theme.spacing(1),
    borderTopColor: 'black'
  },

  hover: {
    "&:hover": {
      color: "blue",
    },
  },

  type: {
    color: 'white',
    backgroundColor: 'gray',
    padding: '1px 1px 1px 1px',
    borderRadius: "25px"

  },

  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    padding: theme.spacing(1),
  },

  media: {

  },

}));

function Job ({ job }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleToggleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.header}>
        <div >
          <Typography
            variant={'h6'}
            className={classes.hover}
            onClick={handleToggleClick} >
            {job.title}
          </Typography>
          <Typography variant={'body2'}  >
            <span className={classes.hover}>{job.company}</span>
            <span> | </span>
            <span className={classes.type}>{job.type}</span>
          </Typography>

        </div>
        <Hidden xsDown={true} >
          <img
            className={classes.media}
            src={job.company_logo}
            height={'50'}
            alt={job.company}
          />
        </Hidden>
      </CardContent>
      <Collapse in={expanded} timeout={'auto'} unmountOnExit >
        <Typography
          className={classes.description}
          variant={"body2"}
          dangerouslySetInnerHTML={{__html: job.description}} />
        <CardActions className={classes.action}>
          <IconButton className={classes.expand} onClick={handleToggleClick} >
            <ExpandLessIcon />
          </IconButton>
        </CardActions>
      </Collapse>

    </Card>
  );
}

export default Job;