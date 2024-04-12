import React from "react";
import { makeStyles } from "@adder-ui/core/styles";
import Card from "@adder-ui/core/Card";
import CardActionArea from "@adder-ui/core/CardActionArea";
import CardActions from "@adder-ui/core/CardActions";
import CardContent from "@adder-ui/core/CardContent";
import CardMedia from "@adder-ui/core/CardMedia";
import Button from "@adder-ui/core/Button";
import Typography from "@adder-ui/core/Typography";
import { Grid } from "@adder-ui/core";

import Admin from "../images/admin.jpg";
import Banker from "../images/connector.jpg";
import Recipient from "../images/Recipient.jpg";
import Sender from "../images/sender1.jpg";
import Uniqueaddresslinker from "../images/uniqueaddresslinker1.jpg";
import Banker from "../images/Banker.jpg";

import SignIn from "../login/SignIn";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root1: {
    maxWidth: 350,
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 10,
  },
  root2: {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root3: {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root4: {
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root5: {
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  root6: {
    marginBottom: 10,
    maxWidth: 350,
    marginLeft: 30,
  },
  media: {
    height: 280,
    paddingLeft: 20,
  },
});

const handleClick = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};
function Cards() {
  const classes = useStyles();

  return (
    <Router>
      <Grid container>
        <Grid item md={4}>
          <Card className={classes.root1}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Admin}
                title="Admin"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ADMIN
                </Typography>
                {
                  
                }
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href="/admin" size="small" color="primary">
                {" "}
                Click Here{" "}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card className={classes.root2}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Recipient}
                title="Recipient"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Recipient
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href="/recipient" size="small" color="primary">
                Click Here
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={4}>
          <Card className={classes.root3}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Uniqueaddresslinker}
                title="Uniqueaddresslinker"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Unique Address Linker
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              
            </CardActions>
          </Card>
        </Grid>

        <br />
        <Grid item md={4}>
          <Card className={classes.root4}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Sender}
                title="Sender"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Sender
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href="/sender" size="small" color="primary">
                Click Here
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Router>
  );
}
export default Cards;
