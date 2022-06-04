import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


const PassResetPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onRegistClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // https://firebase.google.com/docs/auth/web/password-auth?hl=ja#web-v8

	const auth = getAuth()
    setErrorMessage(() => "");
    sendPasswordResetEmail(auth, email)
      .then((resp) => {
        // メール送信成功
        console.log("send mail ", email)
        alert("メールを送信しました")
        history.push("/login")
      })
      .catch((error) => {
        // メール送信失敗
        console.log("mail send error:", email)
      })
  };

  return (
    <Container className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
      <Row>
        <Col className="mx-3">
          <h4>パスワード再設定</h4>
          <p>パスワード再設定用のメールを送信する</p>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-Mail アドレス</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
			<br/>
            <Button variant="primary" type="button" onClick={onRegistClick}>
              メールを送る
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PassResetPage;
