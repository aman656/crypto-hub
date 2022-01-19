import { Link } from "react-router-dom"
import {Typography,Row,Col,Statistic} from 'antd'
import millify from "millify"
import {useGetCryptosQuery} from '../services/api'
import Currencies from "./Currencies"
import News from "./New"
import LoadingSpinner from "./LoadingSpinner"

const {Title} = Typography

const Home = ()=>{
    const {data,isFetching} = useGetCryptosQuery(10)
    const stats = data?.data?.stats
    if(isFetching){
        return <LoadingSpinner/>
    }

  
    return(
        <>
        <Title>Global Statistics</Title>
        <Row>
            <Col span={12}><Statistic title="Total Currencies" value={stats.totalCoins} /></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={stats.totalExchanges} /></Col>
            <Col span={12}><Statistic title="Total Volume" value={millify(stats.total24hVolume)} /></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={millify(stats.totalMarketCap)} /></Col>
            <Col span={12}><Statistic title="Total Markets" value={millify(stats.totalMarkets)} /></Col>
        </Row>
        <div className="home-heading-container">
            <Title level={2} className="home-title">Top 10 Crypto's in the World</Title>
            <Title level={3}><Link className="show-more" to="/currencies">Show More</Link></Title>

        </div>
        <Currencies less />
        <div className="home-heading-container">
            <Title level={2} className="home-title">Latest Crypto News</Title>
            <Title level={3}><Link className="show-more" to="/news">Show More</Link></Title>

        </div>
        <News less/>
        </>
    )
}

export default Home