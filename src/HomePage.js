import styled from 'styled-components'
import CreateItem from './CreateItem'
import { useState, useEffect } from "react"
import Loading from "./Loading"
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const HomePageContainer = styled.div`
margin-top: 3rem;
text-align: center;
`
const CreateListContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
justify-content: center;
align-items: center;
row-gap: 1rem;
padding: 2rem 0 0 0;
width: 100%;
max-width: 1000px;
margin: 1rem auto;
@media screen and (max-width: 1030px) {
 grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 675px) {
 grid-template-columns: 1fr;
}
`
const Ok = styled.div`
background: #0080FF;
color: #FFF;
width: 100px;
padding: 5px;
margin: 0 auto 5px auto ;
border-radius: 5px;
box-shadow: 1px 1px 5px black;
cursor: pointer;
&:hover {
    background: #FFA30D;
}
&:active {
    background: #FFA30D;
    box-shadow: 0 0 2px black;
}
`
const New = styled(Ok)`
width: 50px;
height: 50px;
border-radius: 50%;
font-size: 40px;
line-height: 19px;
`
const LastList = styled.div`
display:flex;
width: 100%;
flex-direction: column;
max-width: 1000px;
margin: 10px auto;
`
const TableTitle = styled.div`
width: 15%;
text-align:center;
padding: 0.2rem;
border-right: 0.1rem dashed rgba(0,0,0,0.2);
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
&:nth-child(2) {
    width:25%;
}
&:last-child {
    border: none;
}
@media screen and (max-width:675px) {
    width:25%;
    border: none;
    &:nth-child(1) {
        width:30%;
    }
    &:nth-child(2) {
        width:70%;
    }
}
`
const TableRow = styled.div`
display:flex;
position: relative;
border: 0.1rem dashed rgba(0,0,0,0.2);
cursor: pointer;
box-shadow: 0 0 2px gray;
border-radius: 10px;
&:first-child {
    border-top: 0.1rem dashed rgba(0,0,0,0.2);
}
&:hover {
    background: rgba(0,0,0,0.2);
    transform: scale(1.01);
}
&:first-child:hover {
    background: none;
    transform: none;
    cursor: auto;
}
${props => props.$active && `
    background: rgb(256,256,200);
    transform: scale(1.01);
    z-index: 2;
    &:hover {
        background: rgb(256,256,200);
    }
`}
& * {
    pointer-events: none;
}
@media screen and (max-width:675px) {
    flex-wrap: wrap;
    margin: 0.2rem;
    &:first-child:hover {
        background: rgba(0,0,0,0.2);
    }
}
`
const TableItem = styled(TableTitle)`
&:nth-child(2) {
    text-align: left;
}
&:nth-child(3) {
    text-align: right;
}
@media screen and (max-width:675px) {
    &:nth-child(1) {
        border-bottom: 0.1rem deshed
    }
    &:nth-child(2) {
    }
}
`
const Money = styled(TableItem)`
${props => props.$active ? `color: blue` : `color:red`}
`
const EditButton = styled(Ok)`
position: absolute;
pointer-events: auto;
cursor: pointer;
width: 70px;
z-index: 2;
top: -40px;
left: 60%;
font-size: 16px;
display: flex;
justify-content: space-around;
align-items: center;
`
const DeleteButton = styled(EditButton)`
left: calc(60% + 75px);
background: red;
`

function HomePage() {
    const url = "https://script.google.com/macros/s/AKfycbwK8T6ckUHeHT0Rl1QWFMz6XFnQWu9RFmLUW4VZ9fQVvSpnpA0TCBk3M1I0AMh-o17q/exec"
    const ww = window.innerWidth
    const [lists, setLists] = useState([])
    const [windowNum, setWindowNum] = useState([0])
    const [loading, setLoading] = useState(true)
    const [states, setStates] = useState([{date:'',money:'',bank:'',content:'',class:'',who:''}])
    const [activeRow, setActiveRow] = useState(0)
    useEffect(() => {
        if (loading) {
            fetch(url +'?page=0', {
                method: "GET"
            }).then(res => res.json())
                .then((data) => { console.log(data);setLists(data); setLoading(false) });
        }
    }, [])
    function windowChange(e) {
        if (e === "1") {
            if (windowNum.length !== 0) {
                const values = [...states]
                values[windowNum[windowNum.length - 1] + 1] = {date:'',money:'',bank:'',content:'',class:'',who:''}
                setStates(values)
                setWindowNum([...windowNum, windowNum[windowNum.length - 1] + 1])
            } else {
                const v = []
                v[windowNum[windowNum.length - 1] + 1] = {date:'',money:'',bank:'',content:'',class:'',who:''}
                setStates(v)
                setWindowNum([0])
            }
        }
    }
    const handleCreateWindow = () => {
        windowChange("1")
    }
    const handleCreateData = () => {
        let datas = [];
        let values = [...states]
        for (let i = 0; i < windowNum.length; i++) {
            for (let v in values[windowNum[i]]) {
                if (values[windowNum[i]][v] === ''){
                    alert('資料['+ windowNum[i] + ']沒填寫完唷')
                    return ''
                }
            }
        }
        setLoading(true)
        for (let i = 0; i < windowNum.length; i++) {
            datas[i] = {...states[windowNum[i]]}
            for (let v in values[windowNum[i]]) {
                values[windowNum[i]][v] = ""
            }
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                code: 'new',
                datas: datas
            })
        })
            .then(response => response.json())
            .then((data) => { setLists(data); setLoading(false) });
        setStates(values)
    }
    const handleDeleteCreateWindow = (e) => {
        const x = Number(e.target.id)
        setWindowNum(windowNum.filter(num => num !== x))
        states[x] = {}
    }

    const handleListDelete = () => {
        setLoading(true)
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                code: 'delete',
                datas: activeRow
            })
        })
            .then(response => response.json())
            .then((data) => { setLists(data); setLoading(false) });
        setActiveRow(0)
    }





    return <HomePageContainer>
        {loading && <Loading/>}
        <CreateListContainer>
            {windowNum.map((s) =>
                <CreateItem key={s}
                    id={s}
                    i={s}
                    states={states}
                    setStates={setStates}
                    handleDeleteCreateWindow={handleDeleteCreateWindow} />)
            }
            <New onClick={handleCreateWindow}><AiOutlinePlus /></New>
        </CreateListContainer>
        <Ok onClick={handleCreateData}>新增</Ok>
        <LastList>
            {ww > 675 && <TableRow>
                <TableTitle>日期</TableTitle>
                <TableTitle>項目</TableTitle>
                <TableTitle>金額</TableTitle>
                <TableTitle>銀行</TableTitle>
                <TableTitle>類別</TableTitle>
                <TableTitle>誰花的</TableTitle>
            </TableRow>}
            {lists.map(list => <TableRow
                key={list.id}
                id={list.id}
                $active={activeRow === list.id}
                onClick={() => activeRow === list.id ? setActiveRow(0) : setActiveRow(list.id)}>
                <TableItem>{list.date}</TableItem>
                <TableItem>{list.content}</TableItem>
                <Money $active={list.money > 0}>{list.money}{ww < 675 && '元'}</Money>
                <TableItem>{list.bank}</TableItem>
                <TableItem>{list.class}</TableItem>
                <TableItem>{list.who}</TableItem>
                {activeRow === list.id && <EditButton><AiOutlineEdit />修改</EditButton>}
                {activeRow === list.id && <DeleteButton onClick={handleListDelete}><AiOutlineDelete />刪除</DeleteButton>}
            </TableRow>)}
        </LastList>
    </HomePageContainer>
}

export default HomePage