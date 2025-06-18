import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import styled from "styled-components";
import {Button, Input} from "../../components/index.js";
import {NavLink, useNavigate} from "react-router-dom";
import {setUser} from "../../action/index.js";
import {useDispatch} from "react-redux";
import {AuthFromError} from "../../components/";
import {useResetForm} from "../../hooks/index.js";
import {request} from "../../utils/request.js";

const authFromSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required(`Email is required`)
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Only letters and numbers are allowed'),
    password: yup.string()
        .required(`Password is required`)
        .matches(/[a-zA-Z0-9]/, 'Only letters and numbers are allowed')
        .min(4, 'Please enter at least 4 characters')
        .max(16, 'No more than 16 characters'),
})

const AuthorizationContainer = ({className}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {email: "", password: ""},
        resolver: yupResolver(authFromSchema),
    })

    const dispatch = useDispatch()

    useResetForm(reset)

    const nav = useNavigate()

    const [serverError, setServerError] = useState(null)

    const onSubmit = ({email, password}) => {
        request('/api/login', 'POST', {email, password})
            .then(({error, result}) => {
                if (error) {
                    setServerError(`Error request: ${error}`);
                    return;
                }
                const user = result.user

                localStorage.setItem('userId', user.id)


                dispatch(setUser({
                    id: user.id,
                    login: user.name,
                    email: user.email,
                    roleId: Number(user.roleId),
                }))
                nav('/')
            })

    }

    const formError = errors?.email?.message || errors?.password?.message;
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
            <p>Enter your username and password to login.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="text" placeholder="Email address" name="email"
                       id="email" {...register("email", {
                    onChange: () => setServerError(null),
                })}/>
                <Input type="password" placeholder="Password"
                       name="password" {...register("password", {
                    onChange: () => setServerError(null),
                })}/>
                <Button type="submit" width='300' disabled={!!formError}>
                    SignIn
                </Button>
                {errorMessage &&
                    <AuthFromError>{errorMessage}</AuthFromError>}
            </form>
        </div>
    )
}

export const Authorization = styled(AuthorizationContainer)`
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