import React from "react";
import { StyleSheet, css } from "aphrodite";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { Container, Button } from "reactstrap";

const styles = StyleSheet.create({
  imgStyle: {
    maxWidth: "35%",
  },
});

const Page = (props) => {
  const { imgStyle } = styles;
  const navigate = useHistory().push;
  return (
    <div>
      <Container>
        <div className="text-center py-4">
          <h2 className=" h4 capitalize text-danger">{props.header}</h2>
          {props.content ? (
            <p className="lead text-danger">{props.content}</p>
          ) : null}
        </div>
        <div className="text-center">
          <img
            src={props.img}
            style={props.ImgStyle}
            className={clsx(css(imgStyle))}
          />
        </div>
        <div className="text-center mt-4">
          <p className="h6 capitalize">العودة للصفحة الرئيسية </p>
          <br />
          <Button
            color="primary"
            className="white-clr"
            onClick={() => navigate("/")}
          >
            الرئيسية
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Page;
