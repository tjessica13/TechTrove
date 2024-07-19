import React, { Component } from 'react'
import Homepage from './components/Homepage'
import FAQ from './components/FAQ'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart'
import { CheckoutForm } from './components/CheckoutForm'
import MultiRangeSlider from "multi-range-slider-react";
import en from "./locales/en.json"
import es from "./locales/es.json"

// Returns the string stored in the key (in json files)
// Depending on which locale (en or es)
export function translate(key) {
  let locale = sessionStorage.getItem("locale")
  if (locale != null) {
    if (locale === "es") 
      return es[key]
      else return en[key]
  } else return en[key]
}


class App extends Component {
  state = {
    lowerRange : 0,
    upperRange : 1000,
    sortbyAsending : "ascending",
    gpuChecked : true,
    cpuChecked : true,
    MBChecked : true,
    powerChecked : true,
    caseChecked : true,
    accessChecked : true,
    coolingChecked : true,
    storageCheckd : true,
    // Storing our items here similar to our grocery store
    items: [
      // Parts can be anything from:
      // CPU, GPU, Motherboard, Power Supply,
      // Storage, PC Cooling, Computer Cases & Accessories
      { name: 'AMD Ryzen 7 3700X 3.6 GHz 8-Core Processor', price: 259.99, imageSrc: 'R73700.png', part: 'cpu', inCart: 0, id: 0 },
      { name: 'Apple Magic Bluetooth Slim Keyboard', price: 89.99, imageSrc: 'AppleMagicBTSlim.png', part: 'accessories', inCart: 0, id: 1 },
      { name: 'ARDUINO UNO R3', price: 29.99, imageSrc: 'ArduinoUnoR3.png', part: 'accessories', inCart: 0, id: 2 },
      { name: 'Logitech G604 LIGHTSPEED Wireless Gaming Mouse with 15 Programmable Controls, Dual Wireless Connectivity Modes, and HERO 25K Sensor',
          price: 59.99, imageSrc: 'LogitechG604Wireless.png', part: 'accessories', inCart: 0, id: 3 },
      { name: 'SAMSUNG T5 Portable SSD 1TB - Up to 540 MB/s - USB 3.1 External Solid State Drive MU-PA1T0B/AM',
          price: 129.99, imageSrc: 'SamsungT5SSD.png', part: 'storage', inCart: 0, id: 4 },
      { name: 'ASUS TUF Gaming NVIDIA GeForce RTX 3070 Ti OC V2 Graphics Card (PCIe 4.0, 8GB GDDR6X, HDMI 2.1, DisplayPort 1.4a, Military-grade Certification, GPU Tweak III) TUF-RTX3070TI-O8G-V2-GAMING',
          price: 619.99, imageSrc: 'ASUSTUFRTX3070TiOCV2.png', part: 'gpu', inCart: 0, id: 5 },
      { name: 'MSI PRO Z690-A DDR5 LGA 1700 Intel Z690 SATA 6Gb/s ATX Intel Motherboard',
          price: 219.99, imageSrc: 'motherboard.png', part: 'motherboard', inCart: 0, id: 6 },
      { name: 'CORSAIR RMx Shift Series RM1200x Shift Fully Modular 80PLUS Gold ATX Power Supply',
          price: 319.99, imageSrc: 'powersupply.png', part: 'power', inCart: 0, id: 7 },
      { name: 'Phanteks Eclipse G360A PH-EC360ATG_DBK02 Black Steel / Tempered Glass ATX Mid Tower Computer Case',
          price: 119.99, imageSrc: 'case.png', part: 'case', inCart: 0, id: 8 },
      { name: 'Corsair LL Series CO-9050071-WW LL120 RGB, 120mm Dual Light Loop RGB LED PWM Fan, Single Pack',
          price: 139.99, imageSrc: 'coolingtwo.png', part: 'cooling', inCart: 0, id: 10 },
      { name: 'LIAN LI O11 Dynamic EVO O11DEX Black Aluminum / Steel / Tempered Glass ATX Mid Tower Computer Case',
          price: 249.99, imageSrc: 'casetwo.png', part: 'case', inCart: 0, id: 11 },
      { name: 'GIGABYTE Z790 AORUS MASTER LGA 1700 Intel Z790 EATX Motherboard with DDR5, 5* M.2, PCIe 5.0, USB 3.2 Gen2X2 Type-C, Intel WiFi 6E, Marvell AQtion 10GbE LAN, Q-Flash Plus, EZ-Latch Plus',
          price: 339.99, imageSrc: 'motherboardtwo.png', part: 'motherboard', inCart: 0, id: 12 }
    ],

    active: "Homepage"
  }
  filterItems = () =>{
    var returnList = this.state.items.sort((a, b) => a.price - b.price);
	  if(this.state.sortbyAsending == "descending"){
		  returnList.reverse();
	  }
    this.setState({
      items: returnList
    });
  }
  // Add 1 to cart based on the id
  addToCart = (id) => {
    let items = this.state.items.filter(item => {
      if (item.id === id) item.inCart++
      return item
    });
    this.setState({
      items: items
    });
  }

