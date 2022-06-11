import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginInfo } from "./interfaces";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PassResetPage from "./pages/PassResetPage";
import ToolPage from "./pages/ToolPage";
import MyPage from "./pages/MyPage";
import Test from "./pages/Test";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { auth } from "./Firebase";
import './App.css';

function App() {
	const [loginInfo, setLoginInfo] = useState<LoginInfo>({
		state: "signout",
		userid: "",
		email: "",
	});
	
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setLoginInfo({
					state: "signin",
					userid: user?.uid || "",
					email: user?.email || "",
				});
			} else {
				setLoginInfo({ state: "signout", userid: "", email: "" });
			}
		});
	}, []);


	return (
		<Router>
			<div className="page-content">
				<Header loginInfo={loginInfo}/>
				<Switch>
					<Route exact path="/">
						<MainPage logininfo={loginInfo}/>
					</Route>
					<Route path="/signup">
						<SignupPage logininfo={loginInfo}/>
					</Route>
					<Route path="/mypage">
						<MyPage logininfo={loginInfo}/>
					</Route>
					<Route path="/tool">
						<ToolPage logininfo={loginInfo}/>
					</Route>
					<Route path="/login">
						<LoginPage logininfo={loginInfo}/>
					</Route>
					<Route path="/passreset">
						<PassResetPage />
					</Route>
					<Route path="/test">
						<Test logininfo={loginInfo}/>
					</Route>
					<Route>
						<NotFound/>
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
