import { useState } from "react";
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailandPassword(email, password);
            const userDocRef = await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (e) {
            if (e.code === "auth/email-already-in-use") {
                alert("email already in use");
            } else {
                console.log("error when creating user", e);
            }
        }
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email} />

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;