import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import TextPage from "./TextPage";

const MainPage = () => {
	const history = useHistory();
	const [text, settext] = useState<string>("")
	const [submittext, setsubmittext] = useState<string>("")


	const onLoginClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		history.push("/login");
	};
	
	//const onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
	//	setsubmittext(text)
	//};

	return (
		<Container className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
			<Row>
				<Col className="mx-3">
					<h1>Basketball tools</h1>
					<Button variant="primary" type="button" onClick={onLoginClick}>
						ログイン
					</Button>
					{/*
					//<Form>
						//<Form.Group className="mb-3">
						//	<Form.Label>Text box</Form.Label>
						//	<Form.Control
						//		placeholder="Enter text"
						//		onChange = {(e) => settext(e.target.value)}
						//	/>
						//</Form.Group>
						//<Button variant="primary" type="button" onClick={onSubmitClick}>
						//	提出
						//</Button>
					//</Form>
				   */}
				</Col>
			</Row>
			{/*<TextPage text={text} submittext={submittext}/>*/}
		</Container>
	);
}

export default MainPage
