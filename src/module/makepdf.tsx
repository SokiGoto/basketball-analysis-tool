import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from 'react-pdf';

import { Game } from "../interfaces";

type List = {
    id: string,
    game: Game,
}

const makepdf: React.VFC<{list: List}> = ({list}) => {
    console.log(list);
    return null;
}

export default makepdf;
