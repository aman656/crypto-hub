import {Button,Typography,Avatar,Menu} from 'antd'
import {Link} from 'react-router-dom'
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined, MenuOutlined} from '@ant-design/icons'
import logo from '../images/logo1.png'
import {useState,useEffect} from 'react'

const Navbar = ()=>{
    const [active,setActive] = useState(true)
    const [size,setSize] = useState(null)
    useEffect(()=>{
        const sizeHandler = ()=>setSize(window.innerWidth)
        window.addEventListener("resize",sizeHandler)
        sizeHandler()
        return()=>window.removeEventListener("resize",sizeHandler)
    })
    useEffect(()=>{
        if(size<768){
            setActive(false)
        }else{
            setActive(true)
        }

    },[size])
    return(
        <div className='nav-container'>
            <div className='logo-container'>
                <Avatar size="large"  src="https://cdn.logojoy.com/wp-content/uploads/20200305144650/Bitcoin-icon.png" style={{marginBottom:"10px"}} />
                <Typography.Title level={2} className='logo'>
                    <Link to="/">Crypto Hub</Link>

                </Typography.Title>
                <Button className='menu-control-container' onClick={()=>setActive(!active)}><MenuOutlined  /></Button>

            </div>
          {active &&  <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined/>}>
<Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>}>
<Link to="/currencies">Currencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined/>}>
<Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>}>
<Link to="/news">News</Link>
                </Menu.Item>

            </Menu>}
        </div>
    )

}

export default Navbar 