import React from 'react';
import { useSelector } from "react-redux";
import Main from './Main';

const ChildrenHtml = ({ nodes }) => {
    const state = useSelector((state) => state);
    return nodes?.length > 0 ? (
        <>
            {
                nodes?.length > 0 &&
                nodes.map((item) => (
                    <Main key={item} {...state.data.data[item]} from="child" />
                ))
            }
        </>
    ) : null
}

export default ChildrenHtml