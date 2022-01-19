import {Card,Row,Input,Col} from 'antd'
import millify from 'millify'
import {Link} from 'react-router-dom'
import {useEffect, useState}from 'react'
import {useGetCryptosQuery} from '../services/api'
import LoadingSpinner from './LoadingSpinner'


const Currencies = ({less})=>{
    const number = less ? 10 : 100
    const {data:coinsList,isFetching} = useGetCryptosQuery(number)
    const [list,setList] = useState([])
    const [inp,setInp] = useState("")
  

    useEffect(()=>{
        const entered = coinsList?.data?.coins?.filter((f)=>f.name.toLowerCase().includes(inp.toLowerCase()))
        setList(entered)
    },[inp,coinsList])
    if(isFetching){
        return <LoadingSpinner/>
    }
    return(
       <>
   {!less && <div className='search-crypto'>
           <Input placeholder='Search Here' onChange={(e)=>setInp(e.target.value)} />
       </div>}
       <Row gutter={[32,32]} className='crypto-card-container'>
           {list?.map((l)=>(
               <Col xs={24} sm={12} lg={6} className='crypto-card' key={l.id}>
                  <Link to={`/crypto/${l.uuid}`}  >
                  <Card title={`${l.rank}.${l.name}`} extra={<img src={l.iconUrl} className='crypto-image' />} hoverable>
                      <p>Price: {millify(l.price)}</p>
                      <p>Market Cap: {millify(l.marketCap)}</p>
                      <p>Change: {millify(l.change)}</p>


                  </Card>
                  </Link>

               </Col>
           ))

           }

       </Row>
       </>
    )
}

export default Currencies