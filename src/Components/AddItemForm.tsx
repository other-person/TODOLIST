import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";

type AddItemFormPropsType = {
    callBack: (newTitle: string) => void;
   // id: string
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
           // props.addTask(newTitle, props.id);
            props.callBack(newTitle)
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (

        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addTask} variant='outlined'>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

