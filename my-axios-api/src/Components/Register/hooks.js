import axios from 'axios';
import { useState } from "react"

export function useRegister() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setConfirmPassword("")
        setErrorMessage("")
    }

    const handleSubmit = async (event) => {
        console.log(event, "event");
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
        } else {
            console.log(`Submitting form with firstName ${firstName}, lastName ${lastName}, email ${email}, phone ${phone}, password ${password}, and confirmPassword ${confirmPassword}`);
            try {
                const response = await axios.post('http://localhost:3001/user', {
                    firstName,
                    lastName,
                    email,
                    phone,
                    password
                });
                console.log(response.data, "bernardo");
                resetForm()
            } catch (error) {
                console.error(error);
                console.log(error);
                setErrorMessage(error?.response?.data?.message || "An unspecified error occurred")
            }
        }
        console.log(`Submitting form with firstName ${firstName}, lastName ${lastName}, email ${email}, phone ${phone}, password ${password}, and confirmPassword ${confirmPassword}`);
    };
    return {
        handleSubmit,
        errorMessage,
        firstName: { value: firstName, setValue: setFirstName },
        lastName: { value: lastName, setValue: setLastName },
        email: { value: email, setValue: setEmail },
        phone: { value: phone, setValue: setPhone },
        password: { value: password, setValue: setPassword },
        confirmPassword: { value: confirmPassword, setValue: setConfirmPassword }
    }

}