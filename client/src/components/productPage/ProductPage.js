import React from 'react'
import { useParams } from 'react-router-dom';
import { apiUrl, POST } from '../../apiConfig';
import { useEffect, useState } from 'react';
import messenger from "./icons/messenger.png"
import telegram from "./icons/telegram.png"
import twitter from "./icons/twitter.png"
import instagram from "./icons/instagram.png"
import avatar from "./icons/avatar.png"
import top from "./icons/top.png"
import home from "./icons/home.png"
import shop from "./icons/shop.png"
import "./productPage.css"
import { CgProfile } from 'react-icons/cg';
import { BiCategory } from 'react-icons/bi'
import { CircularProgress } from '@mui/material';
import LinearColor from '../loader';

export function ProductPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [similarItems, setSimilarItems] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`${apiUrl}/similar/${id}`, POST);
            const jsonData = await res.json();
            setSimilarItems(jsonData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }};
        fetchData()
      }, [id]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`${apiUrl}/item/${id}`, POST);
          const jsonData = await res.json();
          setData(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }};
      fetchData()
    }, [id]);
    
    if (data && data['id']) {
        return (
                <>
                <div className='container'>
                    <div id="mainoverlay"></div>
                    <div className='main'>
                        <div className='star'>
                            <div className='on' onClick={()=>{}}></div>
                        </div>
                        <div className='pmain'>
                            <div className='pcontent'>
                                <div className='content' itemScope>
                                    <div className='card'>
                                        <div className='photo' tabIndex="1">
                                            <div className='p'>
                                                <div className='p1'>
                                                    <img src={data['image']} alt={data['item_name']} itemProp="image" original-title=""/>
                                                </div>
                                            </div>
                                            {/* <div className='jump'>
                                                <span data-image="0" className="selected" ></span>
                                                <span data-image="1" className=""></span>
                                            </div> */}
                                            {/* <div className="arrow arr1">
                                                <div className="left"></div>
                                            </div>
                                            <div className="arrow arr2">
                                                <div className="right"></div>
                                            </div>
                                            <div className="zoom z1">
                                                <div></div>
                                            </div> */}
    
                                        </div>
    
                                        <div className='info'>
                                            <h1 itemProp='name'>{data['item_name']}</h1>
                                            <div className='pbar'>
                                            <div className='gt'>Price: {`${data['price']} ${data['currency']}`}</div>
                                            </div>
                                                <div className='location'>
                                                    <a>Location: {data['location']}</a>
                                                </div>
                                                
                                            
                                        </div>
    
                                    </div>
                                    <div className="description" itemProp="description">{data['description']}</div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div className='pmenu'>
                                <div id="uinfo">
                                    <div>
                                        <a className="n">
                                            <CgProfile size={50}></CgProfile>
                                        <div>{data['user_name']}</div>
                                        <div>{data['user_email']}</div>
                                        <div>0{data['user_number']}</div>
                                        </a>
                                    </div>
                                    <div className="ctc">
                                    <div className="phone">
                                        <a href={`tel:${data['user_number']}`}>Call</a>
                                    </div>
                                    </div>
                                </div>
                                <div className='pblock'>
                                    {/* <a className='top' href='#' onClick={() => {}} original-title='Բացել քարտեզը'>
                                        <div><img src={top}/></div>
                                        Քարտեզ
                                    </a> */}
                                    <a className='home' href='/' original-title='Home'>
                                        <div><img src={home}/></div>
                                        Home
                                    </a>
                                    <a className='ushop' href={`/category/${data['category_id']}`} original-title='Category'>
                                        <div><BiCategory size={32}/></div>
                                        Category
                                    </a>
                                </div>
                                <div className='other'>
                                    <span className="trel">Similar Items</span>

                                    {similarItems && (
                                        <>
                                        {similarItems.map((item) => {
                                        // <ObjectRow obj={object} key={i} />
                                        return (
                                            <>
                                            
                                        <a className='otherInfo' key={item['id']} href={`/item/${item['id']}`}>
                                        <img className='otehrPh' src={item['image']}/>
                                        <div className='otherInfoCont'>
                                            <div className="np">{item['item_name']}</div>
                                            <div className="p otherp">{`${item['price']} ${item['currency']}`}</div>
                                        </div>
                                    </a>
                                 </>
                                        )
                                    
                                    })}
                                    </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <LinearColor />
        )
    }
    
}






// style="--size:18px;--rating:0;--ratingfloor:0"