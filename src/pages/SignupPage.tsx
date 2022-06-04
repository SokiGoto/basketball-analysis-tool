import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { LoginInfo } from "../interfaces";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "../App.css";



const SignupPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");


	//firebase.auth().signInWithEmailAndPassword(email, password)
	const onSignupClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(( userCredential) => {
				var user = userCredential.user;
				alert("アカウントを制作しました。")
				history.push("/mypage");
			})
			.catch((error) => {
				alert(error.message)
				console.error(error)
			});
		//console.log(email);
	};
	return (
		<Container className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
			<Row>
				<Col className="mx-3">
					<h4>新規登録</h4>
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
						<Button variant="primary" type="button" onClick={onSignupClick}>
							新規登録
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>

	);
}

export default SignupPage;
