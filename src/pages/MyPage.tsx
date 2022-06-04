import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link , useHistory } from "react-router-dom";
import { LoginInfo } from "../interfaces";
import { auth } from "../Firebase";
import { updatePassword } from "firebase/auth";


const MyPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
	
	const onLogoutClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
		await auth.signOut();
		history.push("/");
		alert("ログアウトしました");
	};

	if (logininfo.state !== "signin") {
		return (
			<Container className="mt-4 mb-5">
				<Row>
					<Col className="mx-3">
						マイページを利用する場合は<Link to="/login">ログイン</Link>してくだい
					</Col>
				</Row>
			</Container>
		);
	};


	
	const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const user = auth.currentUser;
	
			if (!user) {
				return;
			}

			if (newPassword !== newPasswordConfirmation) {
				alert("パスワードが一致しません。");
				return;
			}
	
			updatePassword(user, newPassword)
				.then(() => {
					alert("パスワードを更新しました。");
					setNewPassword("");
					setNewPasswordConfirmation("");
				})
				.catch((error) => {
					alert(error.code);
				});
	};


	return (
    <Container className="mt-4 mb-5">
      <Row>
        <Col className="mx-3">
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            variant="tabs"
          >
		    <Tab eventKey="home" title="ユーザー情報">
		  	  <div className="mx-3 my-3">
				<p>id:{logininfo.userid}</p>
			  </div>
		    </Tab>
            <Tab eventKey="password" title="パスワード変更">
              <div className="mx-3 my-3">
                <Form onSubmit={handleFormSubmission}>
                  <Form.Group>
                    <Form.Label>新しいパスワード</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>パスワードの確認</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPasswordConfirmation}
                      onChange={(e) =>
                        setNewPasswordConfirmation(e.target.value)
                      }
                    />
                  </Form.Group>
				  <br/>
				  <Button variant="primary" type="submit">
                    更新
                  </Button>
                </Form>
              </div>
            </Tab>
            <Tab eventKey="logout" title="ログアウト">
              <div className="mx-3 my-3">
                <Button variant="primary" type="button" onClick={onLogoutClick}>
                  ログアウト
                </Button>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );

}

export default MyPage;
