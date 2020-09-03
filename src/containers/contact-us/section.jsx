import React, { useState, useEffect } from "react"
import { StyleSheet, css } from "aphrodite"
import clsx from "clsx"
import {
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap"
import feedbackEnum from "../../data/feedback-types-enum.json"
import { useFormik } from "formik"
import FeedbackForms from "../../forms/feedback-forms"
import { Create_Feedback } from "../../validators/feedback-v"
import { FeedbackService } from "../../services/feedback-services"
import { clientErrCatcher } from "../../utils/client-error-catcher"
const styles = StyleSheet.create({
  textArea: {
    resize: "none",
    minHeight: 100,
  },
  flexCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
})

export const ConnectionSection = props => {
  const [
    clientCreateFeedBacckSuccess,
    setclientCreateFeedBacckSuccess,
  ] = useState(null)
  const [clientCreateFeedBacckFail, setclientCreateFeedBacckFail] = useState(
    null
  )
  const [clientLoad, setCLientLoad] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const {
    isValid,
    isSubmitting,
    isValidating,
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      reason: "",
      message: "",
    },
    validationSchema: Create_Feedback,
    validateOnBlur: false,
    onSubmit: data => {
      if (isValid) {
        // do your job
        FeedbackService.postFeedBack(FeedbackForms.postFeedbacck(data))
          .then(clientResponse => {
            setclientCreateFeedBacckSuccess(true)
            setCLientLoad(true)
          })
          .catch(clientErr => {
            setclientCreateFeedBacckFail(clientErrCatcher(clientErr))
            setCLientLoad(true)
          })
      }
    },
  })

  useEffect(() => {
    if (clientLoad && clientCreateFeedBacckSuccess) {
      setOpenToast(true)
      setTimeout(() => {
        setOpenToast(false)
      }, 4000)
    }
  }, [clientLoad, clientCreateFeedBacckSuccess])

  useEffect(() => {
    if (clientLoad && clientCreateFeedBacckFail) {
      setOpenToast(true)
      setTimeout(() => {
        setOpenToast(false)
      }, 4000)
    }
  }, [clientLoad, clientCreateFeedBacckFail])

  return (
    <section className="py-5">
      <Toast
        isOpen={openToast}
        className={`${
          clientLoad && clientCreateFeedBacckFail ? "bgc-danger" : "bgc-success"
        } text-white`}
        style={{ position: "fixed", bottom: "1rem", left: "50%", zIndex: 466 }}
      >
        <ToastHeader className={"text-right"}>
          {clientLoad && clientCreateFeedBacckFail
            ? "خطا في التحقق"
            : "تم بنجاح"}
        </ToastHeader>
        <ToastBody>
          {clientCreateFeedBacckFail ? (
            Array.isArray(clientCreateFeedBacckFail) ? (
              <ul>
                {clientCreateFeedBacckFail.forEach((err, i) => {
                  return (
                    <li key={i + (Math.random() * 1000).toFixed(2)}>{err}</li>
                  )
                })}
              </ul>
            ) : (
              clientCreateFeedBacckFail
            )
          ) : (
            "تم تحديث بياناتك الشخصيه بنجاح"
          )}
        </ToastBody>
      </Toast>
      <Container>
        <h2 className="text-center">لا تتردد في التواصل معنا</h2>
        <Row>
          <Col md={6}>
            <Form
              className="text-md-right text-center w-75 mx-md-0 mx-auto mt-md-0 mt-4"
              onSubmit={handleSubmit}
            >
              <FormGroup>
                <Label for="email">البريد الالكتروني</Label>
                <Input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`${errors.email ? "is-invalid" : null}`}
                />
                <div className="invalid-feedback">
                  {errors.email ? errors.email : null}
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="reason">السبب</Label>
                <Input
                  type="select"
                  name="reason"
                  id="reason"
                  onChange={handleChange}
                  value={values.reason}
                  className={`${errors.reason ? "is-invalid" : null}`}
                >
                  {feedbackEnum.map((f, i) => {
                    return (
                      <option
                        key={`${f}-${i}-${(Math.random() * 1000).toFixed(2)}`}
                        value={f.value}
                      >
                        {f.name}
                      </option>
                    )
                  })}
                </Input>
                <div className="invalid-feedback">
                  {errors.reason ? errors.reason : null}
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="message">رسالتك</Label>
                <Input
                  type="textarea"
                  name="message"
                  id="message"
                  className={clsx(
                    css(styles.textArea),
                    `${errors.message ? "is-invalid" : null}`
                  )}
                  onChange={handleChange}
                  value={values.message}
                />
                <div className="invalid-feedback">
                  {errors.message ? errors.message : null}
                </div>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  color="warning"
                  className="text-white"
                  disabled={!isValid && isValidating}
                >
                  ارسال
                </Button>
              </FormGroup>
            </Form>
          </Col>
          <Col
            className={clsx(
              css(styles.flexCenter),
              "mx-md-0 mx-auto order-md-last order-first mt-md-0 mt-4"
            )}
            md={6}
            xs={10}
          >
            <p
              className="lead text-md-right text-center py-2 px-2 rounded"
              style={{ backgroundColor: "#f8f8f8" }}
            >
              النَّقْد البَنَّاء هو عملية تقديم آراء صحيحة ووجيهة حول عمل
              الآخرين، والتي تنطوي عادة على تعليقات إيجابية وسلبية ولكن بطريقة
              ودية وليس بطريقة فيها عناد. وفي الأعمال التعاونية، غالبًا ما يكون
              هذا النوع من النقد أداة قيمة للارتقاء بمعايير الأداء والمحافظة
              عليها.
            </p>
            <p className="lead text-warning">نشكرك علي تعاونك</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
