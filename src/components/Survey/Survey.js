import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Spinner,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import swal from 'sweetalert';

import "./Survey.css";

const Survey = () => {
  const [survey, setSurvey] = useState();
  const [locations, setLocations] = useState();
  const [countries, setCountries] = useState();
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    getSurvey();
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
        setLoading(false);
        console.log(res.data);
        setSurvey(res.data);
        setPages(res.data.forms[0].pages);
        setLocations(res.data.locations);
        localStorage.setItem("Survey", JSON.stringify(res.data));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const toggle = () => setSurveyStarted(!surveyStarted);

  const postSurvey = () => {
    setLoading(true)
    let url = "http://104.248.0.49/api/v1/recruitment/answers/submit/"
    axios({
      method: "post",
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
        setLoading(false)
        swal("Good job!", "Your answers were submitted!", "success").then(()=>{window.location.href = "/dashboard"});
      })
      .catch((err) => {
        setLoading(false);

        swal("Sorry!", "Try again", "error");
        console.log(err);
      });
  };

  

  return (
    <div className="content-wrapper">
      <h2>Survey</h2>
      <Row className="dashboard-container">
        {loading ? (
          <Col md="12" className="survey-start-container">
            <Spinner
              style={{ width: "3rem", height: "3rem", marginTop: "100px" }}
            />
          </Col>
        ) : !surveyStarted ? (
          <Col md="12" className="survey-start-container">
            <p className="survey-text">
              {" "}
              A new survey is available. Click the button below to answer some
              questions
            </p>
            <button
              onClick={toggle}
              className="start-button"
              style={{
                backgroundColor: "#343a40",
                border: "7px solid #FFFFFF",
              }}
            >
              Start Survey
            </button>
          </Col>
        ) : (
          <Col md="12" className="survey-start-container">
            {survey && survey.forms.length > 0 ? (
              <div className="survey-view">
                {pages && pages.length > 1 ? (
                  <>
                    <div>
                      <Row className="form-container-row">
                        <Col>
                          {currentPage < pages.length ? (
                            <div>
                              <h4 className="page-title">
                                {pages[currentPage].name}
                              </h4>
                              {pages[currentPage].sections.length ? (
                                <div>
                                  {pages[currentPage].sections.map(
                                    (section, index) => (
                                      <Col md="6" key={section.id}>
                                        <h5 className="section-title">
                                          {section.description}
                                        </h5>
                                        <div>
                                          {section.questions.map(
                                            (question, index) => (
                                              <Col key={question.id}>
                                                {question.type === "multiselect" ?
                                                  <img
                                                    src={question.uploads && question.uploads[0] && question.uploads[0].file_url ? `${question.uploads[0].file_url}`: `${question.description}`}
                                                    alt={question.column_match}
                                                  />: null}

                                                <Form>
                                                      {question.type === "text" || question.type === "tel" ?

                                                    <FormGroup>
                                                    <Label for="exampleEmail">
                                                      {question.column_match}
                                                    </Label>
                                                      <Input
                                                        type="text"
                                                        name={question.column_match}
                                                        id={question.id}
                                                        onChange={(e)=>{
                                                          let values = []
                                                          e.preventDefault()
                                                          values.push(e.target.value)
                                                          let value = values.pop()
                                                          answers.push({
                                                            "column_match": question.column_match,
                                                            "q_ans": value,
                                                            "q_id": question.id
                                                          })
                                                        }}
                                                        placeholder={question.column_match}
                                                      />

                                                      </FormGroup> :
                                                      question.type === "select" ?
                                                      <div>
                                                      {
                                                        question.q_options.map((option, index) => (
                                                          <FormGroup check key={option.id}>
                                                            <Label check>
                                                          <Input
                                                            type="radio"
                                                            name={option.name}
                                                            id={option.id}
                                                            onChange={(e)=>{
                                                              e.preventDefault()
                                                              answers.push({
                                                                "column_match": question.column_match,
                                                                "q_ans": e.target.value,
                                                                "q_id": question.id
                                                              })}}
                                                            
                                                          />
                                                          {option.name}
                                                          </Label>
                                                          </FormGroup>
                                                        ))}
                                                      </div> : question.type === "multiselect" ?
                                                      <div>
                                                        <FormGroup>
                                                          <Label for="exampleSelectMulti">{question.text.replace(/(<([^>]+)>)/gi, "")}</Label>

                                                          <Input 
                                                          type="select" 
                                                          name={question.column_match} 
                                                          id={question.id} 
                                                          multiple
                                                          onChange={(e)=>{
                                                            e.preventDefault()
                                                            let options = e.target.options
                                                            let values = []
                                                            for (var i = 0, l = options.length; i < l; i++) {
                                                              if (options[i].selected) {
                                                                values.push(parseInt(options[i].value));
                                                              }
                                                            }
                                                            // values.push(e.target.value)

                                                            answers.push({
                                                              "column_match": question.column_match,
                                                              "q_ans": values,
                                                              "q_id": question.id
                                                            })
                                                            // console.log(values)
                                                            }} >
                                                          {
                                                            question.q_options.map((option, index)=>(
                                                              <option value={option.id}key={option.id}>{option.name}</option>
                                                            ))}
                                                          </Input>
                                                        
                                                        </FormGroup>
                                                      </div>: null
                                                      }
                                                </Form>
                                              </Col>
                                            )
                                          )}
                                        </div>
                                      </Col>
                                    )
                                  )}
                                </div>
                              ) : (
                                <p>This Page has no sections</p>
                              )}
                            </div>
                          ) : (
                            <>
                            <p> Congratulations. You have finished the survey</p>
                            <Button
                              color="secondary"
                              className="next-button"
                              onClick={() => {
                                setCurrentPage(currentPage-1)
                              }}
                            >
                              Back to survey
                            </Button>
                            <Button
                              color="secondary"
                              className="next-button"
                              onClick={() => {
                                postSurvey()
                              }}
                            >
                              Submit
                            </Button>
                            </>
                          )}
                        </Col>
                        {currentPage < pages.length ? (
                          <Col className="button-container">
                            <Button
                              color="secondary"
                              className="next-button"
                              onClick={() => {
                                if (currentPage < pages.length) {
                                  setCurrentPage(currentPage + 1);
                                }
                              }}
                            >
                              Next Page
                            </Button>
                          </Col>
                        ) : currentPage === pages.length - 1 ? (

                          <Button
                          color="secondary"
                          className="next-button"
                          onClick={() => {
                            if (currentPage > 0) {
                              setCurrentPage(currentPage - 1);
                            }
                          }}
                        >
                          Previous Page
                        </Button>
                        ): null}
                      </Row>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={toggle}
                    className="start-button"
                    style={{
                      backgroundColor: "#343a40",
                      border: "7px solid #FFFFFF",
                    }}
                  >
                    Finish
                  </button>
                )}
              </div>
            ) : (
              <p className="survey-text">
                {" "}
                Oops!. Looks like this survey does not have any... well,
                SURVEYS!. Sorry.
              </p>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Survey;
