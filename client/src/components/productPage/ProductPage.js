import React from 'react'
import messenger from "./icons/messenger.png"
import telegram from "./icons/telegram.png"
import twitter from "./icons/twitter.png"
import instagram from "./icons/instagram.png"
import avatar from "./icons/avatar.png"
import top from "./icons/top.png"
import home from "./icons/home.png"
import shop from "./icons/shop.png"
import "./productPage.css"

export function ProductPage() {
    

    return (
        <>
            <div className='container'>
                <div id="mainoverlay"></div>
                <div className='main'>
                    <div className='category'>
                        <li className='categoryList'>
                            <a href="link">Category</a>
                        </li>
                    </div>
                    <div className='star'>
                        <div className='on' onClick={()=>{}}></div>
                    </div>
                    <div className='links'>
                        <a className='share link1' onClick={()=>{}}><img src={messenger} /></a>
                        <a className='share link2' onClick={()=>{}}><img src={telegram} /></a>
                        <a className='share link3' onClick={()=>{}}><img src={twitter} /></a>
                        <a className='share link4' onClick={()=>{}}><img src={instagram} /></a>
                    </div>
                    <div className='pmain'>
                        <div className='pcontent'>
                            <div className='content' itemType='https://schema.org/Product' itemScope>
                                <div className='card'>

                                    <div className='photo' tabIndex="1">
                                        <div className='p'>
                                            <div className='p1'>
                                                <img src="//s.list.am/f/591/67748591.webp" alt="BMW 5 Series, 2.5" itemprop="image" original-title=""/>
                                            </div>
                                            <div className='p2'>
                                                <img src="//s.list.am/f/592/67748592.webp"/>
                                            </div>
                                        </div>
                                        <div className='jump'>
                                            <span data-image="0" class="selected" ></span>
                                            <span data-image="1" class=""></span>
                                        </div>
                                        <div class="arrow arr1">
                                            <div class="left"></div>
                                        </div>
                                        <div class="arrow arr2">
                                            <div class="right"></div>
                                        </div>
                                        <div class="zoom z1">
                                            <div></div>
                                        </div>

                                    </div>

                                    <div className='info'>
                                        <h1 itemProp='name'>Product Name</h1>
                                        <div className='pbar'>
                                            <div className='location'>
                                                <a href='' onClick={()=>{}}>Location</a>
                                            </div>
                                            <div className='price'>Price  37000$</div>
                                        </div>
                                    </div>

                                </div>
                                <div class="gt">Բնութագրեր</div>
                                <div class="attr g">
                                    <div class="c" itemprop="brand" itemtype="https://schema.org/Brand" itemscope="">
                                        <div class="t">Մակնիշ</div>
                                        <div class="i" itemprop="name">BMW</div>
                                    </div>
                                    <div class="c">
                                        <div class="t">Մոդել</div>
                                        <div class="i">5 Series</div>
                                    </div>
                                    <div class="c">
                                        <div class="t">Տարի</div>
                                        <div class="i">2004</div>
                                    </div>
                                    <div class="c">
                                        <div class="t">Շարժիչի ծավալը</div>
                                        <div class="i">5.0 L</div>
                                    </div>
                                </div>

                                <div class="gt">Լրացուցիչ տեղեկություններ</div>
                                <div class="attr g">
                                        <div class="c">
                                        <div class="t">Վազքը</div>
                                    <div class="i">111,111 կմ</div>
                                    </div>
                                    <div class="c">
                                        <div class="t">Ղեկ</div>
                                        <div class="i">Ձախ</div>
                                    </div>
                                    <div class="c">
                                        <div class="t">Մաքսազերծված է</div>
                                        <div class="i">Այո</div>
                                    </div>
                                </div>

                                <div class="gt">Նկարագիր</div>
                                <div class="body" itemprop="description">Users TEXT</div>
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
                                    <a href="/user/467364" class="n">
                                    <img class="av_user" alt="Avatar" src={avatar} original-title=""/>
                                    <div>Dalal Hopar</div>
                                    </a>
                                </div>
                                <div class="r">
                                    <a href="/reviews/467364">
                                    <div class="stars" >
                                    </div>
                                    </a>
                                </div>
                                <div class="ctc">
                                    <div class="email">
                                    <a href="#" onClick={()=> {}}>Գրել</a>
                                </div>
                                <div class="phone">
                                    <a href="#" onClick={()=> {}}>Զանգահարել</a>
                                </div>
                                </div>
                            </div>
                            <div className='pblock'>
                                <a className='top' href='#' onClick={() => {}} original-title='Բացել քարտեզը'>
                                    <div><img src={top}/></div>
                                    Քարտեզ
                                </a>
                                <a className='home' href='#' onClick={() => {}} original-title='Վերադառնալ գլխավոր մենյու'>
                                    <div><img src={home}/></div>
                                    Գլխավոր էջ
                                </a>
                                <a className='ushop' href='#' onClick={() => {}} original-title='Ավելացնել զամբյուղ'>
                                    <div><img src={shop}/></div>
                                    Զամբյուղ
                                </a>
                            </div>
                            <div className='other'>
                                <span class="trel">Նմանատիպ հայտարարություններ</span>
                                <a className='otherInfo' href='#'>
                                    <img className='otehrPh' src='//s.list.am/r/587/67886587.webp'/>
                                    <div className='otherInfoCont'>
                                        <div class="np">Product Name</div>
                                        <div class="p otherp">Price</div>
                                    </div>
                                </a>
                                <a className='otherInfo' href='#'>
                                    <img className='otehrPh' src='//s.list.am/r/702/67161702.webp'/>
                                    <div className='otherInfoCont'>
                                        <div class="np">Product Name</div>
                                        <div class="p otherp">Price</div>
                                    </div>
                                </a>
                                <a className='otherInfo' href='#'>
                                    <img className='otehrPh' src='//s.list.am/r/906/70704906.webp'/>
                                    <div className='otherInfoCont'>
                                        <div class="np">Product Name</div>
                                        <div class="p otherp">Price</div>
                                    </div>
                                </a>
                                <a className='otherInfo' href='#'>
                                    <img className='otehrPh' src='//s.list.am/r/138/70340138.webp'/>
                                    <div className='otherInfoCont'>
                                        <div class="np">Product Name</div>
                                        <div class="p otherp">Price</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}






// style="--size:18px;--rating:0;--ratingfloor:0"