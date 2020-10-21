
// Assumptions with base case scenario

//Let Irradiance (input power) hitting the collector per square meter  (measured in W /m^2):

let Irradiance  = 1000;

//let Area of the collector (solar panel) be (measured in m^2):
let CollectorArea = 3;

 //let Area of connecting pipes be (measured in m^2):
let ConnectingPipesArea = 2;


 //Calculating the total thermal input power (Only the collector area is responsible for heat consumption, so multiplying the input power per meter square with the collector area)

let InputPower = Irradiance * CollectorArea;
console.log("Input power ",InputPower)


//Let the temperature of the solar panel fluid at a given time (set to an assumed random value of 90 degree Celsius for testing)
let Collector_fluid_Temp = 90;

//Let the temperature of the storage tank at the given time (set to an assumed random value of 60 degree Celsius for testing)
let StorageTank_fluid_Temp = 60;

//pump will turn on with "true" and will turn off with "false"
//pump will turn on if the difference between the temperature of the collector fluid and the storage tank fluid is 10 degree Celsius or more.
//pump will turn on if the collector fluid falls below freezing point while storage tank fluid is above freezing point to prevent pipe cracks
// pump will turn off if storage tank fluid is overheated


//initially pump set to off (false)

let pump= false;

if (Collector_fluid_Temp - StorageTank_fluid_Temp > 10) {

StorageTankOutputFunc();
pump = false; // turning off the pump after drawing hot water
}

else if (Collector_fluid_Temp<0 && StorageTank_fluid_Temp >0) {
    overcooling();
}

else if (StorageTank_fluid_Temp>110){
    overheating();
}




function StorageTankOutputFunc(){
    pump = true;  //pump is turned on



    //Calculating heat loss
//Assuming that the total heat loss takes place because of convection due to wind and radiation


//Calculating convective heat loss coefficient h_convec, due to wind, where:
// h_convec = 2.8 +3.0 u_w    (the formula is taken from a published paper by Ioan Sarbu, Calin Sebarchievici, in Solar Heating and Cooling Systems, 2017)
// here, u_w = velocity of wind (assumed a typical US day wind velocity to be 5.36 m/s)

    let u_w = 5.36 ;
    let h_convec = 2.8 + 3 * u_w ;



//Calculating radiation heat loss coefficient :
// h_rad = EC(T1^2 + T2^2)(T1+T2)   (the formula is taken from a published paper by Ioan Sarbu, Calin Sebarchievici, in Solar Heating and Cooling Systems, 2017)

// here, E stands for Epsilon which is the Emissivity of a surface. Here assuming the pipe to be copper, the emissivity of copper is 0.03
// here, C stands for Stephen-Boltzmann constant ( C= 5.67 x 10^-8 W/m^2.K^4)
// here, T1  denotes the temperature of the emitting surface in radiative exchange, measured in kelvin. Let T1 be 90 degree Celsius i.e 363.15 Kelvin
// here, T2  denotes the temperature of the absorbing surface in radiative exchange, measured in kelvin. Let T2 be 80 degree Celsius i.e 353.15 Kelvin

    let E =0.03;
    let C = 5.67 * Math.pow(10, -8);
    let T1= 363.15;
    let T2 = 353.15;
    let h_rad = E*C *(Math.pow(T1,2) + Math.pow(T2,2)) * (T1+T2)


// Total heat Loss is given by the formula: q= (U x A)(T_delta) (formula collected from https://www.toppr.com/guides/physics-formulas/heat-loss-formula/)

// here, TotalHeatLoss stands for total heat loss , measured in Watts
//here, U stands for the overall coefficient of heat loss, which is (h_convec+ h_rad)
// here A stands for the total area (collector and connecting pipes) assumed to be 5 meter square
// here T_delta is the temperature difference between inside and outside temperatures. i.e T2-T1


    let U = h_convec +h_rad;
    let A = CollectorArea + ConnectingPipesArea;
    let T_delta = T1-T2;
    let TotalHeatLoss= (U*A)*T_delta;

    console.log("Total Heatloss", TotalHeatLoss)

    let CurrentOutput = 0;
    CurrentOutput = InputPower - TotalHeatLoss;

    return console.log("Current output in watts",CurrentOutput);

}



//For overheat protection, we want the pump to be turned off so that it cannot draw any more hot fluid into the storage tank.
function overheating(){
    pump = false;
}

//For freeze protection, if the collector is over cooled due to cold climate, we want the pump to be turned on so that hot fluid from the storage tank can circulate through the system to prevent freezing.
// Also, we want to stop the pump when the Collector

function overcooling(){
    pump = true;

    if(Collector_fluid_Temp >0){
        pump = false;
    }

}