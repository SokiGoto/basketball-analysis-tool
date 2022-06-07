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
import { getDocs, setDoc, addDoc, deleteDoc, collection, doc } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

type Test = {
    id: string,
    name: string,
    key1: string,
    key2: string,
}

type List = {
    id: string,
    game: Test
}


const Test:React.VFC<{ logininfo: LoginInfo }> = ({ logininfo }) => {
    const [List, setList] = useState<List[]>([])

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, `users/${logininfo.userid}/gamse`));
            const ret: List[] = [];
            querySnapshot.forEach(doc => {
                ret.push({id:doc.id, game:doc.data().game} as List);
            });
            setList(ret);
        })();
    }, [logininfo.userid]);
	
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

    const onAdd = async () => {
        const newTestRef = collection(db, `users/${logininfo.userid}/gamse`);
        const newTest: Test = {
            id: "",
            name: "",
            key1: "",
            key2: "",
        };
        const newTestAdd = await addDoc(newTestRef, { game: newTest });
        setList([...List, {id:newTestAdd.id, game:newTest} as List]);
    }

    const onChange = async (e:any) => {
        const Id = e.target.id;
        const newTest = {
            id: "",
            name: "",
            key1: "aaaa",
            key2: "bbbb",
        }
        await setDoc(doc(db, `users/${logininfo.userid}/gamse`, Id), { game: newTest }, { merge: true });
        setList(List.map((x, index) => {
            if(x.id === Id) {
                return {id:Id, game:newTest} as List;
            }
            return x;
        }));
    }

    const onDelete = async (e:any) => {
        const Id = e.target.id;
        await deleteDoc(doc(db, `users/${logininfo.userid}/gamse`, Id));
        setList(List.filter(x => x.id !== Id));
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Button variant="primary" onClick={onAdd}>Add</Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={onChange}>Change</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Key1</th>
                                <th>Key2</th>
                                <th>Change</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {List.map((list, index) => {
                                console.log(list);
                                return (
                                    <tr key={index}>
                                        <td>{list.id}</td>
                                        <td>{list.game.name}</td>
                                        <td>{list.game.key1}</td>
                                        <td>{list.game.key2}</td>
                                        <td><Button id={list.id} onClick={onChange}>Change</Button></td>
                                        <td><Button id={list.id} onClick={onDelete}>Delete</Button></td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )

}

export default Test;
