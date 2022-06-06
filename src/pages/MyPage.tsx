import React, { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link , useHistory } from "react-router-dom";
import { LoginInfo, Game, InitialGame } from "../interfaces";
import { auth, db } from "../Firebase";
import { getDoc, addDoc, setDoc, collection, doc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";


const MyPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [show, setShow] = useState(false);
    const [DeleteGameID, setDeleteGameId] = useState<number | null>(null);
    
    const [Games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDoc(doc(db, "games", logininfo.userid));
            if (querySnapshot.exists()){
                const games = await querySnapshot.data().games;
                setGames(games);
                console.log(games);
            } else {
                console.log("No such document")
            }
        })();
    }, [logininfo.userid]);
	
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


    const onNewGame = async() => {
        const newGames = [...Games, InitialGame];
        await setGames(newGames);
        try {
            const docRef = await setDoc(doc(db, "games", logininfo.userid), {
                games: newGames
            });
            console.log("Document written with ID: ", logininfo.userid);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


	const onDelete = async(e: any) => {
        setDeleteGameId(Number(e.target.id));
        setShow(true);
    }
    const onDeleteConfirm = async() => {
        console.log(DeleteGameID);
        const newGames = Games.filter((game, index) => (index !== DeleteGameID));
        setGames(newGames);
        try {
            const docRef = setDoc(doc(db, "games", logininfo.userid), {
                games: newGames
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setShow(false);
        setDeleteGameId(null);
    }

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
    
    const handleClose = () => setShow(false);

    const ConfirmDialog = () => {
        if (DeleteGameID === null) {
            return null;
        } else {
            return(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>消去確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ID : {DeleteGameID+1}<br/>
                        {Games[DeleteGameID].year}年{Games[DeleteGameID].month}月{Games[DeleteGameID].day}日<br/>
                        {Games[DeleteGameID].team_A} 対 {Games[DeleteGameID].team_B}の試合データを削除します。<br/>
                        データは完全に消去されます。<br/>
                        消去してもよろしいですか？
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            キャンセル
                        </Button>
                        <Button variant="primary" onClick={onDeleteConfirm}>
                            消去
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

	return (
        <Container className="mt-4 mb-5">
            <Row>
                <Col className="mx-3">
                    <ConfirmDialog/>
                    <Tabs
                        defaultActiveKey="games"
                        transition={false}
                        id="noanim-tab-example"
                        variant="tabs"
                    >
                        <Tab eventKey="games" title="試合">
                            <div className="mx-3 my-3">
                                <Row className="gap-2">
                                    <Col>
                                        <Button onClick={onNewGame}>
                                            NewGame
                                        </Button>
                                    </Col>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>年月日</th>
                                                <th>チーム</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Games.map((game, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{game.year}年{game.month}月{game.day}日</td>
                                                        <td>{game.team_A}対{game.team_B}</td>
                                                        <td>
                                                            <Button>
                                                                Edit
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button id={String(index)} onClick={onDelete}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Row>
                            </div>
                        </Tab>
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
