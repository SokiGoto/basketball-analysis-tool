import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { LoginInfo } from "../interfaces";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const loginstatus = logininfo.state;
	if (loginstatus == "signin") {
		return (
			<Container className="mt-4 mb-5">
				<Row>
					<Col className="mx-3">
						既にログインしています。マイページは<Link to="/mypage">こちら</Link>から。
					</Col>
				</Row>
			</Container>
		);
	};

	//firebase.auth().signInWithEmailAndPassword(email, password)
	const onLoginClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(( userCredential) => {
                var user = userCredential.user;
                history.push("/mypage");
            })
            .catch((error) => {
                alert("ログインに失敗しました。")
                console.error(error)
        	});
	};
	return (
		<Container className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
			<Row>
				<Col className="mx-3">
					<h4>ログイン</h4>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>E-Mail アドレス</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>パスワード</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<br/>
						<Button variant="primary" type="button" onClick={onLoginClick}>
							ログイン
						</Button>
						<br/>
						<Form.Text>
							<Link to="/signup" className="text-dark">
								新規登録
							</Link>
						</Form.Text>
						<br/>
						<Form.Text>
							<Link to="/passreset" className="text-dark">
								パスワードをお忘れの方
							</Link>
						</Form.Text>
					</Form>
				</Col>
			</Row>
		</Container>

	);
}

export default LoginPage
