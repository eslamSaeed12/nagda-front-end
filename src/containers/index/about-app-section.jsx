import React from "react"
import { StyleSheet, css } from "aphrodite"
import { Shape } from "../../components/shape"
import { Col, Row, Container, Badge } from "reactstrap"
import IdeaImg from "../../assets/images/svgs/idea-img.svg"
const styles = StyleSheet.create({
  ideaImg: {
    width: "70%",
    textAlign: "right",
    "@media(max-width:991px)": {
      width: "50%",
    },
  },
  ideaWrapper: {
    "@media(max-width:991px)": {
      textAlign: "center",
    },
  },
})

export const AboutApp = props => {
  return (
    <section className="mt-5 py-4">
      <h2 className="text-center display-4">عن المشروع</h2>

      <Container>
        <h3 className="text-lg-right text-center mt-lg-0 mt-5">
          من اين جاءت الفكره
        </h3>
        <Row>
          <Col lg={6}>
            <p className="lead text-lg-right text-center">
              الفكره جاءت عن طريق تطبيق هندي تم تصنيفه ضمن افضل 100 تطبيق علي
              مستوي العالم يدعي
              <Badge color="primary" className="text-capitalize mx-2 shadow">
                indian police on call
              </Badge>
              تتلخص الفكره في ان التطبيق يعتمد علي نظم المعلومات الجغرافيه في
              تحديد اقرب نقطه شرطه من المكان الحالي للمستخدم ويتم ذلك بناء علي
              الاعتماد علي الموقع الجغرافي للمستخدم حيث يقوم التطبيق بتطبيق بعض
              اللوغاريتمات في الخادم مثل
              <ul className="list-unstyled">
                <li className="text-secondary text-lg-left text-center">
                  best route algorithm
                </li>
                <li className="text-secondary text-lg-left text-center">
                  closest facility algorithm
                </li>
              </ul>
            </p>
            <p className={"lead text-lg-right text-center mt-4"}>
              ثم يتم تحديد المسار الافضل والاقرب للمستخدم علي خريطه تفاعليه
              التطبيق متاح علي منصتي الويب ومنصه اندرويد التطبيق مجاني والنسخه
              التجريبيه تشمل
              <Badge variant="primary" className="shadow mx-2">
                محافظة الشرقيه
              </Badge>
              فقط وفي التحديث الاول سوف يتم اضافة باقي المحافظات
            </p>
          </Col>
          <Col lg={6}>
            <Shape
              img={IdeaImg}
              imgClass={css(styles.ideaImg)}
              wrapperClass={css(styles.ideaWrapper)}
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
