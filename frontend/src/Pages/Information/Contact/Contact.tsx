import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import axios from "axios";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CircularProgress from "@mui/material/CircularProgress";
import "./Contact.css";

interface FormInterface {
    email: string;
    message: string;
}
enum StateField {
    Email = "email",
    Message = "message"
}
interface MessageInterface {
    subject: string;
    message: string;
}
interface ModalInterface extends MessageInterface {
    isSuccessful: boolean | null;
}
interface ResponseMessageInterface {
    data: ModalInterface;
    count: number;
}

const ResponseMessage = ({data, count}: ResponseMessageInterface) => {
    return (
        <div className = {`${data.isSuccessful === null ? "hidden" : "block"} modal-container`}>
            <div className = {`modal ${data.message === "" ? "hidden" : "flex"}`}>
                <div className = "modal-icon">
                    {data.isSuccessful ? <EmojiEventsIcon /> : <SentimentVeryDissatisfiedIcon />}
                </div>
                <div className = "modal-text">
                    <div className = "flex justify-between w-full">
                        <h1>{data.subject}</h1>
                        <h1>{count}</h1>
                    </div>
                    <p>{data.message}</p>
                </div>
            </div>
            <CircularProgress 
                className = {
                    `absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] ${
                        data.message === "" ? "block" : "hidden"
                    }`
                }
            />
        </div>
    )
}

const Contact = () => {
    const [state, setState] = useState<FormInterface>({
        email: "",
        message: "",
    });
    const [modal, setModal] = useState<ModalInterface>({
        isSuccessful: null,
        subject: "",
        message: "",
    });
    const [count, setCount] = useState<number>(5);

    useEffect(() => {
        if (modal.message !== "" && modal.isSuccessful !== null) {
            const interval = setInterval(() => {
                setCount(prev => {
                    console.log(prev);
                    let newValue = prev - 1;
                    if (newValue === 0) {
                        clearInterval(interval);
                        setModal({
                            isSuccessful: null,
                            message: "",
                            subject: "",
                        });
                        setState({ message: "", email: "" });
                        return 5;
                    }
                    return newValue;
                });
            }, 1000);
        }
    }, [modal.isSuccessful, setCount, setModal, setState, modal.message]);

    const changeValue = async (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: StateField
    ) => {
        setState(prev => {
            return {...prev, [field]: e.target.value}
        });
    }
    const saveMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            let postPromise = axios.post("http://localhost:8000/api/saveMessage", state);
            setModal(prev => {
                return {...prev, isSuccessful: false};
            });
            let res = await postPromise;
            if (res.status === 200) {
                let data = res.data as MessageInterface;
                setModal({...data, isSuccessful: true});
            }
        }
        catch (e: any) {
            let statusNumber = e.response.status as number;
            let data;
            switch (statusNumber) {
                case 406:
                    let alertMessage = "";
                    data = e.response.data as string[];
                    data.forEach((value, index) => {
                        alertMessage+= value;
                        if (index !== data.length-1) {
                            alertMessage+= ", ";
                        }
                    });
                    setModal({
                        isSuccessful: false,
                        message: `${alertMessage} ${data.length > 1 ? "are" : "is"} missing.`,
                        subject: "Oops",
                    });
                    break;
                case 400:
                    data = e.response.data as string;
                    setModal({
                        isSuccessful: false,
                        message: data,
                        subject: "Oops",
                    });
                    break;
                case 500:
                    data = e.response.data as MessageInterface;
                    setModal({...data, isSuccessful: false});
                    break;
            }
        }
    }

    return (
        <div className = "contact div-container">
            <ResponseMessage data = {modal} count = {count} />
            <h1>Leave me a message</h1>
            <form 
                onSubmit = {async e => await saveMessage(e)}
                className = "contact-form"
            >
                <input 
                    type = "email" 
                    placeholder = "Your email" 
                    value = {state.email}
                    onChange = {async e => await changeValue(e, StateField.Email)}
                    required
                />
                <textarea 
                    placeholder = "Your message"
                    value = {state.message} 
                    onChange = {async e => await changeValue(e, StateField.Message)}
                    required 
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Contact;