import HTMLReactParser from 'html-react-parser'
import {useParams} from 'react-router-dom' 
import {Select,Col,Row,Typography} from 'antd'
import millify from 'millify'
import { useGetCryptoDetailQuery ,useGetCryptoHistoryQuery} from '../services/api'
import { useState } from 'react'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Chart from './chart'
import LoadingSpinner from './LoadingSpinner'


const {Title,Text} = Typography
const {Option}  = Select

const CryptoDetail = ()=>{
    const {id} = useParams()
    const [timegiven,setTimeGiven] = useState('7d')
    const {data,isFetching} = useGetCryptoDetailQuery(id)
    const{data:coinHistory} = useGetCryptoHistoryQuery({id,timePeriod:timegiven})
   
    const cryptoDetails = data?.data?.coin
  
if(isFetching){
    return <LoadingSpinner/>
}
    
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
    return(
        <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
            <Title level={2} className='coin-name'>{cryptoDetails?.name}   ({cryptoDetails?.name.toLowerCase()}-{cryptoDetails?.symbol}  {" "})   price</Title>
            <p>{cryptoDetails?.name} live price in US dollar,View market cap all time statistics and much more. </p>
        </Col>
        <Select defaultValue="7d" className='select-timeperiod' placeholder="Select time period" onChange={(value)=>setTimeGiven(value)} >
            {time.map((t)=>(
                <Option key={t}>{t}</Option>
            ))}
        </Select>
        <Chart coinHistory = {coinHistory} currPrice = {millify(cryptoDetails?.price)} name={cryptoDetails?.name} />
        <Col className='stats-container'>
            <Col className='coin-value-statistics'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails?.name} Value Statistics
                    </Title >
                    <p>
                        An overview of {cryptoDetails?.name} statistics and history
                    </p>
                </Col>
                {stats.map(({icon,title,value})=>(
                    <Col className='coin-stats' key={title}>
                        <Col className='coin-stats-name'>
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className='stats'>{value}</Text>
                    </Col>
                ))}
            </Col>
            <Col className='other-stats-info'>
                <Col className='coin-value-statistics-heading'>
                    <Title level={3} className='coin-details-heading'>
                        Other Stats Info
                    </Title >
                    <p>
                   An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.
                    </p>
                </Col>
                {genericStats.map(({icon,title,value})=>(
                    <Col className='coin-stats'>
                        <Col className='coin-stats-name'>
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className='stats'>{value}</Text>
                    </Col>
                ))}
            </Col>
        </Col>
        <Col className='coin-desc-link'>
        <Row coin-desc>
            <Title level={3} className='coin-details-heading'>What is {cryptoDetails?.name}
            {HTMLReactParser(cryptoDetails?.description)}
            </Title>

        </Row>
        </Col>
        <Col className='coin-links'>
             <Title className='coin-details-heading' level={3}>
                 {cryptoDetails?.name}  Links
             </Title>
             {cryptoDetails?.links.map((l)=>(
                 <Row className='coin-link' key={l.name}>
                 <Title level={5} className='link-name'>{l.type}</Title>
                 <a href={l.url} target="_blank" rel='nonreferrer'>{l.name}</a>
                 </Row>
             ))}
        </Col>
        </Col>
    )
}

export default CryptoDetail