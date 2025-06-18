import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import styled from "styled-components";
import {AuthFromError, Button, Input} from "../../components/index.js";
import {NavLink, useNavigate} from "react-router-dom";
import {ACTION_TYPE, setUser} from "../../action/index.js";
import {useDispatch} from "react-redux";
import {useResetForm} from "../../hooks/index.js";
import {request} from "../../utils/request.js";


const regFromSchema = yup.object().shape({
    login: yup
        .string()
        .required("Username is required")
        .matches(/^[a-zA-Z0-9_-]+$/, "Username is required")
        .min(3, 'Please enter at least 3 characters')
        .max(16, 'No more than 16 characters'),
    email: yup.string()
        .email('Invalid email address')
        .required(`Email is required`)
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Only letters and numbers are allowed'),
    password: yup.string()
        .required(`Password is required`)
        .matches(/[a-zA-Z0-9]/, 'Only letters and numbers are allowed')
        .min(4, 'Please enter at least 4 characters')
        .max(16, 'No more than 16 characters'),
    repeatPassword: yup
        .string()
        .required("Password is required")
        .oneOf([yup.ref('password'), null], 'Passwords must match')

})

const RegistrationContainer = ({className}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {login: "", email: "", password: "", repeatPassword: ""},
        resolver: yupResolver(regFromSchema),
    })

    const dispatch = useDispatch()

    const nav = useNavigate()

    const [serverError, setServerError] = useState(null)

    useResetForm(reset)

    const onSubmit = ({ login, email, password }) => {
        dispatch({ type: ACTION_TYPE.CLEAR_CART });
        request('/api/register', 'POST', { name: login, email, password })
            .then((res) => {
                if (res.error) {
                    setServerError(res.error);
                    return;
                }

                const user = res.result.user;

                if (!user) {
                    setServerError(res.error || 'Registration failed: no user data returned');
                    return;
                }

                localStorage.setItem('userId', user.id);

                dispatch(setUser({
                    id: user.id,
                    login: user.name,
                    email: user.email,
                    roleId: Number(user.roleId),
                }));

                nav('/');
            })
            .catch((error) => {
                setServerError('Registration failed: ' + error.message);
            });
    };

    const formError = errors?.login?.message || errors?.email?.message || errors?.password?.message || errors?.repeatPassword?.message;
    const errorMessage = formError || serverError;

    return (
        <div className={className}>
            <div className='auth_nav'>
                <NavLink to='/signin'
                         className={({isActive}) => isActive ? 'active' : ''}>
                    SignIn
                </NavLink>
                <p>|</p>
                <NavLink to='/signup'
                         className={({isActive}) => isActive ? 'active' : ''}>
                    SignUp
                </NavLink>
            </div>
            <p>Enter your email and password to register.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Login" name="login"
                       id="login" {...register("login", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="text" placeholder="Email address" name="email"
                       id="email" {...register("email", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder="Password"
                       name="password" {...register("password", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder="Password"
                       name="password" {...register("repeatPassword", {
                    onChange: () => setServerError(null),
                })}/>
                <Button type="submit" width='300' disabled={!!formError}>
                    SingUp
                </Button>
                {errorMessage &&
                    <AuthFromError>{errorMessage}</AuthFromError>}
            </form>
        </div>
    )
}

export const Registration = styled(RegistrationContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    & .active {
        color: #46A358;
    }

    & p {
        margin-bottom: 14px;
        font-size: 16px;
        color: #3D3D3D;
    }


    & .auth_nav {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bold;

        p {
            font-weight: 400;
        }
    }

    & .auth_nav p {
        padding: 0 12px;
    }

    & input {
        min-height: 40px;
        margin-bottom: 16px;
        border-radius: 5px;
    }

    & form {
        display: flex;
        flex-direction: column;
    }
`