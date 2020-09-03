import React, { Component, useState, useEffect } from "react"
import { StyleSheet, css } from "aphrodite"
import ReactApexCharts from "react-apexcharts"
import UserForms from "../../forms/user-forms"
import AuthForms from "../../forms/auth-forms"
import { UPDATE_PROFILE_V } from "../../validators/user-v"
import { AUTH_PASSWORD_CONFIRMATION } from "../../validators/auth-v"
import { UserService } from "../../services/user-services"
import { AuthServicesInstance } from "../../services/auth-services"
import { clientErrCatcher } from "../../utils/client-error-catcher"
import { DropbBackLoader } from "../../components/Dropback-loader"
import { Auth_Events } from "../../store/actions/jobs"
import { PasswordEyeToggler } from "../../components/password-eye-toggler"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap"
import clsx from "clsx"
import { useFormik } from "formik"

const styles = StyleSheet.create({
  shadowedCard: {
    width: "80%",
    boxShadow: `
    -20px -20px 60px #d9d9d9, 
    20px 20px 60px #ffffff;`,
    borderRadius: "20px",
    backgroundColor: "#fff",
  },
  toastHeader: {
    strong: {
      margin: "0 auto 0 0",
    },
  },
})

class ApexChart extends Component {
  state = {
    series: [this.props.usage],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.2,
            },
          },
          track: {
            background: "#f8f8f8",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#707070",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val)
              },
              color: "#707070",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#EB095E"],
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["%"],
    },
  }

  render() {
    return (
      <div id="chart" style={{ display: "flex", justifyContent: "center" }}>
        <ReactApexCharts
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={350}
        />
      </div>
    )
  }
}

const ShadowCard = props => {
  return (
    <div
      className={clsx(
        css(styles.shadowedCard),
        "py-4 px-4 text-center mx-lg-0 mx-auto"
      )}
    >
      <h3 className="mb-3">{props.title}</h3>
      <div className="w-100">{props.children}</div>
    </div>
  )
}

