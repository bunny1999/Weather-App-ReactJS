const { FaCloudSun, FaSun, FaCloud, FaCloudShowersHeavy, FaCloudRain, FaSnowman } = require("react-icons/fa")

export const getIcon=(str)=>{
    switch(str){
        case "clear sky":
            return <FaSun size="100"/>
        case "few clouds":
            return <FaCloudSun size="100"/>
        case "scattered clouds":
            return <FaCloud size="100"/>
        case "broken clouds":
            return <FaCloudShowersHeavy size="100"/>
        case "shower rain":
            return <FaCloudShowersHeavy size="100"/>
        case "rain":
            return <FaCloudRain size="100"/>
        case "thunderstorm":
            return <FaCloudShowersHeavy size="100"/>
        case "snow":
            return <FaSnowman size="100"/>
        default:
            return <FaCloud size="100" />
    }   
}