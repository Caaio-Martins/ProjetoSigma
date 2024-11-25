import React, { useState } from "react";
import { Campos, Container, Form, InputContainer, Input, Texto, EyeIconButton } from "./style";
import BContinuar from "../../components/Button/Continuar";
import useAuthentication from "../../hooks/userAuthentication";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import debounce from "lodash.debounce";

// Validação de e-mail
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validação de senha (mínimo 8 caracteres, letras e números)
const validatePassword = (password) => 
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);

// Sanitização para evitar caracteres perigosos
const sanitizeEmail = (input) => input.replace(/[^\w@.-]/g, "");
const sanitizePassword = (input) => input.replace(/[<>]/g, "");

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAuthentication();
    const [validationError, setValidationError] = useState("");

    // Manipuladores de mudança de entrada com sanitização
    const handleEmailChange = (e) => {
        setEmail(sanitizeEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        setPassword(sanitizePassword(e.target.value));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Função debounce para limitar requisições rápidas
    const debouncedLogin = debounce(async (credentials) => {
        try {
            await login(credentials);
        } catch (err) {
            console.error("Erro ao fazer login:", err);
        }
    }, 2000); // Limite de 2 segundos entre tentativas

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações de entrada
        if (!validateEmail(email)) {
            setValidationError("Email inválido. Insira um e-mail válido.");
            return;
        }

        if (!validatePassword(password)) {
            setValidationError(
                "A senha deve ter pelo menos 8 caracteres, incluindo letras e números."
            );
            return;
        }

        // Limpa mensagens de erro
        setValidationError("");

        // Chamada ao login
        debouncedLogin({ email, password });
    };

    // Verifica se o formulário está inválido (e-mail ou senha)
    const isFormInvalid = !(validateEmail(email) && validatePassword(password));

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <Campos>
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        aria-describedby="email-help"
                    />
                </Campos>
                <Campos>
                    <label htmlFor="password">Senha</label>
                    <InputContainer>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            aria-describedby="password-help"
                        />
                        <EyeIconButton onClick={togglePasswordVisibility} aria-label="Alternar visibilidade da senha">
                            {showPassword ? (
                                <AiOutlineEyeInvisible size={20} />
                            ) : (
                                <AiOutlineEye size={20} />
                            )}
                        </EyeIconButton>
                    </InputContainer>
                </Campos>
                {validationError && <p style={{ color: "red" }}>{validationError}</p>}
                <Texto>
                    <span>
                        <NavLink to="/recuperar-senha">Esqueceu a senha?</NavLink>
                    </span>
                    <p>
                        Não tem conta?
                        <span>
                            <NavLink to="/cadastro-usuarios">   Cadastre-se</NavLink>
                        </span>
                    </p>
                </Texto>
                <BContinuar type="submit" disabled={loading || isFormInvalid}>
                    {loading ? "Carregando..." : "Continuar"}
                </BContinuar>
                {error && (
                    <p style={{ color: "red" }}>
                        Ocorreu um erro ao fazer login: {error.message}
                    </p>
                )}
            </Form>
        </Container>
    );
};

export default Login;