  // Remove 1 to cart based on the id
  removeFromCart = (id) => {
    let items = this.state.items.filter(item => {
      if (item.id === id) item.inCart--;
      return item
    });
    this.setState({
      items: items
    });
  }

  // Remove 1 to cart based on the id
  removeAllItemFromCart = (id) => {
    let items = this.state.items.filter(item => {
      if (item.id === id) item.inCart=0;
      return item
    });
    this.setState({
      items: items
    });
  }

  getCartTotal = () => {
    let items = this.state.items;
    let total = 0;
    for(var i=0; i<items.length;i++){
      if(items[i].inCart!=0){
        total = total + (items[i].inCart*items[i].price)
      }
    }
    return total.toFixed(2);
  }

  // Switch active component to render
  switchActive = (component) => {
    this.setState({
      active: component
    });
  }

  // Switch where to look for strings
  switchLocale = (language) => {
      sessionStorage.setItem("locale", language)
      this.forceUpdate()
  }

  // Renders the app's components like Homepage
  // with relevant states (items) and functions (addToCart) 
  render() {


     if (this.state.active == "Homepage") {
      return (
        <div className="App">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="navbar-brand m-auto"><h2 style={{display: "inline"}}>Tech</h2><h2 style={{color:"#B9274A", display: "inline"}}>Trove</h2></div>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <button class="nav-link navButton" onClick={() => {this.switchActive("Homepage")}}>{translate('homepage')}</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link navButton" onClick={() => {this.switchActive("Cart")}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg> {translate('cart')}
                    </button>
                </li>
              </ul>
            </div>
            <div class="collapse navbar-collapse justify-content-end" id="navbarText">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <button class="nav-link navButton" onClick={() => {this.switchActive("faq")}}>{translate('help')}</button>
                </li>
                <li class="nav-item">
          <button className="nav-link navButton" onClick={() => {this.switchLocale("en")}}>English</button>
                </li>
                <li class="nav-item">
          <button className="nav-link navButton" onClick={() => {this.switchLocale("es")}}>Español</button>
                </li>
              </ul>
            </div>
          </nav>
          <div>
          <nav id="sidebarMenu" className="collapse d-lg-inline-block sidebar" style={{width : "330px"}}>
          <div className="position-sticky" >
            <div className="list-group list-group-mine  mt-4">
          <div style={{height: "76%", textAlign: "left", padding: "1% 3% 3% 4%"}}>
            
            <h4>{translate('pricerange')}</h4>
            <MultiRangeSlider className="multi-range-slider"
            min={0}
            max={1000}
            step={5}
            minValue={this.state.lowerRange}
            maxValue={this.state.upperRange}
            barInnerColor={"#f5f5f5"}
            thumbLeftColor={"#df4759"}
            thumbRightColor={"#df4759"}
            onInput={(e) => {
              this.state.lowerRange = e.minValue
              this.state.upperRange = e.maxValue
            }}
            onChange={(e) => {
              this.filterItems()
              this.forceUpdate()
            }}
      />
      <br></br>
      <div className="priceboxModal">
        <p style={{lineHeight: "0%", color:"gray"}}>{translate('minvalue')}</p>
        <strong style={{lineHeight: "0%"}}>$ {this.state.lowerRange}</strong>
      </div>
      <div style={{display: "inline-block", width:"10%", textAlign: "center"}}>
        <hr style={{display: "inline-block", width:"50%", borderWidth:"2px", margin: "0px 0px 15px 0px"}}></hr>
      </div>
      <div className="priceboxModal">
        <p style={{lineHeight: "0%", color:"gray"}}>{translate('maxvalue')}</p>
        <strong style={{lineHeight: "0%"}}>$ {this.state.upperRange}</strong>
      </div>
            <br></br>
            <br></br>
            {translate('sortprodsby')}: <select id="sorting"  onChange ={(e) => {this.state.sortbyAsending= e.target.value}}>
              <option value="ascending">{translate('ascprice')}</option>
              <option value="descending">{translate('descprice')}</option>
            </select>
            <br></br>
            <br></br>
            <h4>{translate('selectparts')}</h4>
            <div style={{display: "inline-block", width: "50%"}}>
              <input type="checkbox" id="cpuCheck"  checked={this.state.cpuChecked} onChange ={(e) => {this.state.cpuChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="cpuCheck">&nbsp; CPU</label>
              <br></br>
              <input type="checkbox" id="gpuCheck"  checked={this.state.gpuChecked}  onChange ={(e) => {this.state.gpuChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="gpuCheck">&nbsp; {translate('gpus')}</label>
            </div>
            <div style={{display: "inline-block", width: "50%"}}>
              <input type="checkbox" id="mbCheck"  checked={this.state.MBChecked}  onChange ={(e) => {this.state.MBChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="mbCheck">&nbsp; {translate('motherboards')}</label>
              <br></br>
              <input type="checkbox" id="psCheck" checked={this.state.powerChecked}  onChange ={(e) => {this.state.powerChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="psCheck">&nbsp; {translate('pwrsupplies')}</label>
            </div>
            <div style={{display: "inline-block", width: "50%"}}>
              <input type="checkbox" id="storageCheck" checked={this.state.storageCheckd}  onChange ={(e) => {this.state.storageCheckd= e.target.checked;this.forceUpdate()}}></input>
              <label for="storageCheck">&nbsp; {translate('storedevices')}</label>
              <br></br>
              <input type="checkbox" id="coolingCheck" checked={this.state.coolingChecked}  onChange ={(e) => {this.state.coolingChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="coolingCheck">&nbsp; {translate('pccooling')}</label>
            </div>
            <div style={{display: "inline-block", width: "50%"}}>
              <input type="checkbox" id="casesCheck" checked={this.state.caseChecked}  onChange ={(e) => {this.state.caseChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="casesCheck">&nbsp; {translate('pccases')}</label>
              <br></br>
              <input type="checkbox" id="accCheck" checked={this.state.accessChecked}  onChange ={(e) => {this.state.accessChecked= e.target.checked;this.forceUpdate()}}></input>
              <label for="accCheck">&nbsp; {translate('accessories')}</label>
            </div>
          </div>

          </div>
        </div>
        </nav>
          <Homepage items={this.state.items} addToCart={this.addToCart} lowerRange = {this.state.lowerRange}
          upperRange = {this.state.upperRange} sortbyAsending = {this.state.sortbyAsending} 
          gpuChecked = {this.state.gpuChecked}  cpuChecked = {this.state.cpuChecked} 
          MBChecked = {this.state.MBChecked}  powerChecked = {this.state.powerChecked} 
          caseChecked = {this.state.caseChecked}  accessChecked = {this.state.accessChecked} 
          coolingChecked = {this.state.coolingChecked} storageCheckd = {this.state.storageCheckd} 
          />

          </div>
          
        </div>
      );
    } else if (this.state.active == "Cart") {
      return (
        <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand m-auto"><h2 style={{display: "inline"}}>Tech</h2><h2 style={{color:"#B9274A", display: "inline"}}>Trove</h2></div>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <button class="nav-link navButton" onClick={() => {this.switchActive("Homepage")}}>{translate('homepage')}</button>
              </li>
              <li class="nav-item">
                <button class="nav-link navButton" onClick={() => {this.switchActive("Cart")}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg> {translate('cart')}
                  </button>
              </li>
            </ul>
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="navbarText">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <button class="nav-link navButton" onClick={() => {this.switchActive("faq")}}>{translate('help')}</button>
              </li>
              <li class="nav-item">
        <button className="nav-link navButton" onClick={() => {this.switchLocale("en")}}>English</button>
              </li>
              <li class="nav-item">
        <button className="nav-link navButton" onClick={() => {this.switchLocale("es")}}>Español</button>
              </li>
            </ul>
          </div>
        </nav>

          <Cart items={this.state.items} addToCart={this.addToCart} removeFromCart={this.removeFromCart} getCartTotal={this.getCartTotal} removeAllItemFromCart={this.removeAllItemFromCart} state={this.switchActive}/>

        </div>
      );
    } else if (this.state.active === "Checkout") {
      return(
        <CheckoutForm items={this.state.items}/>
      )
      
    } else if (this.state.active === "faq") {
    return(
      <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-brand m-auto"><h2 style={{display: "inline"}}>Tech</h2><h2 style={{color:"#B9274A", display: "inline"}}>Trove</h2></div>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <button class="nav-link navButton" onClick={() => {this.switchActive("Homepage")}}>{translate('homepage')}</button>
            </li>
            <li class="nav-item">
              <button class="nav-link navButton" onClick={() => {this.switchActive("Cart")}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg> {translate('cart')}
                </button>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <button class="nav-link navButton" onClick={() => {this.switchActive("faq")}}>{translate('help')}</button>
            </li>
            <li class="nav-item">
      <button className="nav-link navButton" onClick={() => {this.switchLocale("en")}}>English</button>
            </li>
            <li class="nav-item">
      <button className="nav-link navButton" onClick={() => {this.switchLocale("es")}}>Español</button>
            </li>
          </ul>
        </div>
      </nav>
      <FAQ />
      </div>
    )
    
  } 
  }
}



export default App;
