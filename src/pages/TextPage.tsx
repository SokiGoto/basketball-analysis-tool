import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// const TextPage = () => {
const TextPage: React.VFC<{ text: string, submittext: string }> = ({text, submittext}) => {
	console.log("===============-")
	return (
		<>
			<Container className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
				<Row>
					<Col className="mx-3">
						<h1>Text Page</h1>
						<p>{text}</p>
						<p>{submittext}</p>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default TextPage;
