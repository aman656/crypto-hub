import { useGetCryptoNewsQuery } from "../services/newsapi"
import {useGetCryptosQuery} from '../services/api'
import { Select,Typography,Col,Row,Avatar,Card } from "antd"
import moment from "moment"
import { useState } from "react"


const {Title,Text} = Typography
const {Option}  = Select

const News = ({less})=>{
    const[showcategory,setCategory] = useState("Cryptocurrency")
    const {data:newsList} = useGetCryptoNewsQuery({newsCategory:showcategory,count:less ?8:20})

    const {data} = useGetCryptosQuery(100)
if(!newsList?.value){
    return "Loading..."
}
    return(
        <Row gutter={[24,24]}>
            {!less && (
                <Col span={24} >
                    <Select placeholder="Enter a coin"  className="select-news" optionFilterProp="children" 
                    onChange={(e)=>setCategory(e)} 
                    filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>0} >
                    <Option value="Cryptocurrency">Cryptocurrency</Option>
                    {data?.data?.coins?.map((c)=><Option value={c.name}>{c.name}</Option>)}
                    </Select>
                </Col>
            )

            }
            {newsList.value.map((n,index)=>(
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <Card hoverable>
                                    <a href={n.url} target="_blank" rel="nonreferrer">
                                        <div className="news-image-container">
                                            <Title className="news-title" level={4}>{n.name}</Title>
                                            <img src={n?.image?.thumbnail?.contentUrl} style={{maxWidth:"200px" ,maxHeight:"100px"}} />
                                        </div>
                                        <p>
                                            {
                                                n.description ? `${n.description.substring(0,100)}...`:n.description
                                            }
                                        </p>
                                        <div className="provider-container">
                                            <div>
                                                <Avatar src={n.provider[0]?.image?.thumbnail?.contentUrl} />
                                                <Text className="provider-name">{n.provider[0]?.name}</Text>
                                            </div>
                                            <Text>{moment(n.datePublished).startOf("ss").fromNow()}</Text>

                                        </div>
                                    </a>

                                </Card>

                            </Col>
                
            ))
          
}
        </Row>
    )
}

export default News