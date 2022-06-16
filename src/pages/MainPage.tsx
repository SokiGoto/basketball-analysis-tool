import React, { useState } from "react";

import { Link , useHistory } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import TextPage from "./TextPage";

import Sample1 from "../images/sample1.png";
import Sample2 from "../images/sample2.png";
// import Table1 from "../images/Table1.png";
// import Table2 from "../images/Table2.png";


import { LoginInfo } from "../interfaces";

const MainPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [text, settext] = useState<string>("")
	const [submittext, setsubmittext] = useState<string>("")


	const onLoginClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		history.push("/login");
	};
	
	//const onSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
	//	setsubmittext(text)
	//};

        

    const LoginButton: React.VFC<{}> = () => {
        if (logininfo.state !== "signin") {
    		return (
    			<Row>
    				<Col className="mx-3">
    					マイページを利用する場合は<Link to="/login">ログイン</Link>してくだい
    				</Col>
    			</Row>
    		);
    	} else {
            return null
        }
    }

	return (
		<Container className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
            <LoginButton />
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Sample1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    {/*
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Sample2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                    {/*
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    */}
                    </Carousel.Caption>
                </Carousel.Item>
                {/*
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Table2}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                */}
            </Carousel>
			<Row>
				<Col className="mx-3">
					<h1>Basketball Analysis Tool</h1>
                    <p>
                        Basketball Analysis Toolは、バスケットボールの試合データを解析するためのツールです。
                        試合データを入力することで、PPP、POSS、eFG%、TO%、FTR、ORB%、DRB%、TRB%を計算して表示します。
                        また、シュートポイントも記録することができるため、シュートポイントの分布を見ることができます。
                    </p>
                    <h2>注意事項</h2>
                    <p>
                        個人で運営しているため、予算等の都合で予告なくサービスを終了することがあります。
                        また、入力したデータ等を保証することはできません。
                        以上のことを予めご了承いただいた上で、ご利用ください。
                    </p>
                    <h2>お問い合わせ</h2>
                    <p>
                        バグやご要望等がございましたら以下のDMまでご連絡していただけますと幸いです。
                        <br/>
                        <a href="https://twitter.com/mbo57" target="_blank">https://twitter.com/mbo57</a>
                    </p>
				</Col>
			</Row>
			{/*<TextPage text={text} submittext={submittext}/>*/}
		</Container>
	);
}

export default MainPage
