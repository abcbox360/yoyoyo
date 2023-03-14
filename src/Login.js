import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
position: relative;
top: 50px;
height: 100%;
width: 100%;
display: flex;
justify-content: center;
`

function Login (props) {
const [password, setPassword] = useState('')
const { setLogin } = props
const url = "https://script.google.com/macros/s/AKfycbwK8T6ckUHeHT0Rl1QWFMz6XFnQWu9RFmLUW4VZ9fQVvSpnpA0TCBk3M1I0AMh-o17q/exec"
const handleCheck = () => {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            code: 'login',
            password: password
        })
    })
    .then(response => response.json())
    .then((data) => { data.code === 'pass' ? setLogin(true): alert('錯誤')});
}

    return <Container>
        <input type="password" onChange={e=>setPassword(e.target.value)}></input>
        <button onClick={handleCheck}>確定</button>
    </Container>
}

export default Login

