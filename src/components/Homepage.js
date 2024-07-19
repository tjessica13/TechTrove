import React from 'react'
import { translate } from '../App';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

const Homepage = ({items, addToCart, lowerRange,upperRange,sortbyAsending, gpuChecked,cpuChecked,MBChecked,
  powerChecked,caseChecked,accessChecked,coolingChecked,storageCheckd,locale}) => {
  
  return (
    <div className="item-list" style={{width: "85.9%", display: "inline-block", position:"absolute"}}>
      { 
        
        items.map(item => {
          let tempFlag = false
          switch(item.part) {
            case 'cpu':
              if(cpuChecked){
                tempFlag = true
              }
              break;
            case "gpu":
              if(gpuChecked){
                tempFlag = true
              }
              break;
            case "accessories":
              if(accessChecked){
                tempFlag = true
              }
              break;
            case "storage":
              if(storageCheckd){
                tempFlag = true
              }
              break;
            case "motherboard":
              if(MBChecked){
                tempFlag = true
              }
              break;
            case "case":
              if(caseChecked){
                tempFlag = true
              }
              break;
            case "cooling":
              if(coolingChecked){
                tempFlag = true
              }
              break;
            case "power":
              if(powerChecked){
                tempFlag = true
              }
              break;
            default:
              alert("The item: "+item.name+"has a wrong part name")
          }
          if(tempFlag){
            if(lowerRange <= item.price && item.price < upperRange){
              return (
                <div className="item" key={item.id} >
                  <p className="d-inline-block text-truncate bold" style={{display: "inline", height: "15%"}} >{ item.name }</p>
                    <div className="item-subcontainer">
                        <h4>${ item.price }</h4>
                        <br></br>
                        <div>{translate('incart')}: { item.inCart }</div>
                        <button className="btn btn-danger btn-primary" onClick={() => {addToCart(item.id)}}>{translate('addtocart')}</button>
                    </div>
                      <img src={images[item.imageSrc]}/>
                </div>
              )
            }
            
          }
          
        })
      }
    </div>
  );
}

export default Homepage