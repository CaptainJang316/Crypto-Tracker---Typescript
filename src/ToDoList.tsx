import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function ToDoList() {
    const { register, watch } = useForm();
    console.log(register);
    console.log(watch());
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
            <form>
                <input {...register("email")} placeholder="email" />
                <input {...register("firstName")} placeholder="First Name"/>
                <input {...register("lastName")} placeholder="last Name/"></input>
                <input {...register("userName")} placeholder="Username/"></input>
                <input {...register("password")} placeholder="Password/"></input>
                <input {...register("password1")} placeholder="Password1/"></input>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;