const ConfirmationModal = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.onClose}>
      <ModalHeader toggle={props.onClose}>{props.header}</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button color="outline-secondary" onClick={props.onClose}>
          اغلاق
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export const ProfileContent = props => {
  const [OpenConfirmationModal, SetOpenConfirmationModal] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [confirmationErr, setConfirmationErr] = useState(null)
  const [updateProfileClientErr, setupdateProfileClientErr] = useState(null)
  const [updatedProfileSuccess, setUpdateProfileSuccess] = useState(false)
  const [ToastOpen, setToastOpen] = useState(null)
  const [newPasswordLockToggler, setnewPasswordLockToggler] = useState(true)
  const [
    confirmationPasswordLockToggler,
    setconfirmationPasswordLockToggler,
  ] = useState(true)
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    newPassword: null,
  })
  const confirmationForm = useFormik({
    initialValues: {
      password: "",
      id: props.auth.AUTH_USER_DATA._id,
    },
    validationSchema: AUTH_PASSWORD_CONFIRMATION,
    onSubmit: data => {
      if (confirmationForm.isValid) {
        AuthServicesInstance.userConfirmation(
          AuthForms.passordConfrimation(data)
        )
          .then(clientResponse => {
            setConfirmed(true)
            setUpdateFormData({ ...updateFormData, password: data.password })
          })
          .catch(clientErr => {
            setConfirmationErr(clientErrCatcher(clientErr))
            setConfirmed(false)
          })
      }
    },
  })
  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    isValid,
    isValidating,
  } = useFormik({
    initialValues: {
      id: props.auth.AUTH_USER_DATA._id,
      username: props.auth.AUTH_USER_DATA.username,
      email: props.auth.AUTH_USER_DATA.email,
      password: props.auth.AUTH_USER_DATA.password,
      newPassword: undefined,
    },
    validationSchema: UPDATE_PROFILE_V,
    onSubmit: data => {
      if (isValid) {
        setUpdateFormData({ ...data })
        SetOpenConfirmationModal(true)
        // do your job
      }
    },
  })

  useEffect(() => {
    if (confirmed) {
      UserService.updateProfile(UserForms.updateProfile(updateFormData))
        .then(clientResponse => {
          props.dispatch(Auth_Events.AUTH_USER_DATA(clientResponse.data.body))
          setUpdateProfileSuccess(true)
          setConfirmed(false)
          SetOpenConfirmationModal(false)
        })
        .catch(clientErr => {
          setupdateProfileClientErr(clientErrCatcher(clientErr))
          SetOpenConfirmationModal(false)
          setConfirmed(false)
        })
    }
  }, [confirmed])

  useEffect(() => {
    if (!confirmed && updatedProfileSuccess) {
      setToastOpen(true)
      setTimeout(() => {
        setToastOpen(false)
      }, 3000)
    }
  }, [confirmed, updatedProfileSuccess])

  useEffect(() => {
    if (!confirmed && updateProfileClientErr) {
      setToastOpen(true)
      setTimeout(() => {
        setToastOpen(false)
      }, 3000)
    }
  }, [confirmed, updateProfileClientErr])

  return (
    <section className="py-5">
      <Toast
        isOpen={ToastOpen}
        className={`${
          updateProfileClientErr ? "bgc-danger" : "bgc-success"
        } text-white`}
        style={{ position: "fixed", bottom: "1rem", left: "50%", zIndex: 466 }}
      >
        <ToastHeader className={clsx("text-right", css(styles.toastHeader))}>
          {updateProfileClientErr ? "خطا في التحقق" : "تم بنجاح"}
        </ToastHeader>
        <ToastBody>
          {updateProfileClientErr ? (
            Array.isArray(updateProfileClientErr) ? (
              <ul>
                {updateProfileClientErr.forEach((err, i) => {
                  return (
                    <li key={i + (Math.random() * 1000).toFixed(2)}>{err}</li>
                  )
                })}
              </ul>
            ) : (
              updateProfileClientErr
            )
          ) : (
            "تم تحديث بياناتك الشخصيه بنجاح"
          )}
        </ToastBody>
      </Toast>
      {confirmed ? <DropbBackLoader size={90} /> : null}
      <ConfirmationModal
        isOpen={OpenConfirmationModal}
        header="تأكيد الهويه"
        onClose={() => SetOpenConfirmationModal(false)}
      >
        <Container>
          {confirmationErr ? (
            <div className="text-danger text-center">
              {Array.isArray(confirmationErr) ? (
                <ul>
                  {confirmationErr.forEach((err, i) => {
                    return (
                      <li key={i + (Math.random() * 1000).toFixed(2)}>{err}</li>
                    )
                  })}
                </ul>
              ) : (
                confirmationErr
              )}
            </div>
          ) : null}
          <Form
            onSubmit={confirmationForm.handleSubmit}
            className="text-center"
          >
            <FormGroup className="w-75 mx-auto position-relative">
              <Label htmlFor="password">الرقم السري</Label>
              <Input
                type={confirmationPasswordLockToggler ? "password" : "text"}
                name="password"
                id="password"
                value={confirmationForm.values.password}
                onChange={confirmationForm.handleChange}
                className={`${
                  confirmationForm.errors.password ? "is-invalid" : null
                }`}
              />
              <PasswordEyeToggler
                left="2rem"
                top="2.7rem"
                onClick={() =>
                  setconfirmationPasswordLockToggler(
                    !confirmationPasswordLockToggler
                  )
                }
              />
              <div className="invalid-feedback">
                {confirmationForm.errors.password
                  ? confirmationForm.errors.password
                  : null}
              </div>
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary">
                تأكيد
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </ConfirmationModal>
      <Container>
        <Row>
          <Col lg={6} sm={10} className="mx-lg-0 mx-auto">
            <ShadowCard title="المعلومات الشخصيه">
              <div className="my-4 text-danger">
                {errors.password
                  ? "something went wrong , we will fix it soon"
                  : null}
              </div>
              <Form
                className="text-center w-75 mx-auto"
                onSubmit={handleSubmit}
              >
                <FormGroup>
                  <Label htmlFor="username">الاسم الشخصي</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                    className={`${errors.username ? "is-invalid" : null}`}
                  />
                  <div className="invalid-feedback">{errors.username}</div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">البريد الالكتروني</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    className={`${errors.email ? "is-invalid" : null}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </FormGroup>
                <FormGroup className="position-relative">
                  <Label htmlFor="newPassword">الرقم السري</Label>
                  <Input
                    type={newPasswordLockToggler ? "password" : "text"}
                    name="newPassword"
                    id="newPassword"
                    className={`${errors.newPassword ? "is-invalid" : null}`}
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                  <PasswordEyeToggler
                    left={"2rem"}
                    top={"2.6rem"}
                    onClick={() =>
                      setnewPasswordLockToggler(!newPasswordLockToggler)
                    }
                  />
                  <div className="invalid-feedback">{errors.newPassword}</div>
                  <Input
                    type="hidden"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!isValid && isValidating}
                  >
                    تحديث
                  </Button>
                </FormGroup>
              </Form>
            </ShadowCard>
          </Col>
          <Col lg={6} sm={10} className="mx-lg-0 mx-auto mt-lg-0 mt-5">
            <ShadowCard title="الاستخدام">
              <h5>استهلاك تطبيق الويب</h5>
              <ApexChart
                usage={
                  (props.auth.AUTH_USER_DATA.usage.web * 100) /
                  props.usage.max.web
                }
              />
              <h5>استهلاك تطبيق الاندرويد</h5>
              <ApexChart
                usage={
                  (props.auth.AUTH_USER_DATA.usage.mobile * 100) /
                  props.usage.max.mob
                }
              />
            </ShadowCard>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ProfileContent
