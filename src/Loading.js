import styled from 'styled-components'
import gif1 from "./img/loading.gif"

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: fixed;
left: 0;
right: 0;
z-index: 10;
width: 100%;
background: white;
bottom: 0;
top: 50px;
`
const Gif = styled.img`
width: 100%;
max-width: 460px;
`
function Loading() {

    return <Container>
        <Gif src={gif1} />
    </Container>
}

export default Loading
