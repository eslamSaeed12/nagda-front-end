import React, { useState } from "react";
import { PasswordEyeToggler } from "../../components/password-eye-toggler";
import { Auth_Events } from "../../store/actions/jobs";
import {
  Col,
  Row,
  Container,
  Form,
  Input,
  FormGroup,
  Label,
  Alert,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import authForms from "../../forms/auth-forms";
import { AUTH_LOGIN_V } from "../../validators/auth-v";
import { AuthServicesInstance } from "../../services/auth-services";
import { clientErrCatcher } from "../../utils/client-error-catcher";
export const LoginContainer = (props) => {
  const [ClientLoading, setClientLoading] = useState(null);
  const [ClientError, setClientError] = useState(null);
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useHistory().push;
  const passwordTriggerHandeler = () => setIsPassword(!isPassword);

  const {
    handleSubmit,
    values,
    errors,
    isSubmitting,
    isValid,
    isValidating,
    handleChange,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    isInitialValid: false,
    validationSchema: AUTH_LOGIN_V,
    onSubmit: (data) => {
      if (!isValidating && isSubmitting && isValid) {
        setClientLoading(true);
        const body = authForms.login(data);
        AuthServicesInstance.login(body)
          .then((clientResponse) => {
            props.dispatcher(
              Auth_Events.AUTH_USER_DATA(clientResponse.data.user)
            );
            setClientLoading(false);
            navigate("/");
          })
          .catch((clientErr) => {
            if (process.env.NODE_ENV === "development") {
              console.error(clientErr);
            }
            setClientError(clientErrCatcher(clientErr));
            setClientLoading(false);
          });
      }
    },
  });

  return (
    <section className="py-5 mt-4">
      <Container>
        <h2 className="display-4  text-center">تسجيل الدخول</h2>
        {ClientError ? (
          <Alert
            className="my-5 lead text-capitalize  w-50 text-center mx-auto"
            color="danger"
          >
            {ClientError}
          </Alert>
        ) : null}

        <Row className="mt-5">
          <Col md={6} xs={10} className="mx-md-0 mx-auto">
            <Form
              className="text-md-right text-center mx-md-0 mx-auto w-75"
              onSubmit={handleSubmit}
            >
              <FormGroup>
                <Label htmlFor="username-input">اسم المستخدم</Label>
                <Input
                  type="text"
                  name="username"
                  id="username-input"
                  value={values.username}
                  onChange={handleChange}
                  className={`${errors.username ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback ">
                  {errors.username ? errors.username : null}
                </div>
              </FormGroup>
              <FormGroup className="position-relative">
                <Label htmlFor="password-input">الرقم السري</Label>
                <Input
                  type={isPassword ? "password" : "text"}
                  name="password"
                  id="password-input"
                  className={`${errors.password ? "is-invalid" : ""}`}
                  onChange={handleChange}
                  value={values.password}
                />
                <PasswordEyeToggler
                  size="1x"
                  top="2.7rem"
                  left="2rem"
                  onClick={() => passwordTriggerHandeler()}
                />
                <div className="invalid-feedback">
                  {errors.password ? errors.password : null}
                </div>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="rememberMe-input" check>
                  <span className="ml-2">تزكرني</span>
                  <Input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe-input"
                    className={`${errors.rememberMe ? "is-invalid" : ""}`}
                    onChange={handleChange}
                    value={values.rememberMe}
                  />
                </Label>
                <div className="invalid-feedback">
                  {errors.rememberMe ? errors.rememberMe : null}
                </div>
              </FormGroup>
              <FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  disabled={!isValid && isSubmitting}
                >
                  تسجيل الدخول
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col
            md={6}
            xs={10}
            className="mx-md-0 mx-auto order-md-last order-first my-md-0 my-4"
          >
            <Alert color="warning">
              <p className="lead text-md-right text-center">
                نعتذر عن عدم توافر خدمه تسجيل اعضاء جدد , التطبيق مازال في مرحله
                التطوير والنسخه الحاليه هي نسخه تجريبيه عند الانتهاء من اعمال
                التطوير سوف يتم فتح تسجيل الاعضاء الجدد
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
