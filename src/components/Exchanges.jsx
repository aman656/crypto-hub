import {Col,Row,Collapse,Typography} from 'antd'
import {useGetCryptoExchangesQuery} from '../services/api'
import LoadingSpinner from './LoadingSpinner'


const {Panel} = Collapse
const {Text} = Typography

const Exchanges = ()=>{
    const {data,isFetching} = useGetCryptoExchangesQuery()
    if(isFetching){
        return <LoadingSpinner/>
    }
 
    return(
        <>
        <Row>
            <Col span={6}>Exchanges</Col>
            <Col span={6}>24h Trade Volume</Col>
            <Col span={6}>Markets</Col>
            <Col span={6}>Change</Col>
        </Row>
        {!data && <p style={{textAlign:"center",marginTop:"50px",fontSize:"20px",color:"red",fontWeight:"bold"}}>OOps! Something went wrong..</p> }
        </>
    )
}

export default Exchanges