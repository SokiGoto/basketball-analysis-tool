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
import { LoginInfo, Game, InitialGame, TestGame } from "../interfaces";
import { auth, db } from "../Firebase";
import { getDocs, getDoc, addDoc, setDoc, deleteDoc, collection, doc} from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

type List = {
    id: string,
    game: Game,
}


const MyPage:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
	const history = useHistory();
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [show, setShow] = useState(false);
    const [DeleteGameId, setDeleteGameId] = useState<string | null>(null);
    const [DeleteGameIndex, setDeleteGameIndex] = useState<number | null>(null);
    
    const [List, setList] = useState<List[]>([]);
    
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, `users/${logininfo.userid}/games`));
            const ret: List[] = [];
            querySnapshot.forEach(doc => {
                ret.push({id:doc.id, game:doc.data().game} as List);
            });
            setList(ret);
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
        const newGameRef = collection(db, `users/${logininfo.userid}/games`);
        const newGame: Game = InitialGame;
        const newGameAdd = await addDoc(newGameRef, { game: newGame });
        setList([...List, {id:newGameAdd.id, game:newGame} as List]);
    }

    // const onChange = async (e:any) => {
    //     const Id = e.target.id;
    //     const newTest = {
    //         id: "",
    //         name: "",
    //         key1: "aaaa",
    //         key2: "bbbb",
    //     }
    //     await setDoc(doc(db, `users/${logininfo.userid}/gamse`, Id), { game: newTest }, { merge: true });
    //     setList(List.map((x, index) => {
    //         if(x.id === Id) {
    //             return {id:Id, game:newTest} as List;
    //         }
    //         return x;
    //     }));
    // }


	const onDelete = (id: string, index: number) => {
        setDeleteGameId(id);
        setDeleteGameIndex(index);
        setShow(true);
    }
    const onDeleteConfirm = () => {
        if (DeleteGameId !== null && DeleteGameIndex !== null) {
            deleteDoc(doc(db, `users/${logininfo.userid}/games`, DeleteGameId));
            setList(List.filter(x => x.id !== DeleteGameId));
        }
        setShow(false);
        setDeleteGameId(null);
        setDeleteGameIndex(null);
        console.log("deleted", DeleteGameId, DeleteGameIndex);
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
        console.log("DeleteGameIndex:", DeleteGameIndex);
        if (DeleteGameId === null || DeleteGameIndex === null) {
            return null;
        } else {
            return(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>消去確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ID : {DeleteGameIndex+1}<br/>
                        日付 : {List[DeleteGameIndex].game.year}年{List[DeleteGameIndex].game.month}月{List[DeleteGameIndex].game.day}日<br/>
                        チームA : {List[DeleteGameIndex].game.team_A}<br/>
                        チームB : {List[DeleteGameIndex].game.team_B}<br/>
                        {/*
                        */}
                        の試合データを削除します。<br/>
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

    // const onTest = () => {
    //     try {
    //         const docRef = updateDoc(doc(db, "games", logininfo.userid), {
    //             games: Games
    //         });
    //         console.log("Document written with ID: ", logininfo.userid);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    //     console.log("onTest")
    // }
    //
    const onTest = () => {
        const newList = List;
        newList.sort((a, b) => {
            if (a.game.year === b.game.year) {
                if (a.game.month === b.game.month) {
                    return a.game.day - b.game.day;
                } else {
                    return a.game.month - b.game.month;
                }
            } else {
                return a.game.year - b.game.year;
            }
        });
        setList(newList);
        console.log(newList)
    }

	const onEdit = (id: string, index: number) => {
		history.push("/tool", List[index]);
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
                                        {/*
                                        <Button onClick={onTest}>
                                            test
                                        </Button>
                                        */}
                                    </Col>
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>日付</th>
                                                <th>チームA</th>
                                                <th>チームB</th>
                                                <th>スコア</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {List.map((list, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>{list.game.year}年{list.game.month}月{list.game.day}日</td>
                                                        <td>{list.game.team_A}</td>
                                                        <td>{list.game.team_B}</td>
                                                        <td>{0}-{0}</td>
                                                        <td>
                                                            <Button id={list.id} onClick={() => onEdit(list.id,index)}>
                                                                Edit
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button id={list.id} onClick={() => onDelete(list.id,index)}>
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
