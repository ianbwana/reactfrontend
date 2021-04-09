import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import no_image from "../../assets/no_image.png";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState();
  const [survey, setSurvey] = useState();

  useEffect(() => {
    getUserInfo();
    // getSurvey();
  }, []);

  const getSurvey = () => {
    let url = "http://104.248.0.49/api/v1/recruitment/forms/?node_type=Both";
    axios({
      method: "get",
      url: url,
      crossdomian: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("AccessToken")
        )}`,
      },
      timeout: 90000,
    })
      .then((res) => {
        setSurvey(res.data);
        localStorage.setItem("Survey", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserInfo = () => {
    let url = "http://104.248.0.49/api/v1/users/current-user";
    axios({
      method: "get",
      url: url,
      crossdomian: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("AccessToken")
        )}`,
      },
      timeout: 90000,
    })
      .then((res) => {
        setUserInfo(res.data);
        localStorage.setItem("UserProfile", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="content-wrapper">
      <h2 className="title">Dashboard</h2>
      <Row className="dashboard-container">
        <Col md="5" className="profile-container">
            <Row className="subtitle">
                <h3>User</h3>
            </Row>
          <div className="picture-container">
            <img src={no_image} alt="image not available"  />
          </div>
          <Form>
            <FormGroup>
              <Label for="examplePassword">Email</Label>
              <Input
                placeholder={userInfo && userInfo.email ? userInfo.email : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">First Name</Label>
              <Input
                placeholder={userInfo && userInfo.first_name ? userInfo.first_name : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Last Name</Label>
              <Input
                placeholder={userInfo && userInfo.last_name ? userInfo.last_name : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Phone Number</Label>
              <Input
                placeholder={userInfo && userInfo.phone_number ? userInfo.phone_number : "Not provided"}
              />
            </FormGroup>
          </Form>
        </Col>
        <Col md="7" className="profile-data">
            <Row className="subtitle">
                <h3>User Info</h3>
            </Row>
          <Form>
            <FormGroup>
              <Label>Timezone</Label>
              <Input
                placeholder={userInfo && userInfo.user_timezone ? userInfo.user_timezone : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label >Universe</Label>
              <Input
                placeholder={userInfo && userInfo.universe_name ? userInfo.universe_name : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label >Universe Number</Label>
              <Input
                placeholder={userInfo && userInfo.universe ? userInfo.universe : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label>Referral Code</Label>
              <Input
                placeholder={userInfo && userInfo.referral_code ? userInfo.referral_code : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label>Language</Label>
              <Input
                placeholder={userInfo && userInfo.language ? userInfo.language : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label>Level</Label>
              <Input
                placeholder={userInfo && userInfo.approver_level ? userInfo.approver_level : "Not provided"}
              />
            </FormGroup>
            <FormGroup>
              <Label>Subject</Label>
              <Input
                placeholder={userInfo && userInfo.subject ? userInfo.approver_level : "Not provided"}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
