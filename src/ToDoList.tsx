import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function ToDoList() {
    const { register, watch, handleSubmit, formState } = useForm();
    console.log(register);
    console.log("watch: ", watch());
    console.log("error: ", formState.errors);

    const onValid = (data: any) => {
        console.log("data: ", data);
    };
    // const [toDo, setToDo] = useState("");
    // const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    //     const {
    //         currentTarget: {value},
    //     } = event;
    //     setToDo(value);
    // };
    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log("??: ", toDo);
    // }

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }} 
                onSubmit={handleSubmit(onValid)}
            >
                <input {...register("email", {required: true})} placeholder="email" />
                <input {...register("firstName", {required: true})} placeholder="First Name"/>
                <input {...register("lastName", {required: true})} placeholder="last Name/"></input>
                <input {...register("userName", {required: true})} placeholder="Username/"></input>
                <input {...register("password", {required: true, minLength: 5})} placeholder="Password/"></input>
                <input {...register("password1", {required: true, minLength: 5})} placeholder="Password1/"></input>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;