import React from "react";
import { makeStyles } from "@adder-ui/core/styles";
import Quote from "../../components/Typography/Quote.js";
import Muted from "../../components/Typography/Muted.js";
import Primary from "../../components/Typography/Primary.js";
import Info from "../../components/Typography/Info.js";
import Success from "../../components/Typography/Success.js";
import Warning from "../../components/Typography/Warning.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function TypographyPage() {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Adder Dashboard Heading</h4>
        <p className={classes.cardCategoryWhite}>

        </p>
      </CardHeader>
      <CardBody>
        <div className={classes.typo}>
          <div className={classes.note}>Header 1</div>
          <h1>The Life of Adder Dashboard</h1>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 2</div>
          <h2>The Life of Adder Dashboard</h2>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 3</div>
          <h3>The Life of Adder Dashboard</h3>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 4</div>
          <h4>The Life of Adder Dashboard</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 5</div>
          <h5>The Life of Adder Dashboard</h5>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Header 6</div>
          <h6>The Life of Adder Dashboard</h6>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Paragraph</div>
          <p>

          </p>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Quote</div>
          <Quote

          />
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Muted Text</div>
          <Muted>

          </Muted>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Primary Text</div>
          <Primary>

          </Primary>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Info Text</div>
          <Info>

          </Info>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Success Text</div>
          <Success>

          </Success>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Warning Text</div>
          <Warning>

          </Warning>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Danger Text</div>
          <Danger>

          </Danger>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>Small Tag</div>
          <h2>
            Header with small subtitle
            <br />
            <small>
              Use {'"'}Small{'"'} tag for the headers
            </small>
          </h2>
        </div>
      </CardBody>
    </Card>
  );
}
