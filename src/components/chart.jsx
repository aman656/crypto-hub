import React from "react"
import {Line} from 'react-chartjs-2'  
import { Typography,Col,Row } from 'antd'
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from 'chart.js';
  
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );

import { Chart as Charting, registerables } from 'chart.js';
Charting.register(...registerables);

const Chart = ({coinHistory,currPrice,name})=>{
    const coinPrice=[]
    const coinTimestamp=[]
    
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }
    // coinHistory?.data?.history.map((m,index)=>(
    //     coinPrice.push(m.price),
    //     coinTimestamp.push(new Date (m.timestamp).toLocaleDateString())
    // ))
   
    const data = {
        labels:coinTimestamp,
        datasets:[{
            label:"Price in Usd",
            data:coinPrice,
            fill:false,
            backgroundColor:"#0071bd",
            borderColor:"#0071bd",
        }]
    }
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }


    return(
        <>
        <Row className='chart-header'>
            <Typography.Title level={2} className='chart-title'>{name} Price Data</Typography.Title>
            <Col className='price-container'>
                <Typography.Title level={5} className='price-change'>{coinHistory?.data?.change}%</Typography.Title>
                <Typography.Title level={5} className='current-price'>Current {name } Price: ${currPrice}</Typography.Title>
            </Col>
        </Row>
        <Line data={data} options={options} />
        </>
    )

}

export default Chart