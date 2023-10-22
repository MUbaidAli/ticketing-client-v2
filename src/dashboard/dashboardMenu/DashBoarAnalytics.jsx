import { Col, Row } from "antd";
import Dashboard from "../../components/Dashboard";
import "./dashboardanalytics.css";
const DashBoardAnalytics = () => {
  return (
    <>
      <Dashboard>
        <Row gutter={[16, 16]}>
          <Col className="box" span={11}>
            test
          </Col>
          <Col className="box" span={11}>
            test
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col className="box" span={8}>
            test
          </Col>
          <Col className="box" span={7}>
            test
          </Col>
          <Col className="box" span={7}>
            test
          </Col>
        </Row>
      </Dashboard>
    </>
  );
};

export default DashBoardAnalytics;
