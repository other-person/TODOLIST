import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let[ newTitle, setNewTitle] = useState(props.title);
    console.log(newTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    let[ edit, setEdit] = useState(false);

    const turnOnHandler = ()=> {
        setEdit(true)
    };
    const turnOffHandler = ()=> {
        setEdit(false)
    }

    return (
            edit?<input value={newTitle} onChange={onChangeHandler}  onBlur={turnOffHandler} autoFocus={true}/>
                :<span onDoubleClick={turnOnHandler}>{props.title}</span>
    );
};